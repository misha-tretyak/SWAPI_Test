import React from 'react';
import Auth from '../Authorization/Auth';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import BackgroundImage from '../cat.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',

  },
  image: {
    backgroundImage: `url(${BackgroundImage})`,
    
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  background: {
    backgroundColor: '#c9cfcc'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    marginBottom: theme.spacing(3),
  },
}));

export const Login = (props) => {

  if (localStorage.getItem('user')) {
    Auth.login(() => {
      props.history.push("/");
    });
  }

  const responseGoogle = (response) => {
    console.log(response);
    const user = {
      name: response.Es.sd,
      id: response.Es.JR,
      pictureURL: response.Es.vI,
      email: response.Es.kt,
      accessToken: response.accessToken,
    }
    localStorage.setItem('user', JSON.stringify(user));    
    localStorage.setItem('likedList', JSON.stringify([]));
    Auth.login(() => {
      props.history.push("/");
    });
  }
  const responseFacebook = (response) => {
    console.log(response);
    const user = {
      name: response.name,
      id: response.id,
      accessToken: response.accessToken,
    }
    localStorage.setItem('user', JSON.stringify(user));    
    localStorage.setItem('likedList', JSON.stringify([]));
    Auth.login(() => {
      props.history.push("/");
    });
  }

  const classes = useStyles();

    return (
      <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} className={classes.background} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography className={classes.button} component="h1" variant="h5">
            Sign in
          </Typography>
          <FacebookLogin
          appId="705468243415579"
          autoLoad
          callback={responseFacebook}         
          render={renderProps => (
            <Button onClick={renderProps.onClick} className={classes.submit} variant="outlined" color="primary">
            Sign in with Facebook
            </Button>
          )}
        />
        <GoogleLogin
          clientId="564831766177-ues0qmjtdq9vlircie1r852kn0dg3ug9.apps.googleusercontent.com"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}          
          render={renderProps => (
            <Button onClick={renderProps.onClick} disabled={renderProps.disabled} className={classes.submit} variant="outlined" color="secondary">
            Sign in with Google
            </Button>
          )}
        />
        </div>
      </Grid>
    </Grid>
    )
}