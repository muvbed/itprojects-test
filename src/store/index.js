import Vue from 'vue'
import Vuex from 'vuex'

import contacts from './modules/contacts'

import 'material-design-icons-iconfont'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		contacts
	}
})
