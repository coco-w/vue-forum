import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import {
  Row,
  Col,
  Time,
  Form,
  FormItem,
  Icon,
  Button,
  Input,
  Message,
  Affix,
  Anchor,
  MenuItem,
  Spin,
  AnchorLink,
  Page,
  Layout,
  Content,
  Card,
  Menu,
  Sider,
  Upload,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  MenuGroup,
  RadioGroup,
  Radio,
  Scroll
} from 'iview'
import 'iview/dist/styles/iview.css'

Vue.component('Card', Card)
Vue.component('Affix', Affix)
Vue.component('Scroll', Scroll)
Vue.component('Menu', Menu)
Vue.component('Sider', Sider)
Vue.component('Upload', Upload)
Vue.component('Dropdown', Dropdown)
Vue.component('DropdownItem', DropdownItem)
Vue.component('DropdownMenu', DropdownMenu)
Vue.component('MenuGroup', MenuGroup)
Vue.component('RadioGroup', RadioGroup)
Vue.component('Radio', Radio)
Vue.component('MenuItem', MenuItem)
Vue.component('Spin', Spin)
Vue.component('Row', Row)
Vue.component('i-col', Col)
Vue.component('Time', Time)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Icon', Icon)
Vue.component('Button', Button)
Vue.component('i-input', Input)
Vue.component('Anchor', Anchor)
Vue.component('AnchorLink', AnchorLink)
Vue.component('Page', Page)
Vue.component('Layout', Layout)
Vue.component('Content', Content)
Vue.prototype.$Message = Message

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
