const path = require('path')
module.exports = {
  publicPath: "/itjobgo/resources/static",
  outputDir: path.resolve(__dirname, "../" + "main/resources/static"),
  "transpileDependencies": [
    "vuetify"
  ]

}