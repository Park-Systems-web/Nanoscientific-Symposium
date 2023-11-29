const patchSpeakerListDto = {
    nation: "",
    list: [],
    abstractlist: [],
    year: ""
};
const postPosterDto = {
    nation: "",
    id: 0 || undefined,
    title: "",
    affiliation: "",
    author: "",
    previewURL: "",
    filePath: "",
    year: "",
};
const patchPosterListDto = {
    nation: "",
    list: []
};
const patchBannerDto = {
    nation: "",
    path: "",
    imagePath: "",
    year: ""
};
const patchLandingSectionListDto = {
    nation: "",
    landingSectionList: []
}
const patchLandingTitleDto = {
    nation: "",
    title: "",
    year: "",
    language: "" || undefined
};
const patchLandingBanner = {
    nation: "",
    year: "",
    language: "" || undefined,
    date: "",
    desc: "",
    venue: "",
    background: "", //
};
const patchLandingContentDto = {
    nation: "",
    title: "",
    description: "",
    year: "",
    language: "" || undefined
};
const patchLanding6ButtonDto = {
    nation: "",
    url: "",
    buttonText: "",
    year: "",
    language: "" || undefined
};
const postLanding4ContentDto = {
    nation: "",
    title: "",
    description: "",
    year: ""
};
const patchLanding4ContentDto = {
    nation: "",
    id: 0,
    title: "",
    description: ""
};
const postSponsorDto = {
    nation: "",
    name: "",
    url: "",
    imagePath: "",
    height: 0 || undefined,
    sectionNo: 0,
    year: ""
};
const patchSponsorDto = {
    nation: "",
    id:0,
    name: "",
    url: "",
    imagePath: "",
    height: 0 || undefined,
    sectionNo: 0,
};
const patchAbstractDesc = {
    nation: "",
    desc: "",
    year: "",
    id: 0
};
const patchEditorContentDto = {
    nation: "",
    content: "",
    tableName: "",
    year: ""
}


module.exports = {
    patchEditorContentDto,
    patchAbstractDesc,
    patchSponsorDto,
    postSponsorDto,
    patchLanding4ContentDto,
    postLanding4ContentDto,
    patchLanding6ButtonDto,
    patchLandingContentDto,
    patchLandingBanner,
    patchLandingTitleDto,
    patchLandingSectionListDto,
    patchBannerDto,
    patchPosterListDto,
    postPosterDto,
    patchSpeakerListDto
}