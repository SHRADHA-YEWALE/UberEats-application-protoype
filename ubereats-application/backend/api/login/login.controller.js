const {
    login,
} = require("./login.service");

console.log('req');
module.exports = {
    login: (req, res) => {
        body = req.body
        login(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    }
}