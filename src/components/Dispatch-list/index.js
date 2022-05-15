import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
const DispatchList = ({tasks}) => {
    return (
        <div>
            {tasks.map((task) => (
                <div className="dispatch-list" style={{margin: "10px"}} key={task._id}>
                    <Link to={'/dispatch/' + task._id} style={{ textDecoration: 'none' }} state={{task}}>
                        <Button style={{flexDirection: 'column', backgroundColor: "#C4C4C4", alignItems: "flex-start", width: "100%"}}>
                            <div style={{display: "block"}}>id: {task._id} </div>
                            <div style={{display: "block"}}>Due date: {task.due_date}</div>
                            <div style={{display: "block", alignSelf: "flex-end"}}>item list {task.product_list.length}</div>
                        </Button>
                    </Link>
                </div>
            ))}
        </div>
     );
};
 
export default DispatchList;