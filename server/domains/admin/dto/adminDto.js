const postSessionDto = {
    nation: "",
    title: "",
    title_en: "",
    date: "",
    year: "",
};

const patchSessionDto = {
    nation:"",
    title:"",
    title_en:"",
    date:"",
    id: 0,
    status: 0
};

const postProgramDto={

    session:0,
    startTime:"",
    endTime:"",
    title:"",
    title_en:"",
    speakers: "",
    speakers_en: "",
    description: "",
    description_en: "",
    emphasize:0,
    year:""

};

const patchProgramDto = {

    id:0,
    nation:"",
    title:"",
    title_en:"",
    session:0,
    speakers: "",
    speakers_en: "",
    description: "",
    description_en: "",
    startTime: "",
    endTime:"",
    emphasize:0,

};

const postAgendaDto = {
    nation:"",
    session_id:0,
    program_id:0,
    title:"",
    speakers:"",
    year:""
};
const patchAgendaDto= {
    nation:"",
    title:"",
    id: 0,
    program_id:0,
    speakers: "",
    session_id: 0
};

const reorderAgendaListDto ={
    agendaList:[],
    nation:""
};

const openProgramDto ={
    nation:"",
    programs:[]
};
const openSessionDto ={
    nation:"",
    sessions:[]
};
const postSpeakerDto = {
    nation:"",
    name:"",
    name_en:"",
    belong:"",
    belong_en:"",
    imagePath:"",
    keynote:0,
    description:"",
    description_en:"",
    abstractBelong:"",
    abstractBelong_en:"",
    abstractDesc:"",
    abstractDesc_en:"",
    hasAbstract:0,
    is_hide:0,
    year:"",
};

const patchSpeakerDto = {
    nation:"",
    name:"",
    name_en:"",
    belong:"",
    belong_en:"",
    imagePath:"",
    id:0,
    keynote:0,
    description:"",
    description_en:"",
    abstractBelong:"",
    abstractBelong_en:"",
    abstractDesc:"",
    abstractDesc_en:"",
    hasAbstract:0,
    is_hide:0,
    year:"",
};

const openSpeakerDto ={
    nation:"",
    speakers:[]
};

const patchUserRoleDto ={
    nation:"",
    id:0,
    role:"",
    year:""
}

module.exports = {patchUserRoleDto,openSpeakerDto,patchSpeakerDto,postSpeakerDto,openSessionDto,openProgramDto,reorderAgendaListDto,patchProgramDto,postSessionDto,patchSessionDto,postProgramDto,postAgendaDto,patchAgendaDto}