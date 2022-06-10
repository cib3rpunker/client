import React from 'react'
import ReactDOM from 'react-dom'
import './app/layout/styles.css'
import App from './app/layout/App'
import reportWebVitals from './reportWebVitals'
// import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'
// import { Router } from "react-router";

export const history = createBrowserHistory()

ReactDOM.render(
  <React.StrictMode>
    {/*
    //💙https://stackoverflow.com/questions/69948150/property-history-does-not-exist-on-type-intrinsicattributes
    //-> Router components no longer take a history object in v6.x.
    //-> You should also instead now use one of the higher level routers, i.e. BrowserRouter, etc. –
      Drew Reese: Nov 12, 2021 at 19:29
    */}
    <Router history={history}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
