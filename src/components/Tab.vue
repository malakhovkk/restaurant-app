<template>
    <button>{{value}}</button>
</template>

<script>

export default {
  name: 'Tab',
  props: ['value']
}
</script>

<style scoped>
/* Style the buttons inside the tab */
button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
  background-color: #eae7e7;
  margin-left: 10px;
  border-radius: 5px;
  color: #7d7070;
}


</style>




