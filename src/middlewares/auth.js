export const auth =(req,res,next)=>{
    console.log("auth")
    let token ="xyz"
    if(token=="xyza"){
        res.status(401).send("unauthorized")  
    }
    else{
        next()
       }
  
}