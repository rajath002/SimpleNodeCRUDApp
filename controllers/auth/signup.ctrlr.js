const randomize = require("randomatic");
const user = require("../../models/users.model");

module.exports = (req, res, next) => {
    const {username, password, cPassword} = req.body;
    if (password !== cPassword) 
        return res.render("signup", {pageTitle: "signup", usernamePresent: true, username: username, error: true, errMsg: "Passwords donot match"});
    const obj = {
        id : randomize("0", 7),
        node_id: randomize("*", 10),
        login: username,
        password:password,
        site_admin: true
    }
    
    const usr = new user(obj);

    usr.save().then(data => {
        return res.render("signin", {pageTitle: "Signin",error:false, usernamePresent: false});
    }).catch(err => {
        console.log("ERROR : ", err);
        return res.render("signup", {error:true, errMsg: "Something went wrong", usernamePresent:true, username: username});
    });
    // console.log(obj);
    // return res.json(obj);
}