const applicationMiddleware = (req,res,next)=>{
    console.log("Inisde Application middleware");
    next()
}
module.exports = applicationMiddleware