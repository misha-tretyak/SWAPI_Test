/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MenuAppBar from "./AppBar";
import ImageUploading from 'react-images-uploading';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: "auto",
      top: 50,
      left: 0,
      right: 0,
      width: "90%",
      height: "80%",
    },
  },
  avatar: {
    color: theme.palette.getContrastText(deepOrange[500]),
    fontSize: theme.spacing(5),
    backgroundColor: deepOrange[500],
    width: theme.spacing(11),
    height: theme.spacing(11),
    margin: theme.spacing(2),
  },
  title: {
      marginTop: theme.spacing(4),
  },
  names: {
    marginBottom: theme.spacing(1.4),
  },
  like: {      
    marginTop: theme.spacing(4),
  },
  icon: {
    fontSize: theme.spacing(5),
  }, 
  text: {
      textAlign: "left",
      marginLeft: theme.spacing(2),
  }, 
  text2: {
      textAlign: "left",
  },
  text3: {
      textAlign: "left",
      marginLeft: theme.spacing(35),
  },
  main: {
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
}));

export const Profile = (props) => {
    const classes = useStyles();

    const [homeworld, setHomeworld] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [films, setFilms] = useState([]);
    const [images, setImages] = useState([]);
    const [liked, setLiked] = useState('default');
    const params = queryString.parse(props.location.search);
    const likedList = JSON.parse(localStorage.getItem('likedList'));
    const user = likedList.find(elem => elem.name === params.name);
  
      useEffect(() => {
          getVeh();
          getFilms();
          if (user) {
            setLiked('secondary');
          }
          if (params.home.indexOf('http://') > -1) {
            axios.get(params.home)
            .then((res) => {
                setHomeworld(res.data.name);
            })
          } else {
            setHomeworld(params.home);
          }
      }, [])
      

      const getVeh = () => {
          const vehiclesURL = params.vehicles.split(',');
          for (let index = 0; index < vehiclesURL.length; index++) {
              axios.get(vehiclesURL[index])
              .then((res) => {
                  setVehicles(vehicles => 
                      [...vehicles, {
                          name: res.data.name,
                          model: res.data.model
                      }]
                  ); 
              })
          }
      }
  
      const getFilms = () => {
          const filmsURL = params.films.split(',');
          for (let index = 0; index < filmsURL.length; index++) {
              axios.get(filmsURL[index])
              .then((res) => {
                  setFilms(films => 
                      [...films, {
                          title: res.data.title,
                      }]
                  ); 
              })
          }
      }

    const onChange = (imageList) => {
        console.log(imageList);
        setImages(imageList);
    };



    const likePeople = () => {
        if (likedList) {
            likedList.push(params);
            localStorage.setItem('likedList', JSON.stringify(likedList));
        } else {
            const liked = [];
            liked.push(params)
            localStorage.setItem('likedList', JSON.stringify(liked));
        }
    }

    const unLikePeople = () => {
        likedList.splice(user, 1);
        localStorage.setItem('likedList', JSON.stringify(likedList));
        setLiked('default');
    }

    const handleLike = () => {
        if (liked === 'default') {
            likePeople();
            setLiked('secondary');
        } else {
            unLikePeople();
            setLiked('default');
        }
    }

  return (
    <div>
      <MenuAppBar />
    <div className={classes.root}>
      <Paper elevation={3}>
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"            
        >
            <Avatar className={classes.avatar} variant="rounded" src={images.length > 0 ? images[0].data_url : ""}>{params.name[0]}</Avatar>
            <Typography variant="h3" gutterBottom className={classes.title}>
                {params.name}
            </Typography>
            <IconButton color={liked} aria-label="like" className={classes.like} onClick={() => handleLike()}>
                <FavoriteIcon className={classes.icon} />
            </IconButton>
        </Grid>      
        <Grid container className={classes.main}>
        <ImageUploading
                value={images}
                onChange={onChange}
                maxNumber={1}
                dataURLKey="data_url"
            >
                {({
                    onImageUpload,
                    onImageRemoveAll,
                    dragProps,
                }) => (
                <div className="upload__image-wrapper">
                    <Button 
                        size="medium"
                        variant="outlined" 
                        color="secondary"
                        onClick={() => {
                            onImageRemoveAll();
                            onImageUpload();
                            console.log(images);
                        }}
                        {...dragProps}
                    >
                        Upload
                    </Button>                    
                </div>
                )}
            </ImageUploading>
        </Grid>
        <Grid container spacing={3}>
        <Grid item xs className={classes.text}>            
            <Typography variant="h6" gutterBottom >
                Height:
            </Typography>
            <Typography variant="h6" gutterBottom >
                Mass:
            </Typography>
            <Typography variant="h6" gutterBottom >
                Hair Color:
            </Typography>
            <Typography variant="h6" gutterBottom >
                Skin Color:
            </Typography>
            <Typography variant="h6" gutterBottom >
                Eye Color:
            </Typography>
            <Typography variant="h6" gutterBottom >
                Birth Day:
            </Typography>
            <Typography variant="h6" gutterBottom >
                Gender:
            </Typography>
            <Typography variant="h6" gutterBottom >
                Homeworld:
            </Typography>
        </Grid> 
        <Grid item xs className={classes.text2}>            
            <Typography variant="subtitle1" gutterBottom className={classes.names}>
                {params.height}
            </Typography>
            <Typography variant="subtitle1" gutterBottom className={classes.names}>
                {params.mass}
            </Typography>
            <Typography variant="subtitle1" gutterBottom className={classes.names}>
                {params.hair}
            </Typography>
            <Typography variant="subtitle1" gutterBottom className={classes.names}>
                {params.skin}
            </Typography>
            <Typography variant="subtitle1" gutterBottom className={classes.names}>
                {params.eye}
            </Typography>
            <Typography variant="subtitle1" gutterBottom className={classes.names}>
                {params.birth}
            </Typography>
            <Typography variant="subtitle1" gutterBottom className={classes.names}>
                {params.gender}
            </Typography>
            <Typography variant="subtitle1" gutterBottom className={classes.names}>
                {homeworld}
            </Typography>
        </Grid> 
        <Grid item xs={8}>  
            <Typography variant="h6" gutterBottom >
                Vehicles
            </Typography>
            {vehicles.length >= 1 ? vehicles.map((v, key) => 
            <Typography variant="subtitle1" gutterBottom key={key}>
                <b>Name:</b> {v.name} <b>Model:</b> {v.model}
            </Typography>)
            : 
            <Typography variant="subtitle1" gutterBottom >
                No Results
            </Typography>}
            
            <Typography variant="h6" gutterBottom >
                Films
            </Typography>
            {films.length >= 1 ? films.map((f, key) => 
                <Typography variant="subtitle1" gutterBottom key={key}>
                    {f.title}
                </Typography>
            )
            : 
            <Typography variant="subtitle1" gutterBottom >
                No Results
            </Typography>}
        </Grid>
        </Grid>
      </Paper>
    </div>
    </div>
  );
}