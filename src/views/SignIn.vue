<template>
  <ion-app>
    <ion-header translucent>
      <ion-toolbar color="warning">
        <ion-buttons slot="start">
          <ion-back-button text="" default-href="/" @click="onGoBack()"></ion-back-button>
        </ion-buttons>
        <ion-title>登录</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen>
      <form class="ion-padding">
        <ion-list lines="full" class="ion-no-margin ion-no-padding">
          <ion-item>
            <ion-label position="stacked">
              <ion-text>手机号</ion-text>
              <ion-text color="danger">*</ion-text>
            </ion-label>
            <ion-input required type="text" :clearInput="true" inputmode="tel" v-model="form.mobile"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">
              <ion-text>验证码</ion-text>
              <ion-text color="danger">*</ion-text>
            </ion-label>
            <ion-input required type="text" :clearInput="true" inputmode="tel" v-model="form.verifyCode"></ion-input>
          </ion-item>
        </ion-list>
      </form>

      <div class="ion-padding">
        <ion-button color="primary" expand="block" class="ion-no-margin" @click="onSignIn()">
          <ion-icon name="log-in"></ion-icon>
          <ion-text>立即登录</ion-text>
        </ion-button>
      </div>

      <ion-fab vertical="center" horizontal="center" slot="fixed">
        <ion-fab-button color="white" @click="onSignInWithWechat()">
          <ion-avatar>
            <img src="https://pngimage.net/wp-content/uploads/2018/06/wechat-logo-png-transparent-background-6.png">
          </ion-avatar>
        </ion-fab-button>
      </ion-fab>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-title class="footer">{{new Date().getFullYear()}} © 发路米教育科技</ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-app>
</template>

<script>
	export default {
		name: 'My',

		data() {
			return {
				form: {
					mobile: undefined,
					verifyCode: undefined
				}
			};
		},

		methods: {
			async onGoBack() {
				history.go(-1)
			},

      // 手机号登录
			async onSignIn() {
				this.$router.push({name: 'My'});

				const toast = await this.$ionic.toastController.create({
					color: 'success',
					message: `登录成功`,
					duration: 1000,
					position: 'top',
				});
				await toast.present();
			},

			// 微信登录
			async onSignInWithWechat() {
				return this.$ionic.alertController.create({
					header: '微信登录',
					message: '即将使用微信登录，请在稍后界面中点击<strong>同意授权</strong>',
					buttons: [
						{
							text: '取消',
							role: 'cancel',
							cssClass: 'secondary',
						},
						{
							text: '好的',
							handler: () => {
								console.log('Confirm Okay')
							},
						},
					],
				}).then(a => a.present());
			}
		}
	}
</script>

<style type="text/css" scoped>
  .footer {
    font-size: 0.6em;
  }
</style>
