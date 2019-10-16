const users = require("mongoose");

module.exports = (req, res, next) => {
    const users = users.find([{
        isActive: true
    }]).exec();

    return res.render("users",{users:users, pageTitle: "Users"});
}