// database functions
const User = require('../../models/users')

const fetchUser = (key) => {
  return User.findOne(key)

}

const setToken = (_id, token) => {
  return User.findByIdAndUpdate(
    { _id: _id },
    { $set: token },
    {
      new: true,
      runValidators: true,
      strict: 'throw',
      upsert: false
    }
  )
}

const updateUser = ({ id, toUpdate }) => {
  return User.findByIdAndUpdate(
    { _id: id },
    { $set: toUpdate },
    {
      new: true,
      runValidators: true,
      // upsert:false
    }
  
  )

}

module.exports = {
  fetchUser, 
  setToken, 
  updateUser
}