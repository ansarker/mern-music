import { makeStyles, withStyles } from '@material-ui/core'
import { PeopleOutlineTwoTone } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { listPopular } from '../media/api-media'
import MediaList from '../media/MediaList'
import PageHeader from './PageHeader'

// const useStyles = makeStyles({
//     sideMenu: {
//         display: 'flex',
//         flexDirection: 'column',
//         position: 'absolute',
//         left: '0px',
//         width: '200px',
//         height: '100%',
//         backgroundColor: '#253053'
//     }
// })

export default function Home() {
    // const classes = useStyles();

    const [media, setMedia] = useState([])

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        listPopular(signal).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                console.log(data)
                setMedia(data)
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [])

    return (
        <div>                
            <PageHeader
                title="Luvmusic:: Discover now..."
                subtitle="Enjoy music from various artists..."
                icon={<PeopleOutlineTwoTone/>}
            />
            <MediaList media={media} />
        </div>
    )
}
