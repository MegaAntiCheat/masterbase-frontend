import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ModalProvider} from "./context/ModalContext.tsx";
import {MinimodeProvider} from "./context/MinimodeContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MinimodeProvider>
            <ModalProvider>
                <App/>
            </ModalProvider>
        </MinimodeProvider>
    </React.StrictMode>,
)
