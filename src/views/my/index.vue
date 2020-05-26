<template>
  <ion-app>
    <ion-header translucent>
      <ion-toolbar color="primary">
        <ion-title>我的</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen v-if="user.id">
      <ion-list lines="none">
        <ion-item>
          <ion-avatar slot="start" class="avatar">
            <img src="http://img4.imgtn.bdimg.com/it/u=2873847596,1472327520&fm=11&gp=0.jpg">
          </ion-avatar>
          <ion-label>
            <h3>杨老师</h3>
            <p>18650015710</p>
            <p>发路米美山分校</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-list lines="none">
        <ion-list-header>工作台</ion-list-header>
        <ion-item :detail="true" @click="$router.push({'name': 'MyClass'})">
          <ion-icon slot="start" name="people" color="success"></ion-icon>
          <ion-label>我的班级</ion-label>
        </ion-item>
        <ion-item :detail="true" @click="$router.push({'name': 'MyCheckin'})">
          <ion-icon slot="start" name="star" color="secondary"></ion-icon>
          <ion-label>我的打卡</ion-label>
        </ion-item>
      </ion-list>

      <ion-list lines="none">
        <ion-list-header>关于</ion-list-header>
        <ion-item :detail="true" @click="$router.push({name: 'Privacy'})">
          <ion-icon slot="start" name="body" color="warning"></ion-icon>
          <ion-label>隐私声明</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-content v-else>
      <ion-button color="success" style="margin-top: 40vh;" @click="$router.push({name: 'SignIn'})">您尚未登录，点击此处登录</ion-button>
    </ion-content>

    <ion-footer v-if="user.id" style="margin-bottom: 1em;">
      <ion-toolbar style="--border-width: 0 0 0;">
        <ion-button color="danger" expand="block" @click="onSignOut">退出</ion-button>
      </ion-toolbar>
      <ion-toolbar style="border-width: 0;">
        <ion-title class="footer">
          <p>版本：1.0.0</p>
          <p>{{new Date().getFullYear()}} © 发路米教育科技</p>
        </ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-app>
</template>

<script>
	export default {
		name: 'My',

		data() {
			return {
				user: {
					id: 1
				}
			};
		},

		methods: {
			async onSignOut() {
				const self = this;
				return this.$ionic.alertController.create({
					header: '退出登录',
					message: '确定退出登录?',
					buttons: [
						{
							text: '取消',
							role: 'cancel',
							cssClass: 'secondary',
						},
						{
							text: '退出',
							handler: () => {
								self.user.id = undefined;
							},
						},
					],
				}).then(a => a.present());
			}
		}
	}
</script>

<style type="text/css" scoped>
  .avatar {
    width: 42px;
    height: 42px;
  }

  .footer {
    font-size: 0.7em;
    color: #7f7f7f;
    border-width: 0;
  }
</style>
