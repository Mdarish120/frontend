import React,{useState,useEffect} from 'react';
import PostForm from "./PostForm";
import {Avatar,Typography,Paper,Grid,Container,Button,Box,Grow} from "@material-ui/core";
import Middle from "./Middle";
import {makeStyles} from "@material-ui/core/styles";
import {useNavigate} from "react-router-dom";

const useStyles=makeStyles((theme)=>({

    outer:{
        [theme.breakpoints.down('sm')]:{
            marginLeft:theme.spacing(4)
          
 
         },
         [theme.breakpoints.down('sm')] :{
     
           flexDirection:"column-reverse"
          
      },


         marginLeft:theme.spacing(5)


    }

    
  

}));
const Home = ({name}) => {
  const history=useNavigate();
  console.log(`name is ${name}`);
  const [fetchData,setFetchData]=useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [updateData,setUpdateData]=useState();
  const [alt,setAlt]=useState(false);
 


  const alter=()=>{

    setAlt(true);
  }
   
    
  
const token=localStorage.getItem("token");
 
console.log(`from app ${name}`);


    
    useEffect(()=>{
     
     
  if(!localStorage.getItem("token")){
       
    history('/auth');
   }

        const fetchMemory=()=>{
            const  requestBody={
                query:`
                 query {
                    document{
                     _id
                   title
                   message
                   tags
                   selectedFile
                   createdAt
                   name
                   }
                 }
                
                `
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
             setFetchData(resData.data.document);
             setIsLoading(false);
           
             
                
         
            }).catch(e=>{
              console.log(e);
            })
           
          // end

        }

        fetchMemory();

    },[token]);

    const classes=useStyles();
  
    const handleDelete=(id)=>{
   
    

      
       
      const  requestBody={
        query:`
         mutation DeleteList($id:ID!) {
          deleteList(listId:$id){
           title
          
           }
         }
        
        `,
        variables:{
          id:id
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
     setFetchData(oldData=>{
      const presentData=oldData.filter(e=>e._id !== id);
      return [...presentData];
    

    })
   
     
        
 
    }).catch(e=>{
      console.log(e);
    })
   
  // end
      console.log(id);
    }


    const update=(id)=>{
       
      console.log(`update id is ${id}`);
           const result=fetchData.filter(e=>e._id==id);
    
           alter();
           setUpdateData(result);
          
         
           
    } 

   

  
    return (  
      <>        
       <Grow in>

           <Container maxWidth="xl" >
                <Grid container justify="space-between" alignItems="stretch"  className={classes.outer} rowSpacing={{ xs: 3 }}> 
                    <Grid item xl={12} sm={8}  md={7} className="items">
                     <Middle fetchData={fetchData}  isLoading={isLoading} name={name} handleDelete={handleDelete} update={update}  />
                    </Grid>
                     
                    <Grid item xl={12} sm={4}  md={5}  >
                    <PostForm name={name}  setFetchData={setFetchData} updateData={updateData} alt={alt} setAlt={setAlt}/>
                        </Grid>
                </Grid>

            </Container>
       </Grow>
          </> 
       
    )
}

export default Home
