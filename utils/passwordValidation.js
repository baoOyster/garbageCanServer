const bcrypt = require('bcrypt');

const passwordHash = async (password) => {
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      return await bcrypt.hash(password, salt);
    } catch (err) {
      console.log(err);
    }
    return null;
};


const comparePasswords = async (password, hash) => {
    try {
      const matchFound = await bcrypt.compare(password, hash);
      return matchFound;
    } catch (err) {
      console.log(err);
    }
    return false;
};

module.exports = {passwordHash, comparePasswords};