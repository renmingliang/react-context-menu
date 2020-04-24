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
      const t = ReactDOM.findDOMNode(this.menu)
        , r = document.body.scrollLeft + e.clientX
        , n = document.body.scrollTop + e.clientY
        , o = t.offsetLeft
        , a = t.offsetTop
        , i = t.offsetWidth
        , s = t.offsetHeight;
      (r < o || r > o + i || n < a || n > a + s) && this.hide()
    }
  }

  show(e, t, r) {
    if (!this.menu) {
      this.init(t);
    }

    let n;
    if (t.position) {
      n = t.position;
    } else {
      n = {
        left: document.body.scrollLeft + e.clientX,
        top: document.body.scrollTop + e.clientY
      };
    }

    this.menu.showAt(n, {
      options: t.options,
      className: t.className,
      cbk: function () {
        let len = arguments.length, args = Array(len);
        for (let i = 0; i < len; i++) args[i] = arguments[i];
        return r.apply(null, args)
      }
    });
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