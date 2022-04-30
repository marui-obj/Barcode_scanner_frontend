import IconButton from '@mui/material/IconButton';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';



const BackButton = () => {
    return(
        <div className='back-button'>
            <IconButton>
                <ArrowCircleLeftOutlinedIcon style={{fontSize: "2rem"}}/>
            </IconButton>
        </div>
    );
};

export default BackButton;