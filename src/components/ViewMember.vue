<template>
  <h1 class="title">This is View Member</h1>

    <!--<button @click="getMemberInfo()">Get Info</button>-->
  <router-link to ="/" class="btn btn-warning">back</router-link>

    <br>
    <br>
  <div class="displayInfo">
      <h3 class="name">Name: {{upperCase(nameUser)}}</h3>
      <h3 class="phone">Phone:  {{addCountryCode(phoneUser)}}</h3>
  </div>
</template>

<script>

import firebase from 'firebase'

export default {

  data () {
    return {
      nameUser:'',
      phoneUser:''
    }
  },
    created (){
    /*console.log('Start')*/
    setTimeout(() =>{
      
      this.getMemberInfo();
    },1000)
  },
    methods: {
      getMemberInfo(){

             //console.log("get member info method")
            let uid = firebase.auth().currentUser.uid;
            //console.log(uid)

            var userPrefs = firebase.database().ref('users/' + uid)
            userPrefs.once('value', (snapshot) => {
            const data = snapshot.val()


        this.nameUser = data.nameUser
        this.phoneUser = data.phoneUser

        console.log("Name User: "+ this.nameUser)
                console.log("Phone User: "+ this.phoneUser)

          })
      },
      upperCase(str){

          var strUpp = str.charAt(0).toUpperCase() + str.slice(1)
          console.log(strUpp)
          return strUpp
          
      },
      addCountryCode(mobile){
          return ('+365 ' + mobile)
      }
     }

}
</script>

<style>
.displayInfo{
  background: white;
}
</style>