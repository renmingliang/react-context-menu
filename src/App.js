import React from 'react';
import logo from './logo.svg';
import './App.css';

import utilMenu from './components/index';

const DEFAULT_MENUS = [
  {
    title: '菜单1',
    style: {color: 'rgb(202, 113, 42)'},
    children: [{
      title: '菜单1-1',
      children: [{
        title: '菜单1-1-1'
      }]
    }]
  }, {
    title: '菜单2',
  }, {
    title: '菜单3',
    children: [{
      title: '菜单3-1',
    }, {
      title: '菜单3-2',
    }, {
      title: '菜单3-3',
    }, {
      title: '菜单3-4',
    }, {
      title: '菜单3-5',
    }, {
      title: '菜单3-6',
    }, {
      title: '菜单3-7',
    }, {
      title: '菜单3-8',
    }, {
      title: '菜单3-9',
    }, {
      title: '菜单3-10',
    }]
  }, {
    title: '菜单4（禁止点击）',
    disabled: true
  }
]

function App() {
  const getContextMenu = (e) => {
    e.preventDefault();

    utilMenu.show(e, {
      options: DEFAULT_MENUS,
      className: 'contextMenu'
    }, function (item, key) {
      console.log('contextMenu ==> 点击', item, key);
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
    </div>
  );
}

export default App;
