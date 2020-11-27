import React, { useState } from 'react'
import { connect } from 'react-redux'
import './ProfileHeader.css'
import SettingsIcon from '@material-ui/icons/Settings';
import { Button, Dialog, DialogActions, IconButton } from '@material-ui/core';
import { logout } from '../redux/actions/userActions'

const ProfileHeader = (props) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        props.logout()
        setOpen(false);
    };
    return (
        <div>
            <div className='profileHeader'>
                <div>
                    <IconButton onClick={handleClickOpen}>
                        <SettingsIcon fontSize='default' />
                    </IconButton>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="max-width-dialog-title"
                    >
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Logout
                         </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}




export default connect(null, { logout })(ProfileHeader)
