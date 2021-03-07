<template>
  <div class="clock">
    <div class="day">{{ day }}</div>
    {{ month }} {{ year }} <br />{{ hours }}:{{ minutes }} <br />
    {{ dayOfWeek }}
  </div>
</template>

<script>
export default {
  name: "Clock",

  props: {},
  data: () => {
    return {
      dayOfWeek: null,
      day: null,
      month: null,
      year: null,
      hours: null,
      minutes: null,
    };
  },
  created() {
    let days = [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ];
    let months = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    let myDate = new Date();
    this.dayOfWeek = days[myDate.getDay()];
    this.month = months[myDate.getMonth()];
    this.year = myDate.getFullYear();
    this.day = myDate.getDate();
    this.hours = myDate.getHours();
    this.minutes = myDate.getMinutes();

    setInterval(() => {
      let myDate = new Date();
      this.dayOfWeek = days[myDate.getDay()];
      this.month = months[myDate.getMonth()];
      this.year = myDate.getFullYear();
      this.day = myDate.getDate();
      this.hours = myDate.getHours();
      this.minutes = myDate.getMinutes();
    }, 1000);
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.day {
  font-size: 34px;
}
.clock {
  float: left;
  font-size: 15px;
  color: white;
  border-bottom: 3px solid white;
  z-index: 1;
}
</style>
