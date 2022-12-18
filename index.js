const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const resturentRoute = require("./routes/resturent");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

const stripeRoute = require("./routes/stripe");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const cookieSession = require("cookie-session");
const PORT = process.env.PORT || 8000;

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
  })
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/connect/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use(express.json());

app.use("/connect/auth", authRoute);
app.use("/connect/users", userRoute);
app.use("/connect/resturents", resturentRoute);
app.use("/connect/carts", cartRoute);
app.use("/connect/orders", orderRoute);
app.use("/connect/checkout", stripeRoute);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("spoffy/build"));
  const path = required("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resole(__dirname, "spoffy", "build", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log("Backend server is running!");
});
