
import { debounce, isFunction } from '@/utils'


let inputFunction;

// 由于要同时支持 input 输入框和封装 input 的组件，因此需要去找到input这个元素。
function findInput(el) {
    const quene = []
    quene.push(el)
    while (quene.length > 0) {
        const current = quene.shift()
        if (current?.tagName === 'INPUT') {
            return current
        }
        if (current?.childNodes) {
            quene.push(...current.childNodes)
        }
    }
    return null
}

const debounceInput = {
    mounted(el, binding, vNode) {
        const { value, arg } = binding;
        if (value && isFunction(value)) {
            let timeout = 600;

            if (arg && !Number.isNaN(arg)) {
                timeout = Number(arg)
            }

            inputFunction = debounce(value, timeout) // 执行函数防抖处理
            const input = findInput(el)
            el._INPUT = input
            if (input) {
                input.addEventListener('input', inputFunction)
            }
        }
    },
    beforeUnmount(el) {
        if (el._INPUT) {
            el._INPUT.removeEventListener('input', inputFunction)
            el._INPUT = null
        }
    }
}

export { debounceInput }
