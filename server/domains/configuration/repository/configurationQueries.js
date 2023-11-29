
module.exports = {
    findConfigSql : () => {
        return  `
      SELECT * FROM configuration
      `;},
    updateConfigSql : (alert_receive_email) => {
        return `UPDATE configuration SET
      ${
            alert_receive_email
                ? `alert_receive_email = "${alert_receive_email}"`
                : ""
        }
      WHERE id='1';
      `;
    }
};