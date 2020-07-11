const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
    baseURL:{
      type:String,
      required:true,
      unique:true,
      index:true,
    },
    key: {
      type:String,
      required:true
    },
    shotenURL:{
      type:String,
      required:true,
    },
    createAt:{
      type:Date,
      default:Date.now
    }
  });

module.exports = Message = mongoose.model('URLSchema',URLSchema);
