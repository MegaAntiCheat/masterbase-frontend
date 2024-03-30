import {Dispatch, SetStateAction, useEffect, useRef, useState, MouseEvent as ReactMouseEvent} from 'react';

import MenuHeader from './MenuHeader';


import './SideMenu.css';
import {t} from "../../../i18n";
import SideMenuItem from "../SideMenuItem/SideMenuItem.tsx";
import Divider from '../Divider/Divider.tsx';
import {MENU_ITEMS, PAGES} from "../../constants/menuConstants.tsx";

interface SideMenuProps {
    setCurrentPage: Dispatch<SetStateAction<PAGES>>;
    currentPage: PAGES;
}

const SideMenu = ({setCurrentPage, currentPage}: SideMenuProps) => {
    const [collapsed, setCollapsed] = useState(true);
    const MenuRef = useRef<HTMLDivElement>(null);

    const handleToggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const handleOutsideClick = ( event: MouseEvent) => {
        if (!MenuRef.current?.contains(event.target as Node)) {
            setCollapsed(true);
        }
    };

    const handleToggleClick = (event: ReactMouseEvent) => {
        event.stopPropagation();
        handleToggleCollapse();
    };

    const handleEscapePress = (event: KeyboardEvent) => {
        if (event.key !== 'Escape') return;

        setCollapsed(true);
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        document.addEventListener('keydown', handleEscapePress);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
            document.removeEventListener('keydown', handleEscapePress);
        };
    }, []);

    return (
        <>
            <div
                className={`side-menu fixed left-0 top-0 h-screen z-50 bg-secondary outline-outline/30 outline-1 outline w-full sm:w-2/4 max-w-sm transition-all ease-in-out ${
                    collapsed ? 'collapsed' : ''
                }`}
                ref={MenuRef}
            >
                <MenuHeader
                    collapsed={collapsed}
                    handleSymbolClick={handleToggleClick}
                />
                <div>
                    <Divider size={2}/>
                    {MENU_ITEMS.map(({titleKey, icon, page}) => (
                        <SideMenuItem
                            key={page}
                            title={t(titleKey)}
                            Icon={icon}
                            collapsed={collapsed}
                            onClick={() => setCurrentPage(page)}
                            selected={currentPage === page}
                        />
                    ))}
                </div>
            </div>
            <div
                className={`w-[100vw] h-[100vh] z-40 ${
                    !collapsed ? ' bg-black/10' : ''
                }`}
            />
        </>
    );
};

export default SideMenu;