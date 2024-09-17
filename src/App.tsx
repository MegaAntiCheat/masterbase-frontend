import './App.css'
import Dashboard from "./pages/dashboard/dashboard.tsx";
import {useEffect, useState} from "react";
import {useMinimode} from "./context/MinimodeContext.tsx";
import SideMenu from "./components/SideMenu/SideMenu.tsx";
import {PAGES} from "./constants/menuConstants.tsx";
import ContentPageContainer from "./components/ContentPageContainer/ContentPageContainer.tsx";
import ConnectionMonitor from "./components/online.tsx";
import Provision from "./pages/provision.tsx";

function App() {
    const [apiKey, setApiKey] = useState('');
    const [online, setOnline] = useState(false);
    const {isMinimode} = useMinimode();
    const [currentPage, setCurrentPage] = useState<PAGES>(PAGES.PREFERENCES);

    const renderPage = () => {
        if (!apiKey) {
            return <Provision/>;
        }
        switch (currentPage) {
            case PAGES.PREFERENCES:
                return <Dashboard/>;
            default:
                return <Dashboard/>;
        }
    };
    useEffect(() => {
        if (online) {
            const urlParams = new URLSearchParams(window.location.search);
            const key = urlParams.get('key');
            if (key) {
                setApiKey(key);
            }
        } else {
            // TODO show offline modal
        }
    }, [online]);

    return (
        <div className="App">
            <div className="App-content">
                <ContentPageContainer online={online}>
                    {ConnectionMonitor(online, setOnline)}
                    {renderPage()}
                </ContentPageContainer>
            </div>
        </div>
    )
}

export default App
