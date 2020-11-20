import axios from 'axios'

var convert = require('xml-js')

const jobStore = {
    namespaced: true,
    state: {
        apply: [
            { 접수마감일: '', 전형방법: '', 접수방법: '', '제출 서류': '', '제출 서류 양식': '' }
        ],
        items: [],
        data: [],
        jobs: []
    },
    actions: {
        loadXml({ commit }) {
            //최신 채용 정보 xml
            axios.get("http://openapi.work.go.kr/opi/opi/opia/wantedApi.do?authKey=WNKH0840HVI0HM49CADKA2VR1HJ&callTp=L&returnType=XML&startPage=1&display=20&occupation=214200|214201|214202|214302|022|023|024|025|056")
                .then((response) => {
                    let data = response.data
                    //xml to json
                    let json = convert.xml2json(data, { compact: true })
                    this.jobs = JSON.parse(json)
                    commit('SET_POST', this.jobs)

                });
        },
        loadJobDetail({ commit }, wantedNo) {
            console.log(wantedNo.wantedNo);
            axios.get(
                "http://openapi.work.go.kr/opi/opi/opia/wantedApi.do?authKey=WNKH0840HVI0HM49CADKA2VR1HJ&callTp=D&returnType=XML&infoSvc=VALIDATION&wantedAuthNo=" +
                wantedNo.wantedNo
            )
                .then((response) => {
                    console.log(response)
                    var xml = response.data;
                    var json = convert.xml2json(xml, { compact: true });
                    this.items = JSON.parse(json);
                    let receiptCloseDt = this.items.wantedDtl.wantedInfo.receiptCloseDt._text;
                    let selMthd = this.items.wantedDtl.wantedInfo.selMthd._text;
                    let rcptMthd = this.items.wantedDtl.wantedInfo.rcptMthd._text;
                    let submitDoc = this.items.wantedDtl.wantedInfo.submitDoc._text;
                    let attachFileInfo = this.items.wantedDtl.wantedInfo.attachFileInfo;
                    console.log(attachFileInfo);
                    if (attachFileInfo === undefined) {
                        attachFileInfo = '등록된 파일이 없습니다.'
                    } else {
                        attachFileInfo = this.items.wantedDtl.wantedInfo.attachFileInfo.attachFileUrl._text;

                        attachFileInfo = '<a href="' + attachFileInfo + '">' + "다운로드" + '</a>';

                        // var temp = document.createElement('div');
                        // temp.innerHTML = attachFileInfo;
                        // console.log(temp)

                        // var htmlObject = temp.firstChild;
                        // console.log(htmlObject)
                    }
                    this.apply = [
                        { 접수마감일: receiptCloseDt, 전형방법: selMthd, 접수방법: rcptMthd, '제출 서류': submitDoc, '제출 서류 양식': attachFileInfo }

                    ]
                    commit('SET_GET_JOB', this.items)
                    commit('SET_GET_JOB_BOARD', this.apply)

                });

        },
    },
    mutations: {
        SET_POST(state, jobs) {
            state.jobs = jobs
        },
        SET_GET_JOB(state, items) {
            state.items = items
        },
        SET_GET_JOB_BOARD(state, apply) {
            state.apply = apply
        }
    }

}
export default jobStore