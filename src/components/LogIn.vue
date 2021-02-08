<template>
  <it-button @click="drawerVisible = true" type="primary">
    Right drawer
  </it-button>

  <it-drawer v-model="drawerVisible">
    <h3 style="margin: 24px">
      <it-icon box name="account_circle" />
      Log in
    </h3>
    <it-divider />

    <div>
      <div>
        <p style="font-weight: 500">{{ name }}</p>
      </div>
    </div>
    <it-divider />
  </it-drawer>
</template>

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
