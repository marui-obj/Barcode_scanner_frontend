import MainButton from "../../components/Menu-button";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Link } from "react-router-dom";

import './index.css'



const Menu = () => {
    return (
        <div className="menu">
            <Link to="/add-item" style={{ textDecoration: 'none' }}>
                <MainButton title="Add new item" icon={<AddCircleOutlineOutlinedIcon className="Menu-icon"/>}/>
            </Link>

            <Link to="/put-away" style={{ textDecoration: 'none' }}>
                <MainButton title="Put-away" icon={<InventoryIcon className="Menu-icon"/>} />
            </Link>
            
            <Link to="/dispatch" style={{ textDecoration: 'none' }}>
                <MainButton title="Dispatch" icon={<LocalShippingIcon className="Menu-icon"/>} />
            </Link>
        </div>
    );
  };
  
  export default Menu;