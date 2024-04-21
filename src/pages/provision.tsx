import Button from "../components/Button/Button.tsx";
import {provisionUrl} from "../api";

function Provision() {
    return <Button>
        <a href={provisionUrl()} target="_self" style={{textDecoration: 'none', color: 'inherit'}}>
            Provision
        </a>
    </Button>
}

export default Provision;
