const express = require("express");
const router = express.Router();
const LoginProfileController = require("../Controller/LoginProfile_Controller");
const imagemulter = require("../config/image_multer")

// GET all specialists
router.get("/get", LoginProfileController.get);

// POST a new specialist
router.post("/",imagemulter.single("image"),LoginProfileController.create);
// Delete a new specialist 
router.delete('/delete/:id', LoginProfileController.delete)
router.put('/profiles/:id', LoginProfileController.update);

// route.post("/", imagemulter.single("image"), imagecontroller.create)


module.exports = router;