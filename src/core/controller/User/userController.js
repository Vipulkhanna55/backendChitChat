import bcrypt from "bcryptjs";
import { userModel } from "../../models";

const createUser = async (request, response) => {
  try {
    const { name, gender, email, password } = request.body;
    const userExists = await userModel.findOne({ where: { email } });
    if (userExists) {
      return response
        .status(409)
        .json({ error: "User with given email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = await userModel.create({
      name,
      gender,
      email,
      password: hashedPass
    });
    response
      .status(201)
      .send({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};

const updateUser = async (request, response) => {
  const {name, email, password} = request.body;
  try {
    const user = await userModel.findByPk(request.params.id);
    if (!user) {
      return response.status(404).send('User not found');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    await userModel.update({ name, email, password: hashedPass }, { where: { id: request.params.id }});
    return response.status(200).send('User updated successfully');
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
}

const deleteUser = async (request, response) => {
  try {
    userModel.destroy({ where: { id: request.params.id } })
      .then(() => {
        response.send("deleted successfully");
      })
      .catch((error) => {
        response.status(500).send(error.message);
      });
  } catch (error) {
    console.error(error);
    response.status(500).send("Error in deleting user");
  }
}

const getUsers = async (request, response) => {
  try {
    const users = await userModel.findAll();
    response.status(200).send(users);
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
}

export default { createUser, deleteUser, updateUser, getUsers };
