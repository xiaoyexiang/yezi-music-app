import requestServer from '@/javascript/requestServer.js'

/**
 * promise 缓存函数
 * @param {Function} fn 执行函数
 * @param {Function} convertParam 缓存 key 生成函数
 * @param {Object} ctx 指向上下文
 * @return {Function}
 */
function promiseCache(fn, convertParam, ctx) {
    if (typeof fn !== 'function') {
        return new TypeError('first argument is not a function', 10);
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

// 获取榜单列表
export const requestToplist = promiseCache(() => requestServer.get('/toplist'), () => 'toplist')

// 获取歌单详情
export const requestPlaylistDetail = promiseCache((id) => requestServer.get(`/playlist/detail?id=${id}`), id => `PlaylistDetail-${id}`)