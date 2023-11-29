const announcementQueries = {

    getPostAllListLengthQuery: (year) => {
        return `SELECT id
                FROM announcement${
                        year && year !== "2022"
                                ? ` WHERE year="${year}"`
                                : ` WHERE year IS NULL`
                };`;
    },
    getPostListQuery: (year, page, postPerPage) => {
        return `SELECT *,
                       (SELECT count(*) FROM announcement) as total_count
                FROM announcement${
                        year && year !== "2022"
                                ? ` WHERE year="${year}"`
                                : ` WHERE year IS NULL`
                }
                ORDER BY created DESC
                    LIMIT ${(Number(page) - 1) * postPerPage}, ${postPerPage}`;
    },
    getPostByIdQuery: (id, year, admin) => {
        return admin == 1
            ? `SELECT id, title, content, created, hits
               FROM announcement
               WHERE id = ${id} and ${
                       year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`
               };`
            : `SELECT id, title, content, created, hits + 1 as hits
               FROM announcement
               WHERE id = ${id} and ${
                       year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`
               };`;
    },
    increaseViewQuery: (row, id, year) => {
        return `UPDATE announcement
                SET hits=${
                        row[0][0].hits
                }
                WHERE id = ${id} and ${
                        year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`
                };`;
    },
    postPostQuery: (requestBody) => {
        let sql;
        const id = requestBody.id;
        const title = requestBody.title;
        const content = requestBody.content;
        const year = requestBody.year;
        if (!id) {
            sql = `INSERT INTO announcement
                       (title, content, year)
                   VALUES ('${title}', '${content}'${
                           year && year !== "2022" ? `,'${year}'` : null
                   })
            `;
        } else {
            sql = `
                UPDATE announcement
                SET title='${title}',
                    content='${content}'
                WHERE id = ${id} and ${
                        year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`
                };
            `;
        }
        return sql;
    },
    deletePostQuery: (id, year) => {
        return `DELETE
                FROM announcement
                WHERE id = ${id} and ${
                        year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`
                };`;
    },
    findAnnouncementReadQuery: (id, year) => {
        return `SELECT user_id, announcement_id
                FROM announcement_read
                WHERE user_id = ${id} and ${
                        year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`
                };`;
    },
    findAnnouncementReadDataQuery: (year) => {
        return `SELECT id
                FROM announcement${
                        year && year !== "2022" ? ` WHERE year="${year}"` : ` WHERE year IS NULL`
                };`;
    },
    postPostInfoQuery:(requestBody) =>{
        return `INSERT
            IGNORE INTO announcement_read (user_id, announcement_id, year) VALUES ('${requestBody.userId}', '${requestBody.announcementId}', '${requestBody.year && requestBody.year !== "2022" ? requestBody.year : null}')`;
    },
    deleteReadPostInfoQuery:(announcementId, year)=>{
        return `DELETE
                         FROM announcement_read
                         WHERE announcement_id = ${announcementId} and ${
            year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`
        }; `;
    }

}
module.exports = announcementQueries;