const crypto = require('crypto')
const createJwtToken = require('./auth').createJwtToken
const register = async function (req, res) {
  try{
    const UsersModel = require('../models').Users;
    let {userName, password} = req.body
    let isUserNameExist = await UsersModel.findOne({where:{user_name: userName}})

    if(isUserNameExist) throw("Sorry!!! this Username is already Taken! Choose another")
    let {saltedPassword, salt} = saltHashPassword(password)
    let payload = {
      password: saltedPassword,
      salt,
      user_name: userName
    }
    await UsersModel.create(payload)
    res.status(200).send('Success')
  
    }catch(err) {
      console.log(err)
      res.status(400).send({err})
    }
}
const login = async function (req, res) {
  try{
    const UsersModel = require('../models').Users;
    let {userName, password} = req.body
    let {device} = req.headers
    let isUserNameExist = await UsersModel.findOne({where:{user_name: userName}})
    if(!isUserNameExist) throw('You are lost')
    
    let savedPassword = isUserNameExist.password
    let savedSalt = isUserNameExist.salt
    if(await !validatePassword(savedPassword, savedSalt, password)) throw('Password Mismatch')
    let data = {
      id: isUserNameExist.id,
      device
    }
    let token = await createJwtToken(data)
    console.log(token)
    res.status(200).send({token})

    }catch(err) {
      console.log(err)
      res.status(400).send({err})
    }
}

function saltHashPassword (password) {
  const salt = genRandomString(16)
  const passwordData = sha512(password, salt)
  return {saltedPassword: passwordData.passwordHash, salt: passwordData.salt}

} 

const genRandomString = function (length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') 
    .slice(0, length)
}

const sha512 = function (password, salt) {
  const hash = crypto.createHmac('sha512', salt)
  /* Hashing algorithm sha512 */
  hash.update(password)
  const value = hash.digest('hex')
  return {
    salt: salt,
    passwordHash: value
  }
}

function validatePassword (saltedPassword, salt, plaintextPassword) {
  return sha512(plaintextPassword, salt).passwordHash === saltedPassword
}


module.exports = {
  register,
  login
};