import React, { useEffect } from 'react'
import { Avatar, IconButton, makeStyles } from '@material-ui/core'
import { Pause, PlayArrow, Repeat, SkipNext, SkipPrevious, VolumeMute } from '@material-ui/icons'
import ShuffleIcon from '@material-ui/icons/Shuffle';
import useAudio from './useAudio'

import albumart from '../../client/assets/images/album/album1.jpg'


const useStyles = makeStyles({
    playControls: {
        position: 'fixed',
        bottom: '0',
        // visibility: 'hidden',
        width: '100%',
        WebkitPerspective: '900',
        perspective: '900',
        WebkitPerspectiveOrigin: '80% 100%',
        perspectiveOrigin: '80% 100%',
        zIndex: '1001',
        left: 0,
        right: 0
    },
    playControls_inner: {
        height: '48px',
        backgroundColor: '#f2f2f2',
        borderTop: '1px solid #111111'
    },
    playControls_wrapper: {
        // background: '#2b2b2b',
        color: "#fff"
    },
    playControls_elements: {
        display: 'flex',
        flexDirection: 'row',
        // margin: '0 200px'
    },
    playControls_timeline: {
        marginRight: '12px',
        WebkitFlexGrow: '1',
        flexGrow: 1,
    },
    playbackTimeline: {
        display: 'flex',
        fontSize: '11px'
    },
    playbackTimeline_timePassed: {
        color: '#3bc8e7',
        textAlign: 'right',
        width: '50px',
        lineHeight: '46px'
    },
    playbackTimeline_duration: {
        width: '50px',
        height: '46px',
        lineHeight: '46px',
        color: '#333',
        textAlign: 'left',
    },
    playbackTimeline__progressWrapper: {
        position: 'relative',
        WebkitFlexGrow: '1',
        flexGrow: '1',
        padding: '7px 0',
        margin: '13px 10px 0',
        lineHeight: '46px',
    },
    playbackTimeline__progressBackground: {
        width: '100%',
        height: '5px',
        backgroundColor: '#ccc',
        position: 'absolute',
        display: 'block',
        visibility: 'visible'
    },
    playbackTimeline__progressBar: {
        minWidth: '0px',
        height: '5px',
        backgroundColor: '#3bc8e7',
        position: 'absolute'
    },
    playbackTimeline__progressHandle: {
        border: "1px solid #3bc8e7",
        borderRadius: "100%",
        boxSizing: "border-box",
        marginTop: "-5px",
        opacity: 1,
        transition: "opacity .15s",
        position: 'absolute',
        height: "16px",
        width: "16px",
        backgroundColor: "#3bc8e7",
        marginLeft: "-7px",
        borderRadius: "100%",
        opacity: 1,
        transition: "opacity .15s",
        boxShadow: "0px 1px 2px 1px rgba(0,0,0,0.4)",
        zIndex: 999
    },
    inputTypeRange: {
        WebkitAppearance: "none",
        appearance: "none",
        width: "100%",
        outline: "none",
        border: "none",
        background: "none",
        position: "absolute",
        zIndex: "999",
        height: '5px',
        top: '7px',
        margin: '0',
        '&::-webkit-slider-thumb': {
            WebkitAppearance: "none",
            appearance: "none",
            height: "16px",
            width: "16px",
            backgroundColor: "#3bc8e7",
            borderRadius: "100%",
            opacity: 1,
            transition: "opacity .15s",
            boxShadow: "0px 1px 2px 1px rgba(0,0,0,0.4)",
        }
    },
    btnActive: {
        color: "#3bc8e7"
    },
    sliderValue_wrapper: {
        position: "relative",
        width: "100%"
    },
    sliderValue: {
        position: 'absolute',
        height: '45px',
        width: '45px',
        textAlign: 'center',
        color: '#3bc8e7',
        top: '-60px',
        transform: 'translateX(-50%) scale(0)',
        WebkitTransform: 'translateX(-50%) scale(0)',
        transformOrigin: 'bottom',
        transition: 'transform 0.3s ease-in-out',
        lineHeight: '45px',
        zIndex: 2,
        // border: '1px solid #ccc',
        '&:after': {
            position: 'absolute',
            left: '22px',
            content: `''`,
            height: '45px',
            width: '45px',
            background: '#f2f2f2',
            transform: 'translateX(-50%) rotate(45deg)',
            WebkitTransform: 'translateX(-50%) rotate(45deg)',
            border: '1px solid #3bc8e7',
            zIndex: -1,
            borderTopLeftRadius: '50%',
            borderTopRightRadius: '50%',
            borderBottomLeftRadius: '50%',
        }
    },
    show: {
        transform: 'translateX(-50%) scale(1)',
        WebkitTransform: 'translateX(-50%) scale(1)',
    },
    playControls__volume: {
        marginRight: '12px',
    },
    volume: {
        // position: 'relative',
        display: 'flex',
        flexDirection: 'row'
    },
    volume__sliderWrapper: {
        position: 'relative',
        WebkitFlexGrow: '1',
        flexGrow: '1',
        padding: '10px 0',
        margin: '13px 10px 0',
        lineHeight: '46px',
        width: '120px'
    },
    volume__sliderRange: {
        appearance: "none",
        WebkitAppearance: "none",
        width: "100%",
        height: "3px",
        position: "absolute",
        background: "none",
        margin: "0",
        padding: "0",
        outline: "none",
        border: "none",
        "&::-webkit-slider-thumb": {
            WebkitAppearance: "none",
            appearance: "none",
            width: "13px",
            height: "13px",
            borderRadius: "100%",
            background: "#3bc8e7",
            boxShadow: "0px 1px 2px 1px rgba(0,0,0,0.6)"
        }
    },
    volume__sliderBackground: {
        width: '100%',
        height: '3px',
        backgroundColor: '#ccc',
        position: 'absolute',
        display: 'block',
        visibility: 'visible'
    },
    volume__sliderProgress: {
        minWidth: '0px',
        height: '3px',
        backgroundColor: '#3bc8e7',
        position: 'absolute'
    },
    volume__sliderHandle: {
        border: "1px solid #3bc8e7",
        borderRadius: "100%",
        height: "8px",
        width: "8px",
        backgroundColor: "#3bc8e7",
        boxSizing: "border-box",
        marginTop: "-4px",
        marginLeft: "-4px",
        opacity: 1,
        transition: "opacity .15s",
        position: 'absolute'
    },
    output__: {
        position: "absolute",
        padding: "0px 10px",
        background: "blueviolet",
        top: "-40px",
        marginLeft: "-45px",
        borderRadius: "10px 10px 0 10px",
        zIndex: 999,
        boxShadow: "0px -1px 3px 2px rgba(0,0,0,0.6)"
    },
    playControls__soundBadge: {
        boxSizing: "border-box",
        width: "360px",
        height: "48px",
        padding: "0 8px",
        zIndex: 1
    },
    playbackSoundBadge: {
        height: "100%",
        display: "flex",
        WebkitAlignItems: "center",
        alignItems: "center"
    },
    playbackSoundBadge__avatar: {
        margin: "0 10px 0 0"
    },
    image: {
        height: '30px',
        width: '30px',
        backgroundImage: "linear-gradient(135deg,#e6846e,#70929c)",
        textAlign: "center",
        position: "relative",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
    },
    sc_artwork: {
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,.1)"
    },
    playbackSoundBadge__titleContextContainer: {
        width: "0",
        WebkitFlexGrow: "1",
        flexGrow: 1,
        lineHeight: "1.5em"
    },
    playbackSoundBadge__lightLink: {
        display: "flex",
        width: "100%",
        height: "17px",
        WebkitAlignItems: "center",
        alignItems: "center"
    },
    playbackSoundBadge__title: {
        display: "flex",
        width: "100%",
        height: "17px",
        WebkitAlignItems: "center",
        alignItems: "center"
    },
    playbackSoundBadge__titleLink: {
        fontSize: "11px",
        color: "#666"
    },
})

