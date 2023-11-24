
 module.exports = {
    postSessionQuery: (requestBody) =>{
         let sql;
         if (requestBody.nation === "china") {
             sql = `INSERT INTO program_sessions(session_title, session_title_en,date,year) VALUES('${requestBody.title}','${requestBody.title_en}','${requestBody.date.substr(
                 0,
                 10
             )}',${requestBody.year && requestBody.year !== "2022" ? `'${requestBody.year}'` : null})`;

         } else
             sql = `INSERT INTO program_sessions(session_title,date,year) VALUES('${requestBody.title}','${requestBody.date.substr(
                 0,
                 10
             )}', ${requestBody.year && requestBody.year !== "2022" ? `'${requestBody.year}'` : null})`;
         return sql;

     },

     patchSessionQuery: (requestBody) =>{
         let sql;
         if (requestBody.nation === "china") {
             sql = `UPDATE program_sessions SET session_title='${requestBody.title}',session_title_en='${requestBody.title_en}',date='${requestBody.date.substr(
                 0,
                 10
             )}', status=${requestBody.status} WHERE id=${requestBody.id}`;
         } else
             sql = `UPDATE program_sessions SET session_title='${requestBody.title}',date='${requestBody.date.substr(
                 0,
                 10
             )}', status=${requestBody.status} WHERE id=${requestBody.id}`;
         return sql;
     },

     deleteSessionQuery:  (id) =>{
         // delete programs
         let sqlForDeleteProgram;
         sqlForDeleteProgram = `DELETE FROM programs WHERE session=${id}`;


         // delete session
         let sqlForDeleteSession = `DELETE FROM program_sessions WHERE id=${id}`;

         return {sqlForDeleteProgram,sqlForDeleteSession};

     },
     postProgramQuery:  (requestBody) =>{
         let sql;


         if (requestBody.nation === "china") {
             sql = `INSERT INTO programs(
          session,
          start_time,
          end_time,
          title,
          title_en,
          speakers,
          speakers_en,
          description,
          description_en,
          emphasize,
          year
          ) VALUES(
            ${requestBody.session},
            '${requestBody.startTime}',
            '${requestBody.endTime}',
            '${requestBody.title}',
            '${requestBody.title_en}',
            '${requestBody.speakers}',
            '${requestBody.speakers_en}',
            '${requestBody.description}',
            '${requestBody.description_en}',
            ${requestBody.emphasize},
            ${requestBody.year && requestBody.year !== "2022" ? `'${requestBody.year}'` : null}
          )`;
         } else
             sql = `INSERT INTO programs(session,start_time,end_time,title,speakers,description, emphasize,year
                 ) VALUES(${requestBody.session},
                          '${requestBody.startTime}',
                          '${requestBody.endTime}',
                          '${requestBody.title}',
                          '${requestBody.speakers}',
                          '${requestBody.description}', 
                          ${requestBody.emphasize}, 
                          ${requestBody.year && requestBody.year !== "2022" ? `'${requestBody.year}'` : null})`;
         return sql;
     },

     reOrderProgramQuery:  (requestBody, postResult) =>{
         let sql;
         sql =
             `UPDATE programs SET next_id=${
                 postResult[0].insertId
             } WHERE id!=${
                 postResult[0].insertId
             } AND session=${requestBody.session} AND next_id IS NULL AND${
                 requestBody.year && requestBody.year !== "2022" ? ` year="${requestBody.year}"` : ` year IS NULL`
             };`;
         return sql;
     },
     patchProgramQuery:  (requestBody) =>{
         let sql;
         if (requestBody.nation === "china") {
             sql = `UPDATE programs SET 
      
                    session=${requestBody.session}, 
                    title='${requestBody.title}',
                    title_en='${requestBody.title_en}',
                    speakers='${requestBody.speakers}',
                    speakers_en='${requestBody.speakers_en}',
                    description="${requestBody.description}",
                    description_en="${requestBody.description_en}",
                    start_time='${requestBody.startTime}',   
                    end_time='${requestBody.endTime}',
                    emphasize=${requestBody.emphasize} WHERE id=${requestBody.id}`;
         } else {
             sql = `UPDATE programs
                    SET session=${requestBody.session},
                        title='${requestBody.title}',
                        speakers='${requestBody.speakers}',
                        description="${requestBody.description}",
                        start_time='${requestBody.startTime}',
                        end_time='${requestBody.endTime}',
                        emphasize=${requestBody.emphasize}
                    WHERE id = ${requestBody.id}`;
         }
         return sql;
     },

     findProgramQuery:  (id)=>{
         return `SELECT * FROM programs WHERE id=${id}`;
     },
     deleteProgramQuery:  (id)=>{
         return `DELETE FROM programs WHERE id=${id}`;
     },
     deleteProgramAgendaQuery:  (id)=>{
         return `DELETE FROM program_agenda WHERE program_id=${id}`;
     },
     reOrderProgramAftDeleteQuery:  (nextId,id )=>{
         return `UPDATE programs SET next_id=${nextId} WHERE next_id=${id}`;
     },


     createAgendaQuery:  (requestBody) =>{
         return ` INSERT INTO program_agenda(
                            session_id,
                            program_id,title,
                            speakers, 
                            year) 
                VALUES(${requestBody.session_id},
                ${requestBody.program_id},
                '${requestBody.title}',
                '${requestBody.speakers}', 
                ${requestBody.year && requestBody.year !== "2022" ? `'${requestBody.year}'` : null})`;
     },

     reOrderProgramAgendaQuery:  (postResult,programId) => {
         return `UPDATE program_agenda SET 
        next_id=${postResult[0].insertId} 
        WHERE 
        id!=${postResult[0].insertId} 
        AND program_id=${programId}
        AND ${postResult[0].year && postResult[0].year !== "2022" ? ` year="${postResult[0].year}"` : ` year IS NULL`}
        AND next_id=99999`;
     },

     patchAgendaQuery:  (requestBody) =>{
         return `UPDATE program_agenda SET session_id=${requestBody.session_id},program_id=${requestBody.program_id}, title='${requestBody.title}',speakers='${requestBody.speakers}' WHERE id=${requestBody.id} `;
     },

     deleteAgendaQuery: (id) =>{
         const selectProgramAgenda = `SELECT * FROM program_agenda WHERE id=${id}`;
         const deleteProgramAgenda = `DELETE FROM program_agenda WHERE id=${id}`;


         return {selectProgramAgenda,deleteProgramAgenda};
     },
     reOrderProgramAgendaQuery2: (id, nextId)=>{
         return `UPDATE program_agenda SET next_id=${nextId} WHERE next_id=${id}`;
     },

     reorderAgendaListQuery:(agenda)=>{
         return `UPDATE program_agenda SET next_id=${agenda.next_id} WHERE id=${agenda.id}`;
     },

     getHiddenProgramQuery: (year)=>{
         return `SELECT * FROM programs WHERE status=0 and${
             year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`
         };`;
     },
     getHiddenSessionQuery: (year)=>{
         return `SELECT * FROM program_sessions WHERE status=0 and${
             year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`
         };`;
     },
     openProgramQuery: (program)=>{
         return `UPDATE programs SET status=1 WHERE id=${program.id}`;
     },
     openSessionQuery: (session)=>{
         return `UPDATE program_sessions SET status=1 WHERE id = ${session.id}`;
     },
     postSpeakerQuery: (requestBody) =>{
         let sql;
         if (requestBody.nation === "china") {
             sql = `INSERT INTO speakers
        (
          name,
          name_en,
          belong,
          belong_en,
          image_path,
          status,
          keynote,
          description,
          description_en,
          has_abstract,
      is_hide,
      year
        )
        VALUES(
          '${requestBody.name}',
          '${requestBody.name_en}',
          '${requestBody.belong}',
          '${requestBody.belong_en}',
          '${requestBody.imagePath}',
          1,
           ${requestBody.keynote},
          '${requestBody.description}',
          '${requestBody.description_en}',
           ${requestBody.hasAbstract},
           ${requestBody.is_hide},
           ${requestBody.year && requestBody.year !== "2022" ? `'${requestBody.year}'` : null}
        )`;
         } else
         {
             sql = `INSERT INTO speakers
      (name,belong,image_path,status,keynote,description,has_abstract,year)
      VALUES('${requestBody.name}','${requestBody.belong}','${requestBody.imagePath}',1, ${requestBody.keynote},'${requestBody.description}', ${requestBody.hasAbstract}, ${
                 requestBody.year && requestBody.year !== "2022" ? `'${requestBody.year}'` : null
             })`;
         }

         return sql;
     },
     postSpeakerAbstractQuery: (requestBody,data)=>{
         let sql;
         if (requestBody.nation === "china") {
             sql = `INSERT INTO speaker_abstract(
          speaker_id,
          belong,
          belong_en,
          description,
          description_en,
          year
        )
        VALUES(
          ${data[0].insertId},
          '${requestBody.abstractBelong}',
          '${requestBody.abstractBelong_en}',
          '${requestBody.abstractDesc}',
          '${requestBody.abstractDesc_en}',
          ${requestBody.year && requestBody.year !== "2022" ? `'${requestBody.year}'` : null}
        )`;
         } else
             sql = `INSERT INTO speaker_abstract(speaker_id,belong,description,year)
          VALUES(${data[0].insertId},'${requestBody.abstractBelong}','${requestBody.abstractDesc}',${
                 requestBody.year && requestBody.year !== "2022" ? `'${requestBody.year}'` : null
             })`;
         return sql;
     },
     patchSpeakerQuery: (requestBody) =>{
         let sql;
         if (requestBody.nation === "china") {
             sql = `UPDATE speakers SET 
     
                name='${requestBody.name}',
                name_en='${requestBody.name_en}',
                belong='${requestBody.belong}',
                belong_en='${requestBody.belong_en}',
                image_path='${requestBody.imagePath}',
                keynote=${requestBody.keynote},
                description='${requestBody.description}', 
                description_en='${requestBody.description_en}', 
                has_abstract=${requestBody.hasAbstract},
                is_hide=${requestBody.is_hide},
                year=${requestBody.year && requestBody.year !== "2022" ? `'${requestBody.year}'` : null}
                WHERE id=${requestBody.id}
                `;
         } else {
             sql = `UPDATE speakers SET 
                name='${requestBody.name}',
                belong='${requestBody.belong}',
                image_path='${requestBody.imagePath}',
                keynote=${requestBody.keynote},
                description='${requestBody.description}', 
                has_abstract=${requestBody.hasAbstract},
                is_hide=${requestBody.is_hide},
                year=${requestBody.year && requestBody.year !== "2022" ? `'${requestBody.year}'` : null}
                WHERE id=${requestBody.id}
                `;
         }
         return sql;
     },
     postSpeakerAbstractQuery2: (requestBody) => {
         let sql;
         if (requestBody.nation === "china") {
             sql = `INSERT INTO speaker_abstract (speaker_id,
                                                  belong,
                                                  belong_en,
                                                  description,
                                                  description_en,
                                                  year)
                    VALUES (${requestBody.id},
                            '${requestBody.abstractBelong}',
                            '${requestBody.abstractBelong_en}',
                            '${requestBody.abstractDesc}',
                            '${requestBody.abstractDesc_en}',
                            ${requestBody.year && requestBody.year !== "2022" ? `'${requestBody.year}'` : null}) ON DUPLICATE KEY
             UPDATE
                 belong='${requestBody.abstractBelong}',
                 belong_en='${requestBody.abstractBelong_en}',
                 description='${requestBody.abstractDesc}',
                 description_en='${requestBody.abstractDesc_en}',
                 year =${requestBody.year && requestBody.year !== "2022" ? `'${requestBody.year}'` : null}
             `;
         } else {
             sql = `INSERT INTO speaker_abstract (speaker_id,
                                                  belong,
                                                  description,
                                                  year)
                    VALUES (${requestBody.id},
                            '${requestBody.abstractBelong}',
                            '${requestBody.abstractDesc}',
                            ${requestBody.year && requestBody.year !== "2022" ? `'${requestBody.year}'` : null}) ON DUPLICATE KEY
             UPDATE
                 belong='${requestBody.abstractBelong}',
                 description='${requestBody.abstractDesc}',
                 year =${requestBody.year && requestBody.year !== "2022" ? `'${requestBody.year}'` : null}
             `;
         }
         return sql;
     },
     deleteSpeakerQuery:(id)=>{
         return`DELETE FROM speakers WHERE id=${id}`;
     },
     deleteSpeakerAbstractQuery:(id)=>{
         return`DELETE FROM speaker_abstract WHERE speaker_id=${id}`;
     },
     openSpeakersQuery: (speaker) =>{
         return `UPDATE speakers SET status=1 WHERE id=${speaker.id}`;
     },
     getHiddenSpeakerQuery:(year) =>{
         return `SELECT * FROM speakers WHERE status=0 and${
             year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`
         };`;
     },
     getUsersQuery:(year)=>{
         return `SELECT id,email,title,role,last_name,first_name,institute,department,createdAt FROM ${
             year && year !== "2022" ? `user_${year}` : `user`
         }`;
     },
     patchUserRoleQuery:(year,id,role)=>{
         return `UPDATE ${
             year && year !== "2022" ? `user_${year}` : "user"
         } SET role='${role}' WHERE id=${id}`;
     }
};