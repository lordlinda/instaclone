import { Button, Dialog, DialogContent, TextField } from '@material-ui/core';
import React, {
    useState
} from 'react'
import { signUpUser, logout } from '../redux/actions/userActions'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
function Signin(props) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: ''
    })
    const { email, password, username } = formData
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.signUpUser(formData, props.history)
        setFormData({
            ...formData,
            username: '',
            email: '',
            password: ''
        })
        setOpen(false);

    }
    const signOut = () => {
        props.logout()
    }
    const { user } = props

    return (
        <div>
            {user ?
                (<Button variant="outlined" color="primary" onClick={signOut}>
                    logout
                </Button>) :
                (<Button variant="outlined" color="primary" onClick={handleOpen}>
                    Signup
                </Button>)

            }
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogContent>
                    <form>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="username"
                            label="Username"
                            type="text"
                            fullWidth
                            value={username}
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={handleChange}
                        />
                        <Button onClick={handleSubmit} color="primary">
                            signUp
          </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.user.user
    }
}

export default compose(connect(mapStateToProps, { signUpUser, logout }), withRouter)(Signin)
