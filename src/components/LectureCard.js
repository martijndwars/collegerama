import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 640,
  },
  link: {
    textDecoration: 'none'
  },
  media: {
    height: 270,
    width: 480
  },
  text: {
      textAlign: 'center'
  }
});

export default function LectureCard({imgUrl,Title,to}) {
  const classes = useStyles();

  return (
    <Link to={to} className={classes.link}>
        <Card className={classes.root}>
            <CardActionArea>
            <CardMedia
                className={classes.media}
                image={imgUrl}
                title={Title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2" className={classes.text}>
                    {Title}
                </Typography>
            </CardContent>
            </CardActionArea>
        </Card>
    </Link>
        

  );
}
