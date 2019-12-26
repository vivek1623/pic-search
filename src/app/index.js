import React from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import { APP_LAYOUT, API_KEY } from '../data/config/constants';
import { checkDevice, getColumns, getImageUrl } from '../data/config/utils';

import Header from '../components/header';
import Album from '../components/album';

class App extends React.Component {
  state = {
    images: [],
    device_data: checkDevice.deviceStatus(),
    columns: getColumns(checkDevice.deviceStatus().screen_type),
    search_tag: '',
    next_page: 1,
    has_more_images: true,
  }

  componentDidMount() {
    window.addEventListener("resize", this.setDeviceData);
    this.fetchRecentImages();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setDeviceData);
  }

  setDeviceData = () => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const device_data = checkDevice.deviceStatus();
      this.setState({
        device_data,
        columns: getColumns(device_data.screen_type)
      });
    }, 300);
  }

  fetchRecentImages = () => {
    const { next_page } = this.state;
    axios({
      method: 'GET',
      url: `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${API_KEY}&per_page=20&page=${next_page}&format=json&nojsoncallback=1`,
      validateStatus: status => {
        return ((status >= 200 && status < 300) || status === 412);
      },
    }).then(res => {
      console.log('response', res.data);
      if (res.data.photos && res.data.photos.photo) {
        const images = this.convertInImagesList(res.data.photos.photo);
        this.setState(state => {
          return {
            images: [...state.images, ...images],
            has_more_images: res.data.photos.photo.length === 20,
            next_page: next_page + 1
          }
        })
      }
    }).catch(error => {

    });
  }

  convertInImagesList = photos => {
    const images = [];
    for (let i = 0; i < photos.length; i++) {
      if (photos[i].id) {
        const img_obj = {
          id: photos[i].id,
          url: getImageUrl(photos[i]),
        };
        images.push(img_obj);
      }
    }
    return images;
  }

  render() {
    const { columns, images, has_more_images } = this.state;
    return (
      <div className="App" style={{ paddingTop: `${APP_LAYOUT.APP_HEADER_HEIGHT}px` }}>
        <Header title='Search Photos' />
        <div id='albumContainer' className="sai-overflow-y-auto sai-pad-5" style={{ height: `calc(100vh - ${APP_LAYOUT.APP_HEADER_HEIGHT}px)` }}>
          <InfiniteScroll
            scrollableTarget="albumContainer"
            dataLength={images.length} //This is important field to render the next data
            hasMore={has_more_images}
            loader={<h4>Loading...</h4>}
            endMessage={<p className='sai-text-center'><b>Yay! You have seen it all</b></p>}
            scrollThreshold={0.9}
            next={this.fetchRecentImages}
          >
            <Album columns={columns} images={images} />
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default App;
