<template>
  <ion-app id="app">
    <router-view></router-view>
  </ion-app>
</template>

<script>
  export default {
    name: 'Home',

    data() {
      return {
      }
    },

    created() {

    },

    methods: {
      async onOpenCheckin() {
        await this.$router.push({name: 'Checkin'});
        /*return this.$ionic.alertController
                .create({
                  header: 'Alert',
                  subHeader: 'Subtitle',
                  message: 'This is an alert message.',
                  buttons: ['OK'],
                })
                .then(a => a.present());*/
      }
    },
  }
</script>

<style lang="scss" scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
