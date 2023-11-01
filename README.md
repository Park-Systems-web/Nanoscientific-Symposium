<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">🌎NanoScientific🌎</h3>
  <a href="https://event.nanoscientific.org/"><strong>Explore Site Right Now ❗️ ❕ </strong></a>
  <p align="center">
    for global nanoscientific website 
    <br />
    <a href="https://github.com/Park-Systems-web"><strong>Explore the Organization</strong></a>
    <br />
    <br />
    <!-- <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a> -->
    <!-- · -->
    <a href="https://github.com/Park-Systems-web/Nanoscientific-Symposium/issuess">Report Bug</a>
    ·
    <a href="https://github.com/Park-Systems-web/Nanoscientific-Symposium/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <!-- <a href="#about-the-project">About The Project</a> -->
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#convention">Convention</a></li>
        <li><a href="#commit-convention">Commit Convention</a></li>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

<!-- ## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

There are many great README templates available on GitHub; however, I didn't find one that really suited my needs so I created this enhanced one. I want to create a README template so amazing that it'll be the last one you ever need -- I think this is it.

Here's why:

-   Your time should be focused on creating something amazing. A project that solves a problem and helps others
-   You shouldn't be doing the same tasks over and over like creating a README from scratch
-   You should implement DRY principles to the rest of your life :smile:

Of course, no one template will serve all projects since your needs may be different. So I'll be adding more in the near future. You may also suggest changes by forking this repo and creating a pull request or opening an issue. Thanks to all the people have contributed to expanding this template!

Use the `BLANK_README.md` to get started.

<p align="right">(<a href="#top">back to top</a>)</p> -->

### Built With

Frontend

<code><img width="60" height="60" src="https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg"></code>
<code><img width="60" height="60" src="https://www.vectorlogo.zone/logos/w3_css/w3_css-official.svg"></code>
<code><img width="60" height="60" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png"></code>
<code><img width="60" height="60" src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg"></code>

Backend

<code><img width="60" height="60" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png"></code>
<code><img width="60" height="60" src="https://user-images.githubusercontent.com/69495129/155488270-960f796b-74bd-46a4-b572-4f43106c6aa4.png"></code>
<code><img width="60" height="60" src="https://user-images.githubusercontent.com/69495129/155488041-ea2db9f6-8379-4d5c-8a1d-d9d89717bedc.png"></code>

etc

<code><img width="60" height="60" src="https://www.vectorlogo.zone/logos/mysql/mysql-icon.svg"></code>
<code><img width="60" height="60" src="https://www.vectorlogo.zone/logos/jenkins/jenkins-icon.svg"></code>
<code><img width="60" height="60" src="https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg"></code>

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### convention

- Coding Convention

1. React folder Structure
   ```txt
   /SomeComponent or page folder
   ├── SomeComponent.tsx
   └── SomeComponentStyles.tsx
   /SomeComponent2 or page folder
   ├── SomeComponent2.tsx
   └── SomeComponen2tStyles.tsx
   ```
2. prettier

   ```txt
   {
     "singleQuote": false,
     "semi": true,
     "useTabs": false,
     "tabWidth": 2,
     "trailingComma": "all",
     "printWidth": 80,
     "arrowParens": "always"
   }
   ```

3. Camel Case

   ```ts
   lectureHall;
   lastName;
   ```

4. styled-components 구조: 최상위 태그에만 한 번

   ```ts
   const StyledTag = styled.div``;

   return (
     <StyledTag>
       <div>Not</div>
       <div>There</div>
     </StyledTag>
   );
   ```

5. 타입 관리

- 전역적으로 재사용될 타입: `src/@types/index.d.ts`에서 `declare`하여 정리(import, export 필요 없음)
- 단 하나의 컴포넌트에만 쓰이는 타입은 해당 파일 내부에 선언해도 무관
- 타입 선언 방식: interface(대부분의 타입) + type alias(원시 타입)

### Commit Convention

feat: 새로운 기능에 대한 커밋  
content: 내용
design: UI 수정 및 구현에 대한 커밋
fix: 버그 수정에 대한 커밋  
build: 빌드 관련 파일 수정에 대한 커밋  
etc: 그 외 자잘한 수정에 대한 커밋  
docs: README.md 수정에 대한 커밋  
style: 코드 스타일 혹은 포맷 등에 관한 커밋(prettier 등)  
refactor: 코드 리팩토링에 대한 커밋

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/Park-Systems-web/Nanoscientific-Symposium.git
   ```
1. Install NPM packages both client and server
   ```sh
   npm install
   ```
1. `.env*` and `database.json` should be included in client and server folder

   ```js
     client/.env*
   ```

   ```js
     server/.env*
     server/database.json
   ```

1. Go to server directory then hit the command

   ```sh
   # Global Page
   npm run dev

   # Chinese Page
   npm run dev-cn
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Eric Kim - [GitHub](https://github.com/rnintai) - eric.kim@parksystems.com

Chanhyuk Park - [GitHub](https://github.com/ChanhyukPark-Tech) - chanhyuk-tech@kakao.com

Project Link: [NanoScientific Symposium !!!](https://github.com/Park-Systems-web/Nanoscientific-Symposium)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

- [Choose an Open Source License](https://choosealicense.com)
- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
- [Malven's Grid Cheatsheet](https://grid.malven.co/)
- [Img Shields](https://shields.io)
- [GitHub Pages](https://pages.github.com)
- [Font Awesome](https://fontawesome.com)
- [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png

### Command

`Nginx restart`

```
sudo service nginx restart
```

`Server restart` should be inside in server folder

```
sudo forever restart index.js
```
