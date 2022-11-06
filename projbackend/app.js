
require("dotenv").config();         
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//MY ROUTES..
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");




const app = express();
//DB connections...
mongoose
.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

}).then(() =>{
    console.log("DB CONNECTED");
});
//MY MIDDLEWARES....

app.use(bodyParser.json());

app.use(cookieParser());

app.use(cors());

//MY ROUTES...
app.use("/api",authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);


//PORTS...
const port = process.env.PORT || 8000;

//STARTING SERVER...
app.listen(port, () =>{
    console.log(`the app is running on ${port}`);
});