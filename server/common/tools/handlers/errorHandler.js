
const errorHandler ={
    handleHttpErrorResponse: async(res,err) =>{


        if (err.message === "invalid Data: please check the data again"){
            res.status(400).json({
                success: false,
                msg: err.message,
            });
        } else if(err.message === "no data found"){
            res.status(404).json({
                success: false,
                msg: err.message,
            });
        } else{
            if (err.errorCode === undefined){
                console.log(err);
                res.status(500).json({
                    success: false,
                    msg: "internal server error"
                });
            }else {
                console.log(err);
                res.status(err.errorCode).json({
                    success: false,
                    msg: err,
                });
            }
        }

    }
}

module.exports = errorHandler