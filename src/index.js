import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TraveBot from './travelBotSourceCode.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <TraveBot />
  </React.StrictMode>,
  document.getElementById('traveBotCode')
);

serviceWorker.unregister();
