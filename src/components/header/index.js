import React from 'react';
import PropTypes from 'prop-types';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Input from 'antd/es/input';
import Dropdown from 'antd/es/dropdown';
import Menu from 'antd/es/menu';

import 'antd/es/row/style/css';
import 'antd/es/col/style/css';
import 'antd/es/input/style/css';
import 'antd/es/dropdown/style/css';
import 'antd/es/menu/style/css';

import { APP_LAYOUT } from '../../data/config/constants';

const { Search } = Input;

class Header extends React.PureComponent {
  render() {
    const { title, search_text, show_search_overlay, search_keys, onSearch, onChange, onClickSearchKey } = this.props;
    return (
      <div className='sai-fixed sai-t-0 sai-l-0 sai-r-0 sai-bg-header sai-box-shadow sai-overflow-y-hidden' style={{ height: `${APP_LAYOUT.APP_HEADER_HEIGHT}px` }}>
        <Row>
          <Col xs={{ span: 20, offset: 2 }} sm={{ span: 12, offset: 6 }} md={{ span: 8, offset: 8 }} className='sai-t-pad-10'>
            <h2 className='sai-font-bold sai-text-center sai-font-white sai-b-mrgn-10'>{title}</h2>
            <Dropdown
              visible={show_search_overlay}
              overlay={
                <Menu >
                  {
                    search_keys.map((search_key, index) => (
                      <Menu.Item key={index} onClick={() => onClickSearchKey(search_key)}>{search_key}</Menu.Item>
                    ))
                  }
                </Menu>
              }>
              <Search placeholder='Type to search photos' value={search_text} onSearch={onSearch} onChange={onChange} />
            </Dropdown>
          </Col>
        </Row>
      </div>

    );
  }
}

Header.propTypes = {
  search_text: PropTypes.string,
  title: PropTypes.string,
  onSearch: PropTypes.func,
  onChange: PropTypes.func,
  onClickSearchKey: PropTypes.func,
  show_search_overlay: PropTypes.bool,
  search_keys: PropTypes.array,
}

export default Header;
