exports.checkAuth = (req,res)=>{
    if (!req.isAuth){
        return res
            .status(401)
            .send({
                message:"invalide credentials"
            })
    }else return false
}

exports.checkAuthAndAdmin = (req,res)=>{
    if (!req.isAuth && !req.is_admin){
        return res
            .status(401)
            .send({
                message:"invalide credentials"
            })
    }else return false
}