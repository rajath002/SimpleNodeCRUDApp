
module.exports = (err, req, res) => {
    try {
        return res.status(500).json({message:err.message});
    } catch (err) {
        return res.status(500).json({message:err.message});
    }
}