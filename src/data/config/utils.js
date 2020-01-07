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
}

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

export const getDataFromLocalStorage = (key, undefined_return_value) => {
  const data = localStorage.getItem(key);
  return (data && data !== undefined ? JSON.parse(data) : undefined_return_value);
}

export const setDataInLocalStorage = (key, data) => {
  const json_data = JSON.stringify(data);
  localStorage.setItem(key, json_data);
}

export const filterArrayBySearchText = (text, array) => {
  return array.filter(item => {
    return (item && item !== undefined && item.toLowerCase().indexOf(text.toLowerCase()) === 0);
  });
}

export const debounced = (func, delay) => {
  let timerId;
  return (...args) => {
    if (timerId)
      clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
      timerId = null;
    }, delay);
  }
}
