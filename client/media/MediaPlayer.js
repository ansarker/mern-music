import React, { useRef, useState, useEffect, createElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress';
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
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme, z) => ({
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
        borderRadius: '4px',
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
        WebkitAppearance: "none",
        appearance: "none",
        margin: "0",
        marginTop: "-8px",
        width: "100%",
        height: "2px",
        background: "rgb(180, 234, 245)",
        outline: "none",
        WebkitTransition: ".2s",
        opacity: "0.7",
        transition: "opacity .2s",
        "&:hover": {
            opacity: 1
        },
        "&::-webkit-progress-value": {
            background: "#3bc8e7"
        },
        "&::-moz-range-progress": {
            background: "#3bc8e7"
        },
        "&::-webkit-slider-thumb": {
            WebkitAppearance: "none",
            appearance: "none",
            width: "14px",
            height: "14px",
            borderRadius: '50%',
            border: '2px solid #3bc8e7',
            background: "#ffffff",
            cursor: "pointer"
        },
        "&::-moz-range-thumb": {
            width: "14px",
            height: "14px",
            borderRadius: '50%',
            border: '2px solid #3bc8e7',
            background: "#ffffff",
            cursor: "pointer"
        }
    },
    audio: {
        display: 'none'
    },
    progress: {
        position: 'relative',
        width: '100%',
        top: '-15px',
        padding: '0 4px'
    },
    left: {
        float: 'left'
    },
    right: {
        float: 'right'
    },
    rangeRoot: {
        position: 'relative',
        width: '100%',
        margin: '0',
        top: '-10px',
        zIndex: '3456',
        border: 'none',
        outline: 'none',
        '-webkit-appearance': 'none',
        backgroundColor: 'rgba(0,0,0,0)',
        '&::-webkit-slider-thumb': {
            WebkitAppearance: "none",
            appearance: "none",
            width: "14px",
            height: "14px",
            borderRadius: '50%',
            border: '2px solid #3bc8e7',
            background: "#ffffff",
            cursor: "pointer"
        }
    }
}));

