declare namespace Program {
  interface programType {
    id: number;
    session: number;
    start_time: string;
    end_time: string;
    title: string;
    title_en?: string;
    speakers: string;
    speakers_en?: string;
    description: string;
    description_en?: string;
    next_id: string;
    emphasize: number;
  }

  interface programAgendaType {
    id: number;
    session_id: number;
    program_id: number;
    title: string;
    speakers: string;
    next_id: number;
  }

  interface sessionType {
    id: number;
    session_title: string;
    session_title_en?: string;
    date: string;
  }
}

declare namespace Speaker {
  interface speakerType {
    id: number;
    name: string;
    name_en?: string;
    belong: string;
    belong_en?: string;
    description: string;
    description_en?: string;
    image_path: string;
    status: number;
    keynote?: number;
    has_abstract?: number;
    is_hide?: number;
  }

  interface speakerDetailType {
    id: number;
    name: string;
    name_en?: string;
    title: string;
    title_en?: string;
    image_path: string;
    belong: string;
    belong_en?: string;
    description: string;
    description_en?: string;
  }

  interface speakerAbstractType {
    id: number;
    speaker_id: number;
    belong: string;
    description: string;
  }

  interface japanSpeakerType {
    id: number;
    name_en: string;
    name_jp: string;
    belong: string;
    image_path: string;
    homework: string;
    show: number;
  }
}

declare namespace Poster {
  interface posterType {
    id: number;
    title: string;
    sub_title: string;
    author: string;
    image: string;
    index: number;
    attachment: string;
  }
}

declare namespace User {
  interface userType {
    id: number;
    email: string;
    title?: string;
    role: string;
    last_name: string;
    first_name: string;
    institute: string;
    phone: string;
    department?: string;
    state?: string;
    createdAt: string;
    country: string;
    is_new_announcement?: number;
    is_announcement_cached?: number;
  }
}

declare namespace Announcement {
  interface announcementType {
    id: number;
    title: string;
    content: string;
    created: string;
    hits: number;
    total_count: number;
  }
}

declare namespace Common {
  type showStatus = "show" | "hide";
  type languageType = "china" | "english";

  interface menuType {
    id: number;
    name: string;
    path: string;
    is_published: 0 | 1;
    is_main: 0 | 1;
    parent: number;
    show: 0 | 1;
    has_child: 0 | 1;
  }

  interface configType {
    id: number;
    alert_receive_email: string;
  }

  interface nationType {
    name: string;
    date: string;
    img: string;
    type: string;
    path: string;
    disabled?: string;
  }

  interface eventLandingSection2Type {
    icon: string;
    title: string;
    desc: string;
  }
  interface eventLandingSection3Type {
    image: string;
    title: string;
    desc: string;
    link: string;
  }

  interface sponsorType {
    name: string;
    img: string;
    url?: string;
    height?: number;
  }

  interface onDemandVideoType {
    id: number;
    title: string;
    speaker: string;
    speaker_page?: string;
    region: string;
    year: string;
    language: string;
    affiliation: string;
    thumbnail?: string;
    video: string;
    application?: string[];
    abstract_desc?: string;
  }

  interface onDemandTagType {
    type: "region" | "year" | "language" | "application" | "keyword";
    value: string;
  }

  interface globalDataType {
    fullName?: string;
    fullDate?: string;
    eventLocation?: string;
    logoURL?: string;
    speakers?: string;
    programs?: string;
    lectureHall?: string;
    exhibitHall?: string;
    sponsors?: string;
    greeting?: string;
    attend?: string;
    symposium?: string;
    archive?: string;
    home?: string;
    registration?: string;
    registrationBannerDesktopURL?: string;
    registrationBannerMobileURL?: string;
    speakerBannerURL?: string;
    programBannerURL?: string;
    // button text
    signInText?: string;
    goNextText?: string;
    goPrevText?: string;
    submitBtnText?: string;
    registerBtnText?: string;
    uploadBtnText?: string;

    // user 관련
    emailInputLabel?: string;
    passwordInputLabel?: string;
    forgotPasswordText?: string;
    createAccountText?: string;
    adminBtnText?: string;
    signOutBtnText?: string;
    changePasswordBtnText?: string;
    passwordSetDescription?: string;

