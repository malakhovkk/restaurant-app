<template>
  <div
    @click="take()"
    :class="[
      {
        'table--taken': takenp === 1,
        'table--free': takenp === 0,
        'table--selected': takenp === 2,
        'table--locked': takenp === 3,
      },
      ,
      'b',
    ]"
  >
    <div class="table">{{ value }}</div>
    <div class="persons">{{ persons }}</div>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: ["value", "persons", "takenp", "id"],
  data() {
    return {};
  },
  created() {},
  methods: {
    take() {
      //console.log(1);
      if (this.takenp === 0) {
        console.log(11111);
        this.$emit("takeTable", this.id, 2);
      } else if (this.takenp === 2) {
        console.log(22222);
        this.$emit("close", this.id);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table {
  border: none;
  outline: none;
  position: relative;
  padding-top: 10px;
}
.persons {
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 16px;
}
.persons::after {
  content: "";
  height: 20px;
  width: 20px;
  background-image: url(../../public/images/profile.png);
  bottom: 0px;
  right: 18px;
  position: absolute;
  background-size: cover;
}
.b {
  width: 100px;
  height: 100px;
  border-radius: 6px;
  position: relative;
  margin: 5px;
  cursor: pointer;
  font-family: "Oswald", sans-serif;
  font-size: 20px;
  font-weight: bold;
  box-sizing: border-box;
  box-shadow: 3px 3px 6px 1px #ccc;
  background-size: cover;
  color: white;
}

.table--taken {
}
.table--free {
  background-image: linear-gradient(to bottom left, #49d84e, #40c750, #3f9a42);
}
.table--selected {
  background-image: linear-gradient(to bottom left, #e14eca, #b641f9, #e14eca);
}
.table--locked {
  background-image: linear-gradient(to bottom left, #49d84e, #40c750, #3f9a42);
}
.table--locked::after {
  content: "";
  height: 20px;
  width: 20px;
  background-image: url(../../public/images/lock.png);
  top: 5px;
  right: 5px;
  position: absolute;
  background-size: cover;
}
@media only screen and (max-width: 500px) {
  .b {
    width: 65px;
    height: 65px;
  }
  #nav {
    font-size: 15px;
  }
}
</style>
