/**
 * 音频播放器。
 */
import {AudioPlayerActions} from "../actionTypes";
import {AudioPlayerMutations} from "../mutationTypes";

const AudioPlayer = {
  state: {
    audios: [],
    isPlaying: false,
  },

  mutations: {
    [AudioPlayerMutations.SetPlaying](state, playing) {
      state.isPlaying = playing;
    },

    [AudioPlayerMutations.AddAudio](state, text) {
      state.audios.push(text);
    }
  },

  actions: {
    // 增加待播放音频
    async [AudioPlayerActions.AddToPlayAudio]({commit, dispatch, state}, text) {
      commit(AudioPlayerMutations.AddAudio, text);
      if (state.isPlaying) return;

      await dispatch(AudioPlayerActions.PlayAudio);
    },

    // 播放音频
    async [AudioPlayerActions.PlayAudio]({getters, state, dispatch, commit}) {
      commit(AudioPlayerMutations.SetPlaying, true);

      const audioText = state.audios.shift();
      if (!audioText) {
        commit(AudioPlayerMutations.SetPlaying, false);
        return;
      }

      let url = `http://tts.baidu.com/text2audio?cuid=baiduid&lan=zh&ctp=1&pdt=311&pit=4&spd=4&per=5&tex=${audioText}`;
      await new Audio(url).play();

      await dispatch(AudioPlayerActions.PlayAudio);
    },
  }
};

export default AudioPlayer;
