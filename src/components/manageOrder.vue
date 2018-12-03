<template>
  <Content :style="{padding: '0 50px'}">
    <Breadcrumb :style="{margin: '20px 0'}">
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Order</BreadcrumbItem>
    </Breadcrumb>
    <Card>
      <div style="min-height: 800px;">
        <div v-show="isShow0">
          <Row>
            <Col span="2">
              <Button type="info" @click="orderState=false" style="width:140px;">Uncomfiremed Order</Button>
              <Button
                type="success"
                @click="orderState=true"
                style="width:140px; margin-top:10px;"
              >Comfirmed Order</Button>
            </Col>
            <Col span="18" offset="1">
              <card style="background-color:grey;color:white" :dis-hover="true">
                <Row style="height:10px;line-height:10px; text-align: center">
                  <Col span="4">
                    <strong>Order Id</strong>
                  </Col>
                  <Col span="4">
                    <strong>Owner</strong>
                  </Col>
                  <Col span="4">
                    <strong>Customer Name</strong>
                  </Col>
                  <Col span="4">
                    <strong>Phone Number</strong>
                  </Col>
                  <Col span="4">
                    <strong>Address</strong>
                  </Col>
                  <Col span="4">
                    <strong>date</strong>
                  </Col>
                </Row>
              </card>
              <div v-if="userCookieName == 'Company'"> 
                <div v-for="order in orders">
                    <div v-if="order.confirmedState == orderState">
                      <card style="margin-top:10px;">
                        <Row style="height:30px;line-height:30px; text-align: center">
                          <Col span="4">
                            <h4>{{order.oid}}</h4>
                          </Col>
                          <Col span="4">
                            <h4>{{order.owner}}</h4>
                          </Col>
                          <Col span="4">
                            <p>{{order.cname}}</p>
                          </Col>
                          <Col span="4">
                            <p>{{order.phoneNumber}}</p>
                          </Col>
                          <Col span="4">
                            <p>{{order.address}}</p>
                          </Col>
                          <Col span="4">
                            <p>{{order.date}}</p>
                          </Col>
                        </Row>
                        <card
                          style="margin-top:5px; background-color:#e5eff2"
                          :bordered="false"
                          :dis-hover="true"
                        >
                          <Row style="height:20px;line-height:20px; text-align: center">
                            <Col span="4">
                              <strong>Product Information:</strong>
                            </Col>
                            <Col span="5">
                              <p>Name: {{order.product.pid}}</p>
                            </Col>
                            <Col span="5">
                              <p>Type: {{order.product.pType}}</p>
                            </Col>
                            <Col span="5">
                              <p>Color: {{order.product.color}}</p>
                            </Col>
                            <Col span="5">
                              <p>Size: {{order.product.size}}</p>
                            </Col>
                          </Row>
                        </card>
                        <Row
                          style="height:20px;line-height:20px; margin-top:10px; margin-bottom:20px; text-align: center"
                        >
                          <Col span="4">
                            <p style="color:#9ea7b4">Total Price</p>
                            <h2>${{order.fee}}</h2>
                          </Col>
                          <Col span="4">
                            <p style="color:#9ea7b4">Quantity</p>
                            <h2>{{order.amount}}</h2>
                          </Col>
                          <div v-if="order.confirmedState == false">
                            <Col span="2" offset="12">
                              <Button type="success" @click="comfirmOrder(order)">Comfirm</Button>
                            </Col>
                            <Col span="2">
                              <Button type="error" @click="delectOrder(order)">Delete</Button>
                            </Col>
                          </div>
                        </Row>
                      </card>
                    </div>
                </div>
              </div>
              <div v-else> 
                <div v-for="order in orders">
                  <div v-if="order.owner == userCookieName">
                    <div v-if="order.confirmedState == orderState">
                      <card style="margin-top:10px;">
                        <Row style="height:30px;line-height:30px; text-align: center">
                          <Col span="4">
                            <h4>{{order.oid}}</h4>
                          </Col>
                          <Col span="4">
                            <h4>{{order.owner}}</h4>
                          </Col>
                          <Col span="4">
                            <p>{{order.cname}}</p>
                          </Col>
                          <Col span="4">
                            <p>{{order.phoneNumber}}</p>
                          </Col>
                          <Col span="4">
                            <p>{{order.address}}</p>
                          </Col>
                          <Col span="4">
                            <p>{{order.date}}</p>
                          </Col>
                        </Row>
                        <card
                          style="margin-top:5px; background-color:#e5eff2"
                          :bordered="false"
                          :dis-hover="true"
                        >
                          <Row style="height:20px;line-height:20px; text-align: center">
                            <Col span="4">
                              <strong>Product Information:</strong>
                            </Col>
                            <Col span="5">
                              <p>Name: {{order.product.pid}}</p>
                            </Col>
                            <Col span="5">
                              <p>Type: {{order.product.pType}}</p>
                            </Col>
                            <Col span="5">
                              <p>Color: {{order.product.color}}</p>
                            </Col>
                            <Col span="5">
                              <p>Size: {{order.product.size}}</p>
                            </Col>
                          </Row>
                        </card>
                        <Row
                          style="height:20px;line-height:20px; margin-top:10px; margin-bottom:20px; text-align: center"
                        >
                          <Col span="4">
                            <p style="color:#9ea7b4">Total Price</p>
                            <h2>${{order.fee}}</h2>
                          </Col>
                          <Col span="4">
                            <p style="color:#9ea7b4">Quantity</p>
                            <h2>{{order.amount}}</h2>
                          </Col>
                          <div v-if="order.confirmedState == false">
                            <Col span="2" offset="12">
                              <Button type="success" @click="comfirmOrder(order)">Comfirm</Button>
                            </Col>
                            <Col span="2">
                              <Button type="error" @click="delectOrder(order)">Delete</Button>
                            </Col>
                          </div>
                        </Row>
                      </card>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Card>
  </Content>
