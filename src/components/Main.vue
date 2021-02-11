<template>
  <div :class="{ wrapper: true, blur: loggedin }">
    <!--  <it-progressbar class="loading" v-if="isLoading" infinite /> -->
    <!-- <div class="login" v-if="!login">
       <LogIn @submit="submit" />
     </div> -->
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
.login {
  position: absolute;
}
</style>
<script>
import Table from "./Table.vue";
import SelectedTable from "./SelectedTable.vue";
import Tabs from "./Tabs.vue";
// import LogIn from "./LogIn.vue";
//import axios from "axios";
//import Loading from "./Loading.vue";

let evtSource;
let count = 0;

//var base64 = require("base-64");

function sseFunction(event) {
  console.log(event.data, count, event.data['"current"']);
  let result = JSON.parse(event.data);
  console.log(result);
  console.log(this);
  this.tables = this.tables.map((el) => {
    if (result.current.includes(el.id)) el.taken = 2;
    else if (result.foreign.includes(el.id)) el.taken = 3;
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
    this.xtoken = this.$route.params.xtoken;
    this.bearer = this.$route.params.bearer;
    this.url = this.$route.params.url;
    this.client = this.$route.params.client;
    this.login = this.$route.params.login;
    if (this.$route.params.login) {
      localStorage.login = this.$route.params.login;
      localStorage.xtoken = this.$route.params.xtoken;
      localStorage.bearer = this.$route.params.bearer;
      localStorage.url = this.$route.params.url;
      localStorage.client = this.$route.params.client;
      localStorage.login = this.$route.params.login;
    } else {
      this.xtoken = localStorage.xtoken;
      this.bearer = localStorage.bearer;
      this.url = localStorage.url;
      this.client = localStorage.client;
      this.login = localStorage.login;
    }
    console.log(this.xtoken, this.bearer, this.url);
    this.getTables();
    console.log(this.$route);
  },
  onBeforeUnmount() {
    //if(this.listening) evtSource.removeEventListener("locks", sseFunction, false)
    //evtSource.removeEventListener("locks", sseFunction, false)
    //evtSource.close();
  },
  methods: {
    async getTables() {
      if (!this.url) {
        this.$router.push({
          path: "/",
        });
        return;
      }
      await fetch(this.url + "/menu", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authentication: "bearer " + this.bearer,
          "x-token": this.xtoken,
        },
        body: JSON.stringify({
          version: "1.0",
          method: "table.list",
          params: null,
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          this.tables = data.result.tables.filter((el) => {
            el.taken = 0;
            return el;
          });
          this.isLoading = false;
          this.areas = data.result.areas;
          this.$Message.success({ text: "Welcome" });
          console.log(this.xtoken);
          this.getConnection(this);
        })
        .catch((err) => {
          //this.err = err;
          console.log(err);
          this.$Message.danger({ text: "Failed" });
        });
    },
    getConnection(self) {
      if (evtSource) {
        evtSource.close();
        evtSource = null;
      }
      evtSource = new EventSource(
        `https://www.re-check.com:5000/sse/tables?clientid=${this.client}&user=${this.login}&x-token=${this.xtoken}`
        //`http://192.168.1.11:5000/sse/tables?clientid=${this.client}&user=${this.login}&x-token=${this.xtoken}`
      );

      evtSource.addEventListener("locks", sseFunction.bind(self), false);
    },
    handleVisibilityChange() {
      console.log(document.visibilityState);
      if (document.visibilityState == "hidden") {
        //evtSource.removeEventListener("locks", sseFunction.bind(this), false);
        if (!this.isLoading) evtSource.close();
      } else {
        if (!this.isLoading) this.getConnection(this);
      }
    },
    // async submit(user, pwd) {
    //   console.log(user, pwd);
    //   this.login = user;
    //   this.client = "{0DA6EA6D-CC7D-4EBA-A989-9293923BDE1E}";
    //   this.pwd = base64.encode(pwd);
    //   console.log(base64.encode(pwd));
    //   //this.xtoken = "";
    //   await fetch("https://www.re-check.com:8080/login", {
    //     method: "post",
    //     mode: "cors",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       jsonrpc: "2.0",
    //       method: "jwt",
    //       params: [
    //         {
    //           login: this.login,
    //           client: this.client,
    //           pwd: this.pwd,
    //         },
    //       ],
    //       id: 4,
    //     }),
    //   })
    //     .then((data) => data.json())
    //     .then(async (data) => {
    //       console.log(data.result);
    //       let tables = data.result;
    //       console.log(this);

    //       this.bearer = tables.bearer;
    //       this.xtoken = tables["X-token"];
    //       console.log(this);
    //       //tables.url = "http://192.168.1.11:5000";
    //       this.url = tables.url;
    //       await fetch(tables.url + "/menu", {
    //         method: "POST",
    //         mode: "cors",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Accept: "application/json",
    //           Authentication: "bearer " + tables.bearer,
    //           "x-token": tables["X-token"],
    //         },
    //         body: JSON.stringify({
    //           version: "1.0",
    //           method: "table.list",
    //           params: null,
    //         }),
    //       })
    //         .then((data) => data.json())
    //         .then((data) => {
    //           console.log(data);
    //           this.tables = data.result.tables.filter((el) => {
    //             el.taken = 0;
    //             return el;
    //           });
    //           this.isLoading = false;
    //           this.areas = data.result.areas;
    //           this.$Message.success({ text: "Welcome" });
    //         })
    //         .catch((err) => {
    //           //this.err = err;
    //           console.log(err);
    //           this.$Message.danger({ text: "Failed" });
    //         });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       this.$Message.danger({ text: "Failed" });
    //     });

    //   console.log(this);
    //   console.log("a");
    //   console.log(this.xtoken);
    //   this.getConnection(this);
    //   console.log("Locks");
    // },
    close(id) {
      fetch(this.url + "/tables/unlock/" + id, {
        method: "POST",
        mode: "cors",
        headers: {
          //"Content-Type": "application/json",
          Authentication: "bearer " + this.bearer,
          "x-token": this.xtoken,
        },
      })
        .then((data) => data.json())
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
      fetch(this.url + "/tables/lock/" + id, {
        method: "POST",
        mode: "cors",
        headers: {
          //"Content-Type": "application/json",
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
