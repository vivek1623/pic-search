import React from 'react';

class ImageCard extends React.PureComponent {
  render() {
    const { img_data } = this.props;
    return (
      <div className="sai-pad-5 sai-bg-white sai-box-shadow-light sai-border-radius-3">
        <img className="sai-full-width" src={img_data.url} alt="" />
      </div>
    );
  }
}

export default ImageCard;
