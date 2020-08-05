<template>
  <div class="app-container">
    <div class="question-container">
      <exam-info />
    </div>

    <div class="footer-nav-container">
      <div class="operation-container">
        <el-button type="primary" icon="el-icon-arrow-left" @click="prev">上一题</el-button>
        <el-button type="primary" icon="el-icon-bell" @click="openSkill">技巧答题</el-button>
        <el-button type="primary" @click="next">下一题<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </div>
      <div class="operation-message">
        <el-row>
          <el-col :xs="16" :sm="16">
            <div class="operation-info">
              <el-row>
                <el-col :xs="24" :sm="12">
                  <i class="el-icon-circle-check-outline"></i>正确 <span class="right">{{rightCounts}} 题</span>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <i class="el-icon-circle-close-outline"></i>错误 <span class="wrong">{{wrongCounts}} 题</span>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8">
            <div class="operation-index">{{`${curIndex+1}/${TotalCounts}`}}</div>
          </el-col>
        </el-row>

      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import examInfo from "./components/examInfo";
let audio = new Audio();
export default {
  name: "examList",
  components: {
    examInfo
  },
  data() {
    return {
      carType: "sedan",
      licenseType: "c1",
      subject: null,
      typeCode: null,
      optionType: null
    };
  },
  computed: {
    ...mapGetters([
      "curExamInfo",
      "TotalCounts",
      "curIndex",
      "rightCounts",
      "wrongCounts"
    ])
  },
  created() {
    const _subject = this.$route.query.subject;
    const _typeCode = this.$route.query.typeCode;
    const _optionType = this.$route.query.optionType;
    this.subject = _subject;
    this.typeCode = _typeCode ? _typeCode : null;
    this.optionType = _optionType ? _optionType : null;

    const _payType = this.$route.query.payType;
    switch (_payType) {
      case "free":
        const data = {
          carType: this.carType,
          licenseType: this.licenseType,
          subjectKey: this.subject
        };
        this.getTestExamList(data);
        break;
      case "pay":
        const datas = {
          carType: this.carType,
          optionType: this.optionType,
          subjectKey: this.subject,
          typeCode: this.typeCode
        };
        this.getExamList(datas);
        break;
    }
  },

  methods: {
    ...mapMutations("exam", ["SET_CURINDEX", "GET_CUREXAMINFO"]),
    ...mapActions("exam", ["getTestExamList", "getExamList"]),

    // 上一题
    prev() {
      if (this.curIndex > 0) {
        let _index = this.curIndex;
        this.SET_CURINDEX(--_index);
        this.GET_CUREXAMINFO();
      }
    },

    // 下一题
    next() {
      if (this.curIndex < this.TotalCounts - 1) {
        let _index = this.curIndex;
        this.SET_CURINDEX(++_index);
        this.GET_CUREXAMINFO();
      } else if (this.curIndex == this.TotalCounts - 1) {
        this.$confirm("已到最后一题了, 是否重新开始?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.restAnswerExam();
          })
          .catch(() => {});
      }
    },

    // 重新开始答题
    restAnswerExam() {
      const _payType = this.$route.query.payType;
      switch (_payType) {
        case "free":
          const data = {
            carType: this.carType,
            licenseType: this.licenseType,
            subjectKey: this.subject
          };
          this.getTestExamList(data);
          break;
        case "pay":
          const datas = {
            carType: this.carType,
            optionType: this.optionType,
            subjectKey: this.subject,
            typeCode: this.typeCode
          };
          this.getExamList(datas);
          break;
      }
    },

    // 答题技巧
    openSkill() {
      this.playAudio();
      this.$notify({
        title: "答题技巧",
        type: "success",
        message: `${this.curExamInfo.chargeInterpret}`,
        offset: 200,
        duration: 10000,
        position: "bottom-right",
        onClose: () => {
          this.pauseAudio();
        }
      });
    },

    //play Audio
    playAudio() {
      const resource = this.curExamInfo.chargeMp3Path;
      audio.src = resource;
      audio.play();
    },

    //pause Audio
    pauseAudio() {
      audio.pause();
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  .question-container {
    padding-bottom: 145px;
  }

  .footer-nav-container {
    position: fixed;
    bottom: 0;
    right: 0;
    -webkit-box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
    box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
    background: #fff;
    border-top: 1px solid #e8e8e8;
    padding: 0 24px;
    z-index: 9;

    .operation-container {
      padding: 24px 0;
      text-align: center;
    }
    .operation-message {
      padding: 10px 0 24px;
      .operation-info {
        line-height: 20px;
        i {
          font-size: 20px;
          margin-right: 5px;
          vertical-align: bottom;
        }
        .right,
        i.el-icon-circle-check-outline {
          color: #67c23a;
        }
        .wrong,
        i.el-icon-circle-close-outline {
          color: #f56c6c;
        }
      }
      .operation-index {
        text-align: right;
      }
    }
  }
}
@media (max-width: 767px) {
  .footer-nav-container {
    .operation-message {
      .operation-index {
        line-height: 40px;
      }
    }
  }
}
</style>
