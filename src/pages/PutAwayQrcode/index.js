import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Link } from "react-router-dom";
import BackButton from "../../components/Back-button";
import { Button } from "@mui/material";
import { Badge } from '@mui/material';
import Swal from "sweetalert2";

const PutAwayQrcode = () => {
    const [camera, setCamera] = useState(false);
    const [resultList, setResultList] = useState([]);

    const handleResult = (result, error) => {
        if(error) console.log(error);
        if(result){
            fetch(`http://127.0.0.1:8000/products/${result.text}`)
            .then(res =>{
                if (res.status !== 200) throw new Error(res.status);
                return res.json();
            })
            .then(data => {
                setCamera(false);
                setResultList(resultList => [...resultList, {id: data._id, name: data.name, status: data.status, location: data.location, received_date: data.received_date, dispatched_date: data.dispatched_date}]);
            })
            .catch(e =>{
                console.log(e);
            });
        }
    }
    const handleSubmit = () => {
        console.log(resultList);
        var htmlcontent = '' ;
        resultList.forEach(res => {
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
    <div>
        <Link to="/">
            <BackButton/>
        </Link>
        <span>QR Scanner</span>
        {camera? <QrReader
            onResult={(result, error) => {
                handleResult(result, error);
            }}
            scanDelay={1000}
            
        /> : false}
        <div style={{position: "sticky", bottom: "20px", textAlign: "center"}}>
            <Button onClick={()     => setCamera(!camera)} style={{backgroundColor: "#79C581"}}>
                {camera ? "Stop Scan" : "Start Scan"}
            </Button>
        </div>
        <div style={{textAlign: "center", margin: "20px"}}>
                <Badge badgeContent={resultList.length} color={"secondary"}>
                    <Button variant={"outlined"} onClick={handleSubmit}>
                        Submit
                    </Button>
                </Badge>
            </div>
    </div>
  );
};

export default PutAwayQrcode;