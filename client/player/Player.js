import React from 'react'
import volume from "./../assets/images/svg/volume.svg"

export default function Player() {
    return (
        <div className="ms_player_wrapper">
            <div className="ms_player_close">
                <i className="fa fa-angle-up" aria-hidden="true" />
            </div>
            <div className="player_mid">
                <div className="audio-player">
                    <div id="jquery_jplayer_1" className="jp-jplayer" />
                    <div id="jp_container_1" className="jp-audio" role="application" aria-label="media player">
                        <div className="player_left">
                            <div className="ms_play_song">
                                <div className="play_song_name">
                                    <a href="#" id="playlist-text">
                                        <div className="jp-now-playing flex-item">
                                            <div className="jp-track-name" />
                                            <div className="jp-artist-name" />
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="play_song_options">
                                <ul>
                                    <li><a href="#"><span className="song_optn_icon"><i className="ms_icon icon_download" /></span>download now</a></li>
                                    <li><a href="#"><span className="song_optn_icon"><i className="ms_icon icon_fav" /></span>Add To Favourites</a></li>
                                    <li><a href="#"><span className="song_optn_icon"><i className="ms_icon icon_playlist" /></span>Add To Playlist</a></li>
                                    <li><a href="#"><span className="song_optn_icon"><i className="ms_icon icon_share" /></span>Share</a></li>
                                </ul>
                            </div>
                            <span className="play-left-arrow"><i className="fa fa-angle-right" aria-hidden="true" /></span>
                        </div>
                        {/*--Right Queue--*/}
                        <div className="jp_queue_wrapper">
                            <span className="que_text" id="myPlaylistQueue"><i className="fa fa-angle-up" aria-hidden="true" /> queue</span>
                            <div id="playlist-wrap" className="jp-playlist">
                                <div className="jp_queue_cls"><i className="fa fa-times" aria-hidden="true" /></div>
                                <h2>queue</h2>
                                <div className="jp_queue_list_inner">
                                    <ul>
                                        <li>&nbsp;</li>
                                    </ul>
                                </div>
                                <div className="jp_queue_btn">
                                    <a href="#" className="ms_clear" data-toggle="modal" data-target="#clear_modal">clear</a>
                                    <a href="#" className="ms_save" data-toggle="modal" data-target="#save_modal">save</a>
                                </div>
                            </div>
                        </div>
                        <div className="jp-type-playlist">
                            <div className="jp-gui jp-interface flex-wrap">
                                <div className="jp-controls flex-item">
                                    <button className="jp-previous" tabIndex={0}>
                                        <i className="ms_play_control" />
                                    </button>
                                    <button className="jp-play" tabIndex={0}>
                                        <i className="ms_play_control" />
                                    </button>
                                    <button className="jp-next" tabIndex={0}>
                                        <i className="ms_play_control" />
                                    </button>
                                </div>
                                <div className="jp-progress-container flex-item">
                                    <div className="jp-time-holder">
                                        <span className="jp-current-time" role="timer" aria-label="time">&nbsp;</span>
                                        <span className="jp-duration" role="timer" aria-label="duration">&nbsp;</span>
                                    </div>
                                    <div className="jp-progress">
                                        <div className="jp-seek-bar">
                                            <div className="jp-play-bar">
                                                <div className="bullet">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="jp-volume-controls flex-item">
                                    <div className="widget knob-container">
                                        <div className="knob-wrapper-outer">
                                            <div className="knob-wrapper">
                                                <div className="knob-mask">
                                                    <div className="knob d3"><span /></div>
                                                    <div className="handle" />
                                                    <div className="round">
                                                        <img src={volume} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <input></input> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="jp-toggles flex-item">
                                    <button className="jp-shuffle" tabIndex={0} title="Shuffle">
                                        <i className="ms_play_control" /></button>
                                    <button className="jp-repeat" tabIndex={0} title="Repeat"><i className="ms_play_control" /></button>
                                </div>
                                <div className="jp_quality_optn custom_select">
                                    <select>
                                        <option>quality</option>
                                        <option value={1}>HD</option>
                                        <option value={2}>High</option>
                                        <option value={3}>medium</option>
                                        <option value={4}>low</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*main div*/}
        </div>
    )
}
