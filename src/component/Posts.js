import React from 'react';
import { Card,CardActions,CardContent,CardMedia,Button,Typography,ButtonBase,CardActionArea ,Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from "moment";




const useStyles=makeStyles((theme)=>({

    card:{
        marginTop:theme.spacing(15),
        width:theme.spacing(40),
        [theme.breakpoints.down('md')]:{
            width:theme.spacing(53),
         }
    },

    img:{
     
         position:'relative'
      
    },

    overlay:{
        position:"absolute",
        top:"10px",
        left:"7px",
        color:"white",
        fontWeight:"15px"

    },
     overlay2:{
         position:"absolute",
         top:"10px",
         right:"7px",
         color:"white",
         fontWeight:"15px"


     },

     tags:{
         padding:"5px 6px"
     }










}));

const Posts = ({data,handleDelete,update}) => {
  
    const classes=useStyles();
    
        
     


  

   
    return(
        <>
     
       
                <Card className={classes.card} raised elevation={3}>
         
         <CardActionArea>
         <CardMedia  className={classes.img}   height="140" component="img" image={data.selectedFile} />
         <div className={classes.overlay}>
         <Typography varaint="h5">{data.name}</Typography>
         <Typography > {moment(data.createdAt).fromNow()}</Typography>
         </div>

         <div className={classes.overlay2}> 
         <Button > <MoreHorizIcon fontSize="default" style={{color:"white"}} onClick={update.bind(this,data._id)} /> </Button>
         </div>
         <div className={classes.details}>
     <Typography variant="body2" color="textSecondary" className={classes.tags}>{data.tags.map((tag)=> ` #${tag} `)}</Typography>
     </div>
     <CardContent>
        <Typography variant="h5" gutterBottom="true">{data.title}</Typography> 
        <Typography   variant="body2" align="justify"> {data.message}</Typography> 
     </CardContent>
     </CardActionArea>
     <CardActions>
     <Button variant="contained" color="primary"  onClick={handleDelete.bind(this,data._id)}> Delete</Button>
     </CardActions>
     </Card>
      </>
    )
}

export default Posts;
