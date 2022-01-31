import React,{useState,useEffect} from 'react'
import {Avatar,Typography,Paper,Grid,Container,Button,Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import  LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import TextField from '@mui/material/TextField';
import { FormControl,InputLabel, OutlinedInput ,InputAdornment,FormHelperText,IconButton,Stack} from '@mui/material';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {GoogleLogin} from "react-google-login";
import Icon from "./Icon";
import Divider from '@mui/material/Divider';
import { message } from 'antd';
import  Home from "./Home";
import {useNavigate} from "react-router-dom";

const useStyles=makeStyles((theme)=>({

  outer:{
    marginTop:theme.spacing(17),
    dislay:"flex",
    flexDirection:"row",
    alignItems:"center",
    padding:theme.spacing(3),
    justifyContent:"center"
  },

  lock:{

      marginLeft:theme.spacing(1)
  },

  text:{
    marginBottom:theme.spacing(3)
  }

 

   

}))

const Auth = ({getName}) => {

 const history=useNavigate();
  const [mode,setMode]=useState(false);
  const [savePassword,setSavePassword]=useState();
  const [changeState,setChangeState]=useState(false);
  const [email,setEmail]=useState();
  const [name,setName]=useState();
  const token=localStorage.getItem("token");
  useEffect(()=>{
    if(localStorage.getItem("token")){
       
      history('/');
    }

  },[token]);

    
  const handleClickShowPassword=()=>{
      
    setMode((e)=>!e);
  }



  const login = () => {
    message.info('Login Successfully');
};

const signUp = () => {
  message.info('SignUp Successfully');
};
  const handleChange=()=>{
    setChangeState(p=>!p)
  }

   const submitForm=(e)=>{
     e.preventDefault();
    
     if(email.trim().length==0 || savePassword.trim().length==0 ){
       return;
     }


    let requestBody={
       query:`
         mutation CreateUser($email:String!,$password:String!){
           createUser(signUpUser:{email:$email ,password:$password }){
             _id
             email
             password
           }
         }
       `,
       variables:{
         email:email,
         password:savePassword
       }
     } 

       console.log(changeState);
      if(changeState){
        requestBody={
         query:`
          query Login($email:String!,$password:String!) {
            login(email:$email ,password:$password){
              userId
              token
              tokenExpiration
              email
            }
          }
         
         `,variables:{
           email:email,
           password:savePassword
         }
       }
   
      }
  
  

     fetch('http://localhost:8000/graphql',{
       method:'POST',
       body:JSON.stringify(requestBody),
       headers:{
         'Content-Type':"application/json"
       }
     }).then(res=>{
         if(res.status!== 200 && res.status!==201){
           throw new Error("Failed")
         }
         return res.json();
     }).then(resData=>{
        
      console.log(resData);
      
    localStorage.setItem("token",resData.data.login.token);
     changeState ? setTimeout(login,1000):setTimeout(signUp,1000);
 
   
   
     console.log(resData.data.login.email.split("@")[0]);
     getName(resData.data.login.email.split("@")[0]);
  
         
  
     }).catch(e=>{
       console.log(e);
     })
    
   // end
   }

  const googleSuccess=async (res)=>{

    const result=res?.profileObj;
    const token=res?.tokenId;
   console.log(token);
   
    

}
const googleFail=(e)=>{
    console.log(e)
    console.log("fail to log")
}


    const classes=useStyles();
    return (
        <div>
            <Container maxWidth="xs">
                <Paper elevation={3} className={classes.outer}>
                  
               
                  <Stack direction="column" justifyContent="center"  spacing={2} alignItems="center">
                  <Avatar  >
                   <LockOutlinedIcon  />
               </Avatar>
               <Typography variant="h6" className={classes.text}>{changeState ? "Login" :"signUp" }</Typography>
                  </Stack>
               
              
                 <form onSubmit={submitForm}>
                   <Grid container component={Box}  mt={7} spacing={2}>
                   <TextField
                id="outlined-password-input"
                label="Email"
                    required
                    component={Box}
                    onChange={e=>setEmail(e.target.value)}
                 
                  fullWidth="true"
        />  
            <FormControl sx={{ mt: 2 ,flexGrow:1 }} variant="outlined"  required>
              
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={mode ? 'text' : 'password'}
            value={savePassword}
            onChange={e=>setSavePassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
            
                  edge="end"
                >
                  {mode ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
           
  
                  
                  
                   
                   
                   </Grid>
                 
                   <Stack  direction="column" justifyContent="center"  spacing={1} alignItems="center" component={Box}  mt={3}>

                   <Button onClick={handleChange}  >
         {   changeState? "Login" :"SignUp"}
                   </Button>
                   <Button  variant="outlined"  type="submit">
                    Submit
             
                   </Button>
              
               
                   </Stack>
                   <Divider>  <Typography variant="h8">or</Typography> </Divider>  

                   <Stack  direction="row" justifyContent="center"   component={Box}  mt={1}>
                      
                   <GoogleLogin
            clientId="316651532771-a1d4ib0g355dogg58nhlp7t3a41gcqhn.apps.googleusercontent.com"
                render={(renderProps) => (
              <Button  color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google 
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFail}
            cookiePolicy="single_host_origin"
          />
                   </Stack>
                 </form>
                </Paper>

            </Container>
            
        </div>
    )
}

export default Auth
