
import hasRole from './permission/hasRole'
import hasPermi from './permission/hasPermi'
import { debounceInput } from './common'


export default function directive(app) {
    app.directive('hasRole', hasRole)
    app.directive('hasPermi', hasPermi)
    app.directive('debounceInput', debounceInput)
}




