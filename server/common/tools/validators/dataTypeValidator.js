const {patchConfigDto} = require("../../../domains/configuration/dto/configurationDto");
const dataTypeValidator = {

    validateData: (dto, data) => {
        for (const key in dto) {
            if (typeof data[key] !== typeof dto[key]) {
                return false;
            }
        }
        return true;
    }
}

module.exports = dataTypeValidator;