<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 500px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">
            <Button type="error" style="margin-bottom:30px;" @click="logout()">Log out</Button>
          </div>
          <div class="layout-nav">
            <MenuItem name="1" v-if="(userCookieName=='Company')">
              <div @click="changePage('manageFinance')">
                <Icon type="logo-usd"></Icon>Finance
              </div>
            </MenuItem>
            <MenuItem name="2">
              <div @click="changePage('manageProduct')">
                <Icon type="ios-keypad"></Icon>Product
              </div>
            </MenuItem>
            <MenuItem name="3" v-if="(userCookieName=='Company')">
              <div @click="changePage('manageAgent')">
                <Icon type="ios-people"></Icon>Agent
              </div>
            </MenuItem>
            <MenuItem name="4">
              <div @click="changePage('manageOrder')">
                <Icon type="ios-paper"></Icon>Order
              </div>
            </MenuItem>
            <MenuItem name="5">
              <div @click="changePage('manageMessage')">
                <Icon type="ios-create"></Icon>Message
              </div>
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <!-- <Content :style="{padding: '0 50px'}">
                <Breadcrumb :style="{margin: '20px 0'}">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Components</BreadcrumbItem>
                    <BreadcrumbItem>Layout</BreadcrumbItem>
                </Breadcrumb>
                <Card>
                    <div style="min-height: 700px;">
                        Content
                    </div>
                </Card>
      </Content>-->
      <component v-bind:is="currentPage"></component>
      <Footer class="layout-footer-center">2018 &copy; The Bag Company</Footer>
    </Layout>
  </div>
</template>
<script>
import manageProduct from "@/components/manageProduct";
import manageAgent from "@/components/manageAgent";
import manageOrder from "@/components/manageOrder";
import manageMessage from "@/components/manageMessage";
import manageFinance from "@/components/manageFinance";
export default {
  name: "index",
  components: {
    manageProduct,
    manageAgent,
    manageOrder,
    manageMessage,
    manageFinance
  },
  data() {
    return {
      currentPage: "manageOrder",
      userCookieName: ""
    };
  },
  methods: {
    changePage: function(pageName) {
      this.currentPage = pageName;
      console.log(pageName);
    },
    logout: function() {
      this.$cookieStore.delCookie("username");
      this.$router.push({
        name: "login"
      });
    }
  },
  created() {
    this.userCookieName = this.$cookieStore.getCookie("username");
  }
};
</script>