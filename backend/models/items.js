const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({    
  username: { type: String, required: true },
  description: { type: String, required: true }, 
  startTime: { type: String, required: true }, 
  duration: { type: String, required: true },
});

module.exports = mongoose.model('Item', itemSchema);  
