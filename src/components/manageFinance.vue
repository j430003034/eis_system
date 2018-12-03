<template>
  <Content :style="{padding: '0 50px'}">
    <Breadcrumb :style="{margin: '20px 0'}">
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Finance</BreadcrumbItem>
    </Breadcrumb>
    <Card>
      <div style="min-height: 800px;">
        <div v-show="isShow0">
          <div style="margin-bottom:20px;margin-top:20px;">Total sale: <h1 style="font-size:60px;color:#13e3be">$ {{totalSale}}</h1></div>
          <Row :gutter="16">
            <div v-for="agent in agents">
              <Col span="8">
                <card>
                  <h3>{{agent.username}}</h3>
                  <h4>Personal sale: {{agent.personalSale}}</h4>
                  <Row type="flex" justify="space-between" style="background-color:#EEF6F8;margin-top:10px;">
                    <Col span="7">Product Name</Col>
                    <Col span="7">Product Number</Col>
                    <Col span="7">Product Sale</Col>
                  </Row>
                  <div v-for="product in agent.personalSaleProduct">
                    <Row type="flex" justify="space-between">
                      <Col span="7">{{product.id}}</Col>
                      <Col span="7">{{product.number}}</Col>
                      <Col span="7">$ {{product.sale}}</Col>
                    </Row>
                  </div>
                </card>
              </Col>
            </div>
          </Row>
        </div>
      </div>
    </Card>
  </Content>
</template>
<script>
export default {
  name: "manageFinance",
  components: {},
  data() {
    return {
      isShow0: true,
      totalSale: 0,
      personalSale: 0,
      agents: new Array(),
      re: /^[1-9]+[0-9]*]*$/
    };
  },
  methods: {
    async getTotalSale() {
      var that = this;
      await this.axios
        .get("http://localhost:1337/order/totalSales")
        .then(function(response) {
          that.totalSale = response.data.count;
          console.log(that.totalSale);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async getAgent() {
      var that = this;
      await this.axios
        .get("http://localhost:1337/user/show")
        .then(function(response) {
          var itemList = response.data.users;
          console.log(itemList);

          for (var i = 0; i < itemList.length; i++) {
            var agentItem = {
              username: itemList[i].username,
              personalSale: "",
              personalSaleProduct: new Array()
            };
            that.agents.push(agentItem);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async getOwnerSale() {
      var that = this;
      for (var i = 0; i < this.agents.length; i++) {
        await this.axios
          .post("http://localhost:1337/order/personalSale", that.agents[i])
          .then(function(response) {
            that.agents[i].personalSale = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    async getOwnerProduct() {
      var that = this;
      for (var i = 0; i < this.agents.length; i++) {
        await this.axios
          .post("http://localhost:1337/order/orderCount", that.agents[i])
          .then(function(response) {
            console.log(response.data[0]);

            for (var k = 0; k < response.data.length; k++) {
              that.agents[i].personalSaleProduct.push(response.data[k]);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    async getAllAgentProduct() {
      this.agents = new Array();
      await this.getAgent();
      await this.getOwnerSale();
      await this.getOwnerProduct();
      console.log(this.agents);
    }
  },
  async created() {
    await this.getTotalSale();
    await this.getAllAgentProduct();
  }
};
</script>

