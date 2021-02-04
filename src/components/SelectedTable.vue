<template>
  <div class="table--selected b">
    <div class="image" @click="close()">
      <img src="images/exit.png" />
    </div>
    <div class="table">{{ value }}</div>
    <div class="persons">{{ persons }}</div>
  </div>
</template>

<script>
export default {
  name: 'SelectedTable',
  props: ['value', 'persons', 'id'],
  data() {
    return {}
  },
  created() {
    //  console.log(this.taken);
  },
  methods: {
    close() {
      this.$emit('close', this.id)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.image {
  z-index: 1;
  width: 15px;
  height: 15px;
  position: absolute;
  top: -5px;
  right: 5px;
  cursor: pointer;
}
img {
  width: 100%;
  z-index: 0;
}
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
  content: '';
  height: 20px;
  width: 20px;
  background-image: url(../../public/images/profile.png);
  bottom: 0px;
  right: 18px;
  position: absolute;
  background-size: cover;
}
.b {
  width: 80px;
  height: 80px;
  border-radius: 6px;
  position: relative;
  margin: 5px;
  cursor: pointer;
  font-family: 'Oswald', sans-serif;
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
  position: relative;
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
