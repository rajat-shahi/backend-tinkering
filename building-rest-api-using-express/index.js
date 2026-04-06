const express = require("express");
const app = express();
const port = 8001;
let users = require("./MOCK_DATA.json");
const fs = require("fs");

// using the middleware to parse the form data
app.use(express.urlencoded({ extended: false }));

// middleware to add the 'id' to the user to be inserted
app.use((req, res, next) => {
  if (req.path === "/api/users" && req.method === "POST") {
    req.body.id = users.length + 1;
  }
  next();
});

// routes
app.get("/", (req, res) => {
  return res.send("Hello, this is homepage");
});

app.get("/users", (req, res) => {
  // convert every element "user name" as li element
  const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;

  return res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const userId = Number(req.params.id);

    const userData = users.find((user) => user.id === userId);
    if (userData === undefined) {
      return res.send(`No user with the id = ${userId} found`);
    } else {
      return res.json(userData);
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
          return res.send(
            `The data sent is successfully updated for id ${users.length}`,
          );
        }
      });
    } else {
      return res.send(`No user with the id = ${userId} found`);
    }
  })
  .delete((req, res) => {
    const userId = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      return res.send(`No user with the id = ${userId} found`);
    } else {
      users.splice(userId - 1, 1);
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        return res.send(
          `The data sent is successfully deleted for id ${userId}`,
        );
      });
    }
  });

app.post("/api/users", (req, res) => {
  const reqBody = req.body;
  console.log(req.body.id);
  users.push(reqBody);
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      console.error("Error while writing to the file : ", err);
    } else {
      return res.send(
        `The data sent is successfully processed and entered with id ${users.length}`,
      );
    }
  });
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
