<template>
<div class='tab'>
  <Tab :value='tab.origname' @click='changeArea(tab.id)' :class='{clicked:tab.id === selected}' v-for='tab in tabsAll' :key='tab.id' />
</div>
</template>

<script>

import Tab from './Tab.vue';

export default {
  name: 'Tabs',
  props: ['tabs'],
  components:{
    Tab
  },
  computed:
  {
      tabsAll()
      {
        return [{origname:'Все', id:null}, ...this.tabs];       
      }
  },
  data()
  {
      return{
          selected: null
      }
  },
  methods:
  {
      changeArea(id)
      {
          this.selected = id;
          this.$emit('changeArea',id);
      }
  },
  created()
  {
      console.log(this.tabs);
  }
}
</script>

<style scoped>
*{
    font-family: 'Oswald', sans-serif;
}
/* Style the tab */
.tab {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
  width:800px;
  margin:0 auto;
}
.clicked 
{
    background-color: #ddd;
}
</style>


