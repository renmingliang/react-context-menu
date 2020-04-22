/**
 * 菜单实例化
 */

import React from 'react';
import ReactDOM from 'react-dom';

import Menu from './Menu';
import { insertComponent, removeComponentByRef } from '../utils/dom';

class UtilMenu {
  constructor() {
    this.hide = this.hide.bind(this);
    this.outerClick = this.outerClick.bind(this);
  }

  init(params = {}) {
    const { onShow } = params;
    const props = Object.assign({}, params, { afterHide: this.hide });
    this.menu = insertComponent(React.createElement(Menu, props), onShow);
  }

  outerClick(e) {
    if (this.menu) {
      var t = ReactDOM.findDOMNode(this.menu)
        , r = document.body.scrollLeft + e.clientX
        , n = document.body.scrollTop + e.clientY
        , o = t.offsetLeft
        , a = t.offsetTop
        , i = t.offsetWidth
        , s = t.offsetHeight;
      (r < o || r > o + i || n < a || n > a + s) && this.hide()
    }
  }

  show(e, params = {}) {
    if (!this.menu) {
      this.init(params);
    }

    const position = {
      left: document.body.scrollLeft + e.clientX,
      top: document.body.scrollTop + e.clientY
    };

    if (!this.menu) {
      console.log('dialog ==> 该功能不支持无状态组件调用');
      return false;
    }

    this.menu.showAt(position, params);
    document.addEventListener('click', this.outerClick);
  }

  hide() {
    if (this.menu) {
      this.menu.hide();
      document.removeEventListener('click', this.outerClick);
      removeComponentByRef(ReactDOM.findDOMNode(this.menu));
      this.menu = null;
    }
  }

}

export default new UtilMenu();