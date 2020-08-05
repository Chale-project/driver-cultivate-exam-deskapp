<template>
  <div class="app-container">
    <el-row v-if="curExamInfo.id">
      <el-col :xs="24" :sm="12" :md="16">
        <div class="exam-infos">
          <div class="exam-title"><span class="exam-title-tag">【{{curExamInfo.optionType=="single"?"单选题":curExamInfo.optionType=="mult"?"多选题":curExamInfo.optionType=="judge"?"判断题":''}}】</span>{{curExamInfo.questionTitle}}</div>
          <!-- 单选 -->
          <div class="exam-option" v-if="curExamInfo.optionType!='mult'">
            <div class="exam-option-item" v-if="curExamInfo.option1" @click="onCheckRadioAnswer('1')">
              <template v-if="!curExamInfo.isAnswer">
                <svg-icon icon-class="circle" class-name="el-icon-circle-unchecked" />
              </template>
              <template v-else>
                <svg-icon icon-class="circle" class-name="el-icon-circle-unchecked" v-if="curExamInfo.correctOption!='1'&&curExamInfo.checkedAnswer!='1'" />
                <i class="el-icon-circle-check-outline" v-else-if="curExamInfo.correctOption=='1'&&curExamInfo.checkedAnswer!='1'" />
                <i class="el-icon-circle-check" v-else-if="curExamInfo.correctOption=='1'&&curExamInfo.checkedAnswer=='1'"></i>
                <i class="el-icon-circle-close" v-else-if="curExamInfo.correctOption!='1'&&curExamInfo.checkedAnswer=='1'"></i>
              </template>
              <span>{{curExamInfo.option1}}</span>
            </div>

            <div class="exam-option-item" v-if="curExamInfo.option2" @click="onCheckRadioAnswer('2')">
              <template v-if="!curExamInfo.isAnswer">
                <svg-icon icon-class="circle" class-name="el-icon-circle-unchecked" />
              </template>
              <template v-else>
                <svg-icon icon-class="circle" class-name="el-icon-circle-unchecked" v-if="curExamInfo.correctOption!='2'&&curExamInfo.checkedAnswer!='2'" />
                <i class="el-icon-circle-check-outline" v-else-if="curExamInfo.correctOption=='2'&&curExamInfo.checkedAnswer!='2'" />
                <i class="el-icon-circle-check" v-else-if="curExamInfo.correctOption=='2'&&curExamInfo.checkedAnswer=='2'"></i>
                <i class="el-icon-circle-close" v-else-if="curExamInfo.correctOption!='2'&&curExamInfo.checkedAnswer=='2'"></i>
              </template>
              <span>{{curExamInfo.option2}}</span>
            </div>

            <div class="exam-option-item" v-if="curExamInfo.option3" @click="onCheckRadioAnswer('3')">
              <template v-if="!curExamInfo.isAnswer">
                <svg-icon icon-class="circle" class-name="el-icon-circle-unchecked" />
              </template>
              <template v-else>
                <svg-icon icon-class="circle" class-name="el-icon-circle-unchecked" v-if="curExamInfo.correctOption!='3'&&curExamInfo.checkedAnswer!='3'" />
                <i class="el-icon-circle-check-outline" v-else-if="curExamInfo.correctOption=='3'&&curExamInfo.checkedAnswer!='3'" />
                <i class="el-icon-circle-check" v-else-if="curExamInfo.correctOption=='3'&&curExamInfo.checkedAnswer=='3'"></i>
                <i class="el-icon-circle-close" v-else-if="curExamInfo.correctOption!='3'&&curExamInfo.checkedAnswer=='3'"></i>
              </template>
              <span>{{curExamInfo.option3}}</span>
            </div>

            <div class="exam-option-item" v-if="curExamInfo.option4" @click="onCheckRadioAnswer('4')">
              <template v-if="!curExamInfo.isAnswer">
                <svg-icon icon-class="circle" class-name="el-icon-circle-unchecked" />
              </template>
              <template v-else>
                <svg-icon icon-class="circle" class-name="el-icon-circle-unchecked" v-if="curExamInfo.correctOption!='4'&&curExamInfo.checkedAnswer!='4'" />
                <i class="el-icon-circle-check-outline" v-else-if="curExamInfo.correctOption=='4'&&curExamInfo.checkedAnswer!='4'" />
                <i class="el-icon-circle-check" v-else-if="curExamInfo.correctOption=='4'&&curExamInfo.checkedAnswer=='4'"></i>
                <i class="el-icon-circle-close" v-else-if="curExamInfo.correctOption!='4'&&curExamInfo.checkedAnswer=='4'"></i>
              </template>
              <span>{{curExamInfo.option4}}</span>
            </div>
          </div>

          <!-- 多选 -->
          <div class="exam-option" v-else>
            <div class="exam-option-item" v-if="curExamInfo.option1" @click="onCheckBoxAnswer('1')">
              <template v-if="!curExamInfo.isAnswer">
                <svg-icon icon-class="circle" class-name="el-icon-circle-unchecked" v-if="!isInC('1')" />
                <i class="el-icon-circle-check" v-else></i>
              </template>
              <template v-else>
                <svg-icon icon-class="circle" class-name="el-icon-circle-unchecked" v-if="!isInA('1')&&!isInB('1')" />
                <i class="el-icon-circle-check-outline" v-else-if="isInA('1')&&!isInB('1')" />
                <i class="el-icon-circle-check" v-else-if="isInA('1')&&isInB('1')"></i>
                <i class="el-icon-circle-close" v-else-if="!isInA('1')&&isInB('1')"></i>
              </template>

              <span>{{curExamInfo.option1}}</span>
            </div>
            <div class="exam-option-item" v-if="curExamInfo.option2" @click="onCheckBoxAnswer('2')">
              <template v-if="!curExamInfo.isAnswer">
                <svg-icon icon-class="circle" class-name="el-icon-circle-unchecked" v-if="!isInC('2')" />
                <i class="el-icon-circle-check" v-else></i>
              </template>
              <template v-else>
                <svg-icon icon-class="circle" class-name="el-icon-circle-unchecked" v-if="!isInA('2')&&!isInB('2')" />
                <i class="el-icon-circle-check-outline" v-else-if="isInA('2')&&!isInB('2')" />
                <i class="el-icon-circle-check" v-else-if="isInA('2')&&isInB('2')"></i>
                <i class="el-icon-circle-close" v-else-if="!isInA('2')&&isInB('2')"></i>
              </template>
              <span>{{curExamInfo.option2}}</span>
            </div>
            <div class="exam-option-item" v-if="curExamInfo.option3" @click="onCheckBoxAnswer('3')">
              <template v-if="!curExamInfo.isAnswer">
                <svg-icon icon-class="circle" class-name="el-icon-circle-unchecked" v-if="!isInC('3')" />
                <i class="el-icon-circle-check" v-else></i>
              </template>
              <template v-else>
                <svg-icon icon-class="circle" class-name="el-icon-circle-unchecked" v-if="!isInA('3')&&!isInB('3')" />
                <i class="el-icon-circle-check-outline" v-else-if="isInA('3')&&!isInB('3')" />
                <i class="el-icon-circle-check" v-else-if="isInA('3')&&isInB('3')"></i>
                <i class="el-icon-circle-close" v-else-if="!isInA('3')&&isInB('3')"></i>
              </template>
              <span>{{curExamInfo.option3}}</span>
            </div>
            <div class="exam-option-item" v-if="curExamInfo.option4" @click="onCheckBoxAnswer('4')">
              <template v-if="!curExamInfo.isAnswer">
                <svg-icon icon-class="circle" class-name="el-icon-circle-unchecked" v-if="!isInC('4')" />
                <i class="el-icon-circle-check" v-else></i>
              </template>
              <template v-else>
                <svg-icon icon-class="circle" class-name="el-icon-circle-unchecked" v-if="!isInA('4')&&!isInB('4')" />
                <i class="el-icon-circle-check-outline" v-else-if="isInA('4')&&!isInB('4')" />
                <i class="el-icon-circle-check" v-else-if="isInA('4')&&isInB('4')"></i>
                <i class="el-icon-circle-close" v-else-if="!isInA('4')&&isInB('4')"></i>
              </template>
              <span>{{curExamInfo.option4}}</span>
            </div>

          </div>

          <div class="exam-submit-answer" v-if="curExamInfo.optionType=='mult'">
            <el-button type="primary" :disabled="curExamInfo.isAnswer?true:false" @click="submitAnswer">确认</el-button>
          </div>
          <div class="exam-answer-info" v-if="curExamInfo.isAnswer">
            <div class="exam-rught-answer">正确答案：{{curExamInfo.correctOption|answerFormat}}</div>
            <div class="exam-rught-answer-description">
              <h3>试题详解：</h3>
              <p>{{curExamInfo.interpret}}</p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8">
        <div class="exam-image" v-if="curExamInfo.picPath">
          <img :src="curExamInfo.picPath">
        </div>
      </el-col>
    </el-row>
    <div class="empty" v-else>
      <i class="el-icon-loading"></i>
      <p>没有发现到题目哦！</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "examInfo",
  data() {
    return {
      checkBoxAnswer: []
    };
  },
  computed: {
    ...mapGetters(["curIndex", "TotalCounts", "curExamInfo"])
  },
  watch: {
    curExamInfo() {
      if (this.curExamInfo.checkedAnswer)
        return this.curExamInfo.checkedAnswer.split("").sort();
      else return [];
    }
  },

  methods: {
    ...mapMutations("exam", [
      "SET_RIGHTCOUNTS",
      "SET_WRONGCOUNTS",
      "SET_ISANSWER",
      "GET_CHECKEDANSWER",
      "SET_CURINDEX",
      "GET_CUREXAMINFO"
    ]),

    //单选
    onCheckRadioAnswer(e) {
      const info = this.curExamInfo;
      if (info.isAnswer) return;
      this.SET_ISANSWER();
      this.GET_CHECKEDANSWER(e);
      if (info.correctOption == e) {
        this.SET_RIGHTCOUNTS();
        setTimeout(() => {
          this.next();
        }, 800);
      } else {
        this.SET_WRONGCOUNTS();
      }
    },

    //多选
    onCheckBoxAnswer(e) {
      const info = this.curExamInfo;
      if (info.isAnswer) return;
      let _cbArr = this.checkBoxAnswer;
      if (_cbArr.length > 0) {
        for (const i in _cbArr) {
          if (_cbArr[i] == e) {
            _cbArr.splice(i, 1);
            break;
          } else {
            if (i == _cbArr.length - 1) _cbArr.push(e);
          }
        }
      } else {
        _cbArr.push(e);
      }
      this.caArr = _cbArr.sort();
    },

    isInA(e) {
      const _correctAsnwer = this.curExamInfo.correctOption.split("").sort();
      return _correctAsnwer.includes(e);
    },

    isInB(e) {
      const _checkedAsnwer = this.curExamInfo.checkedAnswer.split("").sort();
      return _checkedAsnwer.includes(e);
    },

    isInC(e) {
      const _checkedUnAsnwer = this.checkBoxAnswer;
      return _checkedUnAsnwer.includes(e);
    },

    // 确认答案
    submitAnswer() {
      const info = this.curExamInfo;
      if (info.isAnswer) return;

      if (this.checkBoxAnswer.length < 2) {
        this.$message({
          message: "请至少选择两项！",
          type: "warning"
        });
        return;
      }
      const checkedAnswerStr = this.checkBoxAnswer.join("");
      const correctAsnwerStr = this.curExamInfo.correctOption
        .split("")
        .sort()
        .join("");
      this.SET_ISANSWER();
      this.GET_CHECKEDANSWER(checkedAnswerStr);
      if (correctAsnwerStr == checkedAnswerStr) {
        this.SET_RIGHTCOUNTS();
        setTimeout(() => {
          this.next();
        }, 800);
      } else {
        this.SET_WRONGCOUNTS();
      }
      this.checkBoxAnswer = [];
    },

    // 答对直接下一题
    next() {
      if (this.curIndex < this.TotalCounts - 1) {
        let _index = this.curIndex;
        this.SET_CURINDEX(++_index);
        this.GET_CUREXAMINFO();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  .exam-infos {
    .exam-title {
      margin-bottom: 24px;
      padding-left: 90px;
      .exam-title-tag {
        margin-left: -80px;
        color: #e6a23c;
      }
    }
    .exam-option {
      margin-bottom: 30px;
      padding-left: 90px;
      .exam-option-item {
        padding: 10px 0;
        line-height: 40px;
        font-size: 16px;
        cursor: pointer;
        span {
          padding-left: 5px;
        }
        .el-icon-circle-unchecked {
          font-size: 18px;
        }
        .el-icon-circle-check-outline {
          font-size: 18px;
          color: #409eff;
        }
        .el-icon-circle-check {
          font-size: 18px;
          color: #67c23a;
        }
        .el-icon-circle-close {
          font-size: 18px;
          color: #f56c6c;
        }
      }
    }

    .exam-submit-answer,
    .exam-answer-info {
      padding-left: 90px;
      margin-bottom: 24px;
    }
    .exam-answer-info {
      .exam-rught-answer {
        padding-top: 20px;
        border-top: 1px dashed #ddd;
        color: #666;
      }
      .exam-rught-answer-description {
        h3 {
          font-size: 16px;
          font-weight: normal;
          color: #666;
        }
        p {
          text-indent: 2em;
          color: #666;
          font-size: 15px;
          line-height: 1.5;
        }
      }
    }
  }

  .exam-image {
    img {
      width: 100%;
    }
  }

  .empty {
    text-align: center;
  }
}
</style>
