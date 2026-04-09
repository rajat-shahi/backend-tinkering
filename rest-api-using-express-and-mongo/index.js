const express = require("express");
const mongoose = require("mongoose");
const port = 3000;
const app = express();

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});

// let's connect mongoDB with our server
mongoose
  .connect("mongodb://127.0.0.1:27017/rest-api-test")
  .then(() => {
    console.log("MongoDB is Connected");
  })
  .catch((err) => {
    console.log("Error occurred while connecting with mongoDB : ", err);
  });

// created schema for the DB
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// now, we have to create the Model so that we can use it for writing and reading data
const User = mongoose.model("users", userSchema);

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

// routes
app.get("/users", async (req, res) => {
  const allUsers = await User.find({});
  console.log(allUsers);
  const html = `
    
    <h1> List of Users : </h1>
    <ul style="font-size : 25px">
        ${allUsers
          .map((user) => {
            return `<li>${user.firstName}</li>`;
          })
          .join("")}
    </ul>
  `;

  return res.status(200).send(html);
});

app.get("/api/users", async (req, res) => {
  const allUsers = await User.find({});
  return res.status(200).json(allUsers);
});

app.post("/api/users", async (req, res) => {
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
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
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
  })
  .patch(async (req, res) => {
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
  })
  .delete(async (req, res) => {
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
  });
