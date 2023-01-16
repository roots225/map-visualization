<template>
    <span>
        <i :class="iconClass"></i>
        <span>{{ title }}</span>
    </span>
  </template>
  <script lang="ts">
  
  export default {
    name: "VabIcon",
    props: {
        title: {
            type: String,
            default: ''
        },
        pulse: {
            type: Boolean,
            default: false
        },
        icon: {
            type: Array,
            default: [],
        }
    },
    data() {
      return {
      };
    },
    computed: {
        iconClass() {
            return this.icon.join('-')
        }
    }
  };
  </script>
  <style lang="scss" scoped>
  </style>
  