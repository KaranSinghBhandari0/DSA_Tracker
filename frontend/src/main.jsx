import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { AppProvider } from './context/AppContext.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AppProvider>
            <App/>
        </AppProvider>
        <ToastContainer autoClose={3500} position="top-right" theme="colored"/>
    </BrowserRouter>
)