/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");

const TARGET = process.env.npm_lifecycle_event;
// .env
const dotenv = require("dotenv");

// 웹팩에서 html을 파싱하기 위함.
const HtmlWebpackPlugin = require("html-webpack-plugin");

// tsconfig에서 baseUrl을 받아오기 위함
const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

// gzip
const CompressionPlugin = require("compression-webpack-plugin");

// 번들 점유 용량 확인
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

// Typescript(타입스크립트)를 빌드할 때 성능을 향상시키기 위한 플러그인를 불러오기
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

// uglify
const TerserPlugin = require("terser-webpack-plugin");

dotenv.config();

module.exports = (env, argv) => {
  if (argv.mode === "production") {
    dotenv.config({ path: "./.env.production" });
  }
  if (argv.mode === "development") {
    dotenv.config({ path: "./.env.development" });
  }
  return {
    entry: {
      // 번들 파일(bundle)의 시작 파일(Entry)을 jsx에서 tsx로 변경
      "js/app": ["./src/index.tsx"],
    },
    output: {
      path: path.resolve(__dirname, "dist/"),
      publicPath: "/",
      filename: "build.[chunkhash].js",
    },
    resolve: {
      plugins: [new TsConfigPathsPlugin()],
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
    module: {
      rules: [
        // Webpack(웹팩)에서 Typescript(타입스크립트)를 사용하기 위해 js|jsx를 ts|tsx로 수정 후 ts-loader를 추가
        // ts-loader의 옵션은 성능 향상을 위해서
        {
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                plugins: ["@babel/transform-runtime"],
              },
            },
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
              },
            },
          ],
          exclude: /node_modules/,
        },
        // css, scss loader 설정
        {
          test: /\.(s*)css$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        // robot, sitemap
        {
          test: /sitemap\.xml/,
          type: "asset/resource",
          generator: {
            filename: "sitemap.xml",
          },
        },
        {
          test: /sitemap-kr\.xml/,
          type: "asset/resource",
          generator: {
            filename: "sitemap.xml",
            outputPath: "kr/",
          },
        },
        {
          test: /sitemap-jp\.xml/,
          type: "asset/resource",
          generator: {
            filename: "sitemap.xml",
            outputPath: "jp/",
          },
        },
        {
          test: /sitemap-asia\.xml/,
          type: "asset/resource",
          generator: {
            filename: "sitemap.xml",
            outputPath: "asia/",
          },
        },
        {
          test: /sitemap-americas\.xml/,
          type: "asset/resource",
          generator: {
            filename: "sitemap.xml",
            outputPath: "americas/",
          },
        },
        {
          test: /sitemap-eu\.xml/,
          type: "asset/resource",
          generator: {
            filename: "sitemap.xml",
            outputPath: "eu/",
          },
        },
        {
          test: /\.txt/,
          type: "asset/resource",
          generator: {
            filename: "robots.txt",
          },
        },
      ],
    },
    // proxy 설정
    devServer: {
      historyApiFallback: true,
      port: env.port,
      proxy: {
        "/api": "http://localhost:5000",
      },
    },
    // devtool: "eval-source-map",
    // devtool: false,
    // uglify
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    plugins: [
      // 기본 html 위치 설정.
      new HtmlWebpackPlugin({
        template:
          env.port === "8080"
            ? "./public/index.html"
            : "./public/index-cn.html",
        filename: "index.html",
      }),
      // Typescript(타입스크립트)의 컴파일 속도 향상을 위한 플러그인을 설정
      new ForkTsCheckerWebpackPlugin(),
      // new BundleAnalyzerPlugin(),
      // gzip (압축)
      new CompressionPlugin({
        algorithm: "gzip",
      }),

      // env 변수 사용을 위한 플러그인
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
      // new webpack.EvalSourceMapDevToolPlugin({
      //   // publicPath: "http://localhost:3000/",
      //   // filename: "[file].map",
      // }),
    ],
  };
};
