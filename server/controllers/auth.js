const JWT = require('jsonwebtoken')
const resturantSecretJwt = 'ResturantJWTSecret'
const createJwtToken = async function (data) {
    console.log('inside create jwt token')
    let device = data.device || 'web'
    let token = {
      device,
      id: data.id,
      exp: new Date().getTime() + 30 * 60 * 1000,
      valid: true
    }
    return JWT.sign(token, resturantSecretJwt)
    
    
}

const validateJwtToken = async function (req, res, next) {
  try{
  console.log('insid validate jwt')
 let {token} = req.headers
 if(!token) {
   return res.status(401).send("UnAuthorized!!!")
 }
 let decodedToken = await JWT.verify(token, resturantSecretJwt) 
  if (!decodedToken || !decodedToken.valid) {
   return res.status(401).send("UnAuthorized!!!")
  
  } else {
    const UsersModel = require('../models').Users
    console.log(decodedToken.id)
    let user = await UsersModel.findOne({where: {id: decodedToken.id}})
    if (!user) {
      return res.status(401).send("UnAuthorized!!!")
    }
    else{
      return next()
    }
    
  }
}catch(err){
  console.log(err)
  res.status(401).send("UnAuthorized!!!")
}
}




module.exports = {
  createJwtToken,
  validateJwtToken
};