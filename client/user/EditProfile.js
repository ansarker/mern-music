import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import auth from './../auth/auth-helper'
import { read, update } from './api-user.js'
import { Redirect } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Avatar, Divider } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    title: {
        margin: theme.spacing(2),
        color: theme.palette.protectedTitle
    },
    error: {
        verticalAlign: 'middle'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    },
    input: {
        display: 'none',
    },
}))

export default function EditProfile({ match }) {
    const classes = useStyles()
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        photo: '',
        open: false,
        error: '',
        redirectToProfile: false,
        id: ''
    })
    const jwt = auth.isAuthenticated()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        read({
            userId: match.params.userId
        }, { t: jwt.token }, signal).then((data) => {
            if (data && data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, id: data._id, name: data.name, email: data.email })
            }
        })
        return function cleanup() {
            abortController.abort()
        }

    }, [match.params.userId])

    // const clickSubmit = () => {
    //     const user = {
    //         name: values.name || undefined,
    //         email: values.email || undefined,
    //         password: values.password || undefined
    //     }
    //     update({
    //         userId: match.params.userId
    //     }, {
    //         t: jwt.token
    //     }, user).then((data) => {
    //         if (data && data.error) {
    //             setValues({ ...values, error: data.error })
    //         } else {
    //             setValues({ ...values, userId: data._id, redirectToProfile: true })
    //         }
    //     })
    // }

    const clickSubmit = () => {
        let userData = new FormData()
        values.name && userData.append('name', values.name)
        values.email && userData.append('email', values.email)
        values.password && userData.append('password', values.password)
        values.photo && userData.append('photo', values.photo)

        update({
            userId: match.params.userId
        }, {
            t: jwt.token
        }, userData).then((data) => {
            if (data && data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, 'redirectToProfile': true })
            }
        })
    }

    const handleChange = name => event => {
        const value = name === 'photo'
            ? event.target.files[0]
            : event.target.value
        setValues({ ...values, [name]: value })
    }

    const photoUrl = values.id
        ? `/api/users/photo/${values.id}?${new Date().getTime()}`
        : '/api/users/defaultphoto'

    if (values.redirectToProfile) {
        return (<Redirect to={'/user/' + values.id} />)
    }
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h6" className={classes.title}>Edit Profile</Typography>
                <Divider />
                <div className={classes.root}>
                    <Avatar
                        style={{ width: '140px', height: '140px', margin: '5px auto' }}
                        variant="rounded"
                        alt="Profile Picture"
                        src={photoUrl}
                    />
                    <input accept="image/*" onChange={handleChange('photo')} className={classes.input} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                </div>
                <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal" /><br />
                <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal" /><br />
                <TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal" />
                <br /> {
                    values.error && (<Typography component="p" color="error">
                        <Icon color="error" className={classes.error}>error</Icon>
                        {values.error}
                    </Typography>)
                }
            </CardContent>
            <CardActions>
                <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
            </CardActions>
        </Card>
    )
}