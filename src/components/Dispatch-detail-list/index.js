import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
const DispatchDetailList = ({products}) => {
    const location_router = useLocation();
    const task = location_router.state.task
    return ( 
        <div>
            {products.map((product) => (
                <div className="dispatch-detail-list" style={{margin: "10px"}} key={product._id}>
                <Link to={'/dispatch/scan'} state={{product, task}} style={{ textDecoration: 'none' }}>
                    <Button style={{flexDirection: 'column', backgroundColor: "#C4C4C4", alignItems: "flex-start", width: "100%"}}>
                        <div style={{display: "block"}}>Name: {product.name} </div>
                        <div style={{display: "block"}}>Location Room: {product.location}</div>
                    </Button>
                </Link>
                </div>
            ))}
        </div>
     );
}
 
export default DispatchDetailList;