    // lecture hall
    liveText?: string;
    browserJoinBtnText?: string;
    appJoinBtnText?: string;

    // registration 관련
    registrationStep1Label?: string;
    registrationStep2Label?: string;
    registrationStep3Label?: string;

    // common
    nations?: nationType[];
    eventLandingMainBannerURL?: string;
    eventLandingMainBannerMobileURL?: string;
    fullLogoURL?: string;
    eventLandingHeading?: string;
    eventLandingDesc?: string;
    eventLandingBodyBackground?: string;
    eventLandingSection2Heading?: string;
    eventLandingSection2Content?: eventLandingSection2Type[];
    eventLandingSection3Heading?: string;
    eventLandingSection3Content?: eventLandingSection3Type[];
    eventLandingSponsorSectionHeading?: string;
    eventLandingSponsorSectionDesc?: string;
    eventLandingSponsorSectionContent?: sponsorType[];
    teaserVideoURL?: string;
    teaserVideoEmbed?: string;
    bannerLogoURL?: string;
    sponsor1LogoURL?: string;
    sponsor2LogoURL?: string;
    sponsor3LogoURL?: string;

    // private route 안내 메시지
    privateRouteMessage?: string;

    // programs
    programFileLink?: string;

    // landing
    showLandingSection1?: boolean;
    showLandingSection2?: boolean;
    showLandingSection3?: boolean;
    showLandingSection4?: boolean;
    showLandingSection5?: boolean;
    showLandingSection6?: boolean;
    showLandingSection7?: boolean;
    landingSection1BackgroundURL?: string;
    landingSection1LogoURL?: string;
    landingSection1Desc?: string;
    landingSection2Title?: string;
    landingSection2Desc?: string;
    landingSection2Video?: string;
    landingSection3Title?: string;
    landingSection3Desc?: string;
    landingSection4Title?: string;
    landingSection4List1Title?: string;
    landingSection4List1?: string[];
    landingSection4List2Title?: string;
    landingSection4List2?: string[];
    landingSection4List3Title?: string;
    landingSection4List3?: string[];
    landingSection5Title?: string;
    landingSection6Title?: string;
    landingSection6ButtonLink?: string;
    landingSection6Desc?: string;
    landingSection6ButtonText?: string;
    landingSection6Videos?: string[];
    landingSection7Title?: string;
    landingSection7Sponsors?: sponsorType[];

    // resetPassword
    resetPasswordHeading?: string;
    resetPasswordCurrentLabel?: string;
    resetPasswordNewLabel?: string;
    resetPasswordNewConfirmLabel?: string;
    setPasswordHeading?: string;

    // cookie consent text
    cookieConsentText?: string;
    seePrivacyPolicyText?: string;

    comingSoonText?: string;

    // announcement
    viewsLabel?: string;

    // pdf uploader
    pdfUploadDescription?: string;

    // registration page
    registrationTitle?: string;
    registrationDesc?: string;
  }

  interface MetaTagType {
    path?: string;
    description: string;
    keywords?: string;
  }
}

declare namespace Webinar {
  interface webinarType {
    uuid: string;
    id: number;
    host_id: string;
    created_at: string;
    duration: number;
    join_url: string;
    start_time: string;
    timezone: string;
    topic: string;
    type: number;
    connected: boolean;
    is_live: number;
    is_meeting?: boolean;
    web_join_link?: string;
    app_join_link?: string;
  }
}

declare namespace Admin {
  interface menuType {
    name: string;
    clickHandler: () => void;
    disabled?: boolean;
    adminOnly?: boolean;
  }
}

declare namespace Landing {
  interface landingBannerType {
    id: number;
    background: string;
    bg_overlay?: number;
    logo: string;
    venue?: string;
    date?: string;
    show_register: number;
    desc?: string;
    year?: string;
  }
  interface landingType {
    id: number;
    title: string;
    show: number;
  }
  interface landing3Type {
    id: number;
    title?: string;
    description: string;
  }
  interface landing4Type {
    id: number;
    title: string;
    description: string;
  }
  interface landing6Type {
    id: number;
    description: string;
    url?: string;
    button_text?: string;
  }
  interface landing7Type {
    id: number;
    name?: string;
    url?: string;
    image_path: string;
    height: number;
  }
}
