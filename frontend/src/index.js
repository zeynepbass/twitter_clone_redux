import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createStore,applyMiddleware} from "redux"
import {thunk} from "redux-thunk"
import {Provider} from "react-redux"
import Home from "../src/reducer/Index"
import {BrowserRouter} from "react-router-dom"
const store=createStore(
  Home,
  applyMiddleware(thunk)
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
     <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
 
);
