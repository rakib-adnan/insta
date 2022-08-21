// create express error handler

const errorhendler = (err, req, res, next) =>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Unknown Error"
return res.status(errorStatus).json({
    message : errorMessage,
    status : errorStatus,
    stack : err.stack

})
}

export default errorhendler;