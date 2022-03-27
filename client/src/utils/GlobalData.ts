const S3_URL = "https://nss-integration.s3.us-west-1.amazonaws.com";

export const globalData = new Map<string, Common.globalDataType>([
  [
    "common",
    {
      nations: [
        {
          name: "Asia",
          date: "TBD",
          landingImage: "https://vemaps.com/uploads/img/large/kr-04.jpg",
          path: "asia",
        },
        {
          name: "Korea",
          date: "TBD",
          landingImage: "https://vemaps.com/uploads/img/large/kr-04.jpg",
          path: "kr",
        },
        {
          name: "US",
          date: "TBD",
          landingImage: "https://vemaps.com/uploads/img/large/kr-04.jpg",
          path: "us",
        },
        {
          name: "Japan",
          date: "TBD",
          landingImage: "https://vemaps.com/uploads/img/large/kr-04.jpg",
          path: "jp",
        },
        {
          name: "China",
          date: "TBD",
          landingImage: "https://vemaps.com/uploads/img/large/kr-04.jpg",
          path: "https://nanoscientific.com.cn",
        },
        {
          name: "Europe",
          date: "TBD",
          landingImage: "https://vemaps.com/uploads/img/large/kr-04.jpg",
          path: "eu",
        },
      ],
      logoURL: "https://d25unujvh7ui3r.cloudfront.net/asia/NS_logo.svg",
      fullLogoURL: `${S3_URL}/common/NS_logo_color.svg`,
      eventLandingMainBannerURL:
        "https://d25unujvh7ui3r.cloudfront.net/asia/home_1_thumb.jpg",
      eventLandingDesc:
        "Ut a venenatis neque, in blandit urna. Proin facilisis, nulla sit amet congue tincidunt, orci quam fermentum erat, id ultrices tellus velit in velit. Fusce feugiat, erat eu varius gravida, mauris neque posuere mauris, a cursus mi mauris a justo. Nam suscipit semper auctor. Etiam sed gravida leo. Mauris rutrum massa varius neque rhoncus, id condimentum ante fringilla. Nam eu egestas turpis. Pellentesque neque ipsum, lacinia nec faucibus faucibus, molestie a felis. Proin quam ligula, suscipit imperdiet lorem in, porttitor pharetra mi. Nulla facilisi.",
      eventLandingBodyBackground: "",
    },
  ],
  [
    "asia",
    {
      logoURL: "https://d25unujvh7ui3r.cloudfront.net/asia/NS_logo.svg",
      speakers: "SPEAKERS",
      programs: "PROGRAM",
      lectureHall: "LECTURE HALL",
      exhibitHall: "EXHIBIT HALL",
      sponsors: "SPONSORS",
      home: "HOME",
      registration: "REGISTRATION",
      // sign in 관련
      signInText: "SIGN IN",
      goNextText: "NEXT",
      goPrevText: "PREV",
      // user관련
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      createAccountText: "Create an account",
      // landing
      landingSection1BackgroundURL:
        "https://d25unujvh7ui3r.cloudfront.net/asia/home_1_thumb.jpg",
      landingSection1LogoURL:
        "https://d25unujvh7ui3r.cloudfront.net/asia/NS_logo.svg",
      landingSection1Desc:
        "Join the 5th edition of the NanoScientific Symposium US 2022 - the platform for nanoscience and SPM research!",
      landingSection2Title: "NanoScientific Symposium",
      landingSection2Desc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br /><br />It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      landingSection2ImgURL:
        "https://d25unujvh7ui3r.cloudfront.net/asia/home_1_thumb.jpg",
      landingSection3Title: "Conference Details",
      landingSection3List1Title: "Topic",
      landingSection3List1: [
        "Emerging Nanomaterials for Advanced Technologies",
        "Functional Surfaces",
        "Advances Techniques and Automation in SPM",
        "Correlative Microscopy",
      ],
      landingSection3List2Title: "SPM Methods",
      landingSection3List2: [
        "Nanomechanical and Electrical Characterization",
        "Nanomechanical and Electrical Characterization",
        "Nanomechanical and Electrical Characterization",
        "Nanomechanical and Electrical Characterization",
        "Nanomechanical and Electrical Characterization",
        "Nanomechanical and Electrical Characterization",
      ],
      landingSection3List3Title: "Scientific Committee",
      landingSection3List3: [
        "Prof. Dr. Lukas Eng,<br />Technical University Dresden",
        "Prof. Dr. Lukas Eng,<br />Technical University Dresden",
        "Prof. Dr. Lukas Eng,<br />Technical University Dresden",
        "Prof. Dr. Lukas Eng,<br />Technical University Dresden",
        "Prof. Dr. Lukas Eng,<br />Technical University Dresden",
        "Prof. Dr. Lukas Eng,<br />Technical University Dresden",
      ],
      landingSection4Title: "Keynote Speakers",
      landingSection5Title: "Past Events",
      landingSection5Videos: [
        "https://d25unujvh7ui3r.cloudfront.net/asia/home_1_asia.mp4",
        "https://d25unujvh7ui3r.cloudfront.net/asia/home_2_asia.mp4",
      ],

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
    },
  ],
  [
    "kr",
    {
      logoURL: "https://d25unujvh7ui3r.cloudfront.net/kr/NS_logo.svg",
      speakers: "초청연사",
      symposium: "심포지엄 안내",
      programs: "프로그램",
      lectureHall: "온라인 강연장",
      exhibitHall: "전시부스 ",
      sponsors: "협찬사",
      home: "홈",
      signInText: "로그인",
      registration: "등록",

      // user 관련
      emailInputLabel: "이메일 주소",
    },
  ],
  [
    "latam",
    {
      logoURL: "https://d25unujvh7ui3r.cloudfront.net/latam/NS_logo.svg",
      speakers: "SPEAKERS",
      programs: "PROGRAM",
      lectureHall: "LECTURE HALL",
      exhibitHall: "EXHIBIT HALL",
      sponsors: "SPONSORS",
      home: "HOME",
      signInText: "SIGN IN",

      registration: "REGISTRATION",
    },
  ],
  [
    "jp",
    {
      logoURL: "https://d25unujvh7ui3r.cloudfront.net/jp/NS_logo.svg",
      speakers: "講演者",
      programs: "プログラム",
      lectureHall: "Web講演会",
      exhibitHall: "展示会",
      sponsors: "スポンサー",
      home: "ホーム",
      greeting: "ごあいさつ",
      attend: "参加手順",
      archive: "アーカイブ",
      signInText: "SIGN IN",
      registration: "登録",
    },
  ],
  [
    "us",
    {
      logoURL: "https://d25unujvh7ui3r.cloudfront.net/us/NS_logo.svg",
      speakers: "SPEAKERS",
      programs: "PROGRAM",
      lectureHall: "LECTURE HALL",
      exhibitHall: "EXHIBIT HALL",
      sponsors: "SPONSORS",
      home: "HOME",
      signInText: "SIGN IN",
      registration: "REGISTRATION",
    },
  ],
  [
    "eu",
    {
      logoURL: "https://d25unujvh7ui3r.cloudfront.net/eu/NS_logo_color.svg",
      speakers: "SPEAKERS",
      programs: "PROGRAM",
      lectureHall: "LECTURE HALL",
      exhibitHall: "EXHIBIT HALL",
      sponsors: "SPONSORS",
      home: "HOME",
      registration: "REGISTRATION",
      // sign in 관련
      signInText: "SIGN IN",
      goNextText: "NEXT",
      goPrevText: "PREV",
      // user관련
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      createAccountText: "Create an account",
      // landing
      landingSection1BackgroundURL: `${S3_URL}/eu/europe-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/eu/NS_logo_white.svg`,
      landingSection1Desc:
        "Join the 5th edition of the NanoScientific Symposium Europe 2022 - the platform for nanoscience and SPM research!",
      landingSection2Title: "NanoScientific Symposium",
      landingSection2Desc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br /><br />It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      landingSection2ImgURL:
        "https://d25unujvh7ui3r.cloudfront.net/asia/home_1_thumb.jpg",
      landingSection2_5Title: "Why Attend NanoScientific Symposium?",
      landingSection2_5Desc:
        "Nanoscientific Symposium presents insights on the rapidly evolving R&D and ...",
      landingSection3Title: "Conference Details",
      landingSection3List1Title: "Topic",
      landingSection3List1: [
        "Emerging Nanomaterials for Advanced Technologies",
        "Functional Surfaces",
        "Advances Techniques and Automation in SPM",
        "Correlative Microscopy",
      ],
      landingSection3List2Title: "SPM Methods",
      landingSection3List2: [
        "Nanomechanical and Electrical Characterization",
        "Nanomechanical and Electrical Characterization",
        "Nanomechanical and Electrical Characterization",
        "Nanomechanical and Electrical Characterization",
        "Nanomechanical and Electrical Characterization",
        "Nanomechanical and Electrical Characterization",
      ],
      landingSection3List3Title: "Scientific Committee",
      landingSection3List3: [
        "Prof. Dr. Lukas Eng,<br />Technical University Dresden",
        "Prof. Dr. Lukas Eng,<br />Technical University Dresden",
        "Prof. Dr. Lukas Eng,<br />Technical University Dresden",
        "Prof. Dr. Lukas Eng,<br />Technical University Dresden",
        "Prof. Dr. Lukas Eng,<br />Technical University Dresden",
        "Prof. Dr. Lukas Eng,<br />Technical University Dresden",
      ],
      landingSection4Title: "Keynote Speakers",
      landingSection5Title: "Submit All Year long",
      landingSection5Desc:
        "Learn and be inspired at any time with more then 200 sessions on demand",
      landingSection5ButtonText: "Explore all on-demand sessions",
      landingSection5Videos: [
        "https://d25unujvh7ui3r.cloudfront.net/asia/home_1_asia.mp4",
        "https://d25unujvh7ui3r.cloudfront.net/asia/home_2_asia.mp4",
      ],

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
    },
  ],
]);
