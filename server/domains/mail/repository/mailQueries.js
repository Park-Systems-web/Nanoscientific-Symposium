module.exports = {
    createEmailVerificationSql  : (email,token) => {
        return `INSERT INTO email_verification (email, token)
      VALUES ("${email}","${token}")
      ON DUPLICATE KEY UPDATE
      token="${token}"`;
    },
    findEmailVerification  : (email) => {
        return `SELECT token from email_verification WHERE email="${email}"`;
    }
}