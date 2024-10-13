import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import './index.css';

import { routes } from './routes'; 
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';

// Function to convert routes array into <Route> components
const renderRoutes = (routes) => {
    return routes.map(({ path, element, errorElement, children }, index) => (
        <Route key={index} path={path} element={element} errorElement={errorElement}>
            {children && renderRoutes(children)} 
        </Route>
    ));
};

const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app using HashRouter
root.render(
    <Provider store={store}>
        <HashRouter>
            <Routes>
                {renderRoutes(routes)} 
            </Routes>
        </HashRouter>
    </Provider>
);

// Performance measuring code
reportWebVitals();
