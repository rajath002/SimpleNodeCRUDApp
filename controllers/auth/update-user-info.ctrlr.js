const users = require("../../models/users.model");

module.exports = async (req, res, next) => {
    const {mongoId} = req.params;
    const updatedUsers = await users.updateOne({_id: mongoId}, req.body).exec();
    console.log("Updated users : ", updatedUsers);
    
    
    const allUsers = await users.find({site_admin:false}).exec();
    return res.render("users", {pageTitle: "users", users: allUsers, error: false});
}