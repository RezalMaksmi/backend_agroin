// users/users.js
const bcrypt = require("bcryptjs");

const users = [
  {
    id: 1,
    username: "user1",
    password: bcrypt.hashSync("password", 10), // Password di-hash
  },
];

module.exports = { users };
