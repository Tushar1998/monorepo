import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';

export function initializeScript({ target }: any) {
  ReactDOM.render(React?.createElement(App), document?.getElementById(target));
}
