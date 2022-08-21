

//? create error

const createError = (status, message)=>{
    const error = new Error();
    error.status = status;
    error.message = message;
    return error;

}
export default createError;

// const createError = (status, msg) =>{
//     const err = new Error();
//     err.status = status;
//     err.message = msg;
//    return err;
// }

// export default createError;