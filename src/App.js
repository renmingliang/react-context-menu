import React from 'react';
import logo from './logo.svg';
import './App.css';

import utilMenu from './components/index';

const DEFAULT_MENUS = [
  {
    title: '菜单1',
    key: '1',
    children: [{
      title: '菜单1-1',
      key: '1-1',
    }]
  }, {
    title: '菜单2',
    key: '2'
  }, {
    title: '菜单3',
    key: '3'
  }
]

function App() {
  const getContextMenu = (e) => {
    e.preventDefault();

    utilMenu.show(e, {
      options: DEFAULT_MENUS,
      className: 'contextMenu',
      onShow: () => {
        console.log('contextMenu ==> 显示');
      },
      onHide: () => {
        console.log('contextMenu ==> 隐藏');
      },
      onClick: (item, key, keyPath) => {
        console.log('contextMenu ==> 点击', item, key, keyPath);
      }
    })
  }

  const showMenu = (e) => {
    utilMenu.show(e, {
      options: DEFAULT_MENUS,
      onShow: () => {
        console.log('menu ==> 显示');
      },
      onHide: () => {
        console.log('menu ==> 隐藏');
      },
      onClick: (item, key, keyPath) => {
        console.log('menu ==> 点击', item, key, keyPath);
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header" onContextMenu={getContextMenu}>
        <img src={logo} className="App-logo" alt="logo" />
        <p><code>鼠标右键点击显示菜单</code></p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div onClick={showMenu}>鼠标左键点击显示菜单</div>
    </div>
  );
}

export default App;
