import React from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import { APP_LAYOUT, API_KEY } from '../data/config/constants';
import { checkDevice, getColumns, getImageUrl } from '../data/config/utils';

import Header from '../components/header';
import Album from '../components/album';
import Loader from '../components/loader';

class App extends React.Component {
  state = {
    images: [],
    device_data: checkDevice.deviceStatus(),
    columns: getColumns(checkDevice.deviceStatus().screen_type),
    search_tag: '',
    next_page: 1,
    has_more_images: true,
    loading: false,
  }

  componentDidMount() {
    window.addEventListener("resize", this.setDeviceData);
    this.startLoading();
    this.fetchRecentImages(this.stopLoading);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setDeviceData);
  }

  startLoading = () => {
    this.setState({ loading: true });
  }

  stopLoading = () => {
    this.setState({ loading: false });
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

  fetchRecentImages = (callback) => {
    const { next_page } = this.state;
    axios({
      method: 'GET',
      url: `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${API_KEY}&per_page=20&page=${next_page}&format=json&nojsoncallback=1`,
      validateStatus: status => {
        return ((status >= 200 && status < 300) || status === 412);
      },
    }).then(res => {
      if (callback) callback();
      console.log('response', res.data);
      if (res.data.photos && res.data.photos.photo) {
        const images = this.convertInImagesList(res.data.photos.photo);
        this.setState(state => {
          return {
            images: [...state.images, ...images],
            has_more_images: res.data.photos.photo.length === 20,
            next_page: next_page + 1,
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
    const { columns, images, has_more_images, loading } = this.state;
    return (
      <div style={{ paddingTop: `${APP_LAYOUT.APP_HEADER_HEIGHT}px` }}>
        <Header title='Search Photos' />
        <div id='albumContainer' className="sai-overflow-y-auto sai-pad-5" style={{ height: `calc(100vh - ${APP_LAYOUT.APP_HEADER_HEIGHT}px)` }}>
          {
            loading ?
              <Loader count={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} /> :
              <InfiniteScroll
                scrollableTarget="albumContainer"
                dataLength={images.length} //This is important field to render the next data
                hasMore={has_more_images}
                loader={<Loader />}
                endMessage={<div className='sai-text-center sai-pad-10'><b>Yay! You have seen it all</b></div>}
                scrollThreshold={0.9}
                next={this.fetchRecentImages}
              >
                <Album columns={columns} images={images} />
              </InfiniteScroll>
          }
        </div>
      </div>
    );
  }
}

export default App;
