import BackButton from "../../components/Back-button";
import { Link } from "react-router-dom";
import Scanner from "../../components/Camera-barcode";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { Badge } from '@mui/material';
import Swal from "sweetalert2";

const PutAway = () => {
    const [camera, setCamera] = useState(false);
    const [result, setResult] = useState([]);
    const [resultDb, setResultDb] = useState([]);
    const onDetected = new_result => {
        setCamera(false);
        fetch(`http://127.0.0.1:8000/products/${new_result}`)
        .then(res =>{
            if (res.status !== 200) throw new Error(res.status);
            return res.json();
        })
        .then(data => {
            setResultDb(resultDb => [...resultDb, {id: data._id, name: data.name, status: data.status, location: data.location, received_date: data.received_date, dispatched_date: data.dispatched_date}]);
        })
        .catch(e =>{
            console.log(e);
        });

        setResult(result => [...result, new_result]);
    };
    const handleSubmit = () => {
        console.log(resultDb);
        var htmlcontent = '' ;
        resultDb.forEach(res => {
            htmlcontent += `<div style="background-color: #C4C4C4" >${res.name}</div>`
            console.log(htmlcontent);
        });

        Swal.fire({  
            title: '<strong>Put-away item</strong>',
            html:
                // 'You can use <b>bold text</b>, ' +
                // '<a href="//sweetalert2.github.io">links</a> ' +
                // 'and other HTML tags',
                htmlcontent,
            confirmButtonColor: '#5AB54B',
            cancelButtonColor: '#ED7B7B',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancle',
            reverseButtons: true
            }); 
    };
    return ( 
        <>
            <div style={{display: "flex", position: "relative", flexDirection: "column"}}>
                <Link to="/">
                    <BackButton />
                </Link>
            <div>
                {camera? <Scanner onDetected={onDetected}/> : <div style={{height: "100%", width: "100%", overflow: "hidden", backgroundColor: "gray"}}></div>}
                <div style={{position: "sticky", bottom: "20px", textAlign: "center"}}>
                    <Button onClick={()     => setCamera(!camera)} style={{backgroundColor: "#79C581"}}>
                        {camera ? "Stop Scan" : "Start Scan"}
                    </Button>
                </div>
            </div>
            <div style={{textAlign: "center", margin: "20px"}}>
                <Badge badgeContent={resultDb.length} color={"secondary"}>
                    <Button variant={"outlined"} onClick={handleSubmit}>
                        Submit
                    </Button>
                </Badge>
            </div>
            </div>
        </>
     );
};
 
export default PutAway;