<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider :trigger="null" collapsible v-model="collapsed" width="256px">
        <div class="logo">Ant Design Vue Pro</div>
        <SiderMenu></SiderMenu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0" >
          <a-icon class="trigger"
                  :type="collapsed ? 'menu-unfold' :'menu-fold'"
                  @click="collapsed = !collapsed"
                  v-authority="['admin']"
          ></a-icon>
          <Header></Header>
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
<!--          <a-breadcrumb style="margin: 16px 0">-->
<!--            <a-breadcrumb-item>User</a-breadcrumb-item>-->
<!--            <a-breadcrumb-item>Bill</a-breadcrumb-item>-->
<!--          </a-breadcrumb>-->
<!--          <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">-->
<!--            Bill is a cat.-->
<!--          </div>-->
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer></Footer>
        </a-layout-footer>
      </a-layout>
    </a-layout>
      <Authorized :authority="['admin','user']">
          <SettingDrawer />
      </Authorized>
  </div>
</template>
<script>
    import Header from './Header'
    import Footer from './Footer'
    import SiderMenu from "./SiderMenu";
    import SettingDrawer from "./SettingDrawer";
    export default {
      data(){
        return {
          collapsed: false
        }
      },
      computed: {},
      components: {
          Header,
          Footer,
          SiderMenu,
          SettingDrawer
      },
      created(){},
      methods: {}
    }
</script>

<style scoped>
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
}
  .logo {
    color: white;
    height: 64px;
    line-height: 64px;
    overflow: hidden;
    text-align: center;
  }
</style>