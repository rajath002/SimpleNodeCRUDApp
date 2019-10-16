const users = require("../../models/users.model");

module.exports = async (req, res, next) => {
    const {id} = req.params;
    const deletedUsers = await users.deleteMany({_id:id}).exec();
    console.log("Deleted users : ", deletedUsers);

    const allUsers = await users.find({site_admin:false}).exec();
    // return res.render("users", {pageTitle: "Users", users: allUsers, error: false});
    return res.redirect("/users")
}