import  React from "react";

import Posts from "./Posts";
import { Grid,CircularProgress ,Box} from "@material-ui/core";


const Middle=({fetchData,isLoading,name,handleDelete,update})=>{



    console.log(`name is ${name}`);
    
 
     return(
         <> 
         { isLoading ? <CircularProgress/> :(
               <Grid container  rowSpacing={{ xs: 3 }}>
               {      fetchData.map((data)=>(
                   <Grid  item key={data._id} item xs={12}  sm={12} md={12} lg={6} > 
                   <Posts data={data}  handleDelete={handleDelete} update={update} />

                   </Grid>

                 ))
                

               }

               </Grid> 
              

         )
      
        
                    }
         </>
     )

}

export default Middle;