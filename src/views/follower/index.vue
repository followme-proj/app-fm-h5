<template>
  <div>
    <ion-header translucent>
      <ion-toolbar color="primary">
        <ion-title>粉丝</ion-title>
      </ion-toolbar>
    </ion-header>

    <!--TopAppBar>
    <mu-tabs
      :value.sync="activeTab"
      full-width
      color="primary"
      indicator-color="secondary"
    >
      <mu-tab>粉丝</mu-tab>
      <mu-tab>分组</mu-tab>
    </mu-tabs>

    <mu-list textline="three-line" v-if="activeTab === 0">
      <mu-load-more
        :refreshing="refreshing"
        :loading="loading"
        @refresh="getFollowers(true)"
        @load="getFollowers(false)"
        style="min-height: 40vh;"
      >
        <mu-list-item avatar v-for="(item, idx) in followers.items" :key="idx">
          <mu-list-item-action>
            <mu-avatar size="60">
              <img
                :src="item.headimgUrl"
                style="border: 2px solid white; box-shadow: 0 0 5px darkgray"
              />
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content
            style="margin-left: 5px;"
            @click="onFollowerClick(item)"
          >
            <mu-list-item-title>
              <span style="font-size: 14px;">
                <span>{{ item.nickname }}</span>
              </span>
            </mu-list-item-title>
            <mu-list-item-sub-title>
              <span>{{ item.province }}-{{ item.city }}</span>
            </mu-list-item-sub-title>
            <mu-list-item-sub-title>
              <span>关注: {{ item.subscribeAt }}</span>
            </mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
          </mu-list-item-action>
        </mu-list-item>
      </mu-load-more>
    </mu-list-->

    <!--分组列表-->
    <!--mu-list textline="three-line" v-if="activeTab === 1">
      <mu-load-more
        :refreshing="refreshing"
        :loading="loading"
        @refresh="getFollowerGroups(true)"
        @load="getFollowerGroups(false)"
        style="min-height: 40vh;"
      >
        <mu-list-item
          avatar
          v-for="(item, idx) in followerGroups.items"
          :key="idx"
        >
          <mu-list-item-action>
            <mu-avatar size="60">
              <img
                :src="item.headimgUrl"
                style="border: 2px solid white; box-shadow: 0 0 5px darkgray"
              />
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content
            style="margin-left: 5px;"
            @click="onFollowerClick(item)"
          >
            <mu-list-item-title>
              <span style="font-size: 14px;">
                <span>{{ item.nickname }}</span>
              </span>
            </mu-list-item-title>
            <mu-list-item-sub-title>
              <span>{{ item.province }}-{{ item.city }}</span>
            </mu-list-item-sub-title>
            <mu-list-item-sub-title>
              <span>关注: {{ item.subscribeAt }}</span>
            </mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
          </mu-list-item-action>
        </mu-list-item>
      </mu-load-more>
    </mu-list-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { FollowerActions, FollowerTagActions } from "@/store/actionTypes";

export default {
  components: {},

  data() {
    return {
      refreshing: false,
      loading: false,
      activeTab: 0,

      listQuery: {
        limit: 20,
      },
    };
  },

  computed: {
    ...mapGetters(["followers", "followerGroups"]),
  },

  created() {
    this.getFollowers(true);
  },

  methods: {
    // 获取公众号用户
    async getFollowers(force) {
      if (this.refreshing || this.loading) return;

      force ? (this.refreshing = true) : (this.loading = true);

      try {
        let payload = Object.assign({ force }, this.listQuery);
        await this.$store.dispatch(FollowerActions.GetFollowerList, payload);
      } catch (e) {
        this.$toast.error(e.message);
      }

      force ? (this.refreshing = false) : (this.loading = false);
    },

    // 群组
    async getFollowerGroups(force) {
      if (this.refreshing || this.loading) return;

      force ? (this.refreshing = true) : (this.loading = true);

      try {
        let payload = Object.assign({ force }, this.listQuery);
        await this.$store.dispatch(
          FollowerTagActions.GetFollowerTagList,
          payload
        );
      } catch (e) {
        this.$toast.error(e.message);
      }

      force ? (this.refreshing = false) : (this.loading = false);
    },

    // 同步公众号粉丝
    async onSearchFollowers() {
      try {
        const res = await this.$confirm(
          "同步开始后，请在 2 分钟后再同步，请勿频繁操作",
          "操作提示"
        );
        if (!res.result) return;

        await this.$store.dispatch(FollowerActions.SyncFollowers, {});
      } catch (e) {
        this.$toast.error(e.message);
      }
    },

    async onFollowerClick() {},
  },
};
</script>

<style lang="css" scoped></style>
