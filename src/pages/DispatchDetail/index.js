import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../components/Back-button";
import DispatchDetailList from "../../components/Dispatch-detail-list";
import { useParams } from "react-router-dom";

const DispatchDetail = () => {
    const [lists, setLists] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        fetch(`${process.env.REACT_APP_DATABASE_API}/tasks/` + id)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setLists(data);
        });
    });
    return ( 
        <div className="dispatch-detail">
            <div style={{display: "flex"}}>
                <Link to="/dispatch">
                    <BackButton />
                </Link>
            </div>
            {lists && <DispatchDetailList products={lists} />}
        </div>
     );
}
 
export default DispatchDetail;