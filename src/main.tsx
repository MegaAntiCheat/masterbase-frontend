import './tailwind.css';
import React from 'react';
import App from "./App.tsx";
import ReactDOM from 'react-dom/client';
import {MinimodeProvider} from "./context/MinimodeContext.tsx";
import {ModalProvider} from "./context/ModalContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MinimodeProvider>
            <ModalProvider>
                <App/>
            </ModalProvider>
        </MinimodeProvider>
    </React.StrictMode>,
)
