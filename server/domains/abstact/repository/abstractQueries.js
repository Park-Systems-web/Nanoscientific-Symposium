//Post Query


module.exports = {

    getAbstractQuery: (year) => {
        return `
            SELECT *
            from abstract_submission ${
                    year && year !== "2022"
                            ? ` WHERE year="${year}"`
                            : ` WHERE year IS NULL`
            };

        `

    },
    postAbstractQuery: (data) => {
        return `
            INSERT INTO abstract_submission (abstract_title, salutation, first_name, last_name,
                                             institution, department, email, phone, country, state,
                                             application, afm_model, presentation_form, pdf_file_path, year)
            VALUES ('${data.abstract_title}',
                    '${data.salutation}',
                    '${data.first_name}',
                    '${data.last_name}',
                    '${data.institution}',
                    '${data.department}',
                    '${data.email}',
                    '${data.phone}',
                    '${data.country}',
                    '${data.state}',
                    '${data.application}',
                    '${data.afm_model}',
                    '${data.presentation_form}',
                    '${data.pdf_file_path}',
                    '${data.year}')
        `;

    }
};
