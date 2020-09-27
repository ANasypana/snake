const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const Player = require("../models/Player");
const auth = require("../middleware/auth")

//@router  GET api/players
//@desc    Get all players
//@access  Public

router.get("/", async (req, res) =>{
    try {
        const total = await Player.countDocuments();

        // Pagination

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const players = await Player.find().select("-password -email -date")
            .sort("-scores")
            .skip(startIndex).limit(limit);

        // Pagination result
        const pagination = {};

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            };
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            };
        }

        res.json({
            count: total,
            pagination,
            data: players
        })

    }catch (err){
        console.error(err.message);
        res.status(500).send("Server error")
    }
});


//@router  POST api/players
//@desc    Register player
//@access  Public
router.post("/", [
    check("name", "Name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({min: 6})
], async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})

    }

    const {name, email, password} = req.body;
    try {
        let player = await Player.findOne({email});

        if (player){
            return res.status(400).json({errors : [{msg: "Player with  this email already exists"}]})
        }

        player = await new Player({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);

        player.password = await bcrypt.hash(password, salt);

        await player.save();

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

//@router  PUT api/players
//@desc    Update player`s data
//@access  Privat

router.put("/", [auth, [
    check("scores", "Scores is required and should be number").isInt({ min: 0 }),
    check("level", "Level should be number > 1").optional().isInt({ min: 1 }),

]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    };

    try {

        let player = await Player.findById(req.player.id);

        const playerFields = {scores: player.scores + req.body.scores};
        if(req.body.level) playerFields.level = req.body.level < player.level ? player.level : req.body.level;
        player = await Player.findOneAndUpdate(
        {_id:req.player.id},
            playerFields,
            {new: true}
        )
            .select("-password -date")

        res.json(player)

    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error")
    }

});

//@router  DELETE api/players
//@desc    Remove player
//@access  Privat

router.delete("/", auth, async (req, res) => {
    try {
        await Player.deleteOne({_id: req.player.id});
        res.json({msg: "Player deleted"});

    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error")
    }
});


module.exports = router;