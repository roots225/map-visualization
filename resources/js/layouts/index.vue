<template>
  <div class="vue-admin-beautiful-wrapper" :class="classObj">
    <div
      v-if="'horizontal' === layout"
      class="layout-container-horizontal"
      :class="{
        fixed: header === 'fixed',
        'no-tabs-bar': tabsBar === false,
      }"
    >
      <div :class="header === 'fixed' ? 'fixed-header' : ''">
        <vab-top-bar />
        <div v-if="tabsBar === true" :class="{ 'tag-view-show': tabsBar }">
          <div class="vab-main">
            <vab-tabs-bar />
          </div>
        </div>
      </div>
      <div class="vab-main main-padding">
        <!-- <vab-ad /> -->
        <vab-app-main />
      </div>
    </div>
    <div
      v-else
      class="layout-container-vertical"
      :class="{
        fixed: header === 'fixed',
        'no-tabs-bar': tabsBar === false,
      }"
    >
      <div
        v-if="device === 'mobile' && collapse === false"
        class="mask"
        @click="handleFoldSideBar"
      />
      <vab-side-bar />
      <div class="vab-main" :class="collapse ? 'is-collapse-main' : ''">
        <div :class="header === 'fixed' ? 'fixed-header' : ''">
          <vab-nav-bar />
          <vab-tabs-bar v-if="tabsBar === true" />
        </div>
        <!-- <vab-ad /> -->
        <vab-app-main />
      </div>
    </div>
    <el-backtop />
  </div>
</template>

<script lang="ts">
import useSettingsStore from "@/store/modules/settings";
import { computed, ref } from "vue";

export default {
  name: "Layout",
  data() {
    return { oldLayout: "" };
  },
  setup() {
    const oldLayout = ref("");
    const settingsStore = useSettingsStore();
    const device = computed(() => settingsStore.device);

    function handleIsMobile() {
      return document.body.getBoundingClientRect().width - 1 < 992;
    }

    function handleResize() {
      if (!document.hidden) {
        const isMobile = handleIsMobile();
        if (isMobile) {
          settingsStore.changeLayout("vertical");
        } else {
          settingsStore.changeLayout(oldLayout.value);
        }

        settingsStore.toggleDevice(isMobile ? "mobile" : "desktop");
      }
    }

    return {
      settingsStore,
      handleFoldSideBar: settingsStore.foldSideBar,
      layout: computed(() => settingsStore.layout),
      tabsBar: computed(() => settingsStore.tabsBar),
      collapse: computed(() => settingsStore.collapse),
      header: computed(() => settingsStore.header),
      device,
      classObj: computed(() => device.value === "mobile"),
      oldLayout,
      handleIsMobile,
      handleResize,
    };
  },
  beforeMount() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  mounted() {
    this.oldLayout = this.layout;
    const userAgent = navigator.userAgent;
    const isMobile = this.handleIsMobile();
    if (isMobile) {
      if (isMobile) {
        this.settingsStore.changeLayout("vertical");
      } else {
        this.settingsStore.changeLayout(this.oldLayout);
      }
      this.settingsStore.changeLayout("mobile");
      setTimeout(() => {
        this.settingsStore.foldSideBar();
      }, 2000);
    } else {
      this.settingsStore.openSideBar();
    }
    this.$nextTick(() => {
      window.addEventListener(
        "storage",
        (e) => {
          //   if (e.key === tokenName || e.key === null) window.location.reload();
          //   if (e.key === tokenName && e.value === null) window.location.reload();
        },
        false
      );
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@mixin fix-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: $base-z-index - 2;
  width: 100%;
  overflow: hidden;
}

.vue-admin-beautiful-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  .layout-container-horizontal {
    position: relative;

    &.fixed {
      padding-top: calc(#{$base-top-bar-height} + #{$base-tabs-bar-height});
    }

    &.fixed.no-tabs-bar {
      padding-top: $base-top-bar-height;
    }

    ::v-deep {
      .vab-main {
        width: 88%;
        margin: auto;
      }

      .fixed-header {
        @include fix-header;
      }

      .tag-view-show {
        background: $base-color-white;
        box-shadow: $base-box-shadow;
      }

      .nav-bar-container {
        .fold-unfold {
          display: none;
        }
      }

      .main-padding {
        .app-main-container {
          margin-top: $base-padding;
          margin-bottom: $base-padding;
          background: $base-color-white;
        }
      }
    }
  }

  .layout-container-vertical {
    position: relative;

    .mask {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: $base-z-index - 1;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background: #000;
      opacity: 0.5;
    }

    &.fixed {
      padding-top: calc(#{$base-nav-bar-height} + #{$base-tabs-bar-height});
    }

    &.fixed.no-tabs-bar {
      padding-top: $base-nav-bar-height;
    }

    .vab-main {
      position: relative;
      min-height: 100%;
      margin-left: $base-left-menu-width;
      background: #f6f8f9;
      transition: $base-transition;

      ::v-deep {
        .fixed-header {
          @include fix-header;

          left: $base-left-menu-width;
          width: $base-right-content-width;
          box-shadow: $base-box-shadow;
          transition: $base-transition;
        }

        .nav-bar-container {
          position: relative;
          box-sizing: border-box;
        }

        .tabs-bar-container {
          box-sizing: border-box;
        }

        .app-main-container {
          width: calc(100% - #{$base-padding} - #{$base-padding});
          margin: $base-padding auto;
          background: $base-color-white;
          border-radius: $base-border-radius;
        }
      }

      &.is-collapse-main {
        margin-left: $base-left-menu-width-min;

        ::v-deep {
          .fixed-header {
            left: $base-left-menu-width-min;
            width: calc(100% - 65px);
          }
        }
      }
    }
  }

  /* 手机端开始 */
  &.mobile {
    ::v-deep {
      .el-pager,
      .el-pagination__jump {
        display: none;
      }

      .layout-container-vertical {
        .el-scrollbar.side-bar-container.is-collapse {
          width: 0;
        }

        .vab-main {
          width: 100%;
          margin-left: 0;
        }
      }

      .vab-main {
        .fixed-header {
          left: 0 !important;
          width: 100% !important;
        }
      }
    }
  }
}
</style>
