import React, { useEffect, useState } from "react";
import BackButton from "../../components/Back-button";
import DispatchList from "../../components/Dispatch-list";
import { Link } from "react-router-dom";
const DispatchIndex = () => {
    const [lists, setLists] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/tasks')
        .then(res => {
            return res.json();
        })
        .then(data => {
            setLists(data);
        });
    });
    return ( 
        <div className="dispatch-index">
            <div style={{display: "flex"}}>
                <Link to="/">
                    <BackButton />
                </Link>
            </div>
            {lists && <DispatchList tasks={lists} />}
        </div>
     );
};
 
export default DispatchIndex;