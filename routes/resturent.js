const router = require("express").Router();
const { find } = require("../models/Resturent");
const Resturent = require("../models/Resturent");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const newProduct = new Resturent(req.body);
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Resturent.findByIdAndDelete(req.params.id);
    res.status(200).json("successsfully delete");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedProduct = await Resturent.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get product
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Resturent.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all product
router.get("/", async (req, res) => {
  const qCategory = req.query.category;
  try {
    if (qCategory === "rating" || !qCategory) {
      const resturents = await Resturent.find({}, { products: 0 }).sort({
        rating: 1,
      });
      res.status(200).json(resturents);
    } else if (qCategory === "revelance") {
      const resturents = await Resturent.find({}, { products: 0 }).sort({
        createdAt: 1,
      });
      res.status(200).json(resturents);
    } else if (qCategory === "delivery") {
      const resturents = await Resturent.find({}, { products: 0 }).sort({
        createdAt: -1,
      });
      res.status(200).json(resturents);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/allProducts", async (req, res) => {
  const resturents = await Resturent.find();
  const allProducts = [];
  try {
    for (let i = 0; i < resturents.length; i++) {
      allProducts.push(...resturents[i].products);
    }
    res.status(200).json(allProducts);
    // allProducts.fil()
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const resturents = await Resturent.findById(req.params.id);
    const products = resturents.products;
    const product = products.filter(
      (product) => product._id === req.body.productId
    );
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/add/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const resturent = await Resturent.findById(req.params.id);
    if (
      !resturent.products
        .map((product) => product.cat)
        .includes(req.body.product.cat)
    ) {
      await resturent.updateOne({ $push: { products: req.body.product } });
      res.status(200).json("success");
    } else {
      res.status(403).json("product already exist");
    }
    if (!resturent.available.includes(req.body.product.type)) {
      await resturent.updateOne({
        $push: { available: req.body.product.type },
      });
    }
  } catch (err) {
    res.status(403).json(err);
  }
});

router.put("/update/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedResturent = await Resturent.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedResturent);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put(
  "/updateProduct/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const resturent = await Resturent.findById(req.params.id);
      const product = resturent.products.filter(
        (product) => product.cat !== req.body.product.cat
      );
      await product.updateOne({ $set: { product: req.body.product } });
      res.status(200).json("success");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
