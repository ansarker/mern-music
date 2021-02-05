import { CssBaseline, makeStyles } from '@material-ui/core'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './auth/PrivateRoute'
import Signin from './auth/Signin'
import Header from './core/Header'
import Home from './core/Home'
import SideMenu from './core/SideMenu'
import EditMedia from './media/EditMedia'
import NewMedia from './media/NewMedia'
import PlayerBottom from './media/PlayerBottom'
import PlayMedia from './media/PlayMedia'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import Signup from './user/Signup'

const useStyles = makeStyles({
    appMain: {
        paddingLeft: '200px',
        width: '100%'
    }
})

const MainRouter = ({ data }) => {
    const classes = useStyles()
    return (
        <>
            <SideMenu />
            <div className={classes.appMain}>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/signin" component={Signin} />
                    <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
                    <Route path="/user/:userId" component={Profile} />

                    <PrivateRoute path="/media/new" component={NewMedia} />
                    <PrivateRoute path="/media/edit/:mediaId" component={EditMedia} />
                    <Route path="/media/:mediaId" render={(props) => (
                        <PlayMedia {...props} data={data} />
                    )} />
                </Switch>
                {/* <PlayerBottom /> */}
            </div>
            <CssBaseline />
        </>
    )
}

export default MainRouter