</template>
<script>
export default {
  name: "manageOrder",
  components: {},
  data() {
    return {
      isShow0: true,
      isShow1: false,
      orders: new Array(),
      completedOrders: new Array(),
      oid: null,
      date: "",
      cname: "",
      phoneNumber: "",
      address: "",
      pid: "",
      amount: 0,
      fee: 0,
      orderState: false,
      productItem: {},
      confirmedState: false,
      isShowSubmitbutton: 0,
      userCookieName: "",
      isName: false,
      re: /^[1-9]+[0-9]*]*$/
    };
  },
  methods: {
    async getOrderList() {
      var that = this;
      await this.axios
        .get("http://localhost:1337/order/show")
        .then(function(response) {
          var itemList = response.data.orders;
          console.log(itemList);

          for (var i = 0; i < itemList.length; i++) {
            var orderItem = {
              cname: itemList[i].cname,
              phoneNumber: itemList[i].phoneNumber,
              owner: itemList[i].owner,
              address: itemList[i].address,
              date: itemList[i].date,
              oid: itemList[i].oid,
              amount: itemList[i].amount,
              fee: itemList[i].fee,
              pid: itemList[i].pid,
              id: itemList[i].id,
              confirmedState: itemList[i].confirmedState,
              product: []
            };
            that.orders.push(orderItem);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async findOneProduct() {
      for (var i = 0; i < this.orders.length; i++) {
        var that = this;
        await this.axios
          .post("http://localhost:1337/product/search", that.orders[i])
          .then(function(response) {
            that.orders[i].product = response.data.product;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
      console.log(that.orders);
    },
    async getAllOrders() {
      this.orders = new Array();
      await this.getOrderList();
      await this.findOneProduct();
    },
    async delectOrder(order) {
      var that = this;
      await this.axios
        .post("http://localhost:1337/order/delete", order)
        .then(function(response) {
          that.getAllOrders().then(res => {
            that.$Message.success("Success!");
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async comfirmOrder(order) {
      order.confirmedState = true;
      var that = this;
      await this.axios
        .post("http://localhost:1337/order/update", order)
        .then(function(response) {
          that.getAllOrders().then(res => {
            that.$Message.success("Success!");
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created: async function() {
    await this.getAllOrders();
    console.log(this.orders);
    this.userCookieName = this.$cookieStore.getCookie("username");
  }
};
</script>

