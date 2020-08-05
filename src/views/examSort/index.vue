<template>
  <div class="app-container">
    <div class="exam-sort-container">
      <el-row :gutter="40" class="panel-group">
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" v-for="(v,i) of examSortList" :key="i">
          <div class="card-panel" @click="navigateTo(v.typeCode)">
            <div class="card-panel-icon-wrapper icon-people">
              <svg-icon icon-class="subjectI" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                {{v.typeName}}
              </div>
              <div class="card-panel-desc"></div>
            </div>
          </div>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { getExamSortData } from "@/api/common";
export default {
  name: "examSort",
  data() {
    return {
      carType: "sedan",
      licenseType: "c1",
      parentTypeCode: "FFTK",
      subject: null,
      payType: null,
      examSortList: []
    };
  },
  created() {
    const _subject = this.$route.query.subject;
    const _payType = this.$route.query.payType;
    this.subject = _subject;
    this.payType = _payType;

    this.getExamSortList();
  },

  methods: {
    navigateTo(code) {
      this.$router.push({
        name: "examList",
        query: { payType: this.payType, subject: this.subject, typeCode: code }
      });
    },

    getExamSortList() {
      const data = {
        parentTypeCode: this.parentTypeCode,
        carType: this.carType,
        subjectKey: this.subject,
        licenseType: this.licenseType
      };
      getExamSortData(data).then(res => {
        if (res.list.length > 0) this.examSortList = res.list;
        else this.examSortList = [];
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  .exam-sort-container {
    padding: 32px;
    background-color: #f0f2f5;
    position: relative;
    .panel-group {
      margin-top: 18px;
      .card-panel-col {
        margin-bottom: 32px;
      }
      .card-panel {
        height: 108px;
        cursor: pointer;
        font-size: 12px;
        position: relative;
        overflow: hidden;
        color: #666;
        background: #fff;
        box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
        border-color: rgba(0, 0, 0, 0.05);
        &:hover {
          .card-panel-icon-wrapper {
            color: #fff;
          }
          .icon-people {
            background: #40c9c6;
          }
        }
        .icon-people {
          color: #40c9c6;
        }

        .card-panel-icon-wrapper {
          float: left;
          margin: 14px 0 0 14px;
          padding: 16px;
          transition: all 0.38s ease-out;
          border-radius: 6px;
        }
        .card-panel-icon {
          float: left;
          font-size: 48px;
        }
        .card-panel-description {
          float: right;
          font-weight: bold;
          margin: 26px;
          margin-left: 0px;
          .card-panel-text {
            text-align: right;
            line-height: 56px;
            color: rgba(0, 0, 0, 1);
            font-size: 16px;
          }
          .card-panel-desc {
            font-size: 16px;
            color: rgba(0, 0, 0, 0.45);
          }
        }
      }
    }
    @media (max-width: 550px) {
      .card-panel-description {
        display: none;
      }
      .card-panel-icon-wrapper {
        float: none !important;
        width: 100%;
        height: 100%;
        margin: 0 !important;
        .svg-icon {
          display: block;
          margin: 14px auto !important;
          float: none !important;
        }
      }
    }
  }
}
</style>
