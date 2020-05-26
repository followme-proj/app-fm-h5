/**
 * 全局基础工具函数集。有些可以使用Lodash代替。
 */

/**
 * 时间转化。
 */
import moment from 'moment';

export function parseTime(time, cFormat) {
  if (arguments.length === 0) return null;

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };

  return format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];

    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  });
}

/**
 * 格式化时间。
 *
 * @param time
 * @param option
 */
export function formatTime(time, option) {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * 将query string转为对象。若url为空，则获取当前路径。
 * @param url
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url;

  const search = url.substring(url.lastIndexOf('?') + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;

  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs
  });

  return obj
}

/**
 * 获取字节长度。
 */
export function getByteLen(val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/gi) != null) {
      len += 1
    } else {
      len += 0.5
    }
  }
  return Math.floor(len)
}

/**
 * 清理数组中的空值。
 *
 * @param actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * JSON转为query string。
 *
 * @param json
 * @returns {string}
 */
export function param(json) {
  if (!json) return '';

  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return '';

      if (typeof json[key] === 'object') {
        // console.log(moment(json[key]).format('YYYY-MM-DD HH:mm:ss'));
        return encodeURIComponent(key) + '=' + encodeURIComponent(moment(json[key]).format('YYYY-MM-DD HH:mm:ss'));
      }

      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&');
}

/**
 * 将query string转为object。
 *
 * @param url
 */
export function param2Obj(url) {
  const search = url.split('?')[1];
  if (!search) return {};

  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  );
}

/**
 * HTML转文本。
 *
 * @param val
 * @returns {(string | null) | string}
 */
export function html2Text(val) {
  const div = document.createElement('div');
  div.innerHTML = val;

  return div.textContent || div.innerText
}

/**
 * 对象合并。
 *
 * @param target
 * @param source
 * @returns {*}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }

  if (Array.isArray(source)) {
    return source.slice()
  }

  Object.keys(source).forEach(property => {
    const sourceProperty = source[property];
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  });

  return target;
}

/**
 * 页面滚动至指定位置。
 *
 * @param element
 * @param to
 * @param duration
 */
export function scrollTo(element, to, duration) {
  if (duration <= 0) return;

  const difference = to - element.scrollTop;
  const perTick = (difference / duration) * 10;

  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;

    scrollTo(element, to, duration - 10)
  }, 10);
}

/**
 * 类转换。
 *
 * @param element
 * @param className
 */
export function toggleClass(element, className) {
  if (!element || !className) return;

  let classString = element.className;
  const nameIndex = classString.indexOf(className);

  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }

  element.className = classString;
}

/**
 * 选择器选项。
 * @type {*[]}
 */
export const pickerOptions = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date();
      const start = new Date(new Date().toDateString());
      end.setTime(start.getTime());
      picker.$emit('pick', [start, end]);
    }
  },
  {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString());
      const start = new Date();
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit('pick', [start, end]);
    }
  },
  {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString());
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      picker.$emit('pick', [start, end]);
    }
  },
  {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString());
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      picker.$emit('pick', [start, end])
    }
  }
];

/**
 * 获取时间。
 *
 * @param type
 * @returns {*}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * 去抖。
 *
 * @param func
 * @param wait
 * @param immediate
 * @returns {function(...[*]=): *}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null
    }

    return result
  }
}

/**
 * 深度拷贝。
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone');
  }

  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  });

  return targetObj;
}

/**
 * 唯一化数组。
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr));
}

/**
 * 集合转成json格式。
 */
export function setToJson(obj) {
  if (obj) {
    for (const n in obj) {
      if (typeof obj[n] === 'string') {
        try {
          const o = JSON.parse(obj[n]);
          if (typeof o === 'object' && obj) {
            obj[n] = o
          }
        } catch (e) {
          continue;
        }
      }
    }
  }

  return obj;
}
