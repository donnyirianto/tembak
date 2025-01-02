const crypto = require("crypto");

const getAESEncrypted = async (plaintext) => {
  try {
    const key = Buffer.from("IDMC0mmandMustbeSetFor5ecr3t@3DP");
    const iv = Buffer.from("R4h451A_3DP@4MaN");

    let cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(plaintext, "utf8", "base64");
    encrypted += cipher.final("base64");

    return encrypted;
  } catch (err) {
    throw new Error(`Encryption failed: ${err.message}`);
  }
};

module.exports = {
  getAESEncrypted,
};
