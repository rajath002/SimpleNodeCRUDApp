const express = require("express");
const request = require("request");
const signInController = require("../controllers/auth/signin.ctrlr");
const signUpController = require("../controllers/auth/signup.ctrlr");
const getUserController = require("../controllers/auth/get-users.ctrlr");
const deleteUserCtrlr = require("../controllers/auth/delete-user.ctrlr");
const getUpdateUserInfoCtrlr = require("../controllers/auth/get-user-for-update.ctrlr");
const UpdateUserInfoCtrlr = require("../controllers/auth/update-user-info.ctrlr");

const fs = require("fs");

const router = express.Router();

router.get("/", (req, res) => res.render("signin", {pageTitle:"signin", error: false}));

router.post("/", signInController);

router.get("/signup", (req, res)=>res.render("signup", {pageTitle: "signup", usernamePresent:false, error:false}));

router.post("/signup", signUpController);

router.get("/delete/:id", deleteUserCtrlr);

router.get("/update/:mongoId", getUpdateUserInfoCtrlr);

router.post("/update/:mongoId", UpdateUserInfoCtrlr);

router.get("/users",async (req, res)=>{
    users = require('../models/users.model');
    const allUsers = await users.find({site_admin:false}).exec();
    return res.render("users", {pageTitle: "users", users: allUsers, error: false});
});

/**
 * Below api is used to load the from https://api.github.com/users/octocat/followers
 */
// router.get("/loaddata", (req, res)=>{
//     const API = "https://api.github.com/users/octocat/followers";
//     fs.readFile("config/users.json", "utf8", (err, data)=>{
//         if(err) {
//             console.log("Error : ", err);
//         }
//         console.log(data);
//         const users = require("../models/users.model");
//         const jsn = JSON.parse(data);
        
//         users.insertMany(jsn).then(dt=>{
//             return res.json(dt);
//         }).catch(err=>{
//             return res.json(err);
//         })
//     })
// });

module.exports = router;