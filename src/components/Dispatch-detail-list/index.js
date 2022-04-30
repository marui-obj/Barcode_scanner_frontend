import { Button } from "@mui/material";
const DispatchDetailList = ({products}) => {
    return ( 
        <div>
            {products.map((product) => (
                <div className="dispatch-detail-list" style={{margin: "10px"}} key={product._id}>
                <Button style={{flexDirection: 'column', backgroundColor: "#C4C4C4", alignItems: "flex-start", width: "100%"}}>
                    <div style={{display: "block"}}>Name: {product.name} </div>
                    <div style={{display: "block"}}>Location Room: {product.location}</div>
                </Button>
                </div>
            ))}
        </div>
     );
}
 
export default DispatchDetailList;