import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import Auth from '../Authorization/Auth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(3),
  },
  menuButton: {
    flexGrow: 1,
    marginLeft: theme.spacing(75),
  },
  title: {
    flexGrow: 0,
    marginRight: theme.spacing(2),
  },
  buttons: {
    marginRight: theme.spacing(1),
  }
}));

export default function MenuAppBar() {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
//   const fullname = JSON.parse(localStorage.getItem('user')).name;
  const fullname = '';

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    Auth.logout(() => {
        history.push('/login');
    });
  };

  const handleClose = () => {
    setAnchorEl(null);    
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            SWAPI Test
          </Typography>
          <Button className={classes.buttons} onClick={() => history.push('/')} variant="contained" color="primary" >Main Page</Button>
          <Button className={classes.buttons} onClick={() => history.push('/all')} variant="contained" color="primary" >All People</Button>
          <Button className={classes.buttons} onClick={() => history.push('/liked')} variant="contained" color="primary" >Liked People</Button>
          <Typography variant="subtitle1" className={classes.menuButton}>
            {fullname}
          </Typography>
            <div>                          
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle style={{fontSize: "40px"}} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>LogOut</MenuItem>
              </Menu>
            </div>          
        </Toolbar>
      </AppBar>
    </div>
  );
}
