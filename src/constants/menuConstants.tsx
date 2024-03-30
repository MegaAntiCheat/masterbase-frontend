import {Settings2} from 'lucide-react';
import {ReactElement} from 'react';

export const enum PAGES {
    PREFERENCES,
}

interface MenuItem {
    titleKey: string;
    icon: ReactElement;
    page: PAGES;
}

export const MENU_ITEMS: MenuItem[] = [
    {
        titleKey: 'PREFERENCES',
        icon: <Settings2/>,
        page: PAGES.PREFERENCES,
    },
];
