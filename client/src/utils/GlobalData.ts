export const S3_URL = "https://d3gxipca0cw0l2.cloudfront.net";
const CHINA_S3_URL =
  "https://s3.cn-north-1.amazonaws.com.cn/nanoscientific.com.cn";

export const globalData = new Map<string, Common.globalDataType>([
  [
    "home",
    {
      logoURL: `${S3_URL}/common/landing/2023_NSS_Logo.png`,
    },
  ],
  [
    "common",
    {
      nations: [
        {
          name: "Suwon, South Korea",
          date: "29 - 30 June 2023",
          path: "https://event.nanoscientific.org/kr",
          img: `${S3_URL}/common/landing/Web_Korea.jpg`,
          type: "NSS Korea",
        },
        {
          name: "Barcelona, Spain",
          date: "13 - 15 September 2023",
          path: "https://event.nanoscientific.org/eu",
          img: `${S3_URL}/common/landing/Web_Europe.jpg?v=0.1`,
          type: "NSF Europe",
        },
        {
          name: "Beijing, China",
          date: "21 - 22 October 2023",
          path: "https://nanoscientific.com.cn/china",
          img: `${S3_URL}/common/landing/Web_China.jpg?v=0.1`,
          type: "NSS China",
        },
        {
          name: "Tokyo, Japan",
          date: "27 October 2023",
          path: "https://event.nanoscientific.org/jp",
          img: `${S3_URL}/jp/main-page-banner.jpg`,
          type: "NSS Japan",
        },
        {
          name: "Bangalore​, India",
          date: "3 November 2023",
          path: "https://event.nanoscientific.org/asia",
          img: `${S3_URL}/common/landing/Web_Asia.jpg`,
          type: "NSS Asia",
        },
        {
          name: "México City, México​",
          date: "29 November 2023",
          path: "https://event.nanoscientific.org/americas",
          img: `${S3_URL}/common/landing/Web_Americas.jpg`,
          type: "NSS Americas",
        },
      ],
      logoURL: `${S3_URL}/common/landing/2023_NSS_Logo.png`,
      teaserVideoURL: `${S3_URL}/common/2022NSS_Teaser_v1.0_LQ.mp4`,
      teaserVideoEmbed: "088jBNFrOvU",
      bannerLogoURL: `${S3_URL}/common/NSS_logo_white_main.svg`,
      eventLandingMainBannerURL: `${S3_URL}/common/landing/Main_Banner.jpg?v=0.1`,
      eventLandingMainBannerMobileURL: `${S3_URL}/common/landing/2023NSS_Mobile_Banner.jpg?v=0.1`,
      eventLandingHeading:
        "Connecting Global Experts in SPM for Advancements in Nanoscience and Technology",
      eventLandingDesc: `
      Join us for a truly international symposium on scanning probe microscopy! NANOscientific Symposium event will feature speakers from across the world, presenting groundbreaking research and discussing the latest advancements and techniques in SPM. Don't miss this opportunity to connect with the worldwide community of SPM researchers and expand your knowledge of this exciting field. 
      <br /><br />NANOscientific Symposium brings together experts from around the globe to explore the science, engineering, and applications of nanotechnology. Featuring keynote addresses and virtual networking opportunities, attendees can form connections and propel their research, innovation, and businesses forward.
      `,
      eventLandingSection2Heading:
        "Experience the Diverse Benefits of In-Person Interactions!",
      eventLandingSection2Content: [
        {
          icon: `${S3_URL}/common/landing/Icon_Keynote.svg`,
          title: "Face-to-Face Networking",
          desc: "Get insights from renowned experts in the field of nanotechnology and SPM.",
        },
        {
          icon: `${S3_URL}/common/landing/Icon_Demo.svg`,
          title: "Live Demos",
          desc: "See SPM equipment in action and learn from the SPM/AFM experts.",
        },
        {
          icon: `${S3_URL}/common/landing/Icon_Hands-on.svg`,
          title: "Hands-on Session",
          desc: "Take your knowledge to the next level with the hands-on session, facilitated by experienced professionals.",
        },
        {
          icon: `${S3_URL}/common/landing/Icon_Poster.svg`,
          title: "Poster Session",
          desc: "Showcase your research of SPM application and win awards during the poster session. ",
        },
        {
          icon: `${S3_URL}/common/landing/Icon_Exhibit.svg`,
          title: "Exhibit",
          desc: "Discover the latest and most advanced SPM-related equipment at the Park exhibit hall.",
        },
      ],
      eventLandingSection3Heading: "Get More NANOscientific Knowledge",
      eventLandingSection3Content: [
        {
          image: `${S3_URL}/common/landing/NANOscientific_Magazine.jpg`,
          title: "NANOscientific Magazine",
          desc: "NANOscientific Magazine provides in-depth coverage of the latest techniques and trends related to nano research, with a focus on SPM and its related fields. It is a go-to resource for scientists, researchers, and industry professionals seeking the latest insights and analysis in nanoscale imaging and manipulation, cutting-edge developments in materials science, and beyond.",
          link: `https://magazine.nanoscientific.org`,
        },
        {
          image: `${S3_URL}/common/landing/NanoScientific_On-Demand.jpg`,
          title: "NANOscientific On-Demand",
          desc: "NANOscientific On-Demand provides easy access to recorded presentations from all the NSS symposiums, categorized by topics. It allows you to deep dive into specific techniques or applications, stay current with the latest SPM research, catch up on missed sessions, review key topics, and stay ahead in your field.",
          link: "/on-demand",
        },
        {
          image: `${S3_URL}/common/landing/NanoAcademy-Online.jpg`,
          title: "NANOacademy Online",
          desc: "The NANOacademy Online provides scientific research and educational materials on subjects related to nanoscience. You can explore interactive webinars, tutorials, and live demonstrations, and discover both the basics and advanced atomic force microscopy techniques from AFM experts.",
          link: "https://www.parksystems.com/learning-center/programs/online-nanoacademy",
        },
      ],

      eventLandingSponsorSectionHeading: "Sponsors",
      eventLandingSponsorSectionDesc:
        "The NANOscientific Symposium is sponsored by Park Systems, a leading manufacturer of nanoscale microscopy and metrology solutions that encompasses the atomic force microscopy, white light interferometry, infrared spectroscopy and ellipsometry systems. As a trusted name in the industry, Park Systems is committed to providing high-quality and innovative solutions to researchers and scientists worldwide. We are grateful for its support in making this event possible.",
      eventLandingSponsorSectionContent: [
        {
          name: "NANOscientific",
          img: `${S3_URL}/common/landing/NANOscientific_logo_BK.png`,
          url: "https://nanoscientific.org/",
          height: 30,
        },
        {
          name: "Park Systems",
          img: `${S3_URL}/common/landing/park_logo.png`,
          url: "https://parksystems.com/",
          height: 125,
        },
        {
          name: "NWA",
          img: `${S3_URL}/common/landing/NWA_logo.PNG`,
          url: "https://www.nanotechnologyworld.org/",
          height: 140,
        },
      ],
      sponsor1LogoURL: `${S3_URL}/common/sponsored_by_NS.svg`,
      sponsor2LogoURL: `${S3_URL}/common/Park_logo.svg`,
      sponsor3LogoURL: `${S3_URL}/upload/china/sponsor/NWAlogo2022_1664861519562.PNG`,

      registrationBannerDesktopURL: `${S3_URL}/common/registration-banner-desktop.jpg`,
      registrationBannerMobileURL: `${S3_URL}/common/registration-banner-mobile.jpg`,
      speakerBannerURL: `${S3_URL}/common/speakers-banner.jpg`,
      programBannerURL: `${S3_URL}/common/program-banner.jpg`,
      // buttonText
      goNextText: "NEXT",
      goPrevText: "PREV",
      uploadBtnText: "Upload",
      submitBtnText: "SUBMIT",
      // user관련
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      createAccountText: "Create an account",
      changePasswordBtnText: "Change Password",
      // landing
      signInText: "Sign in",
    },
  ],
  [
    "asia2022",
    {
      fullName: "2022 NANOscientific Symposium Asia | NSS Asia",
      fullDate: "November 25, 2022",
      eventLocation: "Marina Bay Sands, Singapore (Hybrid Event)",
      logoURL: `${S3_URL}/asia/menu-bar-logo.svg?v=0.03`,
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
      uploadBtnText: "Upload",
      submitBtnText: "SUBMIT",
      registerBtnText: "REGISTER",
      // user관련
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      // createAccountText: "Create an account",
      changePasswordBtnText: "Change Password",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${S3_URL}/asia/main-page-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/asia/logo-type-1b.svg`,
      landingSection1Desc:
        "Join us for the 4th edition of the NANOscientific Symposium Asia 2022 to be held on November 25, 2022.",

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

      // pdf upload
      pdfUploadDescription:
        "Upload file (.pdf,.docx,.pptx) (Maximum size: 15MB)",
    },
  ],
  [
    "asia2023",
    {
      fullName: "2023 NANOscientific Symposium Asia | NSS Asia",
      fullDate: "November 3, 2023",
      eventLocation: "Indian Institute of Science, Bangalore​",
      logoURL: `${S3_URL}/asia/nss-logo-fixed-asia.png`,
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
      uploadBtnText: "Upload",
      submitBtnText: "SUBMIT",
      registerBtnText: "REGISTER",
      // user관련
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      // createAccountText: "Create an account",
      changePasswordBtnText: "Change Password",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${S3_URL}/asia/main-page-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/asia/nss-logo-2023-asia.png`,
      landingSection1Desc:
        "Join us for the 4th edition of the NANOscientific Symposium Asia 2022 to be held on November 25, 2022.",

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

      // pdf upload
      pdfUploadDescription:
        "Upload file (.pdf,.docx,.pptx) (Maximum size: 15MB)",
      // Event 종료 후 데이터
      isEventEnded: true,
      // postEventHighlightSubtitle: "Highlight Video",
      // postEventHighlightTitle: "A look back at the NSS Asia 2023",
      // postEventHighlightDesc:
      //   "This time India witnessed the greatest NANOscientific Symposium of Asia. 2023 NSS Asia organized in hybrid mode, for the venue IISC, Bangalore hosted this time. It was a one-day event with various nanotechnology-related talks, AFM live demo sessions, and poster presentations. Watch the video to experience some of the highlights of the event.",
      // postEventHighlightVideoURL: "https://www.youtube.com/watch?v=",
      postEventGalleryTitle: "On-site impressions",
      postEventGalleryImageList: [
        `${S3_URL}/upload/asia/landing/NSSA_Highlight_01.jpg`,
        `${S3_URL}/upload/asia/landing/NSSA_Highlight_02.jpg`,
        `${S3_URL}/upload/asia/landing/NSSA_Highlight_03.jpg`,
        `${S3_URL}/upload/asia/landing/NSSA_Highlight_04.jpg`,
        `${S3_URL}/upload/asia/landing/NSSA_Highlight_05.jpg`,
        `${S3_URL}/upload/asia/landing/NSSA_Highlight_06.jpg`,
        `${S3_URL}/upload/asia/landing/NSSA_Highlight_07.jpg`,
        `${S3_URL}/upload/asia/landing/NSSA_Highlight_08.jpg`,
        `${S3_URL}/upload/asia/landing/NSSA_Highlight_09.jpg`,
        `${S3_URL}/upload/asia/landing/NSSA_Highlight_10.jpg`,
        `${S3_URL}/upload/asia/landing/NSSA_Highlight_11.jpg`,
        `${S3_URL}/upload/asia/landing/NSSA_Highlight_12.jpg`,
        `${S3_URL}/upload/asia/landing/NSSA_Highlight_13.jpg`,
        `${S3_URL}/upload/asia/landing/NSSA_Highlight_14.jpg`,
        `${S3_URL}/upload/asia/landing/NSSA_Highlight_15.jpg`,
        `${S3_URL}/upload/asia/landing/NSSA_Highlight_16.jpg`,
        `${S3_URL}/upload/asia/landing/NSSA_Highlight_17.jpg`,
      ],
    },
  ],
  [
    "kr2022",
    {
      fullName: "2022 NANOscientific Symposium Korea | NSS Korea",
      fullDate: "2022년 11월 23일",
      eventLocation: "대전컨벤션센터 컨퍼런스홀",
      logoURL: `${S3_URL}/kr/menu-bar-logo.svg?v=0.03`,
      speakers: "초청연사",
      symposium: "심포지엄 안내",
      programs: "프로그램",
      lectureHall: "온라인 강연장",
      exhibitHall: "전시부스 ",
      // sponsors: "협찬사",
      home: "홈",

      // sign in 관련
      signInText: "로그인",
      registration: "등록",
      goNextText: "다음",
      goPrevText: "이전",
      uploadBtnText: "Upload",
      submitBtnText: "제출",

      // user관련
      emailInputLabel: "이메일 주소",
      passwordInputLabel: "비밀번호",
      forgotPasswordText: "비밀번호 찾기",
      createAccountText: "계정 등록",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${S3_URL}/kr/main-page-banner.png`,
      landingSection1LogoURL: `${S3_URL}/kr/logo-type-1b.svg`,
      landingSection1Desc: `
        NANOscientific Symposium Korea 등록하기
        <br/><br/>
        국내 원자현미경 전문 심포지엄 NANOscientific Symposium Korea (NSS Korea) 등록을 위해 '등록(registration)' 을 클릭해주세요.
        `,
      // resetPassword
      resetPasswordHeading: "Change a Password",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // 프로그램
      programFileLink:
        "https://surfaceanalysis.kr/img/file/pdf/2022%EB%85%84%EB%8F%84-%ED%91%9C%EB%A9%B4%EB%B6%84%EC%84%9D%ED%95%99%EC%88%A0%EB%8C%80%ED%9A%8C%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-%EC%A2%8C%EC%9E%A5%ED%8F%AC%ED%95%A8-%EC%B5%9C%EC%A2%85.pdf",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",

      // pdf upload
      pdfUploadDescription:
        "Upload file (.pdf,.docx,.pptx) (Maximum size: 15MB)",
    },
  ],
  [
    "kr2023",
    {
      fullName: "2023 NANOscientific Symposium Korea | NSS Korea",
      fullDate: "2023년 6월 29일 - 30일",
      eventLocation: "차세대융합기술원",
      logoURL: `${S3_URL}/kr/nss-logo-fixed-kr.png`,
      speakers: "초청연사",
      symposium: "심포지엄 안내",
      programs: "프로그램",
      lectureHall: "온라인 강연장",
      exhibitHall: "전시부스 ",
      // sponsors: "협찬사",
      home: "홈",

      // sign in 관련
      signInText: "로그인",
      registration: "등록",
      goNextText: "다음",
      goPrevText: "이전",
      uploadBtnText: "Upload",
      submitBtnText: "제출",

      // user관련
      emailInputLabel: "이메일 주소",
      passwordInputLabel: "비밀번호",
      forgotPasswordText: "비밀번호 찾기",
      createAccountText: "계정 등록",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${S3_URL}/kr/main-page-banner.png`,
      landingSection1LogoURL: `${S3_URL}/kr/nss-logo-2023-kr.png`,
      landingSection1Desc: `
        NANOscientific Symposium Korea 등록하기
        <br/><br/>
        국내 원자현미경 전문 심포지엄 NANOscientific Symposium Korea (NSS Korea) 등록을 위해 '등록(registration)' 을 클릭해주세요.
        `,
      // resetPassword
      resetPasswordHeading: "Change a Password",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // 프로그램
      programFileLink: `${S3_URL}/upload/kr/2023/2023 NANOscientific Symposium Korea_porgram book.pdf`,

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",

      // pdf upload
      pdfUploadDescription:
        "Upload file (.pdf,.docx,.pptx) (Maximum size: 15MB)",

      // private route 안내 메시지

      privateRouteMessage: `승인 대기 중입니다. 입금 내역 확인이 완료되는 대로 이용하실 수 있습니다.<br />
        <a href="/kr/2023/register-info" class="link-default" target="_blank" >등록 안내 바로가기</a><br /><br />
        문의처: <a class="link-default" href="mailto:raina@parksystems.com">raina@parksystems.com</a><br />
        `,

      // Event 종료 후 데이터
      isEventEnded: true,
      postEventHighlightSubtitle: "Highlight Video",
      postEventHighlightTitle: "2023 NSS Korea 현장 돌아보기",
      postEventHighlightDesc:
        "2023년 나노사이언티픽 심포지엄 코리아는 국내 저명한 연사들의 초청발표와 원자현미경 장비 체험을 통해 SPM 커뮤니티의 저변을 확대하였습니다. 하이라이트 영상을 통해 생생한 이벤트 현장을 경험해보세요.",
      postEventHighlightVideoURL: "https://www.youtube.com/watch?v=mZ3U5gum1_c",
      postEventGalleryTitle: "현장 스케치",
      postEventGalleryImageList: [
        `${S3_URL}/upload/kr/landing/NSSK_Higlight_01.jpg`,
        `${S3_URL}/upload/kr/landing/NSSK_Higlight_02.jpg`,
        `${S3_URL}/upload/kr/landing/NSSK_Higlight_03.jpg`,
        `${S3_URL}/upload/kr/landing/NSSK_Higlight_04.jpg`,
        `${S3_URL}/upload/kr/landing/NSSK_Higlight_05.jpg`,
        `${S3_URL}/upload/kr/landing/NSSK_Higlight_06.jpg`,
        `${S3_URL}/upload/kr/landing/NSSK_Higlight_07.jpg`,
        `${S3_URL}/upload/kr/landing/NSSK_Higlight_08.jpg`,
        `${S3_URL}/upload/kr/landing/NSSK_Higlight_09.jpg`,
      ],
    },
  ],
  [
    "jp2022",
    {
      fullName: "2022 NANOscientific Symposium Japan | NSS Japan",
      fullDate: "2022年11月18日金曜日",
      eventLocation: "東京大学 本郷キャンパス 工学部２号館",
      logoURL: `${S3_URL}/jp/menu-bar-logo.svg?v=0.03`,
      speakers: "講演者",
      programs: "プログラム",
      lectureHall: "Web講演会",
      exhibitHall: "展示会",
      // sponsors: "スポンサー",
      home: "ホーム",
      greeting: "ごあいさつ",
      attend: "参加手順",
      archive: "アーカイブ",

      signInText: "ログイン",
      // registration: "参加登録はこちらから",
      goNextText: "NEXT",
      goPrevText: "PREV",
      uploadBtnText: "ポスターのアップロード",
      submitBtnText: "提出",

      // user관련
      emailInputLabel: "Email address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot Password?",
      // createAccountText: "参加登録はこちらから",
      passwordSetDescription:
        "本サイトをご利用になるにはIDとパスワードが必要です。IDはご入力いただきましたメールアドレスとなりますので、以下にてパスワードの設定をお願いいたします。",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${S3_URL}/jp/main-page-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/jp/logo-type-1b.svg`,
      landingSection1Desc: `
        ナノテクノロジーとSPMに特化したナノ科学シンポジウム 2022 参加登録受付中！
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

      // pdf upload
      pdfUploadDescription:
        "アップロード可能なファイル形式 (.pdf, .docx, .pptx) (ファイルサイズ最大 15MBまで)",
    },
  ],
  [
    "jp2023",
    {
      fullName: "2023 NANOscientific Symposium Japan | NSS Japan",
      fullDate: "2023年10月28日土曜日",
      eventLocation: "Kanto Gakuin University, Kannai Campus",
      logoURL: `${S3_URL}/jp/nss-logo-fixed-jp.png`,
      speakers: "講演者",
      programs: "プログラム",
      lectureHall: "Web講演会",
      exhibitHall: "展示会",
      // sponsors: "スポンサー",
      home: "ホーム",
      greeting: "ごあいさつ",
      attend: "参加手順",
      archive: "アーカイブ",

      signInText: "ログイン",
      registration: "参加登録はこちらから",
      goNextText: "NEXT",
      goPrevText: "PREV",
      uploadBtnText: "ポスターのアップロード",
      submitBtnText: "提出",

      // user관련
      emailInputLabel: "Email address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot Password?",
      // createAccountText: "参加登録はこちらから",
      passwordSetDescription:
        "本サイトをご利用になるにはIDとパスワードが必要です。IDはご入力いただきましたメールアドレスとなりますので、以下にてパスワードの設定をお願いいたします。",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${S3_URL}/jp/main-page-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/jp/nss-logo-2023-jp.png`,
      landingSection1Desc: `
        ナノテクノロジーとSPMに特化したナノ科学シンポジウム 2022 参加登録受付中！
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

      // pdf upload
      pdfUploadDescription:
        "アップロード可能なファイル形式 (.pdf, .docx, .pptx) (ファイルサイズ最大 15MBまで)",
      isEventEnded: true,
      postEventHighlightSubtitle: "Highlight Video",
      postEventHighlightTitle: "ナノ科学シンポジウム2023 ハイライト映像",
      postEventHighlightDesc:
        "第4回目を迎えたナノ科学シンポジウム2023では、AFMによる粘弾性計測やナノインデンテーション、SPMによる全固体電池の評価等、各分野で活躍している著名人による講演や、30名以上の発表者によるポスターセッションが行われました。オンラインからも沢山の方にご参加いただき、大盛況のうちに終えることが出来ました。会場の様子をハイライト映像でぜひご覧ください。",
      postEventHighlightVideoURL: "https://www.youtube.com/watch?v=f-nHjkNEl9k",
      // postEventGalleryTitle: "イベントの様子",
      // postEventGalleryImageList: [
      //   `${S3_URL}/upload/kr/landing/NSSK_Higlight_01.jpg`,
      //   `${S3_URL}/upload/kr/landing/NSSK_Higlight_02.jpg`,
      //   `${S3_URL}/upload/kr/landing/NSSK_Higlight_03.jpg`,
      //   `${S3_URL}/upload/kr/landing/NSgSK_Higlight_04.jpg`,
      //   `${S3_URL}/upload/kr/landing/NSSK_Higlight_05.jpg`,
      //   `${S3_URL}/upload/kr/landing/NSSK_Higlight_06.jpg`,
      //   `${S3_URL}/upload/kr/landing/NSSK_Higlight_07.jpg`,
      //   `${S3_URL}/upload/kr/landing/NSSK_Higlight_08.jpg`,
      //   `${S3_URL}/upload/kr/landing/NSSK_Higlight_09.jpg`,
      // ],
    },
  ],
  [
    "americas2022",
    {
      fullName: "2022 NANOscientific Symposium Americas | NSS Americas",
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
      uploadBtnText: "Upload",
      submitBtnText: "SUBMIT",
      // user관련
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      createAccountText: "Create an account",
      changePasswordBtnText: "Change Password",
      signInText: "SIGN IN",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${S3_URL}/us/main-page-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/us/logo-type-1b.svg`,
      landingSection1Desc:
        "Join the 2022 NANOscientific Symposium Americas (NSS Americas)- Connecting the Nanomaterials Community.",

      // resetPassword
      resetPasswordHeading: "Change a Password",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",

      // pdf upload
      pdfUploadDescription:
        "Upload file (.pdf,.docx,.pptx) (Maximum size: 15MB)",
    },
  ],
  [
    "americas2023",
    {
      fullName: "2023 NANOscientific Symposium Americas | NSS Americas",
      fullDate: "November 29, 2023",
      eventLocation:
        "Instituto de Física, Universidad Nacional Autónoma de México",
      logoURL: `${S3_URL}/us/nss-logo-fixed-americas.png`,
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
      uploadBtnText: "Upload",
      submitBtnText: "SUBMIT",
      // user관련
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      createAccountText: "Create an account",
      changePasswordBtnText: "Change Password",
      signInText: "SIGN IN",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${S3_URL}/us/main-page-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/us/nss-logo-2023-americas.png`,
      landingSection1Desc:
        "Join the 2022 NANOscientific Symposium Americas (NSS Americas)- Connecting the Nanomaterials Community.",

      // resetPassword
      resetPasswordHeading: "Change a Password",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",

      // pdf upload
      pdfUploadDescription:
        "Upload file (.pdf,.docx,.pptx) (Maximum size: 15MB)",
    },
  ],
  [
    "eu2022",
    {
      fullName: "2022 NANOscientific Forum Europe | NSF Europe",
      fullDate: "October 6-7, 2022",
      logoURL: `${S3_URL}/eu/menu-bar-logo.png?v=0.04`,
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
      uploadBtnText: "Upload",
      submitBtnText: "SUBMIT",
      // user관련
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      // createAccountText: "Create an account",
      changePasswordBtnText: "Change Password",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${S3_URL}/eu/main-page-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/eu/logo-type-1b.svg`,
      landingSection1Desc: `Welcome to the virtual platform of
      NANOscientific Forum Europe (NSFE)
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

      // pdf upload
      pdfUploadDescription:
        "Upload file (.pdf,.docx,.pptx) (Maximum size: 15MB)",

      // speaker
      speakerBannerURL: `${S3_URL}/eu/speaker-banner.jpg`,
    },
  ],
  [
    "eu2023",
    {
      fullName: "2023 NANOscientific Forum Europe | NSF Europe",
      fullDate: "September 13-15, 2023",
      eventLocation: "ICFO, Barcelona",
      logoURL: `${S3_URL}/eu/menu-bar-logo.png?v=0.04`,
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
      uploadBtnText: "Upload",
      submitBtnText: "SUBMIT",
      // user관련
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      createAccountText: "Create an account",
      changePasswordBtnText: "Change Password",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${S3_URL}/eu/2023-europe-banner.png`,
      landingSection1LogoURL: `${S3_URL}/eu/2023NSFE_logo.svg`,
      // landingSection1Desc: `Welcome to the virtual platform of
      // NANOscientific Forum Europe (NSFE)
      // `,
      // resetPassword
      resetPasswordHeading: "Change a Password",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",

      // pdf upload
      pdfUploadDescription:
        "Upload file (.pdf,.docx,.pptx) (Maximum size: 15MB)",

      // speaker
      speakerBannerURL: `${S3_URL}/eu/speaker-banner.jpg`,

      //
      registrationTitle: "Registration",
      registrationDesc: "",
      registrationStep1Label: "Your Information",
      registrationStep2Label: "Checkout",
      registrationStep3Label: "Complete",

      // Event 종료 후 데이터
      isEventEnded: true,
      postEventHighlightSubtitle: "Highlight Video",
      postEventHighlightTitle: "A look back at the NSF Europe 2023",
      postEventHighlightDesc:
        "Once more the NANOscientific Forum Europe brought together members of the SPM community from all over Europe. This year’s host location, the ICFO in beautiful Barcelona, provided the perfect backdrop for 2.5 days of high-quality scientific presentations, insightful hands-on sessions on Park Systems AFMs, and social networking. Watch the video the experience some of the highlights.",
      postEventHighlightVideoURL: "https://www.youtube.com/watch?v=sEzHHKy5U8E",
      postEventGalleryTitle: "On-site impressions",
      postEventGalleryImageList: [
        `${S3_URL}/upload/eu/landing/2023NSFE_gallery_01.jpg`,
        `${S3_URL}/upload/eu/landing/2023NSFE_gallery_02.jpg`,
        `${S3_URL}/upload/eu/landing/2023NSFE_gallery_03.jpg`,
        `${S3_URL}/upload/eu/landing/2023NSFE_gallery_04.jpg`,
        `${S3_URL}/upload/eu/landing/2023NSFE_gallery_05.jpg`,
        `${S3_URL}/upload/eu/landing/2023NSFE_gallery_06.jpg`,
        `${S3_URL}/upload/eu/landing/2023NSFE_gallery_07.jpg`,
        `${S3_URL}/upload/eu/landing/2023NSFE_gallery_08.jpg`,
        `${S3_URL}/upload/eu/landing/2023NSFE_gallery_09.jpg`,
        `${S3_URL}/upload/eu/landing/2023NSFE_gallery_10.jpg`,
        `${S3_URL}/upload/eu/landing/2023NSFE_gallery_11.jpg`,
        `${S3_URL}/upload/eu/landing/2023NSFE_gallery_12.jpg`,
        `${S3_URL}/upload/eu/landing/2023NSFE_gallery_13.jpg`,
        `${S3_URL}/upload/eu/landing/2023NSFE_gallery_14.jpg`,
        `${S3_URL}/upload/eu/landing/2023NSFE_gallery_15.jpg`,
        `${S3_URL}/upload/eu/landing/2023NSFE_gallery_16.jpg`,
        `${S3_URL}/upload/eu/landing/2023NSFE_gallery_17.jpg`,
        `${S3_URL}/upload/eu/landing/2023NSFE_gallery_18.jpg`,
        `${S3_URL}/upload/eu/landing/2023NSFE_gallery_19.jpg`,
        `${S3_URL}/upload/eu/landing/2023NSFE_gallery_20.jpg`,
        `${S3_URL}/upload/eu/landing/2023NSFE_gallery_21.jpg`,
        `${S3_URL}/upload/eu/landing/2023NSFE_gallery_22.jpg`,
        `${S3_URL}/upload/eu/landing/2023NSFE_gallery_23.jpg`,
        `${S3_URL}/upload/eu/landing/2023NSFE_gallery_24.jpg`,
        `${S3_URL}/upload/eu/landing/2023NSFE_gallery_25.jpg`,
      ],
    },
  ],
  [
    "china2022_china",
    {
      fullName: "2022 NANOscientific Symposium China | NSS China",
      fullDate: "10月27-28日",
      eventLocation: "郑州大学",
      logoURL: `${CHINA_S3_URL}/menu-bar-logo.svg?v=0.1`,
      speakers: "报告人",
      programs: "会议日程",
      lectureHall: "会议室",
      exhibitHall: "展位",
      home: "主页",
      registration: "报名参会",
      // buttonText
      signInText: "登录",
      goNextText: "下一步",
      goPrevText: "上一步",
      submitBtnText: "提交",
      // user관련
      emailInputLabel: "邮箱地址",
      passwordInputLabel: "密码",
      forgotPasswordText: "忘记密码",
      createAccountText: "创建新账户",

      // lecture hall 관련
      liveText: "直播",
      browserJoinBtnText: "通过浏览器页面参加",
      appJoinBtnText: "通过Zoom App参加",
      registerBtnText: "登录",

      adminBtnText: "ADMIN",
      signOutBtnText: "退出",
      changePasswordBtnText: "更改密码",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${CHINA_S3_URL}/main-page-banner.jpg`,
      landingSection1LogoURL: `${CHINA_S3_URL}/logo-type-1b.svg`,
      landingSection1Desc:
        "点击参加2022年第四届纳米科学大会- 纳米科学与扫描探针显微术交流平台",

      // resetPassword
      resetPasswordHeading: "更改密码",
      setPasswordHeading: "设置密码",
      resetPasswordCurrentLabel: "当前密码",
      resetPasswordNewLabel: "新密码",
      resetPasswordNewConfirmLabel: "新密码确认",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",

      // comingSoon
      comingSoonText: "没有要显示的内容。",

      // pdf upload
      pdfUploadDescription:
        "Upload file (.pdf,.docx,.pptx) (Maximum size: 15MB)",
      uploadBtnText: "Upload",
    },
  ],
  [
    "china2022_english",
    {
      fullName: "2022 NANOscientific Symposium China | NSS China",
      fullDate: "October 27-28, 2022",
      eventLocation: "Zhengzhou University",
      logoURL: `${CHINA_S3_URL}/menu-bar-logo.svg?v=0.1`,
      speakers: "Speakers",
      programs: "Progrmas",
      lectureHall: "Lecture Hall",
      exhibitHall: "Exhibit Hall",
      home: "Home",
      registration: "REGISTRATION",
      // buttonText
      signInText: "Sign in",
      goNextText: "Next",
      goPrevText: "Prev",
      submitBtnText: "SUBMIT",
      // user관련
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      createAccountText: "Create an account",
      // lecture hall 관련
      liveText: "LIVE",
      browserJoinBtnText: "Join via Browser",
      appJoinBtnText: "Join via Zoom App",
      registerBtnText: "Register",

      adminBtnText: "Admin",
      signOutBtnText: "Sign Out",
      changePasswordBtnText: "Change Password",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${CHINA_S3_URL}/main-page-banner.jpg`,
      landingSection1LogoURL: `${CHINA_S3_URL}/logo-type-1b.svg`,
      landingSection1Desc:
        "Join the 2022 NANOscientific Symposium China (NSS China) – Connecting the SPM Community.",

      // resetPassword
      resetPasswordHeading: "Change a Password",
      setPasswordHeading: "Set a Password",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",

      // comingSoon
      comingSoonText: "Coming Soon",

      // pdf upload
      pdfUploadDescription:
        "Upload file (.pdf,.docx,.pptx) (Maximum size: 15MB)",
      uploadBtnText: "Upload",
    },
  ],
  [
    "china2023_china",
    {
      fullName: "2023 NANOscientific Symposium China | NSS China",
      fullDate: "TBD",
      eventLocation: "Renmin University of China, Beijing",
      logoURL: `${CHINA_S3_URL}/nss-logo-fixed-cn.png`,
      speakers: "报告人",
      programs: "会议日程",
      lectureHall: "会议室",
      exhibitHall: "展位",
      home: "主页",
      registration: "报名参会",
      // buttonText
      signInText: "登录",
      goNextText: "下一步",
      goPrevText: "上一步",
      submitBtnText: "提交",
      // user관련
      emailInputLabel: "邮箱地址",
      passwordInputLabel: "密码",
      forgotPasswordText: "忘记密码",
      createAccountText: "创建新账户",

      // lecture hall 관련
      liveText: "直播",
      browserJoinBtnText: "通过浏览器页面参加",
      appJoinBtnText: "通过Zoom App参加",
      registerBtnText: "登录",

      adminBtnText: "ADMIN",
      signOutBtnText: "退出",
      changePasswordBtnText: "更改密码",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${CHINA_S3_URL}/main-page-banner.jpg`,
      landingSection1LogoURL: `${CHINA_S3_URL}/nss-logo-2023-cn.png`,
      landingSection1Desc:
        "点击参加2022年第四届纳米科学大会- 纳米科学与扫描探针显微术交流平台",

      // resetPassword
      resetPasswordHeading: "更改密码",
      setPasswordHeading: "设置密码",
      resetPasswordCurrentLabel: "当前密码",
      resetPasswordNewLabel: "新密码",
      resetPasswordNewConfirmLabel: "新密码确认",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",

      // comingSoon
      comingSoonText: "没有要显示的内容。",

      // pdf upload
      pdfUploadDescription:
        "Upload file (.pdf,.docx,.pptx) (Maximum size: 15MB)",
      uploadBtnText: "Upload",

      // Event 종료 후 데이터
      isEventEnded: true,
      postEventHighlightSubtitle: "Highlight Video",
      postEventHighlightTitle: "2023年第五届中国纳米科学论坛精彩回顾",
      postEventHighlightDesc:
        "2023年第五届中国纳米科学论坛主要围绕先进原子力探针显微技术方法、功能模式及其在半导体材料与器件、新型功能材料（包括铁电、多铁等）、二维原子晶体材料（包括异质结、莫尔超结构等）、能源材料与器件（包括锂电池、光伏材料等）等方面的应用开展了学术交流。",
      postEventHighlightVideoURL:
        "//player.bilibili.com/player.html?aid=323567100&bvid=BV1Sw411H7MU&cid=1335039326&p=1",
      postEventGalleryTitle: "会议现场回顾",
      postEventGalleryImageList: [
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_01.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_02.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_03.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_04.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_05.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_06.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_07.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_08.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_09.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_10.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_11.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_12.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_13.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_14.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_15.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_16.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_17.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_18.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_19.jpg`,
      ],
    },
  ],
  [
    "china2023_english",
    {
      fullName: "2023 NANOscientific Symposium China | NSS China",
      fullDate: "TBD",
      // eventLocation: "Zhengzhou University",
      logoURL: `${CHINA_S3_URL}/nss-logo-fixed-cn.png`,
      speakers: "Speakers",
      programs: "Progrmas",
      lectureHall: "Lecture Hall",
      exhibitHall: "Exhibit Hall",
      home: "Home",
      registration: "REGISTRATION",
      // buttonText
      signInText: "Sign in",
      goNextText: "Next",
      goPrevText: "Prev",
      submitBtnText: "SUBMIT",
      // user관련
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      createAccountText: "Create an account",
      // lecture hall 관련
      liveText: "LIVE",
      browserJoinBtnText: "Join via Browser",
      appJoinBtnText: "Join via Zoom App",
      registerBtnText: "Register",

      adminBtnText: "Admin",
      signOutBtnText: "Sign Out",
      changePasswordBtnText: "Change Password",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${CHINA_S3_URL}/main-page-banner.jpg`,
      landingSection1LogoURL: `${CHINA_S3_URL}/nss-logo-2023-cn.png`,
      landingSection1Desc:
        "Join the 2022 NANOscientific Symposium China (NSS China) – Connecting the SPM Community.",

      // resetPassword
      resetPasswordHeading: "Change a Password",
      setPasswordHeading: "Set a Password",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",

      // comingSoon
      comingSoonText: "Coming Soon",

      // pdf upload
      pdfUploadDescription:
        "Upload file (.pdf,.docx,.pptx) (Maximum size: 15MB)",
      uploadBtnText: "Upload",

      // Event 종료 후 데이터
      isEventEnded: true,
      postEventHighlightSubtitle: "Highlight Video",
      postEventHighlightTitle: "2023年第五届中国纳米科学论坛精彩回顾",
      postEventHighlightDesc:
        " 2023年第五届中国纳米科学论坛主要围绕先进原子力探针显微技术方法、功能模式及其在半导体材料与器件、新型功能材料（包括铁电、多铁等）、二维原子晶体材料（包括异质结、莫尔超结构等）、能源材料与器件（包括锂电池、光伏材料等）等方面的应用开展了学术交流。",
      postEventHighlightVideoURL:
        "//player.bilibili.com/player.html?aid=323567100&bvid=BV1Sw411H7MU&cid=1335039326&p=1",
      postEventGalleryTitle: "会议现场回顾",
      postEventGalleryImageList: [
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_01.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_02.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_03.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_04.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_05.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_06.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_07.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_08.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_09.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_10.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_11.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_12.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_13.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_14.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_15.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_16.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_17.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_18.jpg`,
        `${CHINA_S3_URL}/common/landing/NSSC_Highlight_19.jpg`,
      ],
    },
  ],
]);
