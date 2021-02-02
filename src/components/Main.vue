<template>
<div class="wrapper">

  <Loading v-if='isLoading'/>
  <div v-if='err'>{{err}} </div>
  <div v-if='!isLoading'>
    <Tabs :tabs='AreasNames' @changeArea='changeArea'/>
    <div class='tables'>
      <Table @takeTable='takeTable' :value='table.number' :persons='table.q_seats' :takenp='table.taken'  v-for='table in AcitveTables'
              :key='table.id' :id='table.id' />
             
    </div>
  </div>
</div>
</template>

<script>

import Table from './Table.vue';
import Tabs from './Tabs.vue';
import axios from 'axios';
import Loading from './Loading.vue';

export default {
  name: 'Main',
  components:{
      Table, Loading, Tabs
  },
  props: {
  }, 
  data: () => {return {
      tables: null,
      xtoken:'',
      bearer:'',
      isLoading:true,
      areas: null,
      idArea: null,
      tablesSelected:[],
      err: null
  }},
  beforeCreate()
  {

  },
  computed:
  {
      AcitveTables()
      {
          return this.tables.filter(el =>  { return (this.idArea === null || el.aria_id === this.idArea);} );
      },
      AreasNames()
      {
          return this.areas.map(el => ({origname:el.origname, id:el.id}));
      }
  },
  created()
  {
    
    axios.post("https://www.re-check.com:8080/login",
 {jsonrpc:"2.0", method: "jwt", params:[ {"login":"12345", client:"{0DA6EA6D-CC7D-4EBA-A989-9293923BDE1E}", pwd:"NTQzMjE="}], id:4})
    .then((data) => {
      console.log(data.data.result);
    
      let tables = data.data.result;
      console.log(tables["X-token"]);
      this.xtoken = tables["X-token"];
      this.bearer = tables.bearer; 

      axios.post(tables.url + '/menu', {version:"1.0", method: "table.list", params: null},
         { headers:{
          "Content-Type": "application/json",
          'Accept' : 'application/json',
          'Authentication': 'bearer ' + tables.bearer,
          'x-token': tables["X-token"]
        }}
      ).then((data) =>{
            console.log(data);
            this.tables = data.data.result.tables.filter(el => {el.taken = 0; return el});
            this.isLoading = false;
            this.areas = data.data.result.areas;
          }).catch((err) => {
            this.err = err;
          });


    });
  },
  methods:{
            
      changeArea(id)
      {
          console.log(id);
          this.idArea = id;
      },
      takeTable(id, taken)
      {
          this.tables = this.tables.filter(el => {if(id === el.id)el.taken = taken; return el});
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

.tables 
{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width:85%;
    margin:0 auto;

}

.wrapper 
{
  width:850px;
}
@media only screen and (max-width: 910px) {
  .wrapper {
    width:600px;
  }

}

@media only screen and (max-width: 610px){
  .wrapper {
    width:250px;
  }
  
}
@media only screen and (max-width: 700px){
  .wrapper {
    width:400px;
  }
  
}

</style>
