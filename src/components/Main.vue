<template>
  <div :class="{ wrapper: true, blur: loggedin }">
    <it-progressbar class="loading" v-if="isLoading" infinite />
    <div v-if="err">{{ err }}</div>
    <div v-if="!isLoading">
      <Tabs :tabs="AreasNames" @changeArea="changeArea" />
      <div class="tables">
        <Table
          @takeTable="takeTable"
          @close="close"
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
<style scoped>
.loading {
  margin-top: 50vh;
}
</style>
<script>
import Table from "./Table.vue";
import SelectedTable from "./SelectedTable.vue";
import Tabs from "./Tabs.vue";
import axios from "axios";
//import Loading from "./Loading.vue";

let evtSource;
let count = 0;

function sseFunction(event) {
  console.log(event.data, count, event.data['"current"']);
  let result = JSON.parse(event.data);
  console.log(result);
  console.log(this);
  this.tables = this.tables.map((el) => {
    if (result.current.includes(el.id)) el.taken = 2;
    else el.taken = 0;
    return el;
  });
}

export default {
  name: "Main",
  components: {
    Table,
    Tabs,
    SelectedTable,
  },
  props: {},
  data: () => {
    return {
      tables: [],
      xtoken: "",
      bearer: "",
      isLoading: true,
      areas: null,
      idArea: null,
      tablesSelected: [],
      err: null,
      login: null,
      pwd: null,
      loggedin: false,
      listening: true,
      url: "https://www.re-check.com:5000/tables/",
    };
  },
  beforeCreate() {},
  computed: {
    ActiveTables() {
      console.log(19);
      this.tables.forEach((el) => {
        if (el.id === 2) console.log(el.taken);
      });
      return this.tables.filter((el) => {
        return this.idArea === null || el.aria_id === this.idArea;
      });
    },
    AreasNames() {
      return this.areas.map((el) => ({ origname: el.origname, id: el.id }));
    },
    SelectedTables() {
      console.log(this.tables.filter((el) => el.taken === 2));
      return this.tables.filter((el) => el.taken === 2);
    },
  },
  async created() {
    //axios.defaults.withCredentials = true;

    document.addEventListener(
      "visibilitychange",
      this.handleVisibilityChange,
      false
    );
    this.login = "12345";
    this.client = "{0DA6EA6D-CC7D-4EBA-A989-9293923BDE1E}";
    this.pwd = "NTQzMjE=";
    this.xtoken = "";
    await axios
      .post("https://www.re-check.com:8080/login", {
        jsonrpc: "2.0",
        method: "jwt",
        params: [
          {
            login: this.login,
            client: this.client,
            pwd: this.pwd,
          },
        ],
        id: 4,
      })
      .then((data) => {
        console.log(data.data.result);

        let tables = data.data.result;
        //console.log(tables["X-token"]);

        this.bearer = tables.bearer;
        this.xtoken = tables["X-token"];
        console.log(this.xtoken);
        axios
          .post(
            tables.url + "/menu",
            { version: "1.0", method: "table.list", params: null },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authentication: "bearer " + tables.bearer,
                "x-token": tables["X-token"],
              },
            }
          )
          .then((data) => {
            console.log(data);
            this.tables = data.data.result.tables.filter((el) => {
              el.taken = 0;
              return el;
            });
            this.isLoading = false;
            this.areas = data.data.result.areas;
          })
          .catch((err) => {
            //this.err = err;
            console.log(err);
          });
      })
      .catch((err) => {
        this.err = err;
      });

    console.log(this);
    console.log("a");
    console.log(this.xtoken);
    this.getConnection(this);
    console.log("Locks");
  },
  onBeforeUnmount() {
    //if(this.listening) evtSource.removeEventListener("locks", sseFunction, false)
    //evtSource.removeEventListener("locks", sseFunction, false)
    //evtSource.close();
  },
  methods: {
    getConnection(self) {
      evtSource = new EventSource(
        `https://www.re-check.com:5000/sse/tables?clientid=${this.client}&user=${this.login}&x-token=${this.xtoken}`
      );

      evtSource.addEventListener("locks", sseFunction.bind(self), false);
    },
    handleVisibilityChange() {
      console.log(document.visibilityState);
      if (document.visibilityState == "hidden") {
        //evtSource.removeEventListener("locks", sseFunction.bind(this), false);
        evtSource.close();
      } else {
        this.getConnection(this);
      }
    },
    submit() {},
    close(id) {
      axios
        .post(this.url + "unlock/" + id, "", {
          headers: {
            Authentication: "bearer " + this.bearer,
            "x-token": this.xtoken,
          },
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log(err));

      this.tables = this.tables.map((el) => {
        if (el.taken === 2 && el.id === id) {
          el.taken = 0;
          console.log(el);
        }
        return el;
      });
    },
    changeArea(id) {
      console.log(id);
      this.idArea = id;
    },
    takeTable(id, taken) {
      console.log(10);
      axios
        .post(this.url + "lock/" + id, "", {
          headers: {
            Authentication: "bearer " + this.bearer,
            "x-token": this.xtoken,
          },
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log(err));

      this.tables = this.tables.map((el) => {
        if (id === el.id) {
          el.taken = taken;
          console.log(id);
        }
        return el;
      });
    },
  },
};
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
  width: 85%;
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
