<template>
  <div class="background"></div>
  <div :class="[{ outAll: canceled }, 'content_all']">
    <div class="form">
      <div class="wrapper">
        <div class="title">Walk-in</div>

        <div class="time">Текущее время: {{ hours }}:{{ minutes }}</div>
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
      canceled: false,
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
@keyframes swing {
  20% {
    transform: rotate3d(0, 0, 1, 15deg);
  }

  40% {
    transform: rotate3d(0, 0, 1, -10deg);
  }

  60% {
    transform: rotate3d(0, 0, 1, 5deg);
  }

  80% {
    transform: rotate3d(0, 0, 1, -5deg);
  }

  to {
    transform: rotate3d(0, 0, 1, 0deg);
  }
}

@keyframes slideInRight {
  from {
    transform: translate3d(200%, 0, 0);
    width: 0;
    visibility: visible;
    opacity: 0;
    overflow: hidden;
  }

  to {
    width: 300px;
    transform: translate3d(0, 0, 0);
    opacity: 1;
    overflow: hidden;
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
    overflow: hidden;
  }

  to {
    opacity: 1;
    overflow: hidden;
    transform: translate3d(0, 0, 0);
  }
}

.form {
  border: 1px solid grey;
  background: white;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  padding: 10px 15px;
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
.content_all {
  animation: slideInRight 1s;
  width: 300px;
  overflow: visible;
  position: absolute;
  top: 10%;
  right: 25%;
  z-index: 1000;
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
