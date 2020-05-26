<!--打卡-->
<template>
  <div>
    <ion-fab vertical="bottom" horizontal="center" slot="fixed">
      <ion-fab-button @click="onOpenCheckin">
        <ion-icon name="add"></ion-icon>
      </ion-fab-button>
      <!--ion-fab-list side="top">
        <ion-fab-button color="success" @click="onOpenCheckin">
          <ion-icon name="radio"></ion-icon>
        </ion-fab-button>
      </ion-fab-list-->
    </ion-fab>

    <ion-tabs>
      <ion-tab tab="follower" href="/follower">
        <router-view></router-view>
      </ion-tab>
      <ion-tab tab="my" href="/my">
        <router-view></router-view>
      </ion-tab>

      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="follower">
          <ion-label>粉丝</ion-label>
          <ion-icon name="man"></ion-icon>
        </ion-tab-button>
        <ion-tab-button hidden>
        </ion-tab-button>
        <ion-tab-button tab="my">
          <ion-label>消息</ion-label>
          <ion-icon name="person"></ion-icon>
        </ion-tab-button>
        <!--ion-tab-button tab="my">
          <ion-label>我的</ion-label>
          <ion-icon name="person"></ion-icon>
        </ion-tab-button-->
      </ion-tab-bar>
    </ion-tabs>
  </div>
</template>

<script>
  export default {
    name: 'Index',

    data() {
      return {
      }
    },

    created() {

    },

    methods: {
      async onOpenCheckin() {
        await this.$router.push({name: 'NewMessage'});
      }
    },
  }
</script>
