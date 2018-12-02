<template>
  <Content :style="{padding: '0 50px'}">
    <Breadcrumb :style="{margin: '20px 0'}">
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Agent</BreadcrumbItem>
    </Breadcrumb>
    <Card>
      <div style="min-height: 800px;">
        <div v-show="isShow0">
          <Row>
            <Col span="2" offset="1">
              <Button type="primary" @click="toAddAgent">Add Agent</Button>
            </Col>
            <Col span="18">
              <card style="background-color:grey;color:white" :dis-hover="true">
                <Row style="height:10px;line-height:10px; text-align: center">
                  <Col span="5">
                    <strong>Name</strong>
                  </Col>
                  <Col span="5">
                    <strong>Phone Number</strong>
                  </Col>
                  <Col span="5">
                    <strong>Address</strong>
                  </Col>
                </Row>
              </card>
              <div v-for="agent in agents">
                <div v-if="agent.position == 'agent'">
                  <card style="margin-top:5px;">
                    <Row style="height:30px;line-height:30px; text-align: center">
                      <Col span="5">
                        <h2>{{agent.username}}</h2>
                      </Col>
                      <Col span="5">
                        <p>{{agent.phoneNumber}}</p>
                      </Col>
                      <Col span="5">
                        <p>{{agent.address}}</p>
                      </Col>
                      <Col span="2" offset="5">
                        <Button @click="toEditAgent(agent)">Edit</Button>
                      </Col>
                      <Col span="2">
                        <Button type="error" @click="deleteAgent(agent)">Delete</Button>
                      </Col>
                    </Row>
                  </card>
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
                <Row style="margin-bottom:30px;">
                  <Col span="8" style="text-align:right">
                    <p>Agent Name:</p>
                  </Col>
                  <Col span="15" offset="1">
                    <Input placeholder="Enter name" v-model="agentName"/>
                  </Col>
                </Row>
                <Row style="margin-top:20px;">
                  <Col span="8" style="text-align:right">
                    <p>Phone Number:</p>
                  </Col>
                  <Col span="15" offset="1">
                    <Input placeholder="Enter phone number" v-model="agentPhone"/>
                  </Col>
                </Row>
                <Row style="margin-top:20px;">
                  <Col span="8" style="text-align:right">
                    <p>Address:</p>
                  </Col>
                  <Col span="15" offset="1">
                    <Input placeholder="Enter address" v-model="agentAddress"/>
                  </Col>
                </Row>
                <Row style="margin-top:20px;">
                  <Col span="15" offset="9">
                    <div style="margin-top:30px;"></div>
                    <div v-if="isShowSubmitbutton==0">
                      <Button type="primary" @click="createNewAgent">Create</Button>
                    </div>
                    <div v-else>
                      <Button type="primary" @click="editAgent">Edit</Button>
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
  name: "manageProduct",
  components: {},
  data() {
    return {
      isShow0: true,
      isShow1: false,
      agentName: "",
      agentPhone: "",
      agentAddress: "",
      agentId: null,
      isShowSubmitbutton: 0,
      agents: {},
      re: /^[1-9]+[0-9]*]*$/
    };
  },
  methods: {
    toAddAgent: function() {
      this.isShowSubmitbutton = 0;
      this.isShow0 = false;
      this.isShow1 = true;
    },
    toEditAgent: function(agent) {
      this.agentName = agent.username;
      this.agentPhone = agent.phoneNumber;
      this.agentAddress = agent.address;
      this.agentId = agent.id;
      this.isShowSubmitbutton = 1;
      this.isShow0 = false;
      this.isShow1 = true;
    },
    goBack: function() {
      this.agentName = "";
      this.agentPhone = "";
      this.agentAddress = "";
      this.agentId = null;
      this.isShow0 = true;
      this.isShow1 = false;
    },
    async createNewAgent() {
      if (
        this.agentName == "" ||
        this.agentPhone == "" ||
        this.agentAddress == ""
      ) {
        this.$Message.error("Input Data Error");
      } else {
        var that = this;
        var newAgent = {
          username: that.agentName,
          position: "agent",
          phoneNumber: that.agentPhone,
          address: that.agentAddress,
          password: "123456"
        };
        await this.axios
          .post("http://localhost:1337/user/create", newAgent)
          .then(function(response) {
            console.log('11111111');
      
            that.getAgentList().then(res => {
              that.$Message.success("Success!");
              that.goBack();
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    async editAgent() {
      if (
        this.agentName == "" ||
        this.agentPhone == "" ||
        this.agentAddress == ""
      ) {
        this.$Message.error("Input Data Error");
      } else {
        var that = this;
        var updateAgent = {
          id: that.agentId,
          username: that.agentName,
          position: "agent",
          phoneNumber: that.agentPhone,
          address: that.agentAddress,
          password: "123456"
        };
        await this.axios
          .post("http://localhost:1337/user/update", updateAgent)
          .then(function(response) {
            that.getAgentList().then(res => {
              that.$Message.success("Success!");
              that.goBack();
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    async getAgentList() {
      var that = this;
      await this.axios
        .get("http://localhost:1337/user/show")
        .then(function(response) {
          that.agents = response.data.users;
          console.log(that.agents);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async deleteAgent(agent) {
      var that = this;
      await this.axios
        .post("http://localhost:1337/user/delete", agent)
        .then(function(response) {
          that.getAgentList().then(res => {
            that.$Message.success("Success!");
            that.goBack();
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created: function() {
    this.getAgentList();
  }
};
</script>

