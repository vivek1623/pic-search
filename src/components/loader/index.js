import React from 'react';
import PropTypes from 'prop-types';
import Row from 'antd/es/row';
import Col from 'antd/es/col';

import 'antd/es/row/style/css';
import 'antd/es/col/style/css';

class Loader extends React.PureComponent {
  render() {
    const { count } = this.props;
    return (
      <Row>
        {
          count.map(item => (
            <Col key={item} xs={24} sm={12} md={8} lg={6}>
              <div className="sai-pad-10">
                <div className="sai-bg-white sai-pad-10 sai-box-shadow-light sai-border-radius-3">
                  <div className="sai-card-loading" style={{ height: '200px' }} />
                </div>
              </div>
            </Col>
          ))
        }
      </Row>
    );
  }
}

Loader.propTypes = {
  count: PropTypes.array.isRequired,
}

Loader.defaultProps = {
  count: [1, 2, 3, 4]
}

export default Loader;
