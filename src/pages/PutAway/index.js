import BackButton from "../../components/Back-button";
import { Link } from "react-router-dom";
import Scanner from "../../components/Camera";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { Badge } from '@mui/material';

const PutAway = () => {
    const [camera, setCamera] = useState(false);
    const [result, setResult] = useState([]);
    const onDetected = new_result => {
        setCamera(false);
        setResult(result => [...result, new_result]);
    };
    return ( 
        <>
            <div style={{display: "flex", position: "relative", flexDirection: "column"}}>
                <Link to="/">
                    <BackButton />
                </Link>
            <div style={{zIndex: "-1"}}>
                {camera? <Scanner onDetected={onDetected}/> : <div style={{height: "100%", width: "100%", overflow: "hidden", backgroundColor: "gray"}}></div>}
            </div>
            <div style={{position: "sticky", bottom: "0", textAlign: "center"}}>
                <Button onClick={()     => setCamera(!camera)} style={{backgroundColor: "#79C581"}}>
                    {camera ? "Stop Scan" : "Start Scan"}
                </Button>
            </div>
            <div style={{textAlign: "center", margin: "20px"}}>
                <Badge badgeContent={4} color={"secondary"}>
                    <Button variant={"outlined"}>
                        Todo
                    </Button>
                </Badge>
            </div>
            </div>
        </>
     );
};
 
export default PutAway;