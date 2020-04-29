import React from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import message from 'antd/es/message'

import { APP_LAYOUT, API_KEY, LOCAL_STORAGE, PER_PAGE_COUNT } from '../data/config/constants';
import { checkDevice, getColumns, getImageUrl, getDataFromLocalStorage, setDataInLocalStorage, filterArrayBySearchText, debounced } from '../data/config/utils';

import 'antd/es/message/style/css';

import Header from '../components/header';
import Footer from '../components/footer';
import Album from '../components/album';
import Loader from '../components/loader';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      device_data: checkDevice.deviceStatus(),
      columns: getColumns(checkDevice.deviceStatus().screen_type),
      search_text: '',
      next_page: 1,
      has_more_images: true,
      loading: false,
      show_search_overlay: false,
      search_keys: getDataFromLocalStorage(LOCAL_STORAGE.SEARCH_KEY, [])
    };
    this.debouncedImageSearch = debounced(this.onImageSearch, 1000);
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

  showMessage = (type, msg) => {
    const Message = message[type];
    Message(msg);
  };

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

  fetchRecentImages = callback => {
    const { next_page } = this.state;
    axios({
      method: 'GET',
      url: `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${API_KEY}&per_page=${PER_PAGE_COUNT}&page=${next_page}&format=json&nojsoncallback=1`,
      validateStatus: status => {
        return ((status >= 200 && status < 300) || status === 412);
      },
    }).then(res => {
      if (callback) callback();
      if (res.data.photos && res.data.photos.photo) {
        const images = this.convertInImagesList(res.data.photos.photo);
        this.setState(state => {
          return {
            images: [...state.images, ...images],
            has_more_images: res.data.photos.photo.length === PER_PAGE_COUNT,
            next_page: next_page + 1,
          }
        })
      }
    }).catch(error => {
      this.showMessage('error', 'unable to fetch images, something went wrong');
    });
  }

  fetchImagesBySearchTag = (tag, callback) => {
    const { next_page } = this.state;
    axios({
      method: 'GET',
      url: `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=${tag}&per_page=${PER_PAGE_COUNT}&page=${next_page}&format=json&nojsoncallback=1`,
      validateStatus: status => {
        return ((status >= 200 && status < 300) || status === 412);
      },
    }).then(res => {
      if (callback) callback();
      if (res.data.photos && res.data.photos.photo) {
        const images = this.convertInImagesList(res.data.photos.photo);
        this.setState(state => {
          return {
            images: [...state.images, ...images],
            has_more_images: res.data.photos.photo.length === PER_PAGE_COUNT,
            next_page: next_page + 1,
          }
        })
      }
    }).catch(error => {
      this.showMessage('error', 'unable to fetch images, something went wrong');
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

  onImageSearch = tag => {
    this.setState({
      loading: true,
      images: [],
      next_page: 1,
      has_more_images: true,
      show_search_overlay: false
    }, () => {
      if (tag && tag.trim().length > 0) {
        this.fetchImagesBySearchTag(tag, this.stopLoading);
        let search_keys = getDataFromLocalStorage(LOCAL_STORAGE.SEARCH_KEY, []);
        const index = search_keys.findIndex(key => key === tag);
        if (index === -1) {
          if (search_keys.length >= 10) {
            search_keys = search_keys.slice(1);
          }
          search_keys.push(tag);
          setDataInLocalStorage(LOCAL_STORAGE.SEARCH_KEY, search_keys);
        }
      } else {
        this.fetchRecentImages(this.stopLoading)
      }
    })
  }

  onChangeSearchText = event => {
    const search_text = event.target.value;
    const search_keys = getDataFromLocalStorage(LOCAL_STORAGE.SEARCH_KEY, []);
    const filterd_search_keys = filterArrayBySearchText(search_text, search_keys);
    this.setState({
      search_text,
      search_keys: filterd_search_keys,
      show_search_overlay: filterd_search_keys.length !== 0
    }, () => {
      this.debouncedImageSearch(search_text);
    })
  }

  onClickSearchKey = search_key => {
    if (search_key !== 0) {
      this.setState({
        search_text: search_key,
        loading: true,
        images: [],
        next_page: 1,
        has_more_images: true,
        show_search_overlay: false,
      }, () => {
        this.fetchImagesBySearchTag(search_key, this.stopLoading);
      })
    }
  }

  fetchMoreImages = () => {
    const { search_text } = this.state;
    if (search_text.length === 0) {
      this.fetchRecentImages()
    } else {
      this.fetchImagesBySearchTag(search_text)
    }
  }

  render() {
    const { columns, images, search_text, has_more_images, show_search_overlay, search_keys, loading, } = this.state;
    return (
      <div style={{ paddingTop: `${APP_LAYOUT.APP_HEADER_HEIGHT}px` }}>
        <Header title='Search Photos' search_text={search_text} show_search_overlay={show_search_overlay} onClickSearchKey={this.onClickSearchKey} search_keys={search_keys} onSearch={this.onImageSearch} onChange={this.onChangeSearchText} />
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
                next={this.fetchMoreImages}
              >
                <Album columns={columns} images={images} />
              </InfiniteScroll>
          }
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
