const { response, request } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const usersGet = async(req , res = response) => {

  const {limit = 5, from = 0} = req.query;
  const query = {status: true};

  const [totalUsers, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit))
  ]);

    res.json({
      totalUsers,
      users
    })
}

const usersPost =  async(req, res = response) => {

  const { username, password, rol, status, email} = req.body;
  const user = new User( {username, password, rol, status, email} );


  //encrypt password
  const salt = bcryptjs.genSaltSync(14);
  user.password = bcryptjs.hashSync(password, salt);

// Save DB
  await user.save();

  res.json(user);
}
const usersPut =  async(req, res = response) => {

    const {id} = req.params;
    const {_id, password, google, email, ...rest} = req.body;

    //TODO: Validar contra base de datos

    if (password){
      const salt = bcryptjs.genSaltSync(14);
       rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.json({
        user
    })
  }


  const usersDelete =  async(req, res = response) => {

    const {id} = req.params;

    // //Delet permanent
    // const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, {status: false});
    
    res.json({
      user
   })
  }

  const usersPatch =  (req, res = response) => {
    res.json({
        msg: 'patch Api - controller'
    })
  }

module.exports ={
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch
}