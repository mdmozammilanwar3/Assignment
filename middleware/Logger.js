function Logger(req,res,next){
    console.log(`Logging...`);
    next();
}
module.exports=Logger