import React, { } from 'react'
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { IconButton } from '@material-ui/core';
import './ChatHeader.css'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'

const ChatHeader = (props) => {
    return (
        <div className='chatHeader'>
            <IconButton>
                <Link to='/feed'>
                    <ArrowBackIosOutlinedIcon fontSize='small' />
                </Link>
            </IconButton>
            <div className='chatHeader__info'>
                <p>{props.match.params.username}</p>
            </div>
        </div>
    )
}





export default withRouter(ChatHeader)
