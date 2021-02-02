<template>
  <div id="nav">
      <router-link class="route main" to="/">Main</router-link> 
      <router-link class="route time" to="/time">Time</router-link>
  </div>
  <router-view />
</template>

<script>


export default {
  name: 'App',
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap');
#app {
  display: flex;
  flex-direction: row;
  text-align: center; 
  font-family: 'Oswald', sans-serif;
  width: 1000px;
  margin: 0 auto;

}

@media only screen and (max-width: 910px) {
  #app {
    width:750px;
  }

}

@media only screen and (max-width: 610px){
  #app {
    width:450px;
  }
  
}
@media only screen and (max-width: 700px){
  #app {
    width:550px;
  }
  
}

@media only screen and (max-width: 910px) {
  .main {
    width:600px;
  }

}

@media only screen and (max-width: 610px){
  .main {
    width:250px;
  }
  
}
@media only screen and (max-width: 700px){
  .main {
    width:400px;
  }
  
}

.route 
{
  text-decoration: none;
  color: white;
  margin-bottom: 30px;
}
.route
{
  position:relative;
}
.time::before 
{
    background-image: url(../public/images/time.png);
}
.main::before 
{
    background-image: url(../public/images/main.png);
}




.route::before 
{
  content:'';
  left: 3px;
  top: 7px;
  width:20px;
  height:20px;
  right:0;
  position:absolute;
  background-size:cover;
}
#nav 
{
   padding: 30px 12px;
   background-image: linear-gradient(to bottom left,#cec92f,#c6da1d,#c2c512);
   border-radius: 3px;
   height: 90vh;
   margin-right:10px;
   display:flex;
  flex-direction: column;
  width:100px;
  font-size: 22px;
  text-transform: uppercase;
  position: sticky;
  top:2px;
}
</style>
