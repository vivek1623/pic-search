import axios from 'axios';

import { BASE_URL } from './constants';

export const checkDevice = {
  screen_data: function () {
    return (
      {
        screen_width: window.innerWidth,
        screen_height: window.innerHeight,
        screen_orientation: this.screen_orientation(),
        screen_type: this.screen_type()
      }
    );
  },
  screen_orientation: function () {
    if (window.matchMedia("(orientation:landscape)").matches) {
      return 'landscape';
    } else {
      return 'portrait';
    }
  },
  screen_type: function () {
    if (window.innerWidth < 576) {
      return 'xs';
    } else if (window.innerWidth < 768) {
      return 'sm';
    } else if (window.innerWidth < 992) {
      return 'md';
    } else if (window.innerWidth < 1200) {
      return 'lg';
    } else if (window.innerWidth < 1600) {
      return 'xl';
    } else if (window.innerWidth < 2560) {
      return 'xxl';
    } else {
      return 'xxxl';
    }
  },
  deviceStatus: function () {
    return ({
      ...this.screen_data()
    });
  }
};

export const getColumns = screen_type => {
  switch (screen_type) {
    case 'xs': return ['c1'];
    case 'sm': return ['c1', 'c2'];
    case 'md': return ['c1', 'c2', 'c3'];
    case 'lg':
    case 'xl':
    case 'xxl':
    case 'xxxl': return ['c1', 'c2', 'c3', 'c4'];
    default: return ['c1'];
  }
}

export const getImageUrl = photo => {
  const url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
  return url;
}

const METHOD_TYPES = {
  GET: 'GET',
};

// https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=b45e6873d673e790d79a54d474c60a71&per_page=10&page=1&format=json&nojsoncallback=1

export const fetchDataAndProceed = (url, method, data, callback) => {
  axios({
    method,
    params: method === METHOD_TYPES.GET ? data : {},
    data: method !== METHOD_TYPES.GET ? data : {},
    url,
    baseURL: BASE_URL,
    validateStatus: status => {
      return ((status >= 200 && status < 300) || status === 412);
    },
  }).then(response => {
    callback(false, response.data);
  }).catch(error => {

  });
};