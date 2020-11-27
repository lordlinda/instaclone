
import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import ImageUpload from '../components/ImageUpload'
import CloseIcon from '@material-ui/icons/Close';
import './CreatePost.css'
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom'
function CreatePost(props) {
    useEffect(() => {
        if (props.location.state) {
            var reader = new FileReader();
            reader.onload = function () {
                var dataURL = reader.result;
                var output = document.getElementById('output');
                output.src = dataURL;
            };
            reader.readAsDataURL(props.location.state);
        }
    }, [])
    return (
        <div className='createPost'>
            <div>
                <IconButton>
                    <Link to='/feed'>
                        <CloseIcon />
                    </Link>
                </IconButton>
            </div>
            <img id='output' className='createPost__image' />

            <ImageUpload image={props.location.state} />
        </div>
    )
}

export default withRouter(CreatePost)
