import { Button } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { handleUpload } from '../redux/actions/postActions'
import { connect } from 'react-redux'
import './ImageUpload.css'
import LinearProgress from '@material-ui/core/LinearProgress';

function ImageUpload(props) {
    const [caption, setCaption] = useState('')
    const [progress, setProgress] = useState(0)

    const handleChange = (e) => {
        setCaption(e.target.value)
    }
    const handleUpload = (e) => {
        e.preventDefault()
        const post = {
            image: props.image,
            caption,
            username: props.user.displayName,
            userId: props.user.uid
        }
        props.handleUpload(post)
        setCaption('')
        setProgress(0)

    }
    useEffect(() => {
        setProgress(props.progress)
    }, [props.progress])

    return (
        <div className='imageupload'>
            <LinearProgress variant="determinate" value={progress} />
            <input type='text'
                value={caption}
                placeholder='Enter a caption...'
                onChange={handleChange}
                className='imageUpload__caption' />
            <Button onClick={handleUpload}>
                upload
            </Button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        progress: state.post.progress,
        user: state.user.user

    }
}
export default connect(mapStateToProps, { handleUpload })(ImageUpload)
