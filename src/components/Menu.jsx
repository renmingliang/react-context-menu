import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './Menu.css';

const DEFAULT_POSITION = {
  top: -9999,
  left: -9999
}

const MENU_ITEM_HEIGHT = 30;

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
    this.onClick = this.onClick.bind(this);
    this.onHoverMenuItem = this.onHoverMenuItem.bind(this);
    this.onLeaveMenuItem = this.onLeaveMenuItem.bind(this);
  }

  isRootMenu() {
    return !this.props.parent
  }

  showAt(e, t) {
    let o = 0, a = 0;
    let r = e.left, n = e.top;
    const $el = ReactDOM.findDOMNode(this);
    const { width: panelWidth } = $el.getBoundingClientRect();
    const { innerWidth: globalWidth, innerHeight: globalHeight } = window;

    if (!t) {
      const s = $el.parentNode.getBoundingClientRect();
      o = s.left;
      a = s.top;
    }

    o + r + panelWidth > document.body.scrollLeft + globalWidth
      ? r = t ? document.documentElement.clientWidth - panelWidth : 2 - panelWidth
      : r += 2;

    // 由于不同菜单项对应的高度不一，这里通过子项数量 * 子项高度获取
    let p = (t ? t.options : this.props.options).length * MENU_ITEM_HEIGHT;
    if ("bottom" === e.align) {
      n -= p;
      n = Math.max(0, n);
    };

    if (a + n + p > document.body.scrollTop + globalHeight) {
      if (!this.isRootMenu()) {
        // 若不是根节点，则须减去该子项高度
        p -= MENU_ITEM_HEIGHT;
      }
      n -= p;
      n = Math.max(0 - a, n);
    }

    const obj = Object.assign({}, {
      show: true,
      position: {
        left: r,
        top: n
      },
      className: t && t.className ? t.className : ""
    }, t);

    this.setState(obj);
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

  getItem(idx) {
    return (this.state.options || this.props.options)[idx]
  }

  onClick(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    let t = parseInt(e.currentTarget.dataset.idx),
      r = this,
      n = this.props.parent,
      o = [t],
      a = this.getItem(t);
    if (!a || !a.disabled) {
      for (; n;) {
        o.push(r.props.idx);
        r = n;
        n = n.props.parent;
      }
      o.reverse();
      r.state.cbk(a, o);
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
          onClick={this.onClick}>
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