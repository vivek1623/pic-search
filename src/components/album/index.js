import React from 'react';
import PropTypes from 'prop-types';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Modal from 'antd/es/modal';

import 'antd/es/row/style/css';
import 'antd/es/col/style/css';
import 'antd/es/modal/style/css';

import ImageCard from '../imagecard';
import ErrorBoundary from '../errorboundary';

class Album extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      show_modal: false,
      selected_image_data: null,
    }
  }

  showImageInModal = selected_image_data => {
    this.setState({
      show_modal: true,
      selected_image_data
    })
  }

  closeModal = () => {
    this.setState({
      show_modal: false,
      selected_image_data: null
    })
  }

  renderAlbumColumns = () => {
    const { columns, images } = this.props;
    return columns.map((column, i) => {
      return (
        <Col key={column} xs={24} sm={12} md={8} lg={6}>
          {
            images.map((image_data, index) => {
              if (index % columns.length === i)
                return (
                  <ErrorBoundary key={`${column}${index}${image_data.id}`}>
                    <div className="sai-pad-5">
                      <ImageCard img_data={image_data} onClick={this.showImageInModal} />
                    </div>
                  </ErrorBoundary>
                );
              return null
            })
          }
        </Col>
      );
    })
  }

  render() {
    const { show_modal, selected_image_data } = this.state;
    return (
      <Row>
        {this.renderAlbumColumns()}
        <Modal className="sai-modal" visible={show_modal} title={null} footer={null} maskClosable={false} onCancel={this.closeModal}>
          {
            show_modal &&
            <ImageCard img_data={selected_image_data} />
          }
        </Modal>
      </Row>
    );
  }
}

Album.propTypes = {
  columns: PropTypes.array.isRequired,
  images: PropTypes.array,
}

Album.defaultProps = {
  images: []
}

export default Album;
