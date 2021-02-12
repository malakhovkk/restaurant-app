<template>
  <!-- <div class="mid">
    <it-button
      :style="{
        'font-size': '50px',
        padding: '25px',
        position: 'fixed',
        top: '50%',
        left: '50%',
      }"
      @click="signinModal = true"
      type="primary"
      >Войти</it-button
    >
  </div> -->

  <it-modal v-model="signinModal">
    <template #body>
      <div class="signupmodal">
        <h2>Войти</h2>

        <it-input
          class="input"
          labelTop="Username"
          prefix-icon="account_circle"
          placeholder="Username"
          v-model="username"
        />
        <it-input
          class="input"
          labelTop="Password"
          prefix-icon="lock"
          type="password"
          placeholder="Password"
          v-model="pwd"
        />
        <it-button
          block
          size="big"
          type="primary"
          @click="
            // (signinModal = false),
            // $emit('submit', username, pwd),
            submit(username, pwd)
          "
          >Войти</it-button
        >
      </div>
    </template>
  </it-modal>
</template>

<style>
.mid {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 50px;
  padding: 25px;
}
.input {
  margin-bottom: 10px;
}
.right {
  position: absolute;
  top: 20px;
  right: 20px;
}
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.half {
  height: 50vh;
}
</style>
<script>
var base64 = require("base-64");

export default {
  emits: ["submit"],
  name: "LogIn",
  beforeCreate() {
    console.log(localStorage.url);
    if (localStorage.url)
      this.$router.push({
        path: "/main",
      });
  },
  methods: {
    async submit(user, pwd) {
      console.log(user, pwd);
      this.login = user;
      this.client = "{0DA6EA6D-CC7D-4EBA-A989-9293923BDE1E}";
      this.pwd = base64.encode(pwd);
      console.log(base64.encode(pwd));
      //this.xtoken = "";
      await fetch("https://www.re-check.com:8080/login", {
        method: "post",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "jwt",
          params: [
            {
              login: this.login,
              client: this.client,
              pwd: this.pwd,
            },
          ],
          id: 4,
        }),
      })
        .then((data) => data.json())
        .then(async (data) => {
          console.log(data.result);
          let tables = data.result;
          console.log(this);

          this.bearer = tables.bearer;
          this.xtoken = tables["X-token"];
          console.log(this);
          //tables.url = "http://192.168.1.11:5000";
          this.url = tables.url;

          this.$router.push({
            name: "Main",
            params: {
              xtoken: this.xtoken,
              bearer: this.bearer,
              url: this.url,
              login: this.login,
              client: this.client,
            },
          });
        })
        .catch((err) => {
          console.log(err);
          this.$Message.danger({ text: "Failed" });
        });

      console.log(this);
      console.log("a");
      console.log(this.xtoken);
      console.log("Locks");
    },
  },
  data() {
    return {
      name: "John Silver",
      signinModal: true,
      username: "12345",
      pwd: "54321",
      login: null,
      client: null,
      bearer: null,
      xtoken: null,
      url: null,
      tables: null,
    };
  },
};
</script>
