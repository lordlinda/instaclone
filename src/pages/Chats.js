import React, { } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './Chats.css'

export const Chats = () => {

    return (
        <div className='chats'>
            <div className='chats__room'>
                <Link to='/chats/1'>
                    lord
                    </Link>
            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({

})



export default connect(mapStateToProps)(Chats)
