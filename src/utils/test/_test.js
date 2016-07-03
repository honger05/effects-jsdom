import { uniq } from '../core/_core'

/**
 * 数组去重，希望输出
 * [false, true, undefined, null, NaN, 0, 1, {}, {}, 'a']
 */
let arr = [false, false, true, undefined, undefined, null,
            NaN, NaN, 0, 1, {}, {}, 'a', 'a']
arr = uniq(arr)

console.log(arr)
