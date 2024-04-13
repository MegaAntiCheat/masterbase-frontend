import './App.css'
import Dashboard from "./pages/dashboard/dashboard.tsx";
import {useEffect, useState} from "react";
import {setLanguage} from "../i18n";
import {getAllSettings} from "./preferences.ts";
import {useModal} from "./context/ModalContext.tsx";
import {Constants} from "./constants.ts";
import {useMinimode} from "./context/MinimodeContext.tsx";
import SideMenu from "./components/SideMenu/SideMenu.tsx";
import {PAGES} from "./constants/menuConstants.tsx";
import ContentPageContainer from "./components/ContentPageContainer/ContentPageContainer.tsx";
import { Modal } from './components/Modal/Modal.tsx';

function App() {
    const {isMinimode} = useMinimode();
    const [currentPage, setCurrentPage] = useState<PAGES>(PAGES.PREFERENCES);
    const {closeModal, openModal, modalContent} = useModal();
    const renderPage = () => {
        switch (currentPage) {
            case PAGES.PREFERENCES:
                return <Dashboard/>;
            default:
                return <Dashboard/>;
        }
    };
    const isBackendConnected = async () => {
        try {
            // const backendRunning = await verifyBackend();
            // if (!backendRunning) throw new Error('Backend not running');
            return true;
        } catch (e) {
            console.error('Error verifying backend connection', e);
            // Close any previous modal
            closeModal();
            // openModal(<CantConnectModal/>);
            return false;
        }
    };
    const verifyConfigured = async () => {
        try {
            // const configured = await isBackendConfigured();
            // if (!configured) throw new Error('Backend not configured');
            if (modalContent) closeModal();
            return true;
        } catch (e) {
            console.error('Error verifying backend configuration', e);
            // Close any previous modal
            closeModal();
            // openModal(<ConfigurationModal closeModal={closeModal} />);
            return false;
        }
    };
    const verificationRoutine = async () => {
        let connected = false;
        do {
            connected = await isBackendConnected();
            if (!connected) {
                await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds before retrying
            }
        } while (!connected);
        void verifyConfigured();
    };
    useEffect(() => {
        // Set language from settings
        const setLanguageFromSettings = async () => {
            const settings = await getAllSettings();
            if (settings.external.language) {
                setLanguage(settings.external.language);
            }
        };
        void setLanguageFromSettings();

        // Don't verify backend if we're using fakedata (dev environment)
        // if (useFakedata) return;

        void verificationRoutine();
        const intervalId = setInterval(verificationRoutine, Constants.verificationInterval);

        return () => {
            clearInterval(intervalId);
        };
    }, [currentPage]);
    return (
        <div className="App">
            <Modal />
            {!isMinimode && (
                <div className="App-sidebar">
                    <SideMenu setCurrentPage={setCurrentPage} currentPage={currentPage}/>
                </div>
            )}
            <div className="App-content">
                <ContentPageContainer>{renderPage()}</ContentPageContainer>
            </div>
        </div>
    )
}

export default App
