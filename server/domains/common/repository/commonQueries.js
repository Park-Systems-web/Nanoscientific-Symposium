const commonQueries = {
    findProgramsSQL: (year) => {
        return `SELECT *
                FROM programs
                WHERE status = 1
                  and ${
                        year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`
                }
                ORDER BY start_time `;
    },
    findAgendasSQL: (year) => {
        return `SELECT *
                FROM program_agenda where${
                        year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`
                }
                ORDER BY program_id, next_id`;
    },
    findSessionsSQL: (year) => {
        return `SELECT *
                FROM program_sessions
                WHERE status = 1
                  and ${
                        year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`
                }
                ORDER BY date `;
    },
    findSpeakersSQL: (year) => {
        return `
            SELECT *
            FROM speakers as S${
                    year && year !== "2022"
                            ? ` WHERE year="${year}"`
                            : ` WHERE year IS NULL`
            };
        `;
    },
    findSpeakersAbstractSQL: (year) => {
        return `SELECT *
                FROM speaker_abstract as S
                WHERE year${
                        year && year !== "2022" ? `=${year}` : ` IS NULL`
                };`;
    },
    updateSpeakerListSql: (list) => {
        return `UPDATE speakers
                SET name='${list.name}',
                    belong='${list.belong}',
                    image_path='${list.image_path}',
                    keynote=${list.keynote},
                    description='${list.description}',
                    has_abstract=${list.has_abstract},
                    year=${list.year}
                WHERE id = ${list.id}
        `;
    },
    updateSpeakerAbstractListSql: (AList) => {
        return `UPDATE speaker_abstract
                SET speaker_id='${AList.speaker_id}',
                    belong='${AList.belong}',
                    description='${AList.description}',
                    year='${AList.year && AList.year !== "2022" ? AList.year : null}'
                WHERE id = ${AList.id};`;
    },
    findPostersSql: (year) => {
        return `SELECT *
                FROM poster where${
                        year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`
                }; `;
    },
    createPostersSQL: (dto) => {
        let sql = "";
        if (dto.id === undefined) {
            sql = `INSERT INTO poster (title, sub_title, author, image, attachment, year)
                   VALUES ('${dto.title}', '${dto.affiliation}', '${dto.author}',
                           '${dto.previewURL}', '${dto.filePath}', ${
                                   dto.year && dto.year !== "2022" ? `'${dto.year}'` : null
                           })`;
        } else {
            sql = `UPDATE poster
                   SET title='${dto.title}',
                       sub_title='${dto.affiliation}',
                       author='${dto.author}',
                       image='${dto.previewURL}',
                       attachment='${dto.filePath}'
                   WHERE id = ${dto.id}
            `;
        }
        return sql;

    },
    deletePosterSQL: (id) => {
        return `DELETE
                FROM poster
                WHERE id = ${id}`;
    },
    updatePostersSQL: (listElements) => {
        return `UPDATE poster
                SET title='${listElements.title}',
                    sub_title='${listElements.sub_title}',
                    author='${listElements.author}',
                    image='${listElements.image}',
                    attachment='${listElements.attachment}'
                WHERE id = ${listElements.id}
        `;
    },
    findKeynoteSpeakersSql: (year) => {
        return `
            SELECT *
            FROM speakers${
                    year && year !== "2022"
                            ? ` WHERE year="${year}"`
                            : ` WHERE year IS NULL`
            } and keynote=1;
        `;

    },
    findSpeakerDetailByIdSql: (nation, id) => {
        let sql;
        if (nation === "china") {
            sql = `SELECT S.id,
                          S.name,
                          S.name_en,
                          S.image_path,
                          S.description    as title,
                          S.description_en as title_en,
                          SA.belong,
                          SA.belong_en,
                          SA.description,
                          SA.description_en
                   FROM speakers as S
                            INNER JOIN speaker_abstract as SA
                                       ON S.id = SA.speaker_id
                   WHERE S.id = ${id}
            `;
        } else {
            sql = `
                SELECT S.id,
                       S.name,
                       S.image_path,
                       S.description as title,
                       SA.belong,
                       SA.description
                FROM speakers as S
                         INNER JOIN speaker_abstract as SA
                                    ON S.id = SA.speaker_id
                WHERE S.id = ${id}
            `;
        }
        return sql;
    },
    findBannerSql: (year, path) => {
        return `SELECT banner_path
                from banner
                WHERE path = '${decodeURIComponent(path)}'
                  and ${year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`}`;

    },
    updateBannerSql: (dto) => {
        return `UPDATE banner
                SET banner_path='${dto.imagePath}'
                WHERE path = '${decodeURIComponent(
                        dto.path
                )}'
                  and ${dto.year && dto.year !== "2022" ? ` year="${dto.year}"` : ` year IS NULL`}`;

    },
    findLandingSectionListSql: (nation, year,language) => {
        let sql;
        if (nation === "china") {
            sql = `
                SELECT id,
                       ${language === "china" ? "title" : "title_en"} as title,
                       landing_section.show
                FROM landing_section${
                        year && year !== "2022"
                                ? ` WHERE year="${year}"`
                                : ` WHERE year IS NULL`
                };
            `;
        } else {
            sql = `
                SELECT *
                FROM landing_section${
                        year && year !== "2022"
                                ? ` WHERE year="${year}"`
                                : ` WHERE year IS NULL`
                };
            `;
        }

        return sql;
    },
    updateLandingSectionListSql: (landing) => {
        return `
            UPDATE landing_section
            SET landing_section.show=${landing.show}
            WHERE id = ${landing.id}
        `;
    },
    updateLandingTitleSql: (dto,id) => {
        let sql;
        if (dto.nation === "china") {
            sql = `
                UPDATE landing_section
                SET landing_section.${
                        dto.language === "china" ? "title" : "title_en"
                }='${dto.title}'
                WHERE section_no = ${id}
                  and dto.year${dto.year && dto.year != "2022" ? `=${dto.year}` : ` IS NULL`}
            `;
        } else
            sql = `
                UPDATE landing_section
                SET landing_section.title='${dto.title}'
                WHERE section_no = ${id}
                  and year${dto.year && dto.year != "2022" ? `=${dto.year}` : ` IS NULL`}
            `;
        return sql;
    },
    //퀘리가 이상한 부분이 있어서 수정
    findLandingBannerSql: (nation, year, langSfx) => {
        let sql;
        if (nation === "china" && langSfx === "china") {
            sql = `SELECT background,
                          bg_overlay,
                          logo,
                          venue,
                          date,
        show_register,
        \`desc\` as \`desc\`
                   from landing_banner
                       ${
                               year && year !== "2022"
                                       ? ` WHERE year="${year}"`
                                       : ` WHERE year IS NULL`
                       }`;
        } else {
            sql = `SELECT *
                   from landing_banner ${
                           year && year !== "2022"
                                   ? ` WHERE year="${year}"`
                                   : ` WHERE year IS NULL`
                   }`;
        }
        return sql;
    },
    updateLandingBannerSql: (dto, langSfx) => {
        let sql;
        if (dto.nation === "china") {
            sql = `UPDATE landing_banner
                   SET date${langSfx}='${dto.date}',
                       landing_banner.desc='${dto.desc}',
                       venue${langSfx}='${dto.venue}',
                       background='${dto.background}'
                   WHERE year${dto.year && dto.year !== "2022" ? `=${dto.year}` : " IS NULL"}
            `;
        } else {
            sql = `UPDATE landing_banner
                   SET date='${dto.date}',
                       landing_banner.desc='${dto.desc}',
                       venue='${dto.venue}',
                       background='${dto.background}'
                   WHERE year${dto.year && dto.year !== "2022" ? `=${dto.year}` : " IS NULL"}
            `;
        }
        return sql;
    },
    findLandingContentSql: (nation, year, language, id) => {
        let sql;
        if (
            nation === "china" &&
            id !== "4" &&
            // sponsor
            id !== "7" &&
            id !== "8" &&
            id !== "9" &&
            // sponsor end
            id !== "6"
        ) {
            sql = `
                SELECT ${
                        language === "china" ? "description" : "description_en"
                } as description, id, year
                FROM landing_section_${id}${
                        year && year !== "2022"
                                ? ` WHERE year="${year}"`
                                : ` WHERE year IS NULL`
                };
            `;
        } else
            sql = `
                SELECT *
                FROM landing_section_${id} ${
                        year && year !== "2022"
                                ? ` WHERE year="${year}"`
                                : ` WHERE year IS NULL OR year="2022"`
                };
            `;
        return sql;
    },
    findLandingContent2Sql: (language, year) => {
        return `
            SELECT ${
                           language === "china" ? "description" : "description_en"
                   } as description,
                   teaser
            FROM landing_section_2
            WHERE year${year && year != "2022" ? `=${year}` : ` IS NULL`};
        `;
    },
    updateLanding2ContentSql: (dto) => {
        let sql;
        if (dto.nation === "china") {
            sql = `UPDATE landing_section_2
                   SET ${
                               dto.language === "china" ? "description" : "description_en"
                       }='${dto.description}'
                   WHERE year${dto.year && dto.year != "2022" ? `=${dto.year}` : ` IS NULL`}`;
        } else
            sql = `UPDATE landing_section_2
                   SET description='${dto.description}'
                   WHERE year${dto.year && dto.year != "2022" ? `=${dto.year}` : ` IS NULL`}
            `;
        return sql;
    },
    updateLanding2ContentSql2: (dto) => {
        let sql
        if (dto.nation === "china") {
            sql = `UPDATE landing_section
                   SET ${dto.language === "china" ? "title" : "title_en"}='${dto.title}'
                   WHERE section_no = 2
                     and year${dto.year && dto.year != "2022" ? `=${dto.year}` : ` IS NULL`}
            `;
        } else {
            sql = `UPDATE landing_section
                   SET title='${dto.title}'
                   WHERE section_no = 2
                     and year${dto.year && dto.year != "2022" ? `=${dto.year}` : ` IS NULL`}
            `;
        }
        return sql;
    },
    findLanding3ContentSql: (nation, language, year) => {
        let sql;
        if (nation === "china") {
            sql = `
                SELECT ${
                        language === "china" ? "description" : "description_en"
                } as description
                FROM landing_section_3
                where year${year && year != "2022" ? `=${year}` : ` IS NULL`};
            `;
        } else {
            sql = `SELECT description
                   FROM landing_section_3
                   where year${year && year != "2022" ? `=${year}` : ` IS NULL`};
            `;
        }
        return sql;
    },
    updateLanding3ContentSql: (dto) => {
        let sql;
        if (dto.nation === "china") {
            sql = `UPDATE landing_section_3
                   SET ${
                               dto.language === "china" ? "description" : "description_en"
                       }='${dto.description}'
                   WHERE year${dto.year && dto.year != "2022" ? `=${dto.year}` : ` IS NULL`}
            `;
        } else
            sql = `UPDATE landing_section_3
                   SET description='${dto.description}'
                   WHERE year${dto.year && dto.year != "2022" ? `=${dto.year}` : ` IS NULL`}
            `;
        return sql;
    },
    updateLanding3ContentSql2: (dto) => {
        let sql;
        if (dto.nation === "china") {
            sql = `UPDATE landing_section
                   SET ${dto.language === "china" ? "title" : "title_en"}='${dto.title}'
                   WHERE section_no = 3
                     and year${dto.year && dto.year != "2022" ? `=${dto.year}` : ` IS NULL`}
            `;
        } else {
            sql = `UPDATE landing_section
                   SET title='${dto.title}'
                   WHERE section_no = 3
                     and year${dto.year && dto.year != "2022" ? `=${dto.year}` : ` IS NULL`}

            `;
        }
        return sql;
    },
    findLanding6ContentSql: (nation, langSfx, year) => {
        let sql;
        if (nation === "china") {
            sql = `
                SELECT description${langSfx} as description,
                       url,
                       button_text${langSfx} as button_text
                FROM landing_section_6
                WHERE year${year && year != "2022" ? `=${year}` : ` IS NULL`}
            `;
        } else {
            sql = `
                SELECT description,
                       url,
                       button_text,
                FROM landing_section_6;
                WHERE year
                ${year ? `=${year}` : ` IS NULL`}
            `;
        }
        return sql;
    },
    updateLanding6ContentSql: (dto, langSfx) => {
        let sql;
        if (dto.nation === "china") {
            `UPDATE landing_section_6
             SET description${langSfx}='${dto.description}'
             WHERE id = 1
               and year${dto.year ? `=${dto.year}` : " IS NULL"}`;
        } else {
            sql = `UPDATE landing_section_6
                   SET description='${dto.description}'
                   WHERE year${dto.year ? `=${dto.year}` : " IS NULL"};
            `;
        }
        return sql;
    },
    updateLanding6ButtonSql: (dto, langSfx) => {
        let sql;
        if (dto.nation === "china") {
            sql = `UPDATE landing_section_6
                   SET url='${dto.url}',
                       button_text${langSfx}='${dto.buttonText}'
                   WHERE year${dto.year ? `=${dto.year}` : " IS NULL"}`;
        } else {
            sql = `UPDATE landing_section_6
                   SET url='${dto.url}',
                       button_text='${dto.buttonText}'
                   WHERE year${dto.year ? `=${dto.year}` : " IS NULL"}
            `;
        }
        return sql;
    },
    createLanding4ContentSql: (dto) => {
        return `INSERT INTO landing_section_4 (title, description${
                dto.year ? ",year" : ""
        })
                VALUES ('${dto.title}',
                        '${dto.description}'${dto.year ? `,${dto.year}` : ""})`;
    },
    updateLanding4ContentSql: (dto) => {
        return `UPDATE landing_section_4
                SET title='${dto.title}',
                    description='${dto.description}'
                WHERE id = ${dto.id}`;
    },
    deleteLanding4ContentSql: (id) => {
        return `DELETE
                FROM landing_section_4
                WHERE id = ${id}`;
    },
    createSponsorSql: (dto) => {
        return `INSERT INTO landing_section_${dto.sectionNo}
                    (name, url, image_path, height, year)
                VALUES ('${dto.name}', '${dto.url}', '${dto.imagePath}',
                        ${dto.height ? dto.height : 0}, ${
                                dto.year ? dto.year : null
                        })
        `;
    },
    updateSponsorSql: (dto) => {
        return `UPDATE landing_section_${dto.sectionNo}
                SET name='${dto.name}',
                    url='${dto.url}',
                    image_path='${dto.imagePath}',
                    height=${dto.height ? dto.height : 0}
                WHERE id = ${dto.id}
        `;
    },
    deleteSponsorSql: (sectionNo, id) => {
        return `DELETE FROM landing_section_${sectionNo}
                WHERE id = ${id}`;
    },
    findAbstractDescSql: (year) => {
        return `
            SELECT *
            FROM abstract_submission_desc${
                    year && year !== "2022"
                            ? ` WHERE year="${year}"`
                            : ` WHERE year IS NULL`
            };
        `;
    },
    updateAbstractDescSql: (dto) => {
        let sql;
        console.log(dto.id);
        if (dto.id) {
            sql = `UPDATE abstract_submission_desc as a
                   SET a.desc="${dto.desc}"${
                           dto.year && dto.year !== "2022"
                                   ? ` WHERE year="${dto.year}"`
                                   : ` WHERE year IS NULL`
                   };`;
        } else {
            sql = `
                INSERT INTO abstract_submission_desc (${"`desc`"}, year)
                VALUES ('${dto.desc}', '${dto.year}');
            `;
        }
        return sql;
    },
    findEditorContentSql: (tableName, year) => {
        return `
            SELECT *
            FROM ${tableName}_content ${
                    year && year !== "2022" ? ` WHERE year="${year}"` : `WHERE year IS NULL`
            }
        `;
    },
    updateEditorContentSql: (dto) => {
        return `
            UPDATE ${dto.tableName}_content
            SET description='${dto.content}'
                ${
                        dto.year && dto.year !== "2022" ? ` WHERE year="${dto.year}"` : `WHERE year IS NULL`
                }
        `;
    }

}
module.exports = commonQueries;