<template>
  <ion-app>
    <ion-header translucent>
      <ion-toolbar color="primary">
        <ion-title>首页</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen>
      <ion-card style="text-align: left">
        <img src="http://hbimg.b0.upaiyun.com/ff87a36da03690b67100792152ed7fa0a550fdfa2d4e6-LzNHtA_fw658"/>
        <ion-card-header>
          <ion-card-subtitle>机构打卡总结</ion-card-subtitle>
          <ion-card-title>2020-02-18</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>打卡共计 36 人次数</p>
          <p>请假共计 2 个学生</p>
          <p>打卡率 94.5%</p>

          <ion-router-link href="#">详情</ion-router-link>
        </ion-card-content>
      </ion-card>
      <ion-card style="text-align: left">
        <img src="http://hbimg.b0.upaiyun.com/ff87a36da03690b67100792152ed7fa0a550fdfa2d4e6-LzNHtA_fw658"/>
        <ion-card-header>
          <ion-card-subtitle>机构打卡总结</ion-card-subtitle>
          <ion-card-title>2020-02-17</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>打卡共计 36 人次数</p>
          <p>请假共计 0 个学生</p>
          <p>打卡率 100%</p>
        </ion-card-content>
      </ion-card>
    </ion-content>

    <!--img alt="Vue logo" src="../assets/logo.png"-->
  </ion-app>
</template>

<script>
	export default {
		name: 'Home',
	}
</script>
