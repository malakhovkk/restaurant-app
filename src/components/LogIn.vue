<template>
  <div class="container">
    <it-button class="right" @click="signinModal = true" type="primary"
      >Sign up</it-button
    >
  </div>
  <it-modal v-model="signinModal">
    <template #body>
      <div class="signupmodal">
        <h2>Sign up</h2>
        <it-input
          labelTop="Email"
          prefix-icon="email"
          type="email"
          placeholder="yourmail@gmail.com"
        />
        <div style="display: flex; flex-direction: row">
          <it-input style="flex: 1" labelTop="First Name" placeholder="John" />
          <it-input
            style="flex: 1; margin-left: 12px"
            labelTop="Second Name"
            placeholder="Doe"
          />
        </div>
        <it-input
          labelTop="Username"
          prefix-icon="account_circle"
          placeholder="Unique Username"
        />
        <it-input
          labelTop="Password"
          prefix-icon="lock"
          type="password"
          placeholder="Must have at least 6 characters"
        />
        <it-checkbox
          v-model="signincheckbox"
          label="I agree to our Terms of Service"
        />
        <it-button
          block
          size="big"
          type="primary"
          @click="$Message.success({ text: 'Welcome' }), (signinModal = false)"
          >Sign up</it-button
        >
      </div>
    </template>
  </it-modal>
  <style>
    .right {
      position: absolute;
      right: 0;

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
      name: "LogIn",
      data() {
        return {
          name: "John Silver",
          drawerVisible: false,
        };
      },
    };
  </script>
</template>
