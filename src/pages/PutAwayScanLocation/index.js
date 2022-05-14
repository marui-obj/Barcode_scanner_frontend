import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import { Link, useLocation } from "react-router-dom";
import BackButton from "../../components/Back-button";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

const PutAwayScanLocation = (state) => {
    const [camera, setCamera] = useState(false);
    const [location, setLocation] = useState('');
    const location_router = useLocation();

    useEffect(() => {
        if (location === '') return;
        var htmlcontent = '' ;
        const products = location_router.state.resultList;
        products.forEach(res => {
            htmlcontent += `<div style="background-color: #C4C4C4; margin-top: 5px; margin-bottom: 5px" >
                            <div> id: ${res.id} </div>
                            <div> name: ${res.name} </div>
                            </div>`
            console.log(htmlcontent);
        });

        Swal.fire({  
            title: `<strong>All of this product will be save into ${location}</strong>`,
            html:
                htmlcontent,
            confirmButtonColor: '#5AB54B',
            cancelButtonColor: '#ED7B7B',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancle',
            reverseButtons: true
        })
        .then(res => {
            if(res.isConfirmed){
                const payload = products.map((product) => {
                    return{
                        id: product.id
                    }
                });
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                };
                return fetch(`http://127.0.0.1:8000/products/location/${location}`, requestOptions)
            }
        })
        .then(res => {
            if(!res.ok) throw new Error(res.statusText);
            return Swal.fire('Saved!', '', 'success')
        })
        .then(res => {
            if(res.isConfirmed || res.isDismissed) window.location = "/";
        })
        .catch(err => {
            console.log(err);
        })

    }, [location]);

    

    const handleResult = (result, error) => {
        if(error) return console.log(error);
        if(result){
            setCamera(false)
            setLocation(result)
        }
    }

    return ( 
        <>
            <div className='header' style={{display: "flex"}}>
                <Link to="/put-away">
                    <BackButton/>
                </Link>
                <span style={{alignSelf: "center"}}>Scan location put away</span>
            </div>
            <div>{console.log(location_router.state)}</div>
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
        </>
     );
}
 
export default PutAwayScanLocation;