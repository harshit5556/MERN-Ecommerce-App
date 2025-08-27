const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Stripe = require("stripe");
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

dotenv.config();

const PORT = process.env.PORT || 8080;
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL)
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

const userModel = mongoose.model("user", userSchema);

//api

app.get("/", (req, res) => {
  res.send("Server is running");
});

//sign up
app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, image } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return res.send({ message: "Email id is already registered", alert: false });
    }

    if (password !== confirmPassword) {
      return res.send({ message: "Passwords do not match", alert: false });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      image,
    });

    await newUser.save();

    res.send({ message: "Successfully signed up", alert: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server error", alert: false });
  }
});


//login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.send({
        message: "Email is not available, please sign up",
        alert: false,
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send({ message: "Invalid credentials", alert: false });
    }

    // generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const dataSend = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
      token,
    };

    res.send({
      message: "Login successfully",
      alert: true,
      data: dataSend,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server error", alert: false });
  }
});


//product section

const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});

const productModel = mongoose.model("product", schemaProduct);

//create a middleware for verify token
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; 

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
};

//api
app.post("/uploadProduct", authMiddleware, async (req, res) => {
  const data = new productModel(req.body);
  await data.save();
  res.send({ message: "Upload successfully" });
});


//

app.get("/product", async (req, res) => {
  const data = await productModel.find({});

  res.send(JSON.stringify(data));
});

/*****payment getWay */

console.log(process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const params = {
      submit_type: "pay",

      mode: "payment",

      payment_method_types: ["card"],

      billing_address_collection: "auto",

      shipping_options: [{ shipping_rate: "shr_1RWbeHR4kSlKCfD38MdOYYhW" }],

      line_items: req.body.map((item) => {
        return {
          price_data: {
            currency: "inr",

            product_data: {
              name: item.name,
            },

            unit_amount: item.price * 100,
          },

          adjustable_quantity: {
            enabled: true,

            minimum: 1,
          },

          quantity: item.qty,
        };
      }),

      success_url: `${process.env.FRONTEND_URL}/success`,

      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(params); 

    res.status(200).json(session.id);
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
});
//server is ruuning
app.listen(PORT, () => console.log("server is running at port : " + PORT));

