const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ProductSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
  },
  description:{
    type: Number, 
    required: true,
  },
  price:{
    type: Number,
    required: true,
  },
  date:{
    type: String,
    required: true,
  },
  
  createdAt:{
    type: Date,
    default: Date.now,
  },
});

ProductSchema.plugin(mongoosePaginate);

mongoose.model('Product', ProductSchema);
