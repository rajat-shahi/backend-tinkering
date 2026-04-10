const express = require("express");
const router = express.Router();
const {
  handleCreateUser,
  handleDeleteUser,
  handleGetAllUsers,
  handleGetUser,
  handleUpdateUser,
} = require("../controllers/user");

router.get("/", handleGetAllUsers);
router.post("/", handleCreateUser);

router
  .route("/:id")
  .get(handleGetUser)
  .patch(handleUpdateUser)
  .delete(handleDeleteUser);

module.exports = router;
