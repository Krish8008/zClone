const { Schema } = require("mongoose");
const { default: WatchList } = require("../../dashboard/src/components/WatchList");

const WatchlistSchema = new Schema({
    name: String,
    price: Number,
    percent: String,
    isDown: Boolean,
})

const Watchlist = mongoose.model("Watchlist", WatchlistSchema);
module.exports = WatchList;