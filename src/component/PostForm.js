import React, { useState,useEffect } from 'react';
import { Avatar, Typography, Paper, Grid, Container, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FileBase from "react-file-base64";
import TextField from '@mui/material/TextField';
import {motion} from "framer-motion";


const useStyles = makeStyles((theme) => ({

  paper: {
    marginTop: theme.spacing(15),
    padding: theme.spacing(3),
    width: theme.spacing(50)

  },

  file: {
    marginTop: theme.spacing(2)
  },
  btn: {
    marginTop: theme.spacing(2)
  }


}));


const PostForm = ({ name ,setFetchData,updateData,alt,setAlt}) => {

  const classes = useStyles();
  const [postData, setPostData] = useState({ title: "", message: "", tags: "", selectedFile: "" });
  const [userName, setUserName] = useState();
  const [listId,setListId]=useState();
 
  useEffect(()=>{
   const run =async ()=>{
    console.log(updateData);
     console.log(updateData.title);
     updateData.map((data)=>{
       setPostData({ title: data.title, message: data.message, tags: data.tags, selectedFile: data.selectedFile });
         setListId(data._id);
     })
   
   }
     
   run();
  },[updateData])

  console.log(postData);
console.log(userName);

  const handle = (e) => {
    console.log("checking...");
    e.preventDefault();

    setUserName(name);
       
      if(!alt){
       
        const requestBody = {
          query: `
            mutation CreateList($title:String!,$message:String!,$tags:[String]!,$selectedFile:String!,$userName:String!) {
              createList(listInput:{title:$title,message:$message,tags:$tags,selectedFile:$selectedFile,name:$userName}){
              title
              message
              tags
              name
              selectedFile
              createdAt
              }
            }
           
           `, variables: {
            userName: userName,
            title: postData.title,
            message: postData.message,
            tags: postData.tags,
            selectedFile: postData.selectedFile,
        
          }
        }
    
    
    
    
    const token=localStorage.getItem("token");
        fetch('http://localhost:8000/graphql', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': "application/json",
            Authorization:"Bearer "+token
          }
        }).then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error("Failed")
          }
          return res.json();
        }).then(resData => {
    
          console.log(resData);
          resData && setFetchData(oldData=>{
           return [...oldData,{
             title:postData.title,
             name:userName,
             message:postData.message,
             tags:postData.tags,
             selectedFile:postData.selectedFile,
           }]
          });
         
         
    
    
    
        }).catch(e => {
          console.log(e);
        })
    
        // end
    
    

      }
   
   
      const requestBody = {
        query: `
          mutation UpdateList($title:String!,$message:String!,$tags:[String]!,$selectedFile:String!,$id:ID!) {
            updateList(updatedList:{title:$title,message:$message,tags:$tags,selectedFile:$selectedFile,id:$id}){
            title
           
            }
          }
         
         `, variables: {
       
          title: postData.title,
          message: postData.message,
          tags: postData.tags,
          selectedFile: postData.selectedFile,
          id:listId
      
        }
      }
  
  
  
  
  const token=localStorage.getItem("token");
      fetch('http://localhost:8000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': "application/json",
          Authorization:"Bearer "+token
        }
      }).then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed")
        }
        return res.json();
      }).then(resData => {
        console.log(resData);
       
  
  
  
      }).catch(e => {
        console.log(e);
      })
  
      // end
  
  
    

    clear();

  }

  const clear = () => {

    setPostData({ title: "", message: "", tags: "", selectedFile: "" })
    setAlt(false)
  } 

  


  return (
    <Paper className={classes.paper} elevation={6} 
    
    >
      <form autoComplete="off" onSubmit={handle}>
        <Typography variant="h6" >{alt ? "Updating Memory" :"Creating Memory"}</Typography>



        <TextField name="title"
          variant="outlined"
          label="Title"
          fullWidth
          margin="normal"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        ></TextField>

        <TextField name="message"
          variant="outlined"
          label="Message"
          margin="normal"
          fullWidth
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        ></TextField>

        <TextField name="tags"
          variant="outlined"
          label="Tags"
          margin="normal"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        ></TextField>
        <div className={classes.fileInput}>

          <FileBase className={classes.file} type="file" mutiple="false" onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />

        </div>

        <Button
          variant="contained" color="primary"
          size="large" type="submit" fullWidth className={classes.btn} >
          Submit
        </Button>

        <Button
          variant="contained" color="secondary"
          size="small" onClick={clear} fullWidth className={classes.btn} >
          Clear
        </Button>
      </form>
</Paper>
  )
}

export default PostForm
