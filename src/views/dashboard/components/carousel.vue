<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="(v, i) in imageList" :key="i">
      <img :src="v.advertPicPath" />
    </el-carousel-item>
  </el-carousel>
</template>
<script>
import { getBannerData } from "@/api/common";

export default {
  name: "carousel",
  data() {
    return {
      imageList: []
    };
  },
  created() {
    this.getBannerList();
  },

  methods: {
    getBannerList() {
      const data = {
        limit: "10",
        advertGroupCode: "1000"
      };
      getBannerData(data).then(res => {
        if (res.advertContentList.length > 0)
          this.imageList = res.advertContentList;
        else this.imageList = [];
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-carousel__item {
  text-align: center;
}

/deep/ .el-carousel__item img {
  width: 100%;
}

/deep/ .el-carousel__item:nth-child(2n) {
  background-color: #d3dce6;
}

/deep/ .el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>