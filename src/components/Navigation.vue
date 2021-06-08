<template>
<!--
  <div class="logo">
    <img src="../assets/WeatherAppLogo.png" alt="">
  </div> -->

  <div class = "navBar"> 
     <h2 class="display-6">Weather Application</h2> 

    <button @click="goHome()" class="btn btn-outline-dark">Home</button>
    <button @click="viewMember()" class="btn btn-outline-dark">View Member</button>
    <!--<button v-if="isUserAuth" @click="viewMember()">View Member</button>-->
    <button @click="updateMember()" class="btn btn-outline-dark">Update Member</button>
  </div>
  

  
</template>

<script>
import firebase from 'firebase'
//import mapGetters from'vuex'

export default {
 /* computed:{
    ...mapGetters(['isUserAuth'])
  },*/
  methods: {

      viewMember () {
          let uid = firebase.auth().currentUser.uid;
          console.log(uid)
          this.$router.push('/viewMember')
      },
      goHome () {
          let uid = firebase.auth().currentUser.uid;
          console.log(uid)
          this.$router.push('/')
      },
      updateMember () {
          let uid = firebase.auth().currentUser.uid;
          console.log(uid)
          this.$router.push('/updateMember')
      }

    }

}
</script>

<style>
  .navBar{
    background-color: orangered;
    color: black;
  }


   

</style>