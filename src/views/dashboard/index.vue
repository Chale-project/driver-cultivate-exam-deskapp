<template>
  <div class="dashboard-container">
    <carousel />

    <panel-group @navigateTo="goToPathName" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import carousel from "./components/carousel";
import PanelGroup from "./components/PanelGroup";
export default {
  name: "Dashboard",
  components: {
    carousel,
    PanelGroup
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["name"])
  },

  methods: {
    goToPathName(obj) {
      if (obj.payType == "pay")
        this.$router.push({ name: "examSort", query: { payType: obj.payType, subject: obj.subject } });
      else this.$router.push({ name: "examList", query: { payType: obj.payType, subject: obj.subject } });
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>