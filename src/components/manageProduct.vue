<template>
  <Content :style="{padding: '0 50px'}">
    <Breadcrumb :style="{margin: '20px 0'}">
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Product</BreadcrumbItem>
    </Breadcrumb>
    <Card>
      <div style="min-height: 700px;">
        <div v-show="isShow0">
          <Button type="primary" @click="toAddProduct">Add Product</Button>
        </div>
        <div v-show="isShow1">
          <Row>
            <Col span="4">
              <Button shape="circle" icon="ios-arrow-back" @click="goBack"></Button>
            </Col>
            <Col span="10">
              <div>
                <Row style="margin-top:30px;">
                  <Col span="8" style="text-align:right">
                    <p>Product Name:</p>
                  </Col>
                  <Col span="15" offset="1">
                    <Input placeholder="Enter name" v-model="productName" style="width: 200px"/>
                  </Col>
                </Row>
                <Row style="margin-top:10px;">
                  <Col span="8" style="text-align:right">
                    <p>Product Type:</p>
                  </Col>
                  <Col span="15" offset="1">
                    <RadioGroup v-model="productType" vertical>
                      <Radio label="backpack"></Radio>
                      <Radio label="shoulderBag"></Radio>
                    </RadioGroup>
                  </Col>
                </Row>
                <Row style="margin-top:10px;">
                  <Col span="8" style="text-align:right">
                    <p>Product Color:</p>
                  </Col>
                  <Col span="15" offset="1">
                    <Select v-model="productColor" style="width:200px" placeholder="Select a color">
                      <Option value="red">Red</Option>
                      <Option value="blue">Blue</Option>
                      <Option value="green">Green</Option>
                      <Option value="yellow">Yellow</Option>
                      <Option value="white">White</Option>
                      <Option value="black">Black</Option>
                    </Select>
                  </Col>
                </Row>
                <Row style="margin-top:10px;">
                  <Col span="8" style="text-align:right">
                    <p>Product Size:</p>
                  </Col>
                  <Col span="15" offset="1">
                    <RadioGroup v-model="productSize" vertical>
                      <Radio label="big"></Radio>
                      <Radio label="medium"></Radio>
                      <Radio label="small"></Radio>
                    </RadioGroup>
                  </Col>
                </Row>
                <Row style="margin-top:10px;">
                  <Col span="8" style="text-align:right">
                    <p>Product Price:</p>
                  </Col>
                  <Col span="15" offset="1">
                    <Input
                      placeholder="Enter price"
                      v-model="productPrice"
                      style="width: 200px"
                      Number="true"
                    />
                  </Col>
                </Row>
                <Row style="margin-top:10px;">
                  <Col span="8" style="text-align:right">
                    <p>Product Quantity:</p>
                  </Col>
                  <Col span="15" offset="1">
                    <Input
                      placeholder="Enter quantity"
                      v-model="productQuantity"
                      style="width: 200px"
                      Number="true"
                    />
                  </Col>
                </Row>
                <Row style="margin-top:10px;">
                  <Col span="8" style="text-align:right">
                    <p>Product Image:</p>
                  </Col>
                  <Col span="15" offset="1">
                    <Input
                      placeholder="Enter URL"
                      v-model="productImgUrl"
                      style="width: 200px"
                      Number="true"
                    />
                    <div style="margin-top:30px;"></div>
                    <Button type="primary" @click="createNewProduct">submit</Button>
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
import addProduct from "@/components/addProduct";
export default {
  name: "manageProduct",
  components: { addProduct },
  data() {
    return {
      isShow0: true,
      isShow1: false,
      pageJump: "",
      productName: "",
      productType: "backpack",
      productColor: "",
      productSize: "big",
      productPrice: 0,
      productQuantity: 0,
      productImgUrl: ""
    };
  },
  methods: {
    toAddProduct: function() {
      this.isShow0 = false;
      this.isShow1 = true;
    },
    toEditProduct: function(item) {
      this.isShow0 = false;
      this.isShow1 = true;
    },
    goBack: function() {
      this.isShow0 = true;
      this.isShow1 = false;
    },
    createNewProduct: function() {
      if (
        this.productName == "" ||
        this.productColor == "" ||
        this.productPrice == "" ||
        this.productPrice < 0 ||
        this.productQuantity == "" ||
        this.productQuantity < 0 ||
        this.productImgUrl == ""
      ) {
        alert("Input Data error!");
      } else {
        var that = this;
        console.log("in else");
        var newProduct = {
            pid: that.productName,
            img: that.productImgUrl,
            pType: that.productType,
            color: that.productColor,
            size: that.productSize,
            price: that.productPrice,
            count: that.productQuantity
        }
        this.axios
        .post("http://localhost:1337/product/create", newProduct)
          .then(function(response) {
            console.log(response.data.product);
            that.$Message.success("Success!")
            that.goBack()
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }
};
</script>

