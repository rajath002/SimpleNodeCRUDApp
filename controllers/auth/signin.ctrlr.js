const users = require("../../models/users.model");

module.exports = async (req, res, next) => {
    try {
        const {userName, password} = req.body;

        console.log("usersName : ", userName, " password : ", password);
        
        const user = await users.find({login:userName, password:password}).exec();

        console.log("Users : ", user);

        if(user.length > 0) {
            const allUsers = await users.find({site_admin:false}).exec();
            return res.render("users", {pageTitle: "users", users: allUsers, error: false});
        } else {
            return res.render("signin", {pageTitle: "signin", error: true, errMsg:"Invalid Credetials, Signin Failed!"});
        }

    } catch (err) {
        console.log("error", err);
        return res.render("signin", { pageTitle: "Signin",error: true, errMsg:"Something went wrong"});
    }
}