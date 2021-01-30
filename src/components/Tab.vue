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
}

/* Change background color of buttons on hover */
button:hover {
  background-color: #ddd;
}

/* Create an active/current tablink class */
button.active {
  background-color: #ccc;
}



</style>




