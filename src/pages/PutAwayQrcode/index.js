import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../../components/Back-button";
import { Button } from "@mui/material";
import { Badge } from '@mui/material';
import Swal from "sweetalert2";

const PutAwayQrcode = () => {
    const [camera, setCamera] = useState(false);
    const [resultList, setResultList] = useState([]);
    let navigate = useNavigate();

    const handleResult = (result, error) => {
        if(error) console.log(error);
        if(result){
            fetch(`${process.env.REACT_APP_DATABASE_API}/products/${result.text}`)
            .then(res =>{
                if (res.status !== 200) throw new Error(res.status);
                return res.json();
            })
            .then(data => {
                setCamera(false);
                if (thisProductExist(data)) throw new Error("This product already scan")
                setResultList(resultList => [...resultList, {id: data._id, name: data.name}]);
            })
            .catch(e =>{
                return console.log(e);
            });
        }
    }
    const handleSubmit = () => {
        if(resultList.length === 0) return;
        var htmlcontent = '' ;
        resultList.forEach(res => {
            htmlcontent += `<div style="background-color: #C4C4C4; margin-top: 5px; margin-bottom: 5px" >
                            <div> id: ${res.id} </div>
                            <div> name: ${res.name} </div>
                            </div>`
            console.log(htmlcontent);
        });

        

        Swal.fire({  
            title: '<strong>Put-away item</strong>',
            html:
                htmlcontent,
            confirmButtonColor: '#5AB54B',
            cancelButtonColor: '#ED7B7B',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancle',
            reverseButtons: true
            })
            .then((res) => {
                if(res.isConfirmed){
                    navigate( '/put-away/scan-location', { state: { resultList } } )
                }
            });
    };

    const thisProductExist = (product) => {
        // Check if product already scan
        for(var i=0; i<resultList.length; i++){
            console.log(resultList[i].id);
            if (resultList[i].id === product._id) return true; 
        }
        return false;
    }

  return (
    <div>
        <Link to="/">
            <BackButton/>
        </Link>
        {camera? <QrReader
            onResult={(result, error) => {
                handleResult(result, error);
            }}
            scanDelay={1000}
            constraints={{"facingMode": 'environment'}}
            
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