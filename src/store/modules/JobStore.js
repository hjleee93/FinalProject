import axios from 'axios'

var convert = require('xml-js')

const jobStore = {
    namespaced: true,
    state: {
        tableList: [
            {
                company: '', title: '', ability: '', Condition: '',
                deadline: ''
            }
        ],
        apply: '',
        items: [],
        data: [],
        jobs: [],
        jobInfo: [],

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

        //상세페이지 
        loadJobDetail({ commit }, wantedNo) {
            console.log("wantedNo: " + JSON.stringify(wantedNo));
            axios.get(
                "http://openapi.work.go.kr/opi/opi/opia/wantedApi.do?authKey=WNKH0840HVI0HM49CADKA2VR1HJ&callTp=D&returnType=XML&infoSvc=VALIDATION&wantedAuthNo=" +
                wantedNo.wantedNo
            )
                .then((response) => {
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
                    this.apply =
                        { receiptCloseDt: receiptCloseDt, selMthd: selMthd, rcptMthd: rcptMthd, submitDoc: submitDoc, attachFileInfo: attachFileInfo }



                    commit('SET_GET_JOB', this.items)
                    commit('SET_GET_JOB_BOARD', this.apply)

                });

        },
        loadJobTable({ commit }) {
            axios.get('http://openapi.work.go.kr/opi/opi/opia/wantedApi.do?authKey=WNKH0840HVI0HM49CADKA2VR1HJ&callTp=L&returnType=XML&startPage=1&display=100&occupation=214200|214201|214202|214302|022|023|024|025|056')//추천 채용정보
                .then((response) => {
                    var xml = response.data
                    var json = convert.xml2json(xml, { compact: true })
                    this.jobInfo = JSON.parse(json);

                    const companyName = new Array();

                    this.tableList = [
                        {
                            company: this.jobInfo.wantedRoot.wanted[0].company._text,
                            title: this.jobInfo.wantedRoot.wanted[0].title._text,
                            ability: this.jobInfo.wantedRoot.wanted[0].minEdubg._text,
                            Condition: this.jobInfo.wantedRoot.wanted[0].sal._text,
                            deadline: this.jobInfo.wantedRoot.wanted[0].closeDt._text,
                            jobNo: this.jobInfo.wantedRoot.wanted[0].wantedAuthNo._text
                        }
                    ]
                    for (let i = 1; i < 100; i++) {
                        companyName[i] = this.jobInfo.wantedRoot.wanted[i];

                        this.tableList.push(
                            {
                                company: companyName[i].company._text,
                                title: companyName[i].title._text,
                                ability: companyName[i].minEdubg._text,
                                Condition: companyName[i].sal._text,
                                deadline: (companyName[i].closeDt._text),
                                jobNo: companyName[i].wantedAuthNo._text
                            }
                        )
                        //console.log(companyName.company._text);

                    }

                    commit('SET_JOB_INFO_LIST', this.tableList)
                    commit('SET_JOB_INFO', this.jobInfo)

                });

        },
        searchLoadTable({ commit }, keyword) {
            console.log("keyword: " + keyword.keyword);
            axios.get('http://openapi.work.go.kr/opi/opi/opia/wantedApi.do?authKey=WNKH0840HVI0HM49CADKA2VR1HJ&callTp=L&returnType=XML&startPage=1&display=100&occupation=214200|214201|214202|214302|022|023|024|025|056&keyword=' + keyword.keyword)//추천 채용정보
                .then((response) => {
                    var xml = response.data
                    var json = convert.xml2json(xml, { compact: true })
                    this.jobInfo = JSON.parse(json);

                    const companyName = new Array();

                    this.tableList = [
                        {
                            company: this.jobInfo.wantedRoot.wanted[0].company._text,
                            title: this.jobInfo.wantedRoot.wanted[0].title._text,
                            ability: this.jobInfo.wantedRoot.wanted[0].minEdubg._text,
                            Condition: this.jobInfo.wantedRoot.wanted[0].sal._text,
                            deadline: this.jobInfo.wantedRoot.wanted[0].closeDt._text,
                            jobNo: this.jobInfo.wantedRoot.wanted[0].wantedAuthNo._text
                        }
                    ]
                    for (let i = 1; i < 100; i++) {
                        companyName[i] = this.jobInfo.wantedRoot.wanted[i];

                        this.tableList.push(
                            {
                                company: companyName[i].company._text,
                                title: companyName[i].title._text,
                                ability: companyName[i].minEdubg._text,
                                Condition: companyName[i].sal._text,
                                deadline: companyName[i].closeDt._text,
                                jobNo: companyName[i].wantedAuthNo._text
                            }
                        )
                        //console.log(companyName.company._text);

                    }

                    commit('SET_JOB_INFO_LIST', this.tableList)
                    commit('SET_JOB_INFO', this.jobInfo)

                });

        }


    },
    mutations: {
        SET_JOB_INFO_LIST(state, tableList) {
            state.tableList = tableList;
        },
        SET_JOB_INFO(state, jobInfo) {
            state.jobInfo = jobInfo;
        },
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