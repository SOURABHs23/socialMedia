import bcrypt from "bcrypt";
import UserRepository from "./user.repository.js";
import jwt from "jsonwebtoken";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(req, res, next) {
    try {
      console.log("inside signUp", req.body);
      const { name, email, password } = req.body;
      const hashpassword = await bcrypt.hash(password, 12);
      const obj = {
        name: name,
        email: email,
        password: hashpassword,
      };
      await this.userRepository.signUp(obj);
      res.status(201).send(obj);
    } catch (err) {
      console.log(err);
      next(err);
      // return res.status(400).send("somthing went wrorng here");
    }
  }

  async signIn(req, res, next) {
    try {
      // find user by email
      const user = await this.userRepository.findByEmail(req.body.email);
      if (!user) {
        return res.status(400).send("Incorrect Credentials");
      } else {
        // comparing password with hashed password
        const result = await bcrypt.compare(req.body.password, user.password);
        if (!result) {
          return res.status(400).send("Incorrect Credentials");
        } else {
          // 1. Create token.
          const token = jwt.sign(
            {
              userId: user._id,
              email: user.email,
            },
            "codinNinjas",
            {
              expiresIn: "2h",
            }
          );
          //   return res
          //     .cookie("jwtToken", token, {
          //       maxAge: 1 * 60 * 60 * 1000,
          //       httpOnly: true,
          //     })
          //     .json({ success: true, msg: "user login successfull", token });
          // 2. Send token.
          return res.status(200).send(token);
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send("somthing went wrorng here");
    }
  }
}
