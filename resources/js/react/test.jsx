import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './src/App'
import './src/styles/index.css'
import './src/styles/theme.css'
import './src/styles/checkout.css'
import './src/styles/checkoutFonts.css'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';


import { BrowserRouter } from "react-router-dom";
import { PolarisProvider } from './src/components';


ReactDOM.createRoot(document.getElementById('root')).render(
    <PolarisProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </PolarisProvider>
)
