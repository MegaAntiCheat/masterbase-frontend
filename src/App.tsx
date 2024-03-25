import './App.css'
import Dashboard from "./pages/dashboard/dashboard.tsx";
import {useState} from "react";

function App() {
    const [currentPage, setCurrentPage] = useState('/');
    const renderPage = () => {
        switch (currentPage) {
            case '/':

            default:
                return <Dashboard/>;
        }
    };
    return (
        <div>
            {renderPage()}
        </div>
    )
}

export default App
