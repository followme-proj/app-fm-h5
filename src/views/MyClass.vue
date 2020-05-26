<!--打卡-->
<template>
  <ion-app>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button text="" default-href="/" @click="onGoBack()"></ion-back-button>
        </ion-buttons>

        <ion-title>我的班级</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen>
      <ion-list>
        <ion-list-header>
          <ion-lable>一班</ion-lable>
        </ion-list-header>
        <ion-item>
          <ion-row justify-content-center align-items-center>
            <ion-col v-for="(stu, idx) in students" :key="idx" class="student" align-self-center>
              <ion-avatar style="text-align: center">
                <img :src="stu.avatar">
              </ion-avatar>
              <ion-label class="student-name">
                {{stu.name}}
              </ion-label>
            </ion-col>
          </ion-row>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-app>
</template>

<script>
	export default {
		name: 'Index',

		data() {
			return {
				students: [{
					id: 1,
					name: 'St1',
					avatar: 'http://img0.imgtn.bdimg.com/it/u=2021421053,481069477&fm=26&gp=0.jpg',
				}, {
					id: 2,
					name: 'St2',
					avatar: 'http://img4.imgtn.bdimg.com/it/u=3775121648,1201209264&fm=26&gp=0.jpg',
				}, {
					id: 3,
					name: 'St3',
					avatar: 'http://img0.imgtn.bdimg.com/it/u=2841250875,1836419275&fm=11&gp=0.jpg',
				}, {
					id: 4,
					name: 'St4',
					avatar: 'http://img1.imgtn.bdimg.com/it/u=2963819047,2362719118&fm=11&gp=0.jpg',
				}, {
					id: 5,
					name: 'St5',
					avatar: 'http://img1.imgtn.bdimg.com/it/u=20507104,148366893&fm=11&gp=0.jpg',
				}, {
					id: 6,
					name: 'St6',
					avatar: 'http://img0.imgtn.bdimg.com/it/u=676523226,1058543988&fm=15&gp=0.jpg',
				}, {
					id: 7,
					name: 'St7',
					avatar: 'http://img5.imgtn.bdimg.com/it/u=1698920541,1700023172&fm=15&gp=0.jpg',
				}, {
					id: 8,
					name: 'St8',
					avatar: 'http://img4.imgtn.bdimg.com/it/u=2316378554,628581380&fm=11&gp=0.jpg',
				}, {
					id: 9,
					name: 'St9',
					avatar: 'http://img2.imgtn.bdimg.com/it/u=3710670905,838143697&fm=15&gp=0.jpg',
				}]
			}
		},

		async created() {
		},

		methods: {
		},
	}
</script>

<style type="text/css" scoped>
  .swiper-slide {
    display: block;
  }

  .swiper-slide p {
    margin-bottom: 1.8rem;
  }

  .swiper-slide img {
    height: 80px;
    width: 80px;

    margin-top: .5rem;
    border: 2px solid lightblue;
    border-radius: 50%;
  }

  .student {
    margin: auto;
  }

  .checker-name {
    font-size: 0.6em;
  }

  .student-name {
    margin-top: 0.1em;
    font-size: 0.8em;
  }
</style>