export default function MediaPlayer(props) {
    const classes = useStyles();

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
    const [progress, setProgress] = React.useState(0);
    const [buffer, setBuffer] = React.useState(10);

    const progressRef = React.useRef(() => { });
    React.useEffect(() => {
        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);
                setBuffer(10);
            } else {
                const diff = Math.random() * 10;
                const diff2 = Math.random() * 10;
                setProgress(progress + diff);
                setBuffer(progress + diff + diff2);
            }
        };
    });

    React.useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const audioRef = useRef(null)
    const [mediaState, setMediaState] = useState({
        buffered: {
            start: 0,
            end: 0,
        },
        time: 0,
        duration: 0,
        paused: true,
        waiting: false,
        playbackRate: 1,
        ended: null,
        volume: 0.6
    })

    const setState = (partState) => {
        setMediaState({ ...mediaState, ...partState })
    }

    const parseTimeRange = (ranges) =>
        ranges.length < 1
            ? { start: 0, end: 0 }
            : { start: ranges.start(0), end: ranges.end(0) };


    const audioEl = createElement('audio', {
        src: props.srcUrl,
        controls: false,
        ref: audioRef,
        onPlay: () => setState({ paused: false }),
        onPause: () => setState({ paused: true }),
        onWaiting: () => setState({ waiting: true }),
        onPlaying: () => setState({ waiting: false }),
        onEnded: () => mediaState.ended,
        onDurationChange: () => {
            const el = audioRef.current
            if (!el) {
                return
            }
            const { duration, buffered } = el
            setState({
                duration: duration,
                buffered: parseTimeRange(buffered)
            })
        },
        onTimeUpdate: () => {
            const el = audioRef.current
            if (!el) {
                return
            }
            setState({ time: el.currentTime })
        },
        onProgress: () => {
            const el = audioRef.current
            if (!el) {
                return
            }
            setState({ buffered: parseTimeRange(el.buffered) })
        }
    })

    let lockPlay = false
    const controls = {
        play: () => {
            const el = audioRef.current
            if (!el) {
                return undefined
            }
            if (!lockPlay) {
                const promise = el.play()
                const isPromise = typeof promise === 'object'

                if (isPromise) {
                    lockPlay = true
                    const resetLock = () => {
                        lockPlay = false
                    }
                    promise.then(resetLock, resetLock)
                }
                return promise
            }
            return undefined
        },
        pause: () => {
            const el = audioRef.current
            if (el && !lockPlay) {
                return el.pause()
            }
        },
        seek: (e) => {
            const el = audioRef.current
            if (!el || mediaState.duration === undefined) {
                return
            }
            el.currentTime = mediaState.duration * e.target.value
        },
        setPlaybackRate: (rate) => {
            const el = audioRef.current
            if (!el || state.duration === undefined) {
                return
            }
            setState({
                playbackRate: rate
            })
            el.playbackRate = rate
        },
        setEnded: (callback) => {
            setState({
                ended: callback
            })
        },
        setVolume: (e) => {
            const el = audioRef.current
            el.volume = parseFloat(e.target.value)
            setState({
                volume: parseFloat(e.target.value)
            })
        },
    }

    let played = ((mediaState.time / mediaState.duration) * 100)
    let loaded = ((mediaState.buffered.end / mediaState.duration) * 100)
    // console.log('played ', played)

    return (
        <Card className={classes.root}>
            { audioEl}
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
                    <div>
                        <LinearProgress color="primary" variant="buffer" value={played} valueBuffer={loaded} />
                        <input
                            type="range"
                            // min={0} max={1}
                            value={played} step='any'
                            // onMouseDown={onSeekMouseDown}
                            onChange={controls.seek}
                            // onMouseUp={onSeekMouseUp}
                            className={classes.rangeRoot} />
                        <div className={classes.progress}>
                            <span className={classes.left}>{format(mediaState.time)}</span>
                            <span className={classes.right}>{format(mediaState.duration)}</span>
                        </div>
                    </div>
                </Card>
                <div className={classes.controls}>
                    <IconButton aria-label="previous">
                        <SkipPreviousIcon />
                    </IconButton>
                    <IconButton
                        aria-label="play/pause"
                        onClick={() => {
                            mediaState.paused ? controls.play() : controls.pause()
                        }}
                    >
                        {
                            !mediaState.paused
                                ? <PauseCircleFilledIcon className={classes.playIcon} />
                                : <PlayCircleFilledIcon className={classes.playIcon} />
                        }
                    </IconButton>
                    <IconButton disabled={!props.nextUrl} aria-label="next">
                        <Link to={props.nextUrl}>
                            <SkipNextIcon />
                        </Link>
                    </IconButton>
                </div>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        {mediaState.volume > 0 ? <VolumeUp /> : <VolumeDown />}
                    </Grid>
                    <Grid item xs>
                        <input
                            type="range"
                            min={0} max={1} step='any'
                            value={mediaState.volume}
                            onChange={controls.setVolume}
                            style={{ verticalAlign: 'middle' }}
                            aria-labelledby="input-slider"
                            className={classes.volumeSlider}
                        />
                    </Grid>
                    <Grid item>
                        <span>
                            {(mediaState.volume * 100).toFixed(0)}
                        </span>
                    </Grid>
                </Grid>
                <BottomNavigation>
                    <BottomNavigationAction
                        icon={<ShuffleIcon />}
                    />
                    <BottomNavigationAction
                        icon={<RepeatIcon />}
                    />
                    <BottomNavigationAction
                        // onClick={addToFav}
                        icon={<FavoriteIcon />}
                    // icon={fav ? <FavoriteBorderIcon /> : <FavoriteIcon />}
                    />
                    <BottomNavigationAction
                        icon={<ShuffleIcon />}
                    />
                </BottomNavigation>
            </div>
        </Card>
    );
}