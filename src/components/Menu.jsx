import React, { Component } from 'react';

import { getRect } from '../utils/dom';
import './Menu.css';

const DEFAULT_POSITION = {
  top: -9999,
  left: -9999
}

/**
 * 菜单面板
 *
 */
class JfMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      list: null
    };

    this.hide = this.hide.bind(this);
  }

  showAt(position, params) {
    const { left, top } = position;
    const { width: panelWidth, height: panelHeight } = getRect(this.menuRef);
    const { innerHeight: globalHeight, innerWidth: globalWidth } = window;

    let showLeft = left + 5, showTop = top + 5;
    if (panelWidth + left + 10 > globalWidth) {
      showLeft = left - panelWidth - 5;
    }
    if (panelHeight + top + 10 > globalHeight) {
      showTop = top - panelHeight - 5;
    }

    const { list } = params;
    this.setState({
      show: true,
      list: list,
      positon: {
        left: showLeft,
        top: showTop
      }
    });
  }

  hide(status) {
    this.setState({
      show: false
    }, () => {
      typeof this.props.onHide === 'function' && this.props.onHide();
      // 是否强制摧毁
      if (status) {
        typeof this.props.afterHide === 'function' && this.props.afterHide();
      }
    });
  }

  itemClick(e, item, key, keyPath) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (!item || !item.disabled) {
      const { onClick } = this.props;
      // 回调点击事件
      typeof onClick === 'function' && onClick(item, key, keyPath);
      // 同时摧毁弹层
      this.hide(true);
    }
  }

  render() {
    // 待优化 - 可采用递归渲染组件dom - 目前仅支持两级
    const { show, positon, list } = this.state;
    const styleObj = show ? positon : DEFAULT_POSITION;
    const renderList = list || this.props.list;
    return (
      <div
        ref={node => this.menuRef = node}
        className={`JfMenu contextMenu ${show ? 'Show' : 'Hide'}`} style={styleObj}>
        <ul className="list">
          {
            renderList.map((item, index) => {
              const child = item.children;
              return (
                <li
                  key={index}
                  onClick={(e) => this.itemClick(e, item, index, [index])}>
                  <span>{item.title}</span>
                  {
                    child && child.length ? (
                      <React.Fragment>
                        <i className="icon-more"></i>
                        <div className="JfMenu subMenu">
                          <ul className="list">
                            {
                              child.map((sub, ind) => {
                                return (
                                  <li
                                    key={ind}
                                    onClick={(e) => this.itemClick(e, sub, ind, [index, ind])}>{sub.title}</li>
                                )
                              })
                            }
                          </ul>
                        </div>
                      </React.Fragment>
                    ) : null
                  }
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default JfMenu;