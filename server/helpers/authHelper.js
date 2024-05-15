const bcrypt = require("bcrypt");

//hash password
module.exports.hashPass = async (password) => {
  try {
    const salt = 10;
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.log(error);
  }
};

//compare password
module.exports.comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
