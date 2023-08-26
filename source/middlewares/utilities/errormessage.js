const {z} =require("zod");


function formatZodError (errors) {
   console.log(errors.issues[0].message);
    return  errors.issues[0].message;
 };
 
async function missingFieldError(result){
   if(errorMessage.formatZodError(result.error)  === "Required"){
      res.status(400).json("Please fill in all fields").end();
  } else{
      return res.status(400).json(formatZodError(result.error)).end();
  }
}

module.exports = {
   formatZodError,
   missingFieldError
}