import React from 'react';
import PropTypes from 'prop-types';

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

ImageCard.propTypes = {
  img_data: PropTypes.object.isRequired,
}

ImageCard.defaultProps = {
  img_data: {}
}

export default ImageCard;
