<template>
  <el-dropdown @command="handleCommand">
    <span class="avatar-dropdown">
      <!--<el-avatar class="user-avatar" :src="avatar"></el-avatar>-->
      <img class="user-avatar" :src="avatar" alt="" />
      <div class="user-name">
        {{ username }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
    </span>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="github">github</el-dropdown-item>
      <el-dropdown-item command="logout" divided>Deconnexion</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import useUserStore from "@/store/modules/user";

export default {
  name: "VabAvatar",
  computed: {
    avatar() {
      return this.userStore.avatar;
    },
    username() {
      return this.userStore.username;
    },
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  methods: {
    handleCommand(command: string) {
      switch (command) {
        case "logout":
          this.logout();
          break;
        case "github":
          window.open("https://github.com/chuzhixin/vue-admin-beautiful");
          break;
      }
    },
    logout() {
      // this.$baseConfirm(
      //   "您确定要退出" + this.$baseTitle + "吗?",
      //   null,
      //   async () => {
      //     await this.$store.dispatch("user/logout");
      //     if (recordRoute) {
      //       const fullPath = this.$route.fullPath;
      //       this.$router.push(`/login?redirect=${fullPath}`);
      //     } else {
      //       this.$router.push("/login");
      //     }
      //   }
      // );
    },
  },
};
</script>
<style lang="scss" scoped>
.avatar-dropdown {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  height: 50px;
  padding: 0;

  .user-avatar {
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 50%;
  }

  .user-name {
    position: relative;
    margin-left: 5px;
    margin-left: 5px;
    cursor: pointer;
  }
}
</style>
