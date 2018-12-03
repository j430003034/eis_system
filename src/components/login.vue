<template>
  <div style="background-color:#e5eff2; height: 1080px; width: 1920px;">
    <h1 style="text-align:center;font-size:350px;color:#cbd7db">THE BAG COMPANY</h1>
    <card style="padding: 70px;position:absolute; left:30%; top:30%;">
      <h2 style="margin-bottom:10px;">LOGIN</h2>
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="user">
          <Input type="text" v-model="formInline.username" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" placeholder="Password">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')">Login</Button>
        </FormItem>
      </Form>
    </card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        username: "",
        password: ""
      },
      ruleInline: {
        username: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    async handleSubmit(name) {
      var that = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          this.axios
            .post("http://localhost:1337/user/login", this.formInline)
            .then(function(response) {
              that.$router.push({
                name: "Index"
              });
              that.$cookieStore.setCookie(
                "username",
                that.formInline.username,
                172800
              );
              console.log(that.$cookieStore.getCookie("username"));
              that.$Message.success("Success!");
              that.$router.push({
                name: "Index"
              });
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>
