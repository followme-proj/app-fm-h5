<template>
  <div>
    <ion-header translucent>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button
            text=""
            default-href="/"
            @click="onGoBack()"
          ></ion-back-button>
        </ion-buttons>

        <ion-title>新建消息</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen>
      <ion-list>
        <ion-list-header>
          <ion-label>常规</ion-label>
        </ion-list-header>

        <ion-item>
          <ion-label>公众号</ion-label>
          <ion-select
            placeholder="选择发送公众号"
            interface="action-sheet"
            v-model="form.wxAppid"
          >
            <ion-select-option
              v-for="(item, idx) in wxApps.items"
              :key="idx"
              :value="item.id"
            >
              {{ item.name }}
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>消息模板</ion-label>
          <ion-select
            placeholder="选择消息模板"
            interface="action-sheet"
            v-model="form.tplId"
          >
            <ion-select-option
              v-for="(item, idx) in templates.items"
              :key="idx"
              :value="item.id"
            >
              {{ item.name }}
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>对象</ion-label>
          <ion-select
            placeholder="选择发送对象"
            interface="action-sheet"
            v-model="form.target"
          >
            <ion-select-option
              v-for="(item, idx) in targets"
              :key="idx"
              :value="item.type"
            >
              {{ item.title }}
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>链接</ion-label>
          <ion-input v-model="form.url"></ion-input>
        </ion-item>

        <ion-list-header v-if="Object.keys(form.fields).length > 0">
          <ion-label>消息内容</ion-label>
        </ion-list-header>
        <ion-item
          v-for="(field, idx) in Object.keys(form.fields)"
          :key="idx"
          :label="form.fields[field].label"
          :help-text="`填写${form.fields[field].label}`"
        >
          <mu-text-field v-model="form.fields[field].value"></mu-text-field>
        </ion-item>
      </ion-list>

       <ion-button color="success" @click="onSubmit">发送</ion-button>
    </ion-content>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  MessageActions,
  TemplateActions,
  WxAppActions,
} from "@/store/actionTypes";

export default {
  name: "NewMessage",

  data() {
    return {
      targets: [
        {
          type: 10,
          title: "全部",
        },
        {
          type: 20,
          title: "分组",
        },
        {
          type: 30,
          title: "单发",
        },
      ],

      form: {
        wxAppid: undefined,
        tplId: undefined,
        url: undefined,
        target: 10,
        fields: {},
      },
    };
  },

  computed: {
    ...mapGetters(["wxApps", "templates", "currentThemeColors"]),
  },

  async created() {
    this.getWxApps();
  },

  methods: {
    // 检查上次打卡结果
    async checkLastCheckin() {
      return this.$ionic.alertController
        .create({
          header: "任务提示",
          message: "上次打卡未完成，即将继续上次任务",
          buttons: [
            {
              text: "确定",
              handler: () => {
                console.log("Confirm Okay");
              },
            },
          ],
        })
        .then((a) => a.present());
    },

    // 后退
    async onGoBack() {
      history.go(-1);
    },

    async getWxApps() {
      this.loading = true;

      try {
        await this.$store.dispatch(WxAppActions.GetWxAppList, {});
      } catch (e) {
        if (e.message) this.$globalToast.error(e.message);
      }

      this.loading = false;
    },

    async getTemplates() {
      this.loading = true;

      try {
        await this.$store.dispatch(TemplateActions.GetTemplateList, {
          wxAppid: this.form.wxAppid,
        });
      } catch (e) {
        if (e.message) this.$globalToast.error(e.message);
      }

      this.loading = false;
    },

    async onSubmit() {
      try {
        await this.$refs.form.validate();

        await this.$store.dispatch(MessageActions.SendMessage, this.form);
        this.$globalToast.success("发送成功");
      } catch (e) {
        if (e.message) this.$globalToast.error(e.message);
      }
    },

    async clear() {
      this.form = {
        target: 10,
        tplId: undefined,
        url: undefined,
        wxAppid: undefined,
        fields: {},
      };
    },

    // 选择公众号
    onWxAppChanged() {
      this.form.tplId = undefined;

      this.getTemplates();
    },

    // 选择消息模板
    onTplChanged(tplId) {
      if (tplId === 0) return;

      let tpl = null;
      this.templates.items.forEach((item) => {
        if (item.id === tplId) tpl = item;
      });
      let fields = JSON.parse(tpl.fields);
      Object.keys(fields).forEach((key) => (fields[key].value = ""));

      this.form.fields = fields;
    },
  },
};
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

  margin-top: 0.5rem;
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
