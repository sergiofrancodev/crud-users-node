const Role  = require('../models/role');
const User = require('../models/user');


//Validation Role Exists
const isRoleValid = async(rol = '') =>{
    const existsRole = await Role.findOne({rol});
    if(!existsRole){
        throw new Error(`the role ${rol} is not allowed in the database`);
    }

}

//Validation Email Exists
const emailExistInDb = async(email = '') => {
const emailExist = await User.findOne({email});
if(emailExist){
  throw new Error(`the email ${email} already exists in the database, try another.`)

}
}

//User exists by id
const userExistsById = async(id) => {
    const userExists = await User.findById(id);
    if(!userExists){
      throw new Error(`the ID:  ${id} does not exist.`)
    
    }
    }

module.exports = {
    isRoleValid,
    emailExistInDb,
    userExistsById
}