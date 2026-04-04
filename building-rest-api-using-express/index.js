const express = require("express");
const app = express();
const port = 8001;
const users = require("./MOCK_DATA.json");

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
    return res.send({ message: "will complete later" });
  })
  .delete((req, res) => {
    return res.send({ message: "will complete later" });
  });

app.post("/api/users", (req, res) => {
  return res.send({ message: "will complete later" });
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
