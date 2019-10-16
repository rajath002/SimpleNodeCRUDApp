const users = require("../../models/users.model");

module.exports = async (req, res) => {
    console.log("params ---> ", req.params);
    const {mongoId} = req.params;
    const usr = await users.findOne({_id:mongoId}).exec();
    console.log("USer ::: ", usr);
    return res.render("update", {pageTitle:"update", user:usr});
}