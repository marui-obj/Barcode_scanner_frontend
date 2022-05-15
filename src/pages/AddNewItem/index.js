import { Select } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import BackButton from "../../components/Back-button";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AddNewItem = () => {
    const [data, setData] = useState('');
    const [count, setCount] = useState(0);

    const handleChange = (event) => {
        setData(event.target.value);
    }

    const handleIncrement = () => {
        setCount(count => count + 1)
    }

    const handleDecrement = () => {
        if(!count) return
        setCount(count => count - 1)
    }

    const handleSubmit = () =>{
        if(data === '') return
        var htmlcontent = '' ;
        htmlcontent = `<div>name: ${data}</div>`+
                        `<div>count: ${count} </div>`
        Swal.fire({  
            title: '<strong>Add new item</strong>',
            html: htmlcontent,
            confirmButtonColor: '#5AB54B',
            cancelButtonColor: '#ED7B7B',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancle',
            reverseButtons: true,
            })
            .then((result) => {
                if(result.isConfirmed){
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name: data})
                    };
                    return fetch(`${process.env.REACT_APP_DATABASE_API}/products/${count}`, requestOptions)
                }
            })
            .then(res => {
                if(!res.ok) throw new Error(res.statusText);
                return Swal.fire('Saved!', '', 'success')
            })
            .then(res => {
                if(res.isConfirmed || res.isDismissed) window.location = "/";
            })
    }

    return (
        <>
            <Link to="/">
                <BackButton/>
            </Link>
            <div style={{textAlign: 'center'}}>
                <FormControl sx={{width: '100%'}}>
                <InputLabel id="demo-simple-select-autowidth-label">Add-item</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={data}
                        onChange={handleChange}
                        autoWidth
                        label="Add-item"
                        >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        <MenuItem value={'30-MA579 215-70R15 8PR'}>30-MA579 215-70R15 8PR</MenuItem>
                        <MenuItem value={'30-MA579 195R14C 8PR'}>30-MA579 195R14C 8PR</MenuItem>
                        <MenuItem value={'30-MA579 205-70R15 8PR'}>30-MA579 205-70R15 8PR</MenuItem>
                        <MenuItem value={'40-AT700 P245-70R16 111S'}>40-AT700 P245-70R16 111S</MenuItem>
                        <MenuItem value={'50-MAP3 185-60R15 88H'}>50-MAP3 185-60R15 88H</MenuItem>
                    </Select>
                </FormControl>
                <ButtonGroup size="small" aria-label="small outlined button group">
                    <Button onClick={handleDecrement}>-</Button>
                    <Button disabled>{count}</Button>
                    <Button onClick={handleIncrement}>+</Button>
                </ButtonGroup>
                <div style={{position: 'fixed', bottom: '0', width:'100%', justifyContent: 'center'}}>
                    <Button variant={"outlined"} onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>
            </div>
        </>
    );
}
 
export default AddNewItem;