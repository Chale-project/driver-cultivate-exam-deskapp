const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  uid: state => state.user.uid,
  avatar: state => state.user.avatar,
  name: state => state.user.name,

  exams: state => state.exam.exams,
  TotalCounts: state => state.exam.TotalCounts,
  curIndex: state => state.exam.curIndex,
  rightCounts: state => state.exam.rightCounts,
  wrongCounts: state => state.exam.wrongCounts,
  curExamInfo: state => state.exam.curExamInfo
}
export default getters
