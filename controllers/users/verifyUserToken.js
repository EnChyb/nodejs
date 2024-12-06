const { fetchUser } = require('./services')

const verifyUserToken = async (req, res, next) => {
    try {
        const verificationToken = req.params.verificationToken
        const user = await fetchUser({verificationToken});
        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            user.verify = true;
            user.verificationToken = ' ';
            await user.save();
            res.status(200).json({ message: "Verification successful" });
        }
        } catch (error) {
            next(error);
    }

}

module.exports = verifyUserToken