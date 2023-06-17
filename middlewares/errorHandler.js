const constants=require('../constants');
exports.errorHandler=(err,req,res,next)=>{
    const statuscode=err.statusCode?err.statusCode:503;
    switch(statuscode){
        case constants.VALIDATION_ERROR:{
            res.status(statuscode).json({"TITLE":"VALIDATION ERROR","ERROR STACK":err.message});
            next();
            break;
        }
        case constants.FORBIDDEN_ERROR:{
            res.status(statuscode).json({"TITLE":"FORBIDDEN ERROR","ERROR STACK":err.message});
            next();
            break;
        }
        case constants.UNAUTHORIZED:{
            res.status(statuscode).json({"TITLE":"AUTHORIZATION FAILED","ERROR STACK":err.message});
            next();
            break;
        }
        case constants.NOT_FOUND:{
            res.status(statuscode).json({"TITLE":"NOT FOUND","ERROR STACK":err.message});
            next();
            break;
        }
        case constants.SERVER_ERROR:{
            res.status(statuscode).json({"TITLE":"SERVER ERROR","ERROR STACK":err.message});
            next();
            break;
        }
        case constants.DB_NOT_CONNECTED:{
            console.log("DB IS NOT CONNECTED");
            res.status(statuscode).json({"TITLE":"DATABASE IS NOT CONNECTED","ERROR STACK":err.message});
            next();
            break;
        }
        default:{
            res.status(statuscode).json({"TITLE":"OTHER ERROR","ERROR STACK":err.message});
            next();
            break;
        }
    }
}