const mongoose = require('mongoose');
const {Schema} = mongoose;

const supplierSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Supplier must have a name!']
  },
  tel: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: [true, 'Email required']
  },
  address: {
    type: String
  }
})

// compile our model for export
const Supplier = mongoose.model('Supplier', supplierSchema)

// export model
module.exports = Supplier;
