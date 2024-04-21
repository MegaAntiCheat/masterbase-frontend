import {status} from "../api";
import {SetStateAction, useEffect} from "react";
import {useModal} from "../context/ModalContext.tsx";

function Online(online: boolean, setOnline: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }) {
    const {closeModal, openModal, modalContent} = useModal();
    const checkBackendStatus = async () => {
        try {
            const response = await status();
            if (response === 'OK') {
                console.log('Backend is running');
                return true;
            }
            return false;
        } catch (error) {
            console.log('Backend is not running', error);
            return false;
        }
    };
    const isBackendConnected = async () => {
        try {
            const backendRunning = await checkBackendStatus();
            if (!backendRunning) throw new Error('Backend not running');
            return true;
        } catch (e) {
            console.error('Error verifying backend connection', e);
            return false;
        }
    };
    useEffect(() => {
        let intervalId: number | undefined;

        const checkStatus = async () => {
            const isRunning: boolean | undefined = await checkBackendStatus();
            if (isRunning) {
                setOnline(true);
            }
            if (!isRunning) {
                setOnline(false);
                intervalId = setInterval(checkBackendStatus, online ? 60000 : 5000);
            } else if (intervalId) {
                clearInterval(intervalId);
            }
        };

        void checkStatus();

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, []);
    return <>     {online}
        <div className="der">Death grips is {online && 'online'} {!online && 'offline'}</div>
    </>
}

export default Online;
