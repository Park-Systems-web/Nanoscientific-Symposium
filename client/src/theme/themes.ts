import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false; // 900px
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
    wide: true;
  }

  interface Palette {
    warning: Palette["primary"];
    whitescale: Palette["primary"];
    mode: PaletteMode;
  }

  interface PaletteColorOptions {
    main: string;
    contrastText: string;
    contrastTextAlpha?: string;
    navy?: string;
    alpha50?: string;
    gradation?: string;
    verticalGradation?: string;
    overlay?: string;
    mainBg?: string;
  }

  interface PaletteColor {
    main: string;
    contrastText: string;
    contrastTextAlpha?: string;
    alpha50?: string;
    navy?: string;
    heading?: string;
    gradation?: string;
    verticalGradation?: string;
    overlay?: string;
    mainBg?: string;
  }
}

const getDesignTokens = (mode: PaletteMode) => ({
  mode,
  ...(mode === "light"
    ? {
        primary: {
          light: "#0040ff",
          main: "#21ade5",
          dark: "#189cd1",
          navy: "#222e57",
          heading: "#222e57",
          contrastText: "#fff",
          contrastTextAlpha: "#ffffffad",
          gradation: "linear-gradient(270deg, #243d7c, #26a4dd)",
          verticalGradation: "linear-gradient(0deg, #243d7c, #26a4dd)",
          overlay: "linear-gradient(0deg, #2ba4dd52, transparent)",
          mainBg: "#EDF4FC",
        },
        secondary: {
          contrastText: "#fff",
          dark: "#7b1fa2",
          light: "#ba68c8",
          main: "#9c27b0",
          overlay: "linear-gradient(180deg,#2ba4dd52,transparent,#0c00ff26)",
        },
        warning: {
          main: "#FF0000",
          contrastText: "#fff",
          contrastTextAlpha: "#ffffffad",
        },
        whitescale: {
          main: "#fff",
          alpha50: "#ffffff66",
        },
        background: {
          // default: "rgb(230, 231, 236)",
          default: "rgb(255,255,255)",
        },
      }
    : {
        // dark
        primary: {
          contrastText: "rgba(0, 0, 0, 0.87)",
          dark: "#1897c5",
          heading: "#002348",
          navy: "#222e57",
          light: "#e3f2fd",
          main: "#1CAFE4",
          gradation: "linear-gradient(270deg, #243d7c, #26a4dd)",
          verticalGradation: "linear-gradient(0deg, #243d7c, #26a4dd)",
          overlay: "linear-gradient(0deg, #2ba4dd52, transparent)",
        },
        secondary: {
          contrastText: "rgba(0, 0, 0, 0.87)",
          dark: "#ab47bc",
          light: "#f3e5f5",
          main: "#ce93d8",
          overlay: "linear-gradient(180deg,#2ba4dd52,transparent,#0c00ff26)",
        },
        // warning: {
        //   main: "#FF0000",
        //   contrastText: "#fff",
        //   contrastTextAlpha: "#ffffffad",
        // },
        whitescale: {
          main: "#fff",
          alpha50: "#ffffffc4",
        },
        background: {
          default: "#3C3D3B",
        },
      }),
});

export const theme = (isDark: boolean) => {
  return createTheme({
    typography: {
      allVariants: {
        fontFamily: `"Open Sans", "Noto Sans JP","Noto Sans SC", sans-serif`,
      },
    },
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 768,
        laptop: 1024,
        desktop: 1280,
        wide: 1921,
      },
    },
    palette: getDesignTokens(isDark ? "dark" : "light"),
  });
};

export const jpTheme = (isDark: boolean) => {
  return createTheme({
    typography: {
      allVariants: {
        fontFamily: `"Noto Sans JP", sans-serif`,
      },
    },
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 768,
        laptop: 1024,
        desktop: 1280,
        wide: 1921,
      },
    },
    palette: getDesignTokens(isDark ? "dark" : "light"),
  });
};

export const enTheme = (isDark: boolean) => {
  return createTheme({
    typography: {
      allVariants: {
        fontFamily: `"Microsoft JhengHei", sans-serif`,
        // fontFamily: `"Open Sans", sans-serif`,
      },
    },
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 768,
        laptop: 1024,
        desktop: 1280,
        wide: 1921,
      },
    },
    palette: getDesignTokens(isDark ? "dark" : "light"),
  });
};
