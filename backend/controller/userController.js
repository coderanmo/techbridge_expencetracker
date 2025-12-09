const userModel = require('../db/userModel')
const { error, success } = require('../utils/handler')

const loginController = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.send({
                status: 0,
                msg: "email and password are required"
            });
        }

        let checkEmail = await userModel.findOne({ email: email });
          console.log(checkEmail)
        
        if (checkEmail) {
            if (checkEmail.password === password) {
                return res.send({
                    status: 1,
                    msg: "successful login",
                    user:checkEmail
                });
            } else {
                return res.send({
                    status: 0,
                    msg: "please fill correct password"
                });
            }
        }

        // Email not found
        return res.send({
            status: 0,
            msg: "please register"
        });

    } catch (error) {
        console.log(error);
        return res.send({
            status: 0,
            msg: "internal server error",
            error: error.message
        });
    }
};



const signupContorller = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.send(error(401, "Enter Every Field!!!"));
        }
        const newUser = await userModel.create({
            username,
            email,
            password
        })

        return res.send(success(201, "user is created"));
    } catch (err) {
        return res.send(error(401, err.message));
    }
}

const logoutController = async (req, res) => {

}

module.exports = {
    loginController,
    logoutController,
    signupContorller
}