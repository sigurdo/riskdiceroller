const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const {GenerateSW} = require("workbox-webpack-plugin");

const production = process.env.PRODUCTION == 1;

let patterns = [
  "manifest.json",
];

const preserve_structure_patterns = [
  "*.html",
  "css/**",
  "js/**",
  "media/**",
];

for (let i in preserve_structure_patterns) {
  patterns.push(
    {
      from: preserve_structure_patterns[i],
      to: "[path][name][ext]",
    }
  );
}

const plugins = [
  new CopyWebpackPlugin({
    patterns
  }),
];

if (production) {
  plugins.push(
    new GenerateSW({
      swDest: "sw.js",
      // Do not precache the song, since it is very large and not that important.
      exclude: [
        /\.mp3$/,
      ],
    })
  );
}

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  mode: production ? "production" : "development",
  plugins,
};
