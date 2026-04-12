const express = require("express");
const app = express();
const PORT = 8001;
const urlRouter = require("./routes/url");
const redirectRouter = require("./routes/redirect");
const { connectMongoDb } = require("./connection");
const DB_ENDPOINT = "mongodb://127.0.0.1:27017/short-url";
const url = require("./models/url");

connectMongoDb(DB_ENDPOINT);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

// middlewares
app.use(express.json({ extended: false }));

app.get("/test", async (req, res) => {
  const allUrls = await url.find({});

  let renderedHtml = `
  <html>
    <head></head>
    <body>
      <ol>
        ${allUrls
          .map((link) => {
            return `<li><b>${link.shortId} - ${link.redirectUrl} - ${link.visitHistory.length}</b></li>`;
          })
          .join("")}
      </ol>
    </body>
  </html>
  `;

  return res.send(renderedHtml);
});

app.use("/url", urlRouter);
app.use("/", redirectRouter);
