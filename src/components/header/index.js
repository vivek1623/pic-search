import React from 'react';
import PropTypes from 'prop-types';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Input from 'antd/es/input';

import 'antd/es/row/style/css';
import 'antd/es/col/style/css';
import 'antd/es/input/style/css';

import { APP_LAYOUT } from '../../data/config/constants';

const { Search } = Input;

class Header extends React.PureComponent {
  render() {
    const { title } = this.props;
    return (
      <div className='sai-fixed sai-t-0 sai-l-0 sai-r-0 sai-bg-header sai-box-shadow sai-overflow-y-hidden' style={{ height: `${APP_LAYOUT.APP_HEADER_HEIGHT}px` }}>
        <Row>
          <Col xs={{ span: 20, offset: 2 }} sm={{ span: 12, offset: 6 }} md={{ span: 8, offset: 8 }} className='sai-t-pad-10'>
            <h2 className='sai-font-bold sai-text-center sai-font-white sai-b-mrgn-10'>{title}</h2>
            <Search placeholder='Type to search photos' />
          </Col>
        </Row>
      </div>

    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
}

export default Header;
