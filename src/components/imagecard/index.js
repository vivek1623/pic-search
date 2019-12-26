import React from 'react';
import PropTypes from 'prop-types';

class ImageCard extends React.PureComponent {
  onClickCard = () => {
    const { img_data, onClick } = this.props;
    onClick(img_data);
  }

  render() {
    const { img_data } = this.props;
    return (
      <div className="sai-pad-5 sai-bg-white sai-box-shadow-light sai-border-radius-3" onClick={this.onClickCard}>
        <div className="sai-card-loading">
          <img className="sai-full-width" src={img_data.url} alt="" style={{minHeight:'150px'}} />
        </div>
      </div>
    );
  }
}

ImageCard.propTypes = {
  img_data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
}

ImageCard.defaultProps = {
  img_data: {}
}

export default ImageCard;
