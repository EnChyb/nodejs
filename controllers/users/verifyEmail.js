const mail = require('../../modules/sendMail');
const { fetchUser } = require('./services')
// const ejs = require('ejs');
// const fs = require('fs').promises;
// const path = require('path');




const verifyEmail = async (req, res, next) => {
    const email = req.body.email;
    // const htmlTemplatePath = path.join(process.cwd(), 'views', 'emailTemplate.ejs')


    if (!email) {
        return res.status(400).json({ message: "Missing required field email" });
    }

    try {
        // console.log("path template", htmlTemplatePath)
        // const template = await fs.readFile(htmlTemplatePath, 'utf-8');
        // console.log("po readFile", template)

        const user = await fetchUser({ email });
        console.log("po fetch user", user)

        if (!user) {
        res.status(404).json({ message: "User not found" });
        }
        
        if (user.verify) {
            return res
            .status(400)
            .json({ message: "Verification has already been passed" });
        }

        const verificationToken = user.verificationToken; 
        console.log("verification token", verificationToken)
        // TUTAJ CHCIAŁAM UŻYĆ PLIK EJS(emailTemplate.ejs), ALE W MAILU NIE TWORZYŁ SIĘ LINK - WIĘC TO ODŁĄCZYŁAM
        // const link = `<a href="http://localhost:3000/api/users/verify/${verificationToken}">CONFIRM REGISTRATION</a>`
        // console.log("link:", link)
        // const html = await ejs.render(template, { link:link });
        // console.log("html w ejs", html)
        const html = `<a href="http://localhost:3000/api/users/verify/${verificationToken}">CONFIRM REGISTRATION</a>`
        await mail(email, html);


        res.status(200).json({ message: "Verification email sent" });
    } catch (error) {
        console.log(error)
        next(error)
        
    }

}

module.exports = verifyEmail
