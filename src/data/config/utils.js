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
    case 'xs': return 1;
    case 'sm': return 2;
    case 'md': return 3;
    case 'lg': return 4;
    case 'xl':
    case 'xxl':
    case 'xxxl': return 5;
    default: return 1;
  }
}