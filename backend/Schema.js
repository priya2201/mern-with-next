const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },  // Text input
  details: [
    {
      key: { type: String },   // Text input
      value: { type: String }, // Text input
    },
  ],
  image: { type: String },  // File input (or URL for image)
  description: { type: String },  // Textarea
  productAvailable: { type: Boolean, default: true },  // Checkbox
  price: { type: Number, required: true },  // Number input
  rating: { type: Number, min: 1, max: 5 },  // Radio button (rating 1-5)
  categories: [{ type: String }],  // Multi-select dropdown
  colorOptions: [{ 
    color: { type: String }, 
    hex: { type: String }
  }],  // Checkbox for color options
  size: { type: String, enum: ['S', 'M', 'L', 'XL','XXL'] },  // Radio button for sizes
  launchDate: { type: Date },  // Date picker
  tags: [{ type: String }],  // Chip input or multi-select
  stockQuantity: { type: Number },  // Number input
  productImages: [{ type: String }],
  productQuestions: [
    {
      question: { type: String },
      answer:{type:String}
    }
  ],
  productSpeciality:[{type:String}]
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
