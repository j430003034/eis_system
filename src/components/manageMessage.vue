<template>
  <Content :style="{padding: '0 50px'}">
    <Breadcrumb :style="{margin: '20px 0'}">
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Message</BreadcrumbItem>
    </Breadcrumb>
    <Card>
      <div style="min-height: 800px;">
        <div v-show="isShow0">
          <Row>
            <Col span="2" offset="1">
              <Button type="primary" @click="toAddMessage">Add Message</Button>
            </Col>
            <Col span="18">
              <div v-if="userCookieName == 'Company'">
                <div v-for="message in messages">
                  <card style="margin-bottom:10px;">
                    <Row>
                      <Col span="4">
                        <h2>{{message.owner}}</h2>
                        {{message.content}}
                      </Col>
                      <Col span="19" offset="1">
                        <card
                          style="margin-top:5px; background-color:#e5eff2"
                          :bordered="false"
                          :dis-hover="true"
                        >
                          <Row style="text-align: center">
                            <Col span="4">
                              <strong>Product Information:</strong>
                            </Col>
                            <Col span="4">
                              <p>Name: {{message.product.pid}}</p>
                            </Col>
                            <Col span="4">
                              <p>Type: {{message.product.pType}}</p>
                            </Col>
                            <Col span="4">
                              <p>Color: {{message.product.color}}</p>
                            </Col>
                            <Col span="4">
                              <p>Size: {{message.product.size}}</p>
                            </Col>
                            <Col span="4">
                              <p>Price: {{message.product.price}}</p>
                            </Col>
                          </Row>
                        </card>
                      </Col>
                    </Row>
                    <Row style="margin-top:10px;">
                      <Col span="2" offset="20">
                        <Button @click="toEditMessage(message)">Edit</Button>
                      </Col>
                      <Col span="2">
                        <Button type="error" @click="delectMessage(message)">Delete</Button>
                      </Col>
                    </Row>
                  </card>
                </div>
              </div>
              <div v-else>
                <div v-for="message in messages">
                  <div v-if="message.owner == userCookieName">
                    <card style="margin-bottom:10px;">
                      <Row>
                        <Col span="4">
                          <h2>{{message.owner}}</h2>
                          {{message.content}}
                        </Col>
                        <Col span="19" offset="1">
                          <card
                            style="margin-top:5px; background-color:#e5eff2"
                            :bordered="false"
                            :dis-hover="true"
                          >
                            <Row style="text-align: center">
                              <Col span="4">
                                <strong>Product Information:</strong>
                              </Col>
                              <Col span="4">
                                <p>Name: {{message.product.pid}}</p>
                              </Col>
                              <Col span="4">
                                <p>Type: {{message.product.pType}}</p>
                              </Col>
                              <Col span="4">
                                <p>Color: {{message.product.color}}</p>
                              </Col>
                              <Col span="4">
                                <p>Size: {{message.product.size}}</p>
                              </Col>
                              <Col span="4">
                                <p>Price: {{message.product.price}}</p>
                              </Col>
                            </Row>
                          </card>
                        </Col>
                      </Row>
                      <Row style="margin-top:10px;">
                        <Col span="2" offset="20">
                          <Button @click="toEditMessage(message)">Edit</Button>
                        </Col>
                        <Col span="2">
                          <Button type="error" @click="delectMessage(message)">Delete</Button>
                        </Col>
                      </Row>
                    </card>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div v-show="isShow1">
          <Row>
            <Col span="1" offset="2">
              <Button
                shape="circle"
                type="info"
                style="margin-top:30px;"
                icon="ios-arrow-back"
                @click="goBack"
              ></Button>
            </Col>
            <Col span="10">
              <div>
                <Row style="margin-top:30px;">
                  <Col span="8" style="text-align:right">
                    <p>Text:</p>
                  </Col>
                  <Col span="15" offset="1">
                    <Input type="textarea" placeholder="Enter something" v-model="messageText"/>
                  </Col>
                </Row>
                <Row style="margin-top:20px;">
                  <Col span="8" style="text-align:right">
                    <p>Product:</p>
                  </Col>
                  <Col span="15" offset="1">
                    <Select v-model="messageProduct" placeholder="Select a color">
                      <Option
                        v-for="item in productList"
                        :value="item.pid"
                        :key="item.id"
                      >{{ item.pid }}</Option>
                    </Select>
                  </Col>
                </Row>
                <Row style="margin-top:20px;">
                  <Col span="15" offset="9">
                    <div style="margin-top:30px;"></div>
                    <div v-if="isShowSubmitbutton==0">
                      <Button type="primary" @click="createNewMessage">Create</Button>
                    </div>
                    <div v-else>
                      <Button type="primary" @click="editMessage">Edit</Button>
                    </div>
                  </Col>
                </Row>
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
  name: "manageMessage",
  components: {},
  data() {
    return {
      isShow0: true,
      isShow1: false,
      messageText: "",
      messageProduct: "",
      messageId: null,
      messages: new Array(),
      productList: [],
      isShowSubmitbutton: 0,
      userCookieName: "",
      re: /^[1-9]+[0-9]*]*$/
    };
  },
  methods: {
    async toAddMessage() {
      await this.getProductList();
      this.isShowSubmitbutton = 0;
      this.isShow0 = false;
      this.isShow1 = true;
    },
    async toEditMessage(message) {
      this.messageId = message.id;
      this.messageText = message.content;
      this.messageProduct = message.pid;
      await this.getProductList();
      this.isShowSubmitbutton = 1;
      this.isShow0 = false;
      this.isShow1 = true;
    },
    goBack: function() {
      this.messageId = null;
      this.messageText = "";
      this.messageProduct = "";
      this.isShow0 = true;
      this.isShow1 = false;
    },
    async createNewMessage() {
      if (this.messageText == "" || this.messageProduct == "") {
        alert("Input Data error!");
      } else {
        var that = this;
        var newMessage = {
          owner: "Company",
          content: that.messageText,
          pid: that.messageProduct
        };
        await this.axios
          .post("http://localhost:1337/message/create", newMessage)
          .then(function(response) {
            that.getAllMessage().then(res => {
              that.$Message.success("Success!");
              that.goBack();
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    async editMessage() {
      if (this.messageText == "" || this.messageProduct == "") {
        alert("Input Data error!");
      } else {
        var that = this;
        var updateMessage = {
          id: that.messageId,
          owner: "Company",
          content: that.messageText,
          pid: that.messageProduct
        };
        await this.axios
          .post("http://localhost:1337/message/update", updateMessage)
          .then(function(response) {
            that.getAllMessage().then(res => {
              that.$Message.success("Success!");
              that.goBack();
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    async getMessageList() {
      var that = this;
      await this.axios
        .get("http://localhost:1337/message/show")
        .then(function(response) {
          var itemList = response.data.messages;
          console.log(itemList);

          for (var i = 0; i < itemList.length; i++) {
            var messageItem = {
              id: itemList[i].id,
              owner: itemList[i].owner,
              content: itemList[i].content,
              pid: itemList[i].pid,
              product: []
            };
            that.messages.push(messageItem);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async findOneProduct() {
      for (var i = 0; i < this.messages.length; i++) {
        var that = this;
        await this.axios
          .post("http://localhost:1337/product/search", that.messages[i])
          .then(function(response) {
            that.messages[i].product = response.data.product;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    async getAllMessage() {
      this.messages = new Array();
      await this.getMessageList();
      await this.findOneProduct();
    },
    async delectMessage(message) {
      var that = this;
      await this.axios
        .post("http://localhost:1337/message/delete", message)
        .then(function(response) {
          that.getAllMessage().then(res => {
            that.$Message.success("Success!");
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async getProductList() {
      var that = this;
      await this.axios
        .get("http://localhost:1337/product/show")
        .then(function(response) {
          that.productList = response.data.products;
          console.log(that.productList);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created: function() {
    this.getAllMessage();
    console.log(this.messages);
    this.userCookieName = this.$cookieStore.getCookie("username");
  }
};
</script>

