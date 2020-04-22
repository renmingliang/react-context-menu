import ReactDOM from 'react-dom';

/**
 * isRedux 添加的对话框是否需要访问redux数据
 * true：  是
 * false： 否
 *
 * @returns 返回数据 => 取决isRedux
 *          isRedux 是 无状态组件 => 返回 null
 *          isRedux 否           => 返回渲染对象的引用
 */
export function insertComponent(component, callback) {
  const comp = component;
  const temp = getTMPDOMRoot();
  return ReactDOM.render(comp, temp, callback);
}

export function removeComponentByRef(ref) {
  const parent = ref.parentNode;
  ReactDOM.unmountComponentAtNode(parent);
  parent.parentNode.removeChild(parent);
}

export function getTMPDOMRoot() {
  const el = document.createElement('div');
  const cls = 'TMPDOMRoot';
  el.className = cls;
  document.body.appendChild(el);
  return el;
}
/**
 * 获取DOM元素，返回数组
 * @param {Dom} selector
 */
export function queryDom(selector) {
  const eles = document.querySelectorAll(selector);
  return Array.prototype.slice.call(eles);
}

/**
 * 获取指定DOM元素在文档中位置
 * @param {String} el
 * @return {Object}
 * 返回元素 { top, left, width, height}
 */
export function getRect(el) {
  if (el instanceof window.SVGElement) {
    var rect = el.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}

/**
 * Usage: 平滑滚动到页面顶部。
 * 使用document.documentElement.scrollTop或document.body.scrollTop从顶部获取距离。
 * 从顶部的距离的一小部分滚动。使用window.requestAnimationFrame()对滚动进行动画处理。
 * Example:scrollToTop()
 */
export const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, c - c / 8)
  }
}
