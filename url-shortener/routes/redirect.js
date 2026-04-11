const express = require("express");
const router = express.Router();
const { handleRedirectUrl } = require("../controllers/url");

router.get("/:shortId", handleRedirectUrl);

module.exports = router;
