const crypto = require("crypto");

const getAESEncrypted = async (plaintext) => {
  try {
    const key = Buffer.from("IDMC0mmandMustbeSetFor5ecr3t@3DP");
    const iv = Buffer.from("R4h451A_3DP@4MaN");

    const blockSize = 16;
    const paddingLength = blockSize - (plaintext.length % blockSize);
    const paddedText = Buffer.concat([Buffer.from(plaintext), Buffer.alloc(paddingLength, paddingLength)]);

    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(paddedText);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return encrypted.toString("base64");
  } catch (err) {
    throw new Error(`Encryption failed: ${err.message}`);
  }
};

module.exports = {
  getAESEncrypted,
};
