import bcrypt from "bcryptjs";
import { userModel } from "../../models";

const createUser = async (req, res) => {
  try {
    const { name, gender, email, password } = req.body;
    const userExists = await userModel.findOne({ where: { email } });
    if (userExists) {
      return res
        .status(409)
        .json({ error: "User with given email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    console.log("this is hashed pass ", typeof hashedPass);
    const newUser = await userModel.create({
      name,
      gender,
      email,
      password: hashedPass,
    });
    res
      .status(201)
      .send({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
};

export default { createUser };
