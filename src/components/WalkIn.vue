<template>
  <div class="background"></div>
  <div class="form">
    <div class="wrapper">
      <div class="title">Walk-in</div>

      <div class="time">Время: {{ hours }} : {{ minutes }}</div>
      <div class="tables">
        Столы:
        <it-tag v-for="table in tables" class="tables" :key="table">
          {{ table }}</it-tag
        >
      </div>
      E-mail: <it-input v-model="email" /> Имя:
      <it-input v-model="name" /> Телефон:
      <it-input v-model="phone" /> Информация:
      <it-textarea v-model="info"></it-textarea>
      <it-number-input label-top="Кол-во людей:" v-model="amountOfPeople">
      </it-number-input>
      <br />
      Время:
      <it-select v-model="time" :options="exampleOptions" />
      <br />
      <br />
      <div class="res">
        <it-button @click="cancel()" size="normal" class="cancel"
          >Отменить</it-button
        >
        <it-button type="success">Walk-In</it-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Clock",
  props: ["tables"],
  data: () => {
    return {
      dayOfWeek: null,
      day: null,
      month: null,
      year: null,
      hours: null,
      minutes: null,
      amountOfPeople: 0,
      email: "",
      phone: "",
      name: "",
      info: "",
      time: "01:00",
      exampleOptions: [
        "00:30",
        "01:00",
        "01:30",
        "02:00",
        "02:30",
        "03:00",
        "03:30",
        "04:00",
        "04:30",
        "05:00",
        "05:30",
        "06:00",
        "06:30",
        "07:00",
      ],
    };
  },
  watch: {
    amountOfPeople: function (_new) {
      if (_new < 0) this.amountOfPeople = 0;
    },
  },
  created() {
    console.log(this.tables);
    let date = new Date();
    this.minutes = date.getMinutes();
    this.hours = date.getHours();
  },
  computed: {},
  methods: {
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form {
  border: 1px solid grey;
  background: white;
  padding: 10px 15px;
  position: absolute;
  top: 25%;
  right: 25%;
  z-index: 1000;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
.title {
  font-size: 24px;
  text-align: center;
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.35;
  width: 100%;
  height: 100%;
  z-index: 999;
  backdrop-filter: blur(10px);
}
.form {
  width: 300px;
  text-align: left;
  box-sizing: border-box;
}
.tables {
  margin-right: 5px;
}
.wrapper {
}
.res {
  display: flex;
  flex-direction: row;
}
.cancel {
  margin-right: 10px;
}
</style>
