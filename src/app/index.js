import React from 'react';

import { APP_LAYOUT, images } from '../data/config/constants';
import { checkDevice, getColumns } from '../data/config/utils';

import Header from '../components/header';
import Album from '../components/album';

class App extends React.Component {
  state = {
    images: images,
    device_data: checkDevice.deviceStatus(),
    columns: getColumns(checkDevice.deviceStatus().screen_type)
  }

  componentDidMount() {
    window.addEventListener("resize", this.setDeviceData);
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

  render() {
    const { columns, images } = this.state;
    return (
      <div className="App" style={{ paddingTop: `${APP_LAYOUT.APP_HEADER_HEIGHT}px` }}>
        <Header title='Search Photos' />
        <div className="sai-overflow-y-auto sai-pad-5" style={{ height: `calc(100vh - ${APP_LAYOUT.APP_HEADER_HEIGHT}px)` }}>
          <Album columns={columns} images={images} />
        </div>
      </div>
    );
  }
}

export default App;

