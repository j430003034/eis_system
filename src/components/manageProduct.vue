<template>
  <Content :style="{padding: '0 50px'}">
    <Breadcrumb :style="{margin: '20px 0'}">
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Product</BreadcrumbItem>
    </Breadcrumb>
    <Card>
      <div style="min-height: 700px;">
        <div v-show="isShow0">
          <Row>
            <Col span="2" offset="1">
              <Button type="primary" @click="toAddProduct">Add Product</Button>
            </Col>
            <Col span="18">
              <card style="background-color:grey;color:white" :dis-hover="true">
                <Row style="height:10px;line-height:10px; text-align: center">
                  <Col span="4">
                    <strong>Name</strong>
                  </Col>
                  <Col span="4">
                    <strong>Type</strong>
                  </Col>
                  <Col span="3">
                    <strong>Color</strong>
                  </Col>
                  <Col span="3">
                    <strong>Size</strong>
                  </Col>
                  <Col span="3">
                    <strong>Price</strong>
                  </Col>
                  <Col span="3">
                    <strong>Quantity</strong>
                  </Col>
                </Row>
              </card>
              <div v-for="product in products">
                <card style="margin-top:5px;">
                  <Row style="height:30px;line-height:30px; text-align: center">
                    <Col span="4">
                      <h2>{{product.pid}}</h2>
                    </Col>
                    <Col span="4">
                      <p>{{product.pType}}</p>
                    </Col>
                    <Col span="3">
                      <p>{{product.color}}</p>
                    </Col>
                    <Col span="3">
                      <p>{{product.size}}</p>
                    </Col>
                    <Col span="3">
                      <p>{{product.price}}</p>
                    </Col>
                    <Col span="3">
                      <p>{{product.count}}</p>
                    </Col>
                    <Col span="2">
                      <Button @click="toEditProduct(product)">Edit</Button>
                    </Col>
                    <Col span="2">
                      <Button type="error" @click="delectProduct(product)">Delete</Button>
                    </Col>
                  </Row>
                </card>
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
                    <p>Product Name:</p>
                  </Col>
                  <Col span="15" offset="1">
                    <Input placeholder="Enter name" v-model="productName"/>
                  </Col>
                </Row>
                <Row style="margin-top: 20px;">
                  <Col span="8" style="text-align:right">
                    <p>Product Type:</p>
                  </Col>
                  <Col span="15" offset="1">
                    <RadioGroup v-model="productType">
                      <Radio label="backpack"></Radio>
                      <Radio label="shoulderBag"></Radio>
                    </RadioGroup>
                  </Col>
                </Row>
                <Row style="margin-top:20px;">
                  <Col span="8" style="text-align:right">
                    <p>Product Color:</p>
                  </Col>
                  <Col span="15" offset="1">
                    <Select v-model="productColor" placeholder="Select a color">
                      <Option value="red">Red</Option>
                      <Option value="blue">Blue</Option>
                      <Option value="green">Green</Option>
                      <Option value="yellow">Yellow</Option>
                      <Option value="white">White</Option>
                      <Option value="black">Black</Option>
                    </Select>
                  </Col>
                </Row>
                <Row style="margin-top:20px;">
                  <Col span="8" style="text-align:right">
                    <p>Product Size:</p>
                  </Col>
                  <Col span="15" offset="1">
                    <RadioGroup v-model="productSize">
                      <Radio label="big"></Radio>
                      <Radio label="medium"></Radio>
                      <Radio label="small"></Radio>
                    </RadioGroup>
                  </Col>
                </Row>
                <Row style="margin-top:20px;">
                  <Col span="8" style="text-align:right">
                    <p>Product Price:</p>
                  </Col>
                  <Col span="15" offset="1">
                    <Input placeholder="Enter price" v-model="productPrice" Number="true"/>
                  </Col>
                </Row>
                <Row style="margin-top:20px;">
                  <Col span="8" style="text-align:right">
                    <p>Product Quantity:</p>
                  </Col>
                  <Col span="15" offset="1">
                    <Input placeholder="Enter quantity" v-model="productQuantity" Number="true"/>
                  </Col>
                </Row>
                <Row style="margin-top:20px;">
                  <Col span="15" offset="9">
                    <div style="margin-top:30px;"></div>
                    <div v-if="isShowSubmitbutton==0">
                      <Button type="primary" @click="createNewProduct">Create</Button>
                    </div>
                    <div v-else>
                      <Button type="primary" @click="editProduct">Edit</Button>
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
  components: { },
  data() {
    return {
      isShow0: true,
      isShow1: false,
      pageJump: "",
      productId: null,
      productName: "",
      productType: "backpack",
      productColor: "",
      productSize: "big",
      productPrice: 0,
      productQuantity: 0,
      productImgUrl: "xxx",
      products: {},
      isShowSubmitbutton: 0,
      isName: false,
      re: /^[1-9]+[0-9]*]*$/
    };
  },
  methods: {
    toAddProduct: function() {
      this.isShowSubmitbutton = 0;
      this.isName = false;
      this.isShow0 = false;
      this.isShow1 = true;
    },
    toEditProduct: function(product) {
      this.productId = product.id;
      this.productName = product.pid;
      this.productType = product.pType;
      this.productColor = product.color;
      this.productSize = product.size;
      this.productPrice = product.price;
      this.productQuantity = product.count;
      this.isShowSubmitbutton = 1;
      this.isName = true;
      this.isShow0 = false;
      this.isShow1 = true;
    },
    goBack: function() {
      (this.productId = null),
        (this.productName = ""),
        (this.productType = "backpack"),
        (this.productColor = ""),
        (this.productSize = "big"),
        (this.productPrice = 0),
        (this.productQuantity = 0),
        (this.isShow0 = true);
      this.isShow1 = false;
    },
    async createNewProduct() {
      if (
        this.productName == "" ||
        this.productColor == "" ||
        this.productPrice == "" ||
        this.re.test(this.productPrice) == false ||
        this.productPrice < 0 ||
        this.productQuantity == "" ||
        this.re.test(this.productQuantity) == false ||
        this.productQuantity < 0 ||
        this.productImgUrl == ""
      ) {
        alert("Input Data error!");
      } else {
        var that = this;
        var newProduct = {
          pid: that.productName,
          img: that.productImgUrl,
          pType: that.productType,
          color: that.productColor,
          size: that.productSize,
          price: that.productPrice,
          count: that.productQuantity
        };
        await this.axios
          .post("http://localhost:1337/product/create", newProduct)
          .then(function(response) {
            console.log(response.data.product);
            that.getProductList().then(res => {
              console.log("here in create");
              that.$Message.success("Success!");
              that.goBack();
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    async editProduct() {
      if (
        this.productName == "" ||
        this.productColor == "" ||
        this.productPrice == "" ||
        this.re.test(this.productPrice) == false ||
        this.productPrice < 0 ||
        this.productQuantity == "" ||
        this.re.test(this.productQuantity) == false ||
        this.productQuantity < 0 ||
        this.productImgUrl == ""
      ) {
        alert("Input Data error!");
      } else {
        var that = this;
        var updateProduct = {
          id: that.productId,
          pid: that.productName,
          img: that.productImgUrl,
          pType: that.productType,
          color: that.productColor,
          size: that.productSize,
          price: that.productPrice,
          count: that.productQuantity
        };
        await this.axios
          .post("http://localhost:1337/product/update", updateProduct)
          .then(function(response) {
            console.log("here");
            that.getProductList().then(res => {
              console.log("here in edit");
              that.$Message.success("Success!");
              that.goBack();
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    async getProductList() {
      var that = this;
      await this.axios
        .get("http://localhost:1337/product/show")
        .then(function(response) {
          that.products = response.data.products;
          console.log(that.products);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async delectProduct(product) {
      var that = this;
      await this.axios
        .post("http://localhost:1337/product/delete", product)
        .then(function(response) {
          that.getProductList().then(res => {
              console.log("here in edit");
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
    this.getProductList();
  }
};
</script>

