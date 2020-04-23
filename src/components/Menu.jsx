import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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
      show: false
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.onHoverMenuItem = this.onHoverMenuItem.bind(this);
    this.onLeaveMenuItem = this.onLeaveMenuItem.bind(this);
  }

  isRootMenu() {
    return !this.props.parent
  }

  showAt(e, params) {
    let o = 0, a = 0;
    let r = e.left, n = e.top;
    const $el = ReactDOM.findDOMNode(this);
    const { width: panelWidth, height: panelHeight } = getRect($el);
    const { innerWidth: globalWidth, innerHeight: globalHeight } = window;

    if (!params) {
      const s = getRect($el.parentNode);
      o = s.left;
      a = s.top;
    }

    if (o + r + panelWidth > document.body.scrollLeft + globalWidth) {
      r = r - panelWidth - 2;
    } else {
      r += 2;
    }

    if (a + n + panelHeight > document.body.scrollTop + globalHeight) {
      n = n - panelHeight - 2;
    } else {
      n += 2;
    }

    this.setState({
      show: true,
      position: {
        left: r,
        top: n
      },
      className: params && params.className ? params.className : ""
    });
  }

  show() {
    this.setState({
      show: true
    });
  }

  hide(status) {
    this.setState({
      show: false
    }, () => {
      if (status) {
        const t = this.props.parent;
        t ? t.hide(status) : "function" == typeof this.props.afterHide && this.props.afterHide();
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

  onHoverMenuItem(e) {
    const t = e.currentTarget.dataset.idx,
      r = this.refs["child-" + t],
      n = ReactDOM.findDOMNode(this);
    r && r.showAt({ left: n.clientWidth - 4, top: 0 })
  }

  onLeaveMenuItem(e) {
    const t = e.currentTarget.dataset.idx,
      r = this.refs["child-" + t];
    r && r.hide()
  }

  render() {
    let e = null, r = "JfMenu " + (this.state.show ? "Show" : "Hide"), n = this.state.options || this.props.options, o = this.state.position || this.props.position, a = [];

    if (n) {
      let s;
      for (let c = 0; c < n.length; c++) {
        let l, p = n[c], d = p, f = null;
        let y = "";
        if (p && typeof p === "object") {
          d = [p.title];
          p.checked && (y = "on");
          let h = Array.isArray(p.children);
          if (h) {
            d.push(<i className="icon-more" key={"gt" + c }></i>);
            f = <JfMenu
              ref={"child-" + c}
              idx={c}
              options={p.children}
              parent={this}
              />
          }

          l = p.style;
          p.disabled && (y += " disabled");
        }

        s = <li
          className={y}
          key={c}
          style={l}
          data-idx={c}
          onMouseEnter={this.onHoverMenuItem}
          onMouseLeave={this.onLeaveMenuItem}
          onClick={(e) => this.itemClick(e, p, c, [c])}>
          {d}
          {f}
        </li>;


        a.push(s);
      }

      e = <div className="list">
        <ul>{a}</ul>
      </div>
    }

    this.state.show || (o = DEFAULT_POSITION);

    if (this.state.className) {
      r += " " + this.state.className;
    } else {
      if (this.props.className) {
        r += " " + this.props.className;
      }
    }

    return <div className={r} style={o}>{e}</div>;
  }
}

export default JfMenu;