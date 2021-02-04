<template>
  <input type="text" :value="task" @input="task = $event.target.value" />
  <button @click="increase">+</button>
  <ul>
    <li v-for="(name, index) in names" :key="`${index}`">
      {{ name }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'HelloWorld',

  props: {
    msg: String,
  },
  data: () => {
    return {
      counter: 0,
      names: [],
      task: '',
    }
  },
  methods: {
    increase() {
      this.names.push(this.task)
      this.task = ''
    },
    decrease() {
      this.counter--
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
