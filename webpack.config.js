const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");

const PATH = {
  source: path.join(__dirname, "src"),
  build: path.join(__dirname, "dist")
};

module.exports = (env, argv) => {
  const isProductionBuild = argv.mode === "production";
  const publicPath = "/dist";

  const jsx = {
    test: /\.(js|jsx)$/i,
    exclude: /(node_modules)/,
    loader: "babel-loader"
  };

  const files = {
    test: /\.(png|jpe?g|gif?)$/i,
    loader: "file-loader",
    options: {
      name: "[hash].[ext]"
    }
  };

  const fonts = {
    test: /\.(woff|woff2?)$/i,
    loader: "file-loader",
    options: {
      name: "fonts/[hash].[ext]"
    }
  };

  const svg = {
    test: /\.svg$/,
    use: [
      {
        loader: "svg-sprite-loader",
        options: {
          extract: true,
          spriteFilename: svgPath => `sprite${svgPath.substr(-4)}`
        }
      },
      "svg-transform-loader",
      {
        loader: "svgo-loader",
        options: {
          plugins: [
            { removeTitle: true },
            {
              removeAttrs: {
                attrs: "(fill|stroke)"
              }
            }
          ]
        }
      }
    ]
  };

  const scss = {
    test: /\.(sa|sc|c)ss$/,
    use: [
      isProductionBuild ? MiniCssExtractPlugin.loader : "style-loader",
      {
        loader: "css-loader",
        options: {
          importLoaders: 1,
          modules: true,
          localIdentName: "[path][name]__[local]--[hash:base64:5]"
        }
      },
      "sass-loader"
    ]
  };

  const config = {
    entry: {
      index: PATH.source + "/index.js"
    },

    output: {
      path: PATH.build,
      publicPath: isProductionBuild ? publicPath : "/",
      filename: "js/[name].[hash].build.js",
      chunkFilename: "[chunkhash].js"
    },

    devServer: {
      historyApiFallback: { index: "/index.html" },
      noInfo: false,
      overlay: true
    },

    module: {
      rules: [scss, files, fonts, svg, jsx]
    },

    resolve: {
      extensions: ["*", ".js", ".jsx"]
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        chunks: ["index"],
        template: `${PATH.source}/index.html`
      }),
      new SpriteLoaderPlugin({ plainSprite: true }),
      new CleanWebpackPlugin(), //удаляет мусор при сборке
      new MiniCssExtractPlugin({
        filename: isProductionBuild ? "[name].[hash].css" : "[name].css",
        chunkFilename: isProductionBuild ? "[id].[hash].css" : "[id].css"
      }),
      new webpack.DefinePlugin({
        // Делает доступными указанные переменные в JS
        isProductionBuild: JSON.stringify(isProductionBuild),
        LANG: JSON.stringify("ru")
      })
    ],
    devtool: isProductionBuild ? "none" : "eval-source-map"
  };

  return config;
};
