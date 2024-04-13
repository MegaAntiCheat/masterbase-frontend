import {ReactNode} from 'react';
import './ContentPageContainer.css';
import TextItem from "../Text/TextItem.tsx";

interface ContentPageProps {
    children: ReactNode;
}

const ContentPageContainer = ({children}: ContentPageProps) => {
    return <div className="content-page">
        <TextItem className="page-header text-3xl font-bold my-6" fontSize="h1">Masterbase</TextItem>
        {children}
    </div>;
};

export default ContentPageContainer;
