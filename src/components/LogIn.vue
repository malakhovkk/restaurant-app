<template>
  <div class="mid">
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
          @click="(signinModal = false), $emit('submit', username, pwd)"
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
