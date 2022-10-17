import PostModel from "../models/post.js"

export const getAll = async (req,res) =>{
    try{
        const posts = await PostModel.find().populate('user').exec()

        res.json(posts)
    } catch(err){
        console.log(err)
        res.status(500).json({
            message:"Chi hajoxvel stanal postery"
        })
    }
}

export const getOne =  (req,res) =>{
    try{
        const postId = req.params.id
        PostModel.findOneAndUpdate(
            {
            _id:postId,
        },
        {
            $inc: { viewCount: 1 },
        },
        {
            returnDocument: 'after',
        },
        (err,doc) =>{
            if(err){
                console.log(err)
               return  res.status(500).json({
                    message:"Chi hajoxvel veradarcnel "
                })
            }

            if(!doc){
                return res.status(404).json({
                    message: 'State chi gtnvel'
                })
            }
            res.json(doc)
        } 
     )
        
    } catch(err){
        console.log(err)
        res.status(500).json({
            message:"Chi hajoxvel stanal state"
        })
    }
}

export const create = async (req,res) =>{
    try{
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl:req.body.imageUrl,
            tags:req.body.tags,
            user:req.userId
        })

        const post = await doc.save()

        res.json(post)
    } catch(err){
        console.log(err)
        res.status(500).json({
            message:"Chi hajoxvel sarqel post"
        })
    }
}

export const update = async (req,res)=>{
    try{
        const postId = req.params.id

        await PostModel.updateOne({
            _id: postId,
        },{
            title:req.body.title,
            text:req.body.text,
            imageUrl:req.body.imageUrl,
            user:req.userId,
            tags:req.body.tags,
        });

        res.json({
            success:true
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"Chi hajoxvel jnjel state"
        })   
    }
}

export const remove =  (req,res) =>{
    try{
        const postId = req.params.id

        PostModel.findOneAndDelete({
            _id: postId,
        },(err,doc)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    message:"Chi hajoxvel jnjel state"
                })
            }
            if(!doc){
                return res.status(404).json({
                    message: 'state chi gtnvel'
                })
            }

            res.json({
                success:true
            })
        })
       
        
    } catch(err){
        console.log(err)
        res.status(500).json({
            message:"Chi hajoxvel jnjel state"
        })
    }
}