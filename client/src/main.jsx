import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';

import App from './App.jsx'
import store from './redux/store';


import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import './responsive.css';
import './tailwind.css';
import "react-country-dropdown/dist/index.css";
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
