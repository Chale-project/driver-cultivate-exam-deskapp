import { getTestExamData, getExamData } from '@/api/common'

const state = {
  exams: [],
  TotalCounts: 0,
  curIndex: 0,
  rightCounts: 0,
  wrongCounts: 0,
  curExamInfo: {}
}

const mutations = {
  SET_EXAMS: (state, list) => {
    state.exams = list
  },
  SET_TOTALCOUNTS: (state, i) => {
    state.TotalCounts = i
  },
  SET_CURINDEX: (state, j) => {
    state.curIndex = j
  },
  SET_RIGHTCOUNTS: (state, k) => {
    if (!k) state.rightCounts++
    else state.rightCounts = k
  },
  SET_WRONGCOUNTS: (state, k) => {
    if (!k) state.wrongCounts++
    else state.wrongCounts = k
  },
  GET_CUREXAMINFO: (state) => {
    if (state.exams[state.curIndex]) state.curExamInfo = state.exams[state.curIndex]
    else state.curExamInfo = {}
  },
  SET_ISANSWER: (state) => {
    state.exams[state.curIndex].isAnswer = !0
  },
  GET_CHECKEDANSWER: (state, info) => {
    state.exams[state.curIndex].checkedAnswer = info
  }

}

const actions = {
  // 获取试用题库
  getTestExamList({ commit }, params) {
    return new Promise((resolve, reject) => {
      getTestExamData(params).then(res => {
        const { list } = res
        list.map(i => {
          i.checkedAnswer = ''
        })
        commit('SET_EXAMS', list)
        commit('SET_TOTALCOUNTS', list.length)
        commit('SET_CURINDEX', 0)
        commit('SET_RIGHTCOUNTS', '0')
        commit('SET_WRONGCOUNTS', '0')
        commit('GET_CUREXAMINFO')
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取付费题库
  getExamList({ commit }, params) {
    return new Promise((resolve, reject) => {
      getExamData(params).then(res => {
        const { list } = res
        list.map(i => {
          i.checkedAnswer = ''
        })
        commit('SET_EXAMS', list)
        commit('SET_TOTALCOUNTS', list.length)
        commit('SET_CURINDEX', 0)
        commit('SET_RIGHTCOUNTS', '0')
        commit('SET_WRONGCOUNTS', '0')
        commit('GET_CUREXAMINFO')
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
