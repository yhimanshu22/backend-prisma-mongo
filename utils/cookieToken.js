const getJwtToken = require('../helpers/getJwtToken')

const cookieToken = (user,res)=>{
    const token = getJwtToken(user.id);
    const options = {
        expires:new Date(Date.now() + 3*24*3600*1000) ,
        httpOnly:true//in milliseconds

    }
    user.password = undefined;
    res.status(200).cookie('token',token,options).json({
        success:true,
        token,
        user
    })

}

module.exports = cookieToken;

