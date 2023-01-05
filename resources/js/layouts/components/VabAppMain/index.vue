<template>
  <div v-if="routerView" class="app-main-container">
    <!-- <vab-github-corner /> -->
    <!-- <transition mode="out-in" name="fade-transform">
      <keep-alive :include="cachedRoutes" :max="keepAliveMaxNum">
        <router-view :key="key" class="app-main-height" />
      </keep-alive>
    </transition> -->

    <router-view v-slot="{ Component }" :key="key" class="app-main-height">
      <transition mode="out-in" name="fade-transform">
        <keep-alive :include="cachedRoutes" :max="keepAliveMaxNum">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
    <footer v-show="footerCopyright" class="footer-copyright">
      Copyright
      <!-- <vab-icon :icon="['fas', 'copyright']"></vab-icon> -->
      Map Visualization {{ fullYear }}
    </footer>
  </div>
</template>

<script lang="ts">
import defaultSettings from "@/config";
import useSettingsStore from "@/store/modules/settings";
import useTabsBarStore from "@/store/modules/tabsBar";

const { copyright, footerCopyright, keepAliveMaxNum, title } = defaultSettings;

export default {
  name: "VabAppMain",
  data() {
    return {
      show: false,
      fullYear: new Date().getFullYear(),
      copyright,
      title,
      keepAliveMaxNum,
      routerView: true,
      footerCopyright,
    };
  },
  setup() {
    const settingsStore = useSettingsStore();
    const tabsBarStore = useTabsBarStore();
    return { settingsStore, tabsBarStore };
  },
  computed: {
    visitedRoutes() {
      return this.tabsBarStore.visitedRoutes;
    },
    device() {
      return this.settingsStore.device;
    },
    cachedRoutes() {
      const cachedRoutesArr: string[] = [];
      this.visitedRoutes.forEach((item: any) => {
        if (!item.meta.noKeepAlive) {
          cachedRoutesArr.push(item.name);
        }
      });
      return cachedRoutesArr;
    },
    key() {
      return this.$route.path;
    },
  },
  watch: {
    $route: {
      handler(route) {
        if ("mobile" === this.device) this.foldSideBar();
      },
      immediate: true,
    },
  },
  created() {
    // this.$baseEventBus.$on("reload-router-view", () => {
    //   this.routerView = false;
    //   this.$nextTick(() => {
    //     this.routerView = true;
    //   });
    // });
  },
  methods: {
    foldSideBar() {
      this.settingsStore.foldSideBar();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.app-main-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  .vab-keel {
    margin: $base-padding;
  }
  .app-main-height {
    min-height: $base-app-main-height;
  }

  .footer-copyright {
    min-height: 55px;
    line-height: 55px;
    color: rgba(0, 0, 0, 0.45);
    text-align: center;
    border-top: 1px dashed $base-border-color;
  }
}
</style>
