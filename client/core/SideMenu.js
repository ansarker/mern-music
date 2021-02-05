import { makeStyles, withStyles } from '@material-ui/core'
import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import RadioIcon from '@material-ui/icons/Radio';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import AlbumIcon from '@material-ui/icons/Album';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';

const style = makeStyles({
  sideMenu: {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    left: '0px',
    width: '200px',
    height: '100%',
    backgroundColor: '#2B2B2B'
  }
})

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const SideMenu = (props) => {
  const classes = style();
  return (
    <div className={classes.sideMenu}>
      <List component="div" aria-label="main mailbox folders">
        <ListItemLink href="/">
          <ListItemIcon>
            <RadioIcon />
          </ListItemIcon>
          <ListItemText primary="Discover" />
        </ListItemLink>
        <ListItemLink href="/">
          <ListItemIcon>
            <FeaturedPlayListIcon />
          </ListItemIcon>
          <ListItemText primary="Artists" />
        </ListItemLink>
        <ListItemLink href="/">
          <ListItemIcon>
            <AlbumIcon />
          </ListItemIcon>
          <ListItemText primary="Albums" />
        </ListItemLink>
        <ListItemLink href="/">
          <ListItemIcon>
            <LibraryMusicIcon />
          </ListItemIcon>
          <ListItemText primary="Genres" />
        </ListItemLink>
      </List>
      <Divider />
    </div>
  )
}

export default withStyles(style)(SideMenu)