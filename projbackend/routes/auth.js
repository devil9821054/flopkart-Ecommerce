const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const {signout,signup,signin , isSignedIn} = require("../controllers/auth");

//signup routes..
router.post("/signup",[
    body("name","name should be atleat 3 char").isLength({min:3}),
    body("email","email is required").isEmail(),
    body("password","password should be atleat 3 char").isLength({min:3})


], signup);

//singin  routes....
router.post("/signin",[
    body("email","email is required").isEmail(),
    body("password","password should be atleat 3 char").isLength({min:1})


], signin);

//singout..
router.get("/signout", signout)



module.exports = router;
