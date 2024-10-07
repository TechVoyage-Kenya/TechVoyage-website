import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import './index.css';

import { routes } from './routes';
import reportWebVitals from './reportWebVitals';

//To be removed when deploying to different site. Gh-pages scripts are also to be removed
const basename = "/TechVoyage-website";
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(routes,{basename:basename})


root.render(
<RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
