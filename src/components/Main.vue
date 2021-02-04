<template>
  <div :class="{wrapper, blur: loggedin}">
    <Loading v-if="isLoading" />
    <div v-if="err">{{ err }}</div>
    <div v-if="!isLoading">
      <Tabs :tabs="AreasNames" @changeArea="changeArea" />
      <div class="tables">
        <Table
          @takeTable="takeTable"
          :value="table.number"
          :persons="table.q_seats"
          :takenp="table.taken"
          v-for="table in ActiveTables"
          :key="table.id"
          :id="table.id"
        />
      </div>
      <div class="selected">
        <SelectedTable
          @close="close"
          :value="table.number"
          :persons="table.q_seats"
          v-for="table in SelectedTables"
          :key="table.id"
          :id="table.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Table from './Table.vue'
import SelectedTable from './SelectedTable.vue'
import Tabs from './Tabs.vue'
import axios from 'axios'
import Loading from './Loading.vue'

export default {
  name: 'Main',
  components: {
    Table,
    Loading,
    Tabs,
    SelectedTable,
  },
  props: {},
  data: () => {
    return {
      tables: [],
      xtoken: '',
      bearer: '',
      isLoading: true,
      areas: null,
      idArea: null,
      tablesSelected: [],
      err: null,
      login: null,
      pwd: null,
      loggedin: false,
      url: 'https://www.re-check.com:5000/tables/',
    }
  },
  beforeCreate() {},
  computed: {
    ActiveTables() {
      console.log(19)
      this.tables.forEach((el) => {
        if (el.id === 2) console.log(el.taken)
      })
      return this.tables.filter((el) => {
        return this.idArea === null || el.aria_id === this.idArea
      })
    },
    AreasNames() {
      return this.areas.map((el) => ({origname: el.origname, id: el.id}))
    },
    SelectedTables() {
      console.log(this.tables.filter((el) => el.taken === 2))
      return this.tables.filter((el) => el.taken === 2)
    },
  },
  created() {
    //axios.defaults.withCredentials = true;
    axios
      .post('https://www.re-check.com:8080/login', {
        jsonrpc: '2.0',
        method: 'jwt',
        params: [
          {
            login: '12345',
            client: '{0DA6EA6D-CC7D-4EBA-A989-9293923BDE1E}',
            pwd: 'NTQzMjE=',
          },
        ],
        id: 4,
      })
      .then((data) => {
        console.log(data.data.result)

        let tables = data.data.result
        console.log(tables['X-token'])
        this.xtoken = tables['X-token']
        this.bearer = tables.bearer

        axios
          .post(
            tables.url + '/menu',
            {version: '1.0', method: 'table.list', params: null},
            {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authentication: 'bearer ' + tables.bearer,
                'x-token': tables['X-token'],
              },
            }
          )
          .then((data) => {
            console.log(data)
            this.tables = data.data.result.tables.filter((el) => {
              el.taken = 0
              return el
            })
            this.isLoading = false
            this.areas = data.data.result.areas
          })
          .catch((err) => {
            //this.err = err;
            console.log(err)
          })
      })
      .catch((err) => {
        this.err = err
      })
  },
  methods: {
    submit() {},
    close(id) {
      axios
        .post(this.url + 'unlock/' + id, '', {
          headers: {
            Authentication: 'bearer ' + this.bearer,
            'x-token': this.xtoken,
          },
        })
        .then((data) => {
          console.log(data)
        })
        .catch((err) => console.log(err))

      this.tables = this.tables.map((el) => {
        if (el.taken === 2 && el.id === id) {
          el.taken = 0
          console.log(el)
        }
        return el
      })
    },
    changeArea(id) {
      console.log(id)
      this.idArea = id
    },
    takeTable(id, taken) {
      console.log(10)
      axios
        .post(this.url + 'lock/' + id, '', {
          headers: {
            Authentication: 'bearer ' + this.bearer,
            'x-token': this.xtoken,
          },
        })
        .then((data) => {
          console.log(data)
        })
        .catch((err) => console.log(err))

      this.tables = this.tables.map((el) => {
        if (id === el.id) {
          el.taken = taken
          console.log(id)
        }
        return el
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.blur {
  filter: blur(5px);
}
.reserved {
  width: 100%;
}
.selected {
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.tables {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 85%;
  max-height: 70vh;
  overflow: scroll;
}

.wrapper {
  position: relative;
  width: 850px;
}
@media only screen and (max-width: 910px) {
  .wrapper {
    width: 600px;
  }
}

@media only screen and (max-width: 610px) {
  .wrapper {
    width: 250px;
  }
}
@media only screen and (max-width: 700px) {
  .wrapper {
    width: 400px;
  }
}

@media only screen and (max-width: 500px) {
  .wrapper {
    width: 100%;
  }
}
</style>

}
