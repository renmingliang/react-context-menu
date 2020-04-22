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
      list: DEFAULT_MENUS,
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
    <div className="App" onContextMenu={getContextMenu}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
