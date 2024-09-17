import {ReactNode} from 'react';
import './ContentPageContainer.css';
import TextItem from "../Text/TextItem.tsx";
import MenuHeader from "../SideMenu/MenuHeader.tsx";

interface ContentPageProps {
    children: ReactNode,
    online: boolean
}

const ContentPageContainer = ({children, online}: ContentPageProps) => {
    return <div className="content-page">
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{display: 'flex'}}>
                <MenuHeader
                    collapsed={true}
                    handleSymbolClick={() => {
                    }}
                    hideIcon={true}
                />
                <TextItem className="page-header text-3xl font-bold ml-6 my-6" fontSize="h1">Masterbase</TextItem>
            </div>
            <TextItem className="page-header text-3xl font-bold my-6"
                      fontSize="h1">{online ? 'online' : 'offline'}</TextItem>
        </div>
        {children}
    </div>;
};

export default ContentPageContainer;
