import requestServer from "@/javascript/requestServer.js";

/**
 * promise 缓存函数
 * @param {Function} fn 执行函数
 * @param {Function} convertParam 缓存 key 生成函数
 * @param {Object} ctx 指向上下文
 * @return {Function}
 */
function promiseCache(fn, convertParam, ctx) {
  if (typeof fn !== "function") {
    return new TypeError("first argument is not a function", 10);
  }
  if (!promiseCache.cache) {
    promiseCache.cache = Object.create(null);
  }
  return function handle(...args) {
    const cachKey = convertParam.apply(ctx, args);
    if (!promiseCache.cache[cachKey]) {
      promiseCache.cache[cachKey] = fn.apply(ctx, args);
    }
    return promiseCache.cache[cachKey];
  };
}

/**
 * 清空 promise 缓存函数
 */
export function cleanPromiseCache() {
  if (promiseCache.cache) {
    promiseCache.cache = Object.create(null);
  }
}

/**
 * 手机号登录
 * @param {Object} params 参数对象
 * @return {Promise}
 */
export const login = params => {
  const { phone, password } = params;
  if (!phone || !password) {
    return Promise.reject(new Error("手机号或者密码不能为空"));
  }
  const param = {
    method: "get",
    url: `/login/cellphone?phone=${phone}&password=${password}`
  };
  return requestServer.request(param);
};

/**
 * 获取登录状态
 * @return {Promise}
 */
export const requestLoginStatus = cookie => {
  const param = {
    method: "get",
    url: "/login/status"
  };
  if (cookie) {
    param.headers = {
      cookie
    };
  }
  return requestServer.request(param);
};

/**
 * 退出登录
 * @return {Promise}
 */
export const logout = () => requestServer.get("/logout");

// 注册(修改密码)

// 获取榜单列表
export const requestToplist = promiseCache(
  () => requestServer.get("/toplist"),
  () => "toplist"
);

// 获取歌单详情
export const requestPlaylistDetail = promiseCache(
  id => requestServer.get(`/playlist/detail?id=${id}`),
  id => `PlaylistDetail-${id}`
);

// 获取歌单播放url
export const requestSongUrl = promiseCache(
  id => requestServer.get(`/song/url?id=${id}`),
  id => `songUrl-${id}`
);

// 获取歌手分类列表
export const requestArtistList = promiseCache(
  (categoty, initial) =>
    requestServer.get(`/artist/list?cat=${categoty}&initial=${initial}`),
  (categoty, initial) => `artistList-${categoty}-${initial}`
);

// 收藏歌手
export const subscribeArtist = promiseCache(
  (aid, t) => requestServer.get(`/artist/sub?id=${aid}&t=${t}`),
  (aid, t) => `artist-${aid}-${t}`
);
