const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const Player = require("../models/Player");

//@router  GET api/auth
//@desc    Test router
//@access  Public
router.get("/", auth, async (req, res)=>{
   try {
       const player = await Player.findById(req.player.id).select("-password -date");
       res.json(player)

   }catch (err){
       console.error(err.message);
       res.status(500).send("Server error")

   }
});

//@router  POST api/auth
//@desc    Authenticate player and get token
//@access  Public
router.post("/", [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
], async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const { email, password} = req.body;
    try {
        const player = await Player.findOne({email});

        if (!player){
            return res.status(400).json({errors : [{msg: "Invalid Credentials"}]})
        }

        const isMatch = await bcrypt.compare(password, player.password)
        if(!isMatch){
            return res.status(400).json({errors : [{msg: "Invalid Credentials"}]})
        }


        const payload = {
            player: {
                id: player.id
            }
        }

        jwt.sign(payload,
            config.get("jwtSecret"),
            { expiresIn: 360000},
            (err, token)=>{
                if(err) throw err;
                res.json({token})

            })

    }catch (err){
        console.error(err.message);
        res.status(500).send("Server error.")
    }
});

module.exports = router;