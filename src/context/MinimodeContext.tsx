import React, {ReactNode} from 'react';
import {Constants} from "../constants.ts";

interface MinimodeContextType {
    isMinimode: boolean;
}

export const MinimodeContext = React.createContext<
    MinimodeContextType | undefined
>(undefined);

export const useMinimode = (): MinimodeContextType => {
    const context = React.useContext(MinimodeContext);
    if (!context) {
        throw new Error('useMinimode must be used within a MinimodeProvider');
    }
    return context;
};

interface MinimodeProviderProps {
    children?: ReactNode;
}

export const MinimodeProvider = ({children}: MinimodeProviderProps) => {
    const {miniModeWidth, miniModeHeight} = Constants;
    const [isMinimode, setIsMinimode] = React.useState(
        window.innerWidth <= miniModeWidth && window.innerHeight <= miniModeHeight,
    );

    React.useEffect(() => {
        const handleResize = () => {
            setIsMinimode(window.innerWidth <= miniModeWidth && window.innerHeight <= miniModeHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const contextValue: MinimodeContextType = {isMinimode};

    return (
        <MinimodeContext.Provider value={contextValue}>
            {children}
        </MinimodeContext.Provider>
    );
};
