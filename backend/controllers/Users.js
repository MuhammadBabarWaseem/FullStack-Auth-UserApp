import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const getUsers = async (req, res) => {
    try {
        const user = await Users.findAll({
            attributes: ['id', 'firstname', 'lastname', 'email']
        });
        res.json(user);
    } catch (error) {
        console.log(error);
    }
}

export const Register = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        await Users.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashPassword
        });
        res.json({ msg: "Register Successful" })
    } catch (error) {
        console.log(error)
    }
}

export const Login = async (req, res) => {
    try {
        const user = await Users.findAll({
            where: {
                email: req.body.email
            }
        })
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) return res.status(400).json({ msg: "Wrong Password" });
        const userId = user[0].id;
        const firstname = user[0].firstname;
        const lastname = user[0].lastname;
        const email = user[0].email;
        const accessToken = jwt.sign({ userId, firstname, lastname, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({ userId, firstname, lastname, email }, process.env.REFREH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await Users.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httponly: true,
            maxAge: 24 * 60 * 60 * 1000,
        })
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({ msg: "Email Not Found" })
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({ refresh_token: null }, {
        where : {
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}