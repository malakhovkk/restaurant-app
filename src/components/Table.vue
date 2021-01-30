<template>
  <div @click="take()" :class="[{'table--taken':taken === 1,'table--free':taken === 0, 'table--selected':taken === 2}, , 'b']">
    <div class='table'>{{value}}  </div> 
    <div class='persons'>{{persons}}</div>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: ['value','persons','takenp','id'], 
  data()  {
      return {
      taken: this.takenp

  }},
        created()
      {
          console.log(this.taken);
      },
  methods:{
      take()
      {
          //console.log(1);
          if(this.taken === 0) this.taken = 2;
          else if(this.taken === 2) this.taken = 0;
          this.$emit('takeTable', this.id, this.taken);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap');s
.table
{
    border: none;
    outline: none;
    position: relative;
    padding-top: 20px;
}
.persons{
    position: absolute;
    right:10px;
    bottom:10px;
    font-size:16px;
}
.persons:after
{
    content:url('../../public/images/profile2.jpg');

    bottom:-4px;
    right:18px;
    position:absolute;
}
.b
{
    width:100px;
    height: 100px;
    border-radius:6px;
    position: relative;
    border:2px solid gray;
    margin:5px;
    cursor:pointer;
    font-family: 'Oswald', sans-serif;
    font-size: 20px;
    font-weight: bold;
    box-sizing: border-box;
}
@keyframes move {
  0% {box-shadow: 0px 0px 0px 0px #ccc;}
  100% {box-shadow:         3px 3px 5px 6px #ccc;}
}

.b:hover
{
    animation: move 2s infinite;
}
.table--taken 
{
    border:2px solid red;
}
.table--free 
{
    border:2px solid green;
}
.table--selected
{
    border:4px solid gray;
}
</style>
