import Button from '@mui/material/Button';


const MainButton = (props) => {
    return ( 
        <div className='main-button' style={{margin: "10px 80px"}}>
            <Button style={{ fontSize: '50px', flexDirection: 'column',  color: 'black', background: "#D7D1D1", padding: "20 20", width: "100%", height: "100%"}}>
                {props.icon}    
                <p style={{fontSize: 20}}>{props.title}</p>
            </Button>
        </div>
    );
};
 
export default MainButton;