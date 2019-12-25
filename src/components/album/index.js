import React from 'react';
import Row from 'antd/es/row';
import Col from 'antd/es/col';

import 'antd/es/row/style/css';
import 'antd/es/col/style/css';

import ImageCard from '../imagecard';
import ErrorBoundary from '../errorboundary';

class Album extends React.PureComponent {
  renderAlbumColumns = () => {
    const { columns, images } = this.props;
    const node = []
    for (let i = 0; i < columns; i++) {
      node[i] = (
        <Col key={i} xs={24} sm={12} md={8} lg={6}>
          {
            images.map((image_data, index) => {
              if (index % columns === i)
                return (
                  <ErrorBoundary key={image_data.id}>
                    <div className="sai-pad-5">
                      <ImageCard img_data={image_data} />
                    </div>
                  </ErrorBoundary>
                );
              return null
            })
          }
        </Col>
      );
    }
    return node;
  }

  render() {
    return (
      <Row>
        {this.renderAlbumColumns()}
      </Row>
    );
  }
}

export default Album;
