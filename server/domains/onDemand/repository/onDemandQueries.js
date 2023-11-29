module.exports = {
    findOnDemandListSql  : (page, itemPerPage) => {
        return `
      SELECT * FROM on_demand LIMIT ${(page - 1) * itemPerPage}, ${itemPerPage};
      `;
    },
    findOnDemandListCountSql  : () => {
        return `
      SELECT COUNT(*) as count FROM on_demand;
      `;
    },

    findOnDemandAllFilterSql  : () => {
        return `
      select group_concat(distinct year) as yearFilter, 
      group_concat(distinct region) as regionFilter,
      group_concat(distinct language) as languageFilter,
      group_concat(distinct application) as applicationFilter
      from on_demand
      where not (year is NULL and region is NULL and language is NULL and application is NULL)
      `;
    },

    findOnDemandPageVideoSql  : (page, itemPerPage, year, region, language, application, keyword ) => {
        let sql;
        if (
            !page &&
            !itemPerPage &&
            !year &&
            !region &&
            !language &&
            !application
        )
            sql = `SELECT * FROM on_demand 
        ${
                keyword
                    ? `WHERE concat_ws('',title, speaker, affiliation, abstract_desc) 
            LIKE "%${keyword}%"`
                    : ``
            }
        ORDER BY year DESC,region LIMIT 0,6;`;
        else if (
            page &&
            itemPerPage &&
            !year &&
            !region &&
            !language &&
            !application
        ) {
            sql = `SELECT * FROM on_demand
        ${
                keyword
                    ? `WHERE concat_ws('',title, speaker, affiliation, abstract_desc) 
            LIKE "%${keyword}%"`
                    : ``
            }
        ORDER BY year DESC,region LIMIT ${
                (page - 1) * itemPerPage
            }, ${itemPerPage};`;
        } else {
            sql = `SELECT *  FROM on_demand WHERE
        ${
                year
                    ? `year in (${year
                        .split(",")
                        .map((m) => {
                            return `"${m}"`;
                        })
                        .join(",")}) `
                    : `IFNULL(year, '') LIKE '%'`
            }
        and ${
                region
                    ? `region in (${region
                        .split(",")
                        .map((m) => {
                            return `"${m}"`;
                        })
                        .join(",")}) `
                    : `IFNULL(region, '') LIKE '%'`
            }
        and  ${
                language
                    ? `language in (${language
                        .split(",")
                        .map((m) => {
                            return `"${m}"`;
                        })
                        .join(",")}) `
                    : `IFNULL(language, '') LIKE '%'`
            }
        and ${
                application
                    ? `${application
                        .split(",")
                        .map((m) => {
                            return `application LIKE "%${m}%"`;
                        })
                        .join(" or ")} `
                    : `IFNULL(application, '') LIKE '%'`
            }  
        ${
                keyword
                    ? `and concat_ws('',title, speaker, affiliation, abstract_desc) 
            LIKE "%${keyword}%"`
                    : ``
            } ORDER BY year DESC, region
        LIMIT ${(page - 1) * itemPerPage}, ${itemPerPage};
      `;}
        return sql;
    },
    findOnDemandPageVideoCountSql  : (page, itemPerPage, year, region, language, application, keyword) => {

      return  `
      SELECT count(*) as count FROM on_demand WHERE
        ${
            year
                ? `year in (${year
                    .split(",")
                    .map((m) => {
                        return `"${m}"`;
                    })
                    .join(",")}) `
                : `IFNULL(year, '') LIKE '%'`
        }
        and ${
            region
                ? `region in (${region
                    .split(",")
                    .map((m) => {
                        return `"${m}"`;
                    })
                    .join(",")}) `
                : `IFNULL(region, '') LIKE '%'`
        }
        and  ${
            language
                ? `language in (${language
                    .split(",")
                    .map((m) => {
                        return `"${m}"`;
                    })
                    .join(",")}) `
                : `IFNULL(language, '') LIKE '%'`
        }
        and ${
            application
                ? `${application
                    .split(",")
                    .map((m) => {
                        return `application LIKE "%${m}%"`;
                    })
                    .join(" or ")} `
                : `IFNULL(application, '') LIKE '%'`
        } 
        ${
            keyword
                ? `and concat_ws('',title, speaker, affiliation, abstract_desc) 
            LIKE "%${keyword}%"`
                : ``
        } ORDER BY year DESC, region ;
      `;
    },
    findOnDemandVideoSql  : (id) => {
        return `
      SELECT * FROM on_demand WHERE id=${id};
      `;
    },
    updateOnDemandListSql  : (dto) => {
        const {
            id,
            title,
            speaker,
            affiliation,
            abstractDesc,
            region,
            year,
            language,
            thumbnail,
            video,
            application,
        } = dto;

        let sql;
        if (id) {
            sql = `
          UPDATE on_demand SET 
            title='${title}',
            speaker='${speaker}',
            affiliation='${affiliation}',
            abstract_desc='${abstractDesc}',
            region='${region}',
            year='${year}',
            language='${language}',
            thumbnail='${thumbnail}',
            video='${video}',
            application='${application}'
          WHERE id=${id};
        `;
        } else {
            sql = `
        INSERT INTO on_demand (
          title,
          speaker,
          affiliation,
          abstract_desc,
          region,
          year,
          language,
          thumbnail,
          video,
          application
        ) VALUES (
          '${title}',
          '${speaker}',
          '${affiliation}',
          '${abstractDesc}',
          '${region}',
          '${year}',
          '${language}',
          '${thumbnail}',
          '${video}',
          '${application}'
        );
        `;
        }

        return sql;
    },
    deleteOnDemandListSql  : (id) => {
        return `
      DELETE FROM on_demand WHERE id=${id};
      `;
    },
    findOnDemandApplicationSql  : () => {
        return  `
      SELECT * FROM on_demand_application;
      `;
    },
    deleteOnDemandApplicationSql  : (id) => {
        //쿼리 자체에 오류가 있는듯 해서 수정했음 프론트와 연결 테스트 필요
        const deleteIds = Array.isArray(id) ? id : [id];
        return `
      DELETE FROM on_demand_application WHERE ${deleteIds.map((m) => {
                return `id = ${m}`;
            })
            .join(" or ")}
      `;
    },
    createOnDemandApplicationSql  : (dto) => {
        return `INSERT INTO on_demand_application (application) VALUES('${dto.application}');`;

    },
    findOnDemandApplicationIdSql  : (application) => {
        return `SELECT id from on_demand_application where application in ('${application
            .split(",")
            .join(" , ")}')`;
    },
    findSearchVideoSql  : () => {}

}