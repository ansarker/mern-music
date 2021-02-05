import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import auth from '../auth/auth-helper'
import { remove } from './api-media'

export default function DeleteMedia(props) {
    const [open, setOpen] = useState(false)
    const [redirect, setRedirect] = useState(false)

    // const jwt = auth.isAuthenticated()
    const clickButton = () => {
        setOpen(true)
    }

    const deleteMedia = () => {
        const jwt = auth.isAuthenticated()

        remove({
            mediaId: props.mediaId
        }, {t: jwt.token}).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
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
                <DeleteOutline/>
            </IconButton>

            <Dialog open={open} onClose={handleRequestClose}>
                <DialogTitle>{ "Delete " + props.mediaTitle }</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Confirm to delete <strong>{props.mediaTitle}</strong> from your account?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleRequestClose}>
                        Cancel
                    </Button>
                    <Button color="secondary" variant="contained" autoFocus="autoFocus" onClick={deleteMedia}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </span>
    )
}

DeleteMedia.propTypes = {
    mediaId: PropTypes.string.isRequired,
    mediaTitle: PropTypes.string.isRequired
}