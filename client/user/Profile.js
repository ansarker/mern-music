import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import auth from '../auth/auth-helper'
import { read } from './api-user'
import { Link } from 'react-router-dom'
import DeleteUser from './DeleteUser'
import { listByUser } from '../media/api-media'
import MediaList from '../media/MediaList'


const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        maxWidth: '80%',
        margin: 'auto',
        padding: theme.spacing(3),
        marginTop: theme.spacing(5)
    }),
    title: {
        marginTop: theme.spacing(3),
        color: theme.palette.protectedTitle
    },
    avatar: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.light
    }
}))

export default function Profile({ match }) {
    const classes = useStyles()
    const [user, setUser] = useState({})
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const jwt = auth.isAuthenticated()
    const [media, setMedia] = useState([])

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        read({
            userId: match.params.userId
        }, { t: jwt.token }, signal).then((data) => {
            if (data && data.error) {
                setRedirectToSignin(true)
            } else {
                setUser(data)
            }
        })

        return function cleanup() {
            abortController.abort()
        }
    }, [match.params.userId])

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        listByUser({ 
            userId: match.params.userId 
        }, { t: jwt.token }, signal).then((data) => {
            if (data && data.error) {
                setRedirectToSignin(true)
            } else {
                setMedia(data)
            }
        })
    }, [match.params.userId])

    if (redirectToSignin) {
        return <Redirect to="/signin" />
    }

    return (
        <Paper className={classes.root}>
            <Typography variant="h6" className={classes.title}>
                Profile
            </Typography>
            <List dense>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar className={classes.avatar}>
                            {user.name && user.name[0]}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.name} secondary={user.email} />
                    {
                        auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id &&
                        (
                            <ListItemSecondaryAction>
                                <Link to={"/user/edit/" + user._id}>
                                    <IconButton aria-label="Edit" color="inherit">
                                        <Edit />
                                    </IconButton>
                                </Link>
                                <DeleteUser userId={user._id} />
                            </ListItemSecondaryAction>
                        )
                    }
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary={"Joined: " + (new Date(user.created)).toDateString()} />
                </ListItem>
            </List>
            <MediaList media={media} />
        </Paper>
    )
}
