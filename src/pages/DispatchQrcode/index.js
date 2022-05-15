import React, { useState, useEffect } from 'react';
import BackButton from "../../components/Back-button";
import { QrReader } from 'react-qr-reader';
import { Link, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

const DispatchQrcode = (state) => {
    const [camera, setCamera] = useState(false);
    const [value, setValue] = useState('');
    const location_router = useLocation();

    const productMap = (object) => {
        return{
            id: object._id,
            name: object.name
        }
    }
    const taskMap = (object) => {
        return{
            task_id: object._id
        }
    }
    const { id, name } = productMap(location_router.state.product);

    const redirect_path = `/dispatch`

    useEffect(() => {
        if(value === '') return;
        console.log(value);
        var htmlcontent = '' ;
        htmlcontent = `<div style="background-color: #C4C4C4; margin-top: 5px; margin-bottom: 5px" >
                            <div> id: ${id} </div>
                            <div> name: ${name} </div>
                            </div>`
        Swal.fire({  
            title: `<strong>Are you sure to dispatch this item?</strong>`,
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
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' }
                };
                return fetch(`${process.env.REACT_APP_DATABASE_API}/tasks/${value._id}`, requestOptions);
            }
        })
        .then(res => {
            if(!res.ok) throw new Error(res.statusText);
            return Swal.fire('Saved!', '', 'success')
        })
        .then(res => {
            if(res.isConfirmed || res.isDismissed) window.location = "/";
        })
    }, [value]);
    

    const handleResult = (result, error) => {
        if(error) return console.log(error);
        if(result){
            if(result){
                fetch(`${process.env.REACT_APP_DATABASE_API}/products/${result.text}`)
                .then(res =>{
                    if (res.status !== 200) throw new Error(res.status);
                    return res.json();
                })
                .then(data => {
                    setCamera(false);
                    
                    if (data._id !== id) throw new Error(`${id} !== ${data}`)
                    setValue(data);
                })
                .catch(e =>{
                    return console.log(e);
                });
            }
        }
    }

    return ( 
        <>
            <div className='header' style={{display: "flex"}}>
                <Link to={redirect_path}>
                    <BackButton/>
                </Link>
                <span style={{alignSelf: "center"}}>Dispatch scan</span>
            </div>
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
        </>
     );
}
 
export default DispatchQrcode;