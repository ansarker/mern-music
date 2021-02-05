import React, { useState } from 'react'
import { Button, Card, CardActions, CardContent, Divider, Icon, makeStyles, TextField, Typography } from '@material-ui/core'
import AddToQueueOutlined from '@material-ui/icons/AddToQueueOutlined';
import auth from './../auth/auth-helper'
import { Redirect } from 'react-router-dom';
import { create } from './api-media';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    error: {
        verticalAlign: 'middle'
    },
    textField: {
        width: 300,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    input: {
        display: 'none'
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    },
    filename: {
        marginLeft:'10px'
    }
}))

export default function NewMedia() {
    const classes = useStyles()
    const [values, setValues] = useState({
        title: '',
        description: '',
        audio: '',
        genre: '',
        error: '',
        redirect: false,
        mediaId: ''
    })

    const jwt = auth.isAuthenticated()

    const clickSubmit = () => {
        let mediaData = new FormData()
        values.title && mediaData.append('title', values.title)
        values.description && mediaData.append('description', values.description)
        values.audio && mediaData.append('audio', values.audio)
        values.genre && mediaData.append('genre', values.genre)

        create(
            { userId: jwt.user._id },
            { t: jwt.token }, 
            mediaData).then((data) => {
                if (data.error) {
                    setValues({...values, error: data.error})
                } else {
                    setValues({...values, error: '', mediaId: data._id, redirect: true})
                }
            })
    }

    const handleChange = name => event => {
        const value = name === 'audio'
            ? event.target.files[0]
            : event.target.value
        setValues({ ...values, [name]: value })
    }

    if (values.redirect) {
        return <Redirect to={"/media/" + values.mediaId} />
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography component="h6" variant="h6">New Media</Typography>
                <Divider style={{ marginBottom: '16px' }} />
                <input accept="audio/*" onChange={handleChange('audio')} type="file" className={classes.input} id="icon-button-file" />
                <label htmlFor="icon-button-file">
                    <Button color="secondary" variant="contained" component="span">
                        Upload
                        <AddToQueueOutlined />
                    </Button>
                </label>
                <br/>
                <span className={classes.filename}>{values.audio ? values.audio.name : ''}</span>
                <br />
                <TextField id="title" label="title" className={classes.textField} value={values.title} onChange={handleChange('title')} /><br />
                <TextField
                    id="multiline-flexible"
                    label="description"
                    multiline
                    rows="3"
                    value={values.description}
                    className={classes.textField}
                    onChange={handleChange('description')}
                /><br />
                <TextField id="genre" label="genre" onChange={handleChange('genre')} value={values.genre} className={classes.textField} /><br />
                {
                    values.error && (
                        <Typography component="p" color="error">
                            <Icon color="error" className={classes.error}>{values.error}</Icon>
                        </Typography> )
                }
            </CardContent>
            <CardActions>
                <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Add</Button>
            </CardActions>
        </Card>
    )
}
