const express = require("express");
const app = express();
const port = 8001;
let users = require("./MOCK_DATA.json");
const fs = require("fs");

// using the middleware to parse the form data
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  if (req.path === "/api/users" && req.method === "POST") {
    req.body.id = users.length + 1;
  }
  // always add 'X' to the custom headers
  console.log(req.headers);
  console.log(req.headers["content-type"]);
  req.headers["Custom-Header-For-Request"] = "Random value";
  console.log("Request Headers after modification", req.headers);
  // console.log("Response Headers", res.headers); -> this doesn't works and gives us the undefined because there is no 'headers' object for response

  // methods for setting, getting response headers
  res.setHeader("X-Author", "Rajat");
  res.set("X-msg", "This is a custom header set up by author");
  console.log(res.getHeaders());
  console.log(res.get("X-Author"));

  next();
});

// routes
app.get("/", (req, res) => {
  return res.status(200).send("Hello, this is homepage");
});

app.get("/users", (req, res) => {
  // convert every element "user name" as li element
  const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;

  return res.status(200).send(html);
});

app.get("/api/users", (req, res) => {
  return res.status(200).json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const userId = Number(req.params.id);

    const userData = users.find((user) => user.id === userId);
    if (userData === undefined) {
      return res.status(404).send(`No user with the id = ${userId} found`);
    } else {
      return res.status(200).json(userData);
    }
  })
  .patch((req, res) => {
    const updatedBody = req.body;
    const userId = Number(req.params.id);

    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex < users.length) {
      updatedBody.id = users[userIndex].id;
      users[userIndex] = updatedBody;

      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
          throw err;
        } else {
          return res
            .status(200)
            .send(
              `The data sent is successfully updated for id ${users.length}`,
            );
        }
      });
    } else {
      return res.status(404).send(`No user with the id = ${userId} found`);
    }
  })
  .delete((req, res) => {
    const userId = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      return res.status(404).send(`No user with the id = ${userId} found`);
    } else {
      users.splice(userId - 1, 1);
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        return res
          .status(200)
          .send(`The data sent is successfully deleted for id ${userId}`);
      });
    }
  });

app.post("/api/users", (req, res) => {
  const reqBody = req.body;

  if (
    !reqBody ||
    !reqBody.first_name ||
    !reqBody.last_name ||
    !reqBody.email ||
    !reqBody.gender ||
    !reqBody.job_title
  ) {
    return res.status(400).send("The payload is invalid");
  }

  console.log(req.body.id);
  users.push(reqBody);
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      console.error("Error while writing to the file : ", err);
    } else {
      return res
        .status(201)
        .send(
          `The data sent is successfully processed and entered with id ${users.length}`,
        );
    }
  });
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
