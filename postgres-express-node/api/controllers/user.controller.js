const winston = require("winston");
const { userServiceInstance } = require("../../services");

const Logger = winston.loggers.get("logger");

exports.getUsers = async (req, res) => {
  const users = await userServiceInstance.getAllUsers();
  res.json({ users });
};

exports.getUser = async (req, res) => {
  const { username } = req.body;
  const user = await userServiceInstance.getUser({ username });
  res.json({ user });
};

exports.createUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await userServiceInstance.createUser({ username, password });
    res.json({ user });
  } catch (err) {
    Logger.error(err);
    return res.status(400).json({ error: { message: err.message } });
  }
};