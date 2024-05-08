//bring in prisma and cookie ---->

const prisma = require('../prisma/index')
const cookieToken = require('../utils/cookieToken')

//user signup--------->
exports.signup = async(req,res,next)=>{
    try {
        //i need this things from users---
        const {name,email,password} = req.body
        //check -->
        if(!name || !email||!password){
            throw new Error('please provide all fields')   
        }
        const user = await prisma.user.create({
            data:{
                name,
                email,
                password
            }
        })
        // send user a token------->
        cookieToken(user,res)


        
    } catch (error) {
        throw new Error(error)
    }
} 

// user login---------->
exports.login = async(req,res,next)=>{
    try {
        //take info from user---->
        const {email,password} = req.body
        if(!email ||!password){
            throw new Error('please provide username and password')
        }
        //find a user based on email----->
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })
        //where user not found---->
        if(!user){
            throw new Error('User not found')
        }
        // password mismatch------>
        if(user.password !== password){
            throw new Error('password is incorrect')
        }
        //user is there and validation------>
        cookieToken(user,res)

    } catch (error) {
        throw new Error(error)
    }
}

//logout user -------->
exports.logout = async(req,res,next)=>{
    try {
        res.clearCookie('token');
        res.json({
            success:true
        })
        
    } catch (error) {
        throw new Error(error)
    }
}