import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import auth from '../auth/auth-helper'
import { remove } from './api-user'

export default function DeleteUser(props) {
    const [open, setOpen] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const jwt = auth.isAuthenticated()
    const clickButton = () => {
        setOpen(true)
    }

    const deleteAccount = () => {
        remove({
            userId: props.userId
        }, {t: jwt.token}).then((data) => {
            if(data && data.error) {
                console.log(data.error)
            } else {
                auth.clearJWT(() => console.log('deleted'))
                setRedirect(true)
            }
        })
    }

    const handleRequestClose = () => {
        setOpen(false)
    }

    if (redirect) {
        return <Redirect to="/" />
    }

    return (
        <span>
            <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
                <Delete />
            </IconButton>

            <Dialog open={open} onClose={handleRequestClose}>
                <DialogTitle>{"Delete Account"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Confirm to delete your account.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <ButtonGroup>
                        <Button color="secondary" variant="contained" onClick={handleRequestClose}>Cancel</Button>
                        <Button color="secondary" variant="contained" onClick={deleteAccount}>Confirm</Button>
                    </ButtonGroup>
                </DialogActions>
            </Dialog>
        </span>
    )
}

