const prisma = require('../prisma/index')

//create new post------>

exports.createPost = async(req,res,next)=>{
    try {
        const {slug,title,body,authId} = req.body
        //validation on you----->
       const result = await prisma.post.create({
        data:{
            slug,
            title,
            body,
            author:{connect:{id:authorId}}
        }
       });
       res.json(result)
    } catch (error) {
        throw new Error(error)
    }
}

//update post -------->
exports.updatePost = async(req,res,next)=>{
    const {id} = req.params;
    const {title,body} = req.body;
    try {
        const result = await prisma.post.update({
            where:{id:id},
            data:{
                title:title,
                body:body
            }
        })
        res.json(result)
    } catch (error) {
        throw new Error(error)
        res.json({error:`post does not exist`})
    }
}

// delete the post------->
exports.deletePost = async(req,res,next)=>{
    const {id} = req.params;
    try {
        const result = await prisma.post.delete({
            where:{id:id}
        });
        res.json(result)
    } catch (error) {
        throw new Error(error)
    }
}

// get all post-------->
exports.getPosts = async(req,res,next)=>{
    try {
        const result = await prisma.post.findMany()
        res.json(result)
        
    } catch (error) {
        res.json({error:`no post is found`})
    }
}