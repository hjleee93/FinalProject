const path = require('path')
module.exports = {
  //index path설정
  indexPath: "../../" + "src/main/resources/static/index.html",
  //build output 파일 path 설정
  outputDir: path.resolve(__dirname, "../../" + "/Desktop/spring/itjobgo_final/src/main/resources/static"),
  "transpileDependencies": [
    "vuetify"
  ]

}