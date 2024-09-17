const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { 
    type: String, 
    required: true 
    },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
 
  role:{
    type: String,
    enum:['customer', 'petShop', 'admin'], default: 'customer'
  }, 
  contact:{
    type: String,
    required:true
  },
  address:{
    type: String,
  },
  petshop:{
    type: Schema.Types.ObjectId,
    ref: 'petShopModel',
    
  },

});


module.exports = mongoose.model('User', UserSchema);