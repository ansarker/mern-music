import React, { useRef, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import SkipNextIcon from '@material-ui/icons/SkipNext'

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeDown from '@material-ui/icons/VolumeDown'

import albumart from '../../client/assets/images/album/album1.jpg'
import useAudio from './useAudio';
// import ReactPlayer from 'react-player';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        background: '#555555',
        padding: theme.spacing(2)
    },
    root1: {
        width: '400px',
        padding: theme.spacing(2),
        margin: 'auto',
        display: 'flex',
        background: '#f2f2f2',
        flexDirection: 'column'
    },
    media: {
        margin: theme.spacing(1),
        height: '180px',
        width: '180px',
        borderRadius: '9px',
        boxShadow: '8px 9px 15px 1px rgba(0, 0, 0, 0.4)'
    },
    details: {
        display: 'flex',
    },
    content: {
        margin: 'auto auto',
        textTransform: 'uppercase',
        letterSpacing: '0.6rem',
        fontWeight: '400'
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        justifyContent: 'center'
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    volumeSlider: {
        margin: `${theme.spacing(4)} auto`
    },
    audio: {
        display: 'none'
    }
}));

export default function MediaPlayer(props) {
    console.log(props)
    const classes = useStyles();
    const [playing, setPlaying] = useState(false)
    const [volume, setVolume] = useState(0.6)
    const [muted, setMuted] = useState(false)
    const [duration, setDuration] = useState(0)
    const [seeking, setSeeking] = useState(false)
    const [playbackRate, setPlaybackRate] = useState(1.0)
    const [loop, setLoop] = useState(false)
    let audioPlayer = useRef()
    const player = audioPlayer.current

    const [values, setValues] = useState({
        played: 0,
        loaded: 0,
        ended: false
    })
    const [fav, setFav] = useState(false)
    const [progress, setProgress] = useState(0);



    const addToFav = () => {
        if (fav) {
            setFav(false)
        } else {
            setFav(true)
        }
    }

    const playPause = () => {
        // setPlaying(!playing)
        if (playing) {
            audioPlayer.pause()
            setPlaying(false)
        } else {
            audioPlayer.play()
            setPlaying(true)
        }
    }

    const changeVolume = e => {
        setVolume(parseFloat(e.target.value))
    }

    const onLoop = () => {
        setLoop(!loop)
    }

    const onProgress = (progress) => {
        if (!seeking) {
            setValues({ ...values, played: progress.played, loaded: progress.loaded })
        }
    }

    const onEnded = () => {
        if (loop) {
            setPlaying(true)
        } else {
            props.handleAutoplay(() => {
                setValues({ ...values, ended: true })
                setPlaying(false)
            })
        }
    }

    const onDuration = (duration) => {
        setDuration(duration)
    }

    const onSeekChange = e => {
        setValues({ ...values, played: parseFloat(e.target.value), ended: parseFloat(e.target.value) >= 1 })
    }

    const onSeekMouseUp = e => {
        setSeeking(false)
        audioPlayer.seekTo(parseFloat(e.target.value))
    }

    const ref = player => {
        audioPlayer = player
    }

    const format = (seconds) => {
        const date = new Date(seconds * 1000)
        const hh = date.getUTCHours()
        let mm = date.getUTCMinutes()
        const ss = ('0' + date.getUTCSeconds()).slice(-2)
        if (hh) {
            mm = ('0' + date.getUTCMinutes()).slice(-2)
            return `${hh}:${mm}:${ss}`
        }
        return `${mm}:${ss}`
    }

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setProgress((oldProgress) => {
    //             if (oldProgress === 100) {
    //                 return 0;
    //             }
    //             const diff = Math.random() * 10;
    //             return Math.min(oldProgress + diff, 100);
    //         });
    //     }, 500);

    //     return () => {
    //         clearInterval(timer);
    //     };
    // }, []);

    return (
        <Card className={classes.root}>
            {/* <ReactPlayer 
                ref={ref}
                url={props.srcUrl}
                playing={playing}
                loop={loop}
                playbackRate={playbackRate}
                volume={volume}
                muted={muted}
                onEnded={onEnded}
                onProgress={onProgress}
                onDuration={onDuration}
            /> */}
            <audio
                style={{ display: 'none' }}
                ref={ref}
                // ref={audio => audioPlayer = audio}
                // onLoadedMetadata={handleMetadata}
                src={`http://localhost:3000${props.srcUrl}`}
            />
            <div className={classes.root1}>
                <Card>
                    <div className={classes.details}>
                        <CardMedia
                            className={classes.media}
                            image={albumart}
                            title="Contemplative Reptile"
                        />
                        <CardContent className={classes.content}>
                            <Typography variant="h5" color="primary" component="h1">Genre</Typography>
                        </CardContent>
                    </div>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">Aha Aji Basante</Typography>
                        <Typography variant="body2" color="textSecondary" component="p">Sahana Bajpaie</Typography>
                    </CardContent>
                </Card>
                <div className={classes.controls}>
                    <IconButton aria-label="previous">
                        <SkipPreviousIcon />
                    </IconButton>
                    <IconButton aria-label="play/pause" onClick={playPause}>
                        {!playing
                            ? <PlayCircleFilledIcon className={classes.playIcon} />
                            : <PauseCircleFilledIcon className={classes.playIcon} />
                        }
                    </IconButton>
                    <IconButton aria-label="next">
                        <SkipNextIcon />
                    </IconButton>
                </div>
                <div>
                    <LinearProgressWithLabel value={progress} />
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            {
                                volume > 0 ? <VolumeUp /> : <VolumeDown />
                            }
                        </Grid>
                        <Grid item xs>
                            <Slider
                                min={0}
                                max={1}
                                value={muted ? 0 : volume}
                                onChange={changeVolume}
                                aria-labelledby="input-slider"
                            />
                        </Grid>
                    </Grid>
                </div>
                <BottomNavigation>
                    <BottomNavigationAction
                        icon={<ShuffleIcon />}
                    />
                    <BottomNavigationAction
                        icon={<RepeatIcon />}
                    />
                    <BottomNavigationAction
                        onClick={addToFav}
                        icon={fav ? <FavoriteBorderIcon /> : <FavoriteIcon />}
                    />
                    <BottomNavigationAction
                        icon={<ShuffleIcon />}
                    />
                </BottomNavigation>
            </div>
        </Card>
    );
}


function LinearProgressWithLabel(props) {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" textAlign="center" alignContent="center" alignItems="center">
                <Typography variant="body2" color="textSecondary">
                    {`${Math.round(props.value,)}%`}/ {100}
                </Typography>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            {/* <Box minWidth={35}> */}
            {/* </Box> */}
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

