const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Stripe = require('stripe')

const app = express();
const allowedOrigins = [
  "http://localhost:3000",  
  "https://mern-ecommerce-app-frontend1.onrender.com"  
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed: " + origin));
    }
  },
  credentials: true
}));


app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

//mongodb connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect to Database"))
  .catch((err) => console.log(err));

//schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

//
const userModel = mongoose.model("user", userSchema);

//api
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/signup", async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({ message: "Email is already registered", alert: false });
    }

    const newUser = new userModel(req.body);
    await newUser.save();

    return res.json({ message: "Successfully signed up", alert: true });

  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error", alert: false });
  }
});


//api login
app.post("/login", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if (user) {
      const dataSend = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
      };
      return res.json({ message: "Login is successful", alert: true, data: dataSend });
    } else {
      return res.json({ message: "Email is not available, please sign up", alert: false });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error", alert: false });
  }
});


//product section

const schemaProduct = mongoose.Schema({
  name: String,
  category:String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product",schemaProduct)



//save product in data 
//api
app.post("/uploadProduct",async(req,res)=>{
    // console.log(req.body)
    const data = await productModel(req.body)
    const datasave = await data.save()
    res.send({message : "Upload successfully"})
})

//
app.get("/product",async(req,res)=>{
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
})
 
/*****payment getWay */
console.log(process.env.STRIPE_SECRET_KEY)


const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/create-checkout-session",async(req,res)=>{

     try{
      const params = {
          submit_type : 'pay',
          mode : "payment",
          payment_method_types : ['card'],
          billing_address_collection : "auto",
          shipping_options : [{shipping_rate : "shr_1RVpxsR4kSlKCfD3NOpgNsip"}],

          line_items : req.body.map((item)=>{
            return{
              price_data : {
                currency : "inr",
                product_data : {
                  name : item.name,
                  
                },
                unit_amount : item.price * 100,
              },
              adjustable_quantity : {
                enabled : true,
                minimum : 1,
              },
              quantity : item.qty
            }
          }),

          success_url :  `${process.env.FRONTEND_URL}/success`,
          cancel_url :  `${process.env.FRONTEND_URL}/cancle`,

      }

      
      const session = await stripe.checkout.sessions.create(params)
      // console.log(session)
      res.status(200).json(session.id)
     }
     catch (err){
        res.status(err.statusCode || 500).json(err.message)
     }

})


//server is ruuning
app.listen(PORT, () => console.log("server is running at port : " + PORT));
