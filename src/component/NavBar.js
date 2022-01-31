import React ,{useEffect} from 'react'
import {AppBar,Box,Toolbar,Typography,Button,Avatar,Stack } from '@mui/material';
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from '@mui/material/CssBaseline';
import {NavLink} from "react-router-dom";
import {motion} from "framer-motion";





const useStyles=makeStyles((theme)=>({

    menu:{
      
            [theme.breakpoints.down('sm')]:{
               marginLeft:theme.spacing(2),
             

            }
       
    },

    text:{
        [theme.breakpoints.down('sm')]:{
            fontSize: '0.5rem',
         }

    },

    items:{ 
        color:"white",
        textDecoration:"none"
        
    },

    logout:{
        cursor:"pointer"
    }

   


   

}))

const NavBar = () => {

    const classes=useStyles();

    const removeToken=()=>{
        localStorage.removeItem("token");
    }

     

    
    return (
        <>


<CssBaseline/>
            <AppBar>
            <Toolbar>
              
               
                <Avatar
            alt="image"
           src="memory hero.jpg"
           sx={{ width: 56, height: 56 }}
      />
       < motion.Typography
         initial={{y:-80}}
         animate={{y:0}}
         transition={{type:"spring",stiffness:700,duration:3}}
       
       variant="h5" style={{flexGrow:1, marginLeft:"10px"}} className={classes.text} >Sweet Memory</motion.Typography>
            
               
               
        
         <Stack  direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }} className={classes.menu}  alignItems="center">

                        {localStorage.getItem("token") ? 
                        <>
                        <div>
           <NavLink  className={classes.items} exact to="/">Home</NavLink>
               
           </div>
           <div>
               <Typography variant="h7" className={classes.logout} onClick={removeToken}>Logout</Typography>
           </div> 
           </> : <div >

                            <NavLink className={classes.items} exact to="/auth">Authentication</NavLink>
                        </div>}
          
          
          
       </Stack>
      
            </Toolbar>
            </AppBar>

            
            </>
    )
}

export default NavBar
