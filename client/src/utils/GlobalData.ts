export const S3_URL = "https://d3gxipca0cw0l2.cloudfront.net";

export const globalData = new Map<string, Common.globalDataType>([
  ["home", {}],
  [
    "common",
    {
      nations: [
        {
          name: "NSS Americas",
          date: "Sep 29, 2022",
          path: "americas",
          img: `${S3_URL}/us/main-page-banner.jpg`,
        },
        {
          name: "NSF Europe",
          date: "Oct 06 - 07, 2022",
          path: "eu",
          img: `${S3_URL}/eu/main-page-banner.jpg`,
        },
        {
          name: "NSS China",
          date: "Oct 27 - 28, 2022",
          path: "https://nanoscientific.com.cn",
          img: `${S3_URL}/cn/main-page-banner.jpg`,
        },
        {
          name: "NSS Japan",
          date: "Nov 18, 2022",
          path: "jp",
          img: `${S3_URL}/jp/main-page-banner.jpg`,
        },
        {
          name: "NSS Korea",
          date: "Nov 24, 2022",
          path: "kr",
          img: `${S3_URL}/kr/main-page-banner.jpg`,
        },
        {
          name: "NSS Asia",
          date: "Nov 25, 2022",
          path: "asia",
          img: `${S3_URL}/asia/main-page-banner.jpg`,
        },
      ],
      logoURL: `${S3_URL}/common/NSS_logo_Type3.svg`,
      teaserVideoURL: `${S3_URL}/common/2022NSS_Teaser_v1.0_LQ.mp4`,
      teaserVideoEmbed: "a",
      bannerLogoURL: `${S3_URL}/common/NSS_logo_white_main.svg`,
      eventLandingMainBannerURL: `${S3_URL}/common/main-landing-banner.jpg`,
      eventLandingDesc: `
      The growing importance of nanotechnology in many fields, including surface science, organic chemistry, molecular biology, semiconductor physics, and micro-manufacturing. And those who strive to acquire the technology.
      <br/>
      NanoScientific Symposium brings together industry experts, researchers, business leaders, scholars, and futurist to share the latest nanotechnology trends and various nanotechnology-based research results.
      <br/>
      An opportunity to discuss and experience firsthand what innovative research results have been derived using the latest SPM (Scanning Probe Microscopy) technology.
      <br/>
      We invite you to the NanoScientific Symposium 2022.
      <br/>
      Expand your insight through the Nanoscientific Symposium.
      `,
      sponsor1LogoURL: `${S3_URL}/common/sponsored_by_NS.svg`,
      sponsor2LogoURL: `${S3_URL}/common/Park_logo.svg`,

      registrationBannerDesktopURL: `${S3_URL}/common/registration-banner-desktop.jpg`,
      registrationBannerMobileURL: `${S3_URL}/common/registration-banner-mobile.jpg`,
      speakerBannerURL: `${S3_URL}/common/speakers-banner.jpg`,
      programBannerURL: `${S3_URL}/common/program-banner.jpg`,
    },
  ],
  [
    "asia",
    {
      fullName: "2022 NanoScientific Symposium Asia",
      fullDate: "November 25, 2022",
      // eventLocation: "TBD",
      logoURL: `${S3_URL}/asia/menu-bar-logo.svg?v=0.03`,
      speakers: "Speakers",
      programs: "PROGRAM",
      lectureHall: "LECTURE HALL",
      exhibitHall: "EXHIBIT HALL",
      // sponsors: "SPONSORS",
      home: "HOME",
      registration: "REGISTRATION",
      // buttonText
      goNextText: "NEXT",
      goPrevText: "PREV",
      submitBtnText: "SUBMIT",
      registerBtnText: "REGISTER",
      // user??????
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      createAccountText: "Create an account",
      changePasswordBtnText: "Change Password",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${S3_URL}/asia/main-page-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/asia/logo-type-1b.svg`,
      landingSection1Desc:
        "Join us for the 4th edition of the NanoScientific Symposium Asia 2022 to be held on November 25, 2022.",

      // resetPassword
      resetPasswordHeading: "Change a Password",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // registration

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",
    },
  ],
  [
    "kr",
    {
      fullName: "2022 NanoScientific Symposium Korea",
      fullDate: "November 24, 2022",
      // eventLocation: "TBD",
      logoURL: `${S3_URL}/kr/menu-bar-logo.svg?v=0.03`,
      speakers: "????????????",
      symposium: "???????????? ??????",
      programs: "????????????",
      lectureHall: "????????? ?????????",
      exhibitHall: "???????????? ",
      // sponsors: "?????????",
      home: "???",

      // sign in ??????
      signInText: "?????????",
      registration: "??????",
      goNextText: "??????",
      goPrevText: "??????",
      // user??????
      emailInputLabel: "????????? ??????",
      passwordInputLabel: "????????????",
      forgotPasswordText: "???????????? ??????",
      createAccountText: "?????? ??????",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${S3_URL}/kr/main-page-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/kr/logo-type-1b.svg`,
      landingSection1Desc: `
        NanoScientific Symposium Korea ????????????
        <br/><br/>
        ?????? ??????????????? ?????? ???????????? NanoScientific Symposium Korea ????????? ?????? '??????(registration)' ??? ??????????????????.
        `,
      // resetPassword
      resetPasswordHeading: "Change a Password",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",
    },
  ],
  [
    "jp",
    {
      fullName: "2022 NanoScientific Symposium Japan",
      fullDate: "2022???11???18????????????",
      logoURL: `${S3_URL}/jp/menu-bar-logo.svg?v=0.03`,
      speakers: "?????????",
      programs: "???????????????",
      lectureHall: "Web?????????",
      exhibitHall: "?????????",
      // sponsors: "???????????????",
      home: "?????????",
      greeting: "???????????????",
      attend: "????????????",
      archive: "???????????????",

      signInText: "????????????",
      registration: "??????",
      goNextText: "NEXT",
      goPrevText: "PREV",
      // user??????
      emailInputLabel: "Email address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot Password?",
      createAccountText: "??????",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${S3_URL}/jp/main-page-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/jp/logo-type-1b.svg`,
      landingSection1Desc: `
        ??????????????????????????????
        <br/>
        ???????????????????????????SPM????????????????????????????????????????????? 2022 ????????????????????????
        `,
      // resetPassword
      resetPasswordHeading: "Change a Password",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",
    },
  ],
  [
    "americas",
    {
      fullName: "2022 NanoScientific Symposium Americas",
      fullDate: "September 29, 2022",
      // eventLocation: "TBD",
      logoURL: `${S3_URL}/us/menu-bar-logo.svg?v=0.03`,
      speakers: "Speakers",
      programs: "PROGRAM",
      lectureHall: "LECTURE HALL",
      exhibitHall: "EXHIBIT HALL",
      // sponsors: "SPONSORS",
      home: "HOME",
      registration: "REGISTRATION",
      // buttonText
      goNextText: "NEXT",
      goPrevText: "PREV",
      submitBtnText: "SUBMIT",
      // user??????
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      createAccountText: "Create an account",
      changePasswordBtnText: "Change Password",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${S3_URL}/us/main-page-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/us/logo-type-1b.svg`,
      landingSection1Desc:
        "Join the 2022 NanoScientific Symposium Americas - Connecting the Nanomaterials Community.",

      // resetPassword
      resetPasswordHeading: "Change a Password",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",
    },
  ],
  [
    "eu",
    {
      fullName: "2022 NanoScientific Forum Europe",
      fullDate: "October 6-7, 2022",
      logoURL: `${S3_URL}/eu/menu-bar-logo.svg?v=0.03`,
      speakers: "Speakers",
      programs: "PROGRAM",
      lectureHall: "LECTURE HALL",
      exhibitHall: "EXHIBIT HALL",
      // sponsors: "SPONSORS",
      home: "HOME",
      // registration: "REGISTRATION",
      // buttonText
      goNextText: "NEXT",
      goPrevText: "PREV",
      submitBtnText: "SUBMIT",
      // user??????
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      createAccountText: "Create an account",
      changePasswordBtnText: "Change Password",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${S3_URL}/eu/main-page-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/eu/logo-type-1b.svg`,
      landingSection1Desc: `Welcome to the virtual platform of
      NanoScientific Forum Europe (NSFE)
      `,
      // resetPassword
      resetPasswordHeading: "Change a Password",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",

      // speaker
      speakerBannerURL: `${S3_URL}/eu/speaker-banner.jpg`,
    },
  ],
]);
