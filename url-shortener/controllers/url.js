const { nanoid } = require("nanoid");
const Url = require("../models/url");

async function handleGenerateShortUrl(req, res) {
  const newShortId = nanoid(8);
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }

  await Url.create({
    shortId: newShortId,
    redirectUrl: body.url,
    visitHistory: [],
  });

  return res
    .status(201)
    .json({ msg: `short URL generated with id : ${newShortId}` });
}

async function handleAnalytics(req, res) {
  const id = req.params.id;
  const entry = await Url.findOne({
    shortId: id,
  });

  const clickCount = entry.visitHistory.length;
  const clickBody = entry.visitHistory;

  return res.status(200).json({ clickCount: clickCount, analytics: clickBody });
}

async function handleRedirectUrl(req, res) {
  const id = req.params.shortId;

  const entry = await Url.findOneAndUpdate(
    { shortId: id },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
  );

  console.log(entry);

  res.redirect(entry.redirectUrl);
}

module.exports = {
  handleGenerateShortUrl,
  handleAnalytics,
  handleRedirectUrl,
};
