import * as store from './store/index';
import * as react from './react/index';
import * as middleware from './middleware/index';
import * as mutations from './mutations/index';
export default {
    ...store,
    react,
    middleware,
    mutations,
}