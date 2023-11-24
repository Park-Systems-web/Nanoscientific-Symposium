module.exports = {

    findMenuListSql: (nation, year, language) => {
        let sql;
        if (nation === "china") {
            sql = `SELECT id,
                          ${language === "china" ? "name" : "name_en"} as name,
                          path,
                          is_published,
                          is_main,
                          parent,
                          menu.show,
                          has_child
                   FROM menu${year && year !== "2022" ? ` WHERE year="${year}"` : ` WHERE year IS NULL`};`;
        } else {
            sql = `
                SELECT *
                FROM menu${year && year !== "2022" ? ` WHERE year="${year}"` : ` WHERE year IS NULL`};
            `;
        }
        return sql;
    }, updateMenuListSql: (menu, year) => {
        let sql;
        if (menu.isChanged) {
            sql = `UPDATE menu
                   SET is_published=${menu.is_published},
                       menu.show=${menu.show}
                   WHERE id = ${menu.id} and ${
                           year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`
                   };
            `;
            return sql;
        } else return  null;
    },
    findIsAdminSql: (path) => {
        return  `SELECT is_published
                         FROM menu
                         WHERE path = '${path}'`;
    },
    updateIsAdminSql: (requestBody) => {
        return  `UPDATE menu
                         SET is_published=${requestBody.isPublished}
                         WHERE path = '${requestBody.path}'`;
    }


}