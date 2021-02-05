import { GridList, GridListTile, GridListTileBar, makeStyles } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        background: theme.palette.background.paper,
        textAlign: 'left',
        padding: '8px 16px'
    },
    gridList: {
        width: '100%',
        minHeight: 180,
        padding: '0px 10px'
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle,
        width: '100%'
    },
    tile: {
        textAlign: 'center',
        maxHeight: '100%'
    },
    tileBar: {
        backgroundColor: 'rgba(0, 0, 0, 0.72)',
        textAlign: 'left',
        height: '55px'
    },
    tileTitle: {
        fontSize: '1.1em',
        marginBottom: '5px',
        color: 'rgb(193, 173, 144)',
        display: "block"
    },
    tileGenre: {
        float: 'right',
        color: 'rgb(193, 182, 164)',
        marginRight: '8px'
    }
}))

export default function MediaList(props) {
    const classes = useStyles()

    return (
        // <div>
            <GridList cols={6} className={classes.gridList}>
                {props.media.map((tile, i) => (
                    <GridListTile key={i} >
                        <Link to={"/media/" + tile._id}>
                            {/* <ReactPlayer 
                                url={"/api/media/song/" + tile._id} 
                                width="100%" 
                                height="inherit"
                                style={{ maxHeight: '100%' }} 
                            /> */}
                        </Link>
                        <GridListTileBar
                            title={<Link to={"/media/" + tile._id} className={classes.tileTitle}> {tile.title} </Link>}
                            subtitle={
                                <span>
                                    {/* <span>{tile.views} views</span> */}
                                    <span className={classes.tileGenre}>
                                        <em>{tile.genre}</em>
                                    </span>
                                </span>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        // </div>
    )
}

MediaList.propTypes = {
    media: PropTypes.array.isRequired
}