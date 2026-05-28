const {Schema, default: mongoose} = require("mongoose");

const OrderSchema = new Schema({
    
    name: String,
    qty: Number,
    price: Number,
    mode: String,
})

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;