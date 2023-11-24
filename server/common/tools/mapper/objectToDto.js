objectToDto = {
    objectToDtoMapper: (dto, data) => {

        for (const key in dto){
            if (data[key] === undefined || null || ''){
                console.log("null")
                dto[key] = null;
            } else {
                dto[key] = data[key];
            }

        }

        return dto;
    }
}
module.exports = objectToDto;