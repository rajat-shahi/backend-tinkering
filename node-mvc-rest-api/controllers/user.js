const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allUsers = await User.find({});
  return res.status(200).json(allUsers);
}

async function handleGetUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User ID is invalid" });
    } else {
      return res.status(200).json(user);
    }
  } catch (err) {
    console.error("Error occurred : ", err);
    return res.status(404).json({ msg: "User ID is invalid" });
  }
}

async function handleCreateUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res
      .status(400)
      .json({ msg: "Invalid Payload, all fields are required" });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  return res.status(201).json({ msg: "User Creation Successfull" });
}

async function handleUpdateUser(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      email: req.body.email,
      gender: req.body.gender,
      jobTitle: req.body.job_title,
    });

    if (user) {
      return res
        .status(200)
        .json({ msg: "user update successfull", updatedUser: user });
    } else {
      return res.status(404).json({ msg: "User ID is invalid" });
    }
  } catch (err) {
    console.error("Error Occurred : ", err);
    return res.status(404).json({ msg: "User ID is invalid" });
  }
}

async function handleDeleteUser(req, res) {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User ID is invalid" });
    } else {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json({ msg: "Successfully deleted the user" });
    }
  } catch (err) {
    return res.status(404).json({ msg: "User ID is invalid" });
  }
}

module.exports = {
  handleCreateUser,
  handleDeleteUser,
  handleGetAllUsers,
  handleGetUser,
  handleUpdateUser,
};
