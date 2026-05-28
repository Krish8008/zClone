require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoute = require("./routes/AuthRoute");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors({
  origin:  "https://zclone-frontend.onrender.com",
  credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());


const Holding = require("./model/HoldingSchema.js");
const Position = require("./model/PositionSchema.js");
const Order = require("./model/OrderSchema.js");

const port = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;

const holdings = [
  {
    name: "BHARTIARTL",
    qty: 2,
    avg: 538.05,
    price: 541.15,
    net: "+0.58%",
    day: "+2.99%",
  },
  {
    name: "HDFCBANK",
    qty: 2,
    avg: 1383.4,
    price: 1522.35,
    net: "+10.04%",
    day: "+0.11%",
  },
  {
    name: "HINDUNILVR",
    qty: 1,
    avg: 2335.85,
    price: 2417.4,
    net: "+3.49%",
    day: "+0.21%",
  },
  {
    name: "INFY",
    qty: 1,
    avg: 1350.5,
    price: 1555.45,
    net: "+15.18%",
    day: "-1.60%",
    isLoss: true,
  },
  {
    name: "ITC",
    qty: 5,
    avg: 202.0,
    price: 207.9,
    net: "+2.92%",
    day: "+0.80%",
  },
  {
    name: "KPITTECH",
    qty: 5,
    avg: 250.3,
    price: 266.45,
    net: "+6.45%",
    day: "+3.54%",
  },
  {
    name: "M&M",
    qty: 2,
    avg: 809.9,
    price: 779.8,
    net: "-3.72%",
    day: "-0.01%",
    isLoss: true,
  },
  {
    name: "RELIANCE",
    qty: 1,
    avg: 2193.7,
    price: 2112.4,
    net: "-3.71%",
    day: "+1.44%",
  },
  {
    name: "SBIN",
    qty: 4,
    avg: 324.35,
    price: 430.2,
    net: "+32.63%",
    day: "-0.34%",
    isLoss: true,
  },
  {
    name: "SGBMAY29",
    qty: 2,
    avg: 4727.0,
    price: 4719.0,
    net: "-0.17%",
    day: "+0.15%",
  },
  {
    name: "TATAPOWER",
    qty: 5,
    avg: 104.2,
    price: 124.15,
    net: "+19.15%",
    day: "-0.24%",
    isLoss: true,
  },
  {
    name: "TCS",
    qty: 1,
    avg: 3041.7,
    price: 3194.8,
    net: "+5.03%",
    day: "-0.25%",
    isLoss: true,
  },
  {
    name: "WIPRO",
    qty: 4,
    avg: 489.3,
    price: 577.75,
    net: "+18.08%",
    day: "+0.32%",
  },
];

const positions = [
  {
    product: "CNC",
    name: "EVEREADY",
    qty: 2,
    avg: 316.27,
    price: 312.35,
    net: "+0.58%",
    day: "-1.24%",
    isLoss: true,
  },
  {
    product: "CNC",
    name: "JUBLFOOD",
    qty: 1,
    avg: 3124.75,
    price: 3082.65,
    net: "+10.04%",
    day: "-1.35%",
    isLoss: true,
  },
];

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// app.get("/addHoldings", async (req, res) => {
//   await Holding.deleteMany({});
//   await Holding.insertMany(holdings);
//   console.log("all holdings added...");
// })

app.get("/allHoldings", async (req, res) => {
    try{
      const data = await Holding.find({});
      res.status(200).json(data);
      console.log("all hindings")
    } catch (err){
      console.log("error in feching all holdings");
    }
})

app.post("/addHolding", async (req, res) => {
    try{
      const holding = await new Holding({
        name : req.body.name,
        qty: req.body.qty, 
        avg: (req.body.qty * req.body.price) / req.body.qty ,
        price: req.body.price * req.body.qty,
        net: (req.body.price).toString(),
        day: "",
      });
      await holding.save();

    }catch (err) {

    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to add holding",
      error: err.message,
    });
  }
});

app.get("/allPositions", async (req, res) => {
    try{
      const data = await Position.find({});
      res.status(200).json(data);
      console.log("all Positions")
    } catch (err){
      console.log("error in feching all positions");
    }
})

app.post("/newOrder", async (req, res) => {
  try{
    const order = new Order({
        name: req.body.name,
        qty: req.body.qty,
        price: req.body.price,
        mode: req.body.mode,
    });
    await order.save();
  }catch(err){
      console.log("error in backend",err);
  }
    
})

app.get("/allOrder", async (req, res) => {

  try {
    const orders = await Order.find({});
    res.json(orders);

  } catch (err) {

    console.log(err);
    res.status(500).json({
      message: "Server Error in get orders..",
    });

  }
});

app.use("/", authRoute); 

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});