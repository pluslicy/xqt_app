import { routerRedux } from 'dva/router';

export default {

  namespace: 'app',

  state: {},

  subscriptions: {
   
  },

  effects: {
    // 路由跳转
    * redirect ({ payload }, { put }) {
      yield put(routerRedux.push(payload));
    }
  },

  reducers: {
   
  },

};