export default function PlayerBottom(props) {
    const classes = useStyles()

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

    const { state, element, controls } = useAudio({
        src: props.srcUrl
    })

    return (
        <div className={classes.playControls}>
            {element}
            <section role="contentinfo" aria-label="miniplayer" className={classes.playControls_inner}>
                <div className={classes.playControls_wrapper}>
                    <div className={classes.playControls_elements}>
                        <div>
                            <IconButton>
                                <SkipPrevious />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    state.paused ? controls.play() : controls.pause()
                                }}
                                className={state.paused ? "" : `${classes.btnActive}`}
                            >
                                {state.paused ? <PlayArrow /> : <Pause />}
                            </IconButton>
                            <IconButton>
                                <SkipNext />
                            </IconButton>
                            <IconButton>
                                <ShuffleIcon />
                            </IconButton>
                            <IconButton>
                                <Repeat />
                            </IconButton>
                        </div>
                        <div className={classes.playControls_timeline}>
                            <div className={classes.playbackTimeline}>
                                <div className={classes.playbackTimeline_timePassed}>
                                    <span aria-hidden="true">{format(state.time)}</span>
                                </div>
                                <div id="seek" className={classes.playbackTimeline__progressWrapper}
                                    role="progressbar"
                                    aria-valuemax={state.duration.toFixed(0)}
                                    aria-valuenow={state.time.toFixed(0)}
                                >
                                    <div className={classes.sliderValue_wrapper}>
                                        <span
                                            className={state.paused ? `${classes.sliderValue}` : `${classes.sliderValue} ${classes.show}`}
                                            style={{ left: `${((state.time / state.duration) * 100).toFixed(4)}%` }}
                                        >{state.time > 0 ? format(state.time) : '0:00'}</span>
                                    </div>
                                    <div className={classes.playbackTimeline__progressBackground} />
                                    <div className={classes.playbackTimeline__progressBar}
                                        style={{ minWidth: '1px', width: `${((state.time / state.duration) * 100).toFixed(4)}%` }}
                                    />
                                    <input type="range"
                                        min={0}
                                        max={state.duration.toFixed(0)}
                                        value={state.time.toFixed(0)}
                                        step={1}
                                        onChange={controls.seek}
                                        className={classes.inputTypeRange} />
                                    {/* <div className={classes.playbackTimeline__progressHandle}
                                        style={{ left: `${((state.time / state.duration) * 100).toFixed(4)}%` }}
                                    /> */}
                                </div>
                                <div className={classes.playbackTimeline_duration}>
                                    <span aria-hidden="true">{format(state.duration)}</span>
                                </div>
                            </div>
                        </div>
                        <div className={classes.playControls__volume}>
                            <div className={classes.volume} data-level={10}>
                                <IconButton>
                                    <VolumeMute />
                                </IconButton>
                                <div
                                    id="volumeSlider"
                                    className={classes.volume__sliderWrapper}
                                    role="slider"
                                    aria-valuemin={0}
                                    aria-valuemax={1}
                                    aria-label="Volume"
                                    aria-valuenow={state.volume}
                                >
                                    <div className={classes.volume__sliderBackground} />
                                    <div className={classes.volume__sliderProgress}
                                        style={{ minWidth: '1px', width: `${state.volume * 100}%` }}
                                    />
                                    <span 
                                        style={{left: `${state.volume*100}%`}}
                                        className={classes.output__} 
                                        aria-hidden="true">{Number(state.volume).toFixed(1)}</span>
                                    <input type="range" min={0} max={1} step="any"
                                        className={classes.volume__sliderRange}
                                        value={state.volume}
                                        onChange={controls.setVolume}
                                    />
                                    {/* <div className={classes.volume__sliderHandle}
                                        style={{ left: '13.9311%' }}
                                    /> */}
                                </div>
                            </div>
                        </div>
                        <div className={classes.playControls__soundBadge}>
                            <div className={classes.playbackSoundBadge}>
                                <a href="/ubeyt-aslan2/akcent-feat-amira-push-love-the-show" className={classes.playbackSoundBadge__avatar} tabIndex={-1}>
                                    <div className={classes.image} style={{ height: '30px', width: '30px' }}>
                                        <Avatar src={albumart} variant="square" style={{ width: '30px', height: '30px', opacity: 1 }} className={classes.sc_artwork} />
                                    </div>
                                </a>
                                <div className={classes.playbackSoundBadge__titleContextContainer}>
                                    <a href="/ubeyt-aslan2" className={classes.playbackSoundBadge__lightLink} title="Übeyt Aslan">Übeyt Aslan</a>
                                    <div className={classes.playbackSoundBadge__title}>
                                        <a href="/ubeyt-aslan2/akcent-feat-amira-push-love-the-show" className={classes.playbackSoundBadge__titleLink} title="Akcent Feat. Amira - Push [Love The Show]">
                                            <span aria-hidden="true">Akcent Feat. Amira - Push [Love The Show]</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
