import { Button, Dialog, DialogContent, TextField } from '@material-ui/core';
import React, {
    useState
} from 'react'
import { signIn } from '../redux/actions/userActions'
import { connect } from 'react-redux'
import Signup from '../components/Signup'
import './login.css'
function Signin(props) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData
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
        props.signIn(formData, props.history)
        setFormData({
            ...formData,
            username: '',
            email: '',
            password: ''
        })
        setOpen(false);

    }



    return (
        <div className='login'>
            <div className='login__Container'>
                <Button variant="outlined" color="primary" onClick={handleOpen}>
                    Signin
                </Button>
                <Signup />
            </div>


            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogContent>
                    <form>
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
                            signin
          </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}


export default connect(null, { signIn })(Signin)
