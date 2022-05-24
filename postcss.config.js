const postcssNested = require('postcss-nested')

module.exports = {
  plugins: [
    [
      'postcss-preset-env',
      postcssNested,
      {
        // Options
      },
    ],
  ],
}
