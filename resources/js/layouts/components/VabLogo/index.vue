<template>
  <div :class="'logo-container-' + layout">
    <router-link to="/">
      <!-- <vab-remix-icon v-if="logo" class="logo" :icon-class="logo" /> -->
      <span
        class="title"
        :class="{ 'hidden-xs-only': layout === 'horizontal' }"
        :title="title"
      >
        {{ title }}
      </span>
    </router-link>
  </div>
</template>
<script lang="ts">
import useSettingsStore from "@/store/modules/settings";

export default {
  name: "VabLogo",
  data() {
    return {
      title: "Map-visualization",
    };
  },
  setup() {
    const settingsStore = useSettingsStore();
    return { settingsStore };
  },
  computed: {
    logo() {
      return this.settingsStore.logo;
    },
    layout() {
      return this.settingsStore.layout;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";
@mixin container {
  position: relative;
  height: $base-top-bar-height;
  overflow: hidden;
  line-height: $base-top-bar-height;
  background: $base-menu-background;
}

@mixin logo {
  display: inline-block;
  width: 34px;
  height: 34px;
  margin-right: 3px;
  color: $base-title-color;
  vertical-align: middle;
}

@mixin title {
  display: inline-block;
  overflow: hidden;
  font-size: 24px;
  line-height: 55px;
  color: $base-title-color;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}

.logo-container-horizontal {
  @include container;

  .logo {
    @include logo;
  }

  .title {
    @include title;
  }
}

.logo-container-vertical {
  @include container;

  height: $base-logo-height;
  line-height: $base-logo-height;
  text-align: center;

  .logo {
    @include logo;
  }

  .title {
    @include title;

    max-width: calc(#{$base-left-menu-width} - 60px);
  }
}
</style>
