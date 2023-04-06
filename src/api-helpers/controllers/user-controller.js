import User from "../model/User";
import cookie from "cookie";
import { setCookies } from 'cookies-next';

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name && name.trim() === "" && !email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({ message: "Invalid Inputs" })
    }

    const userExist = await User.findOne({ email: email });

    if (userExist) {
        return res.status(422).json({ error: "Email already Exist" });
    }
    let user;

    try {
        user = new User({ name, email, password, isAdmin: false });
        user = await user.save()
    } catch (err) {
        return new Error(err)
    }

    if (!user) {
        return res.status(500).json({ message: "Internal Server Error" })
    }

    return res.status(201).json({ user })
}

export const signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({ message: "Invalid Inputs" })
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
        if (!password === userLogin.password) {
            res.status(400).json({ error: "Invalid Credientials " });
        } else {
            setCookies('email', email, { req, res, maxAge: 60 * 6 * 24 });
            res.json({ message: "user Signin Successfully" });
        }
    } else {
        res.status(400).json({ error: "Invalid Credientials " });
    }
}