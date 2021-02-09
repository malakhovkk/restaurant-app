<template>
  <div class="container">
    <div class="right">
      <it-button @click="signinModal = true" type="primary">Войти</it-button>
    </div>
  </div>
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
            $Message.success({ text: 'Welcome' }),
              (signinModal = false),
              $emit('submit', username, pwd)
          "
          >Войти</it-button
        >
      </div>
    </template>
  </it-modal>
</template>

<style>
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
export default {
  emits: ["submit"],
  name: "LogIn",
  data() {
    return {
      name: "John Silver",
      signinModal: false,
      username: "12345",
      pwd: "54321",
    };
  },
};
</script>
