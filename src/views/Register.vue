<template>
  <div class="register">

      <h1>Register</h1>
    <form @submit.prevent="Regsiter">
        
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" @blur="v$.nameUser.$touch" id="name" name="name" class="form-control form-control-lg" v-model="nameUser" />
            <div class="input-errors" v-for="error of v$.nameUser.$errors" :key="error.$uid">
            <div class="text-danger">{{ error.$message }}</div>
            </div>
        </div>

        <div class="form-group">
            <label for="phone">Phone</label>
            <input type="text" @blur="v$.phoneUser.$touch" id="phone" name="phone" class="form-control form-control-lg" v-model="phoneUser" />
            <div class="input-errors" v-for="error of v$.phoneUser.$errors" :key="error.$uid">
            <div class="text-danger">{{ error.$message }}</div>
            </div>
        </div>

        <div class="form-group">
            <label>Email</label>
            <input type="email" @blur="v$.emailUser.$touch" name="email" class="form-control form-control-lg" v-model.trim="emailUser" />
            <div class="input-errors" v-for="error of v$.emailUser.$errors" :key="error.$uid">
            <div class="text-danger">{{ error.$message }}</div>
            </div>
        </div>

        <div class="form-group">
            <label>Password</label>
            <input type="password" @blur="v$.passwordUser.$touch" name="password" class="form-control form-control-lg" v-model.trim="passwordUser" />
            <div class="input-errors" v-for="error of v$.passwordUser.$errors" :key="error.$uid">
            <div class="text-danger">{{ error.$message }}</div>
            </div>
        </div>

        <div class="form-group">
        <label>Retype Password</label>
        <input type="password" @blur="v$.passwordUserCon.$touch" class="form-control form-control-lg" v-model.trim="passwordUserCon" />
        <div class="input-errors" v-for="error of v$.passwordUserCon.$errors" :key="error.$uid">
          <div class="text-danger">{{ error.$message }}</div>
        </div>
      </div>

        
        <br>

        <button class="submit" @click="register()">Submit</button>
        <p>Have an Account?<router-link to="/login">Login Here</router-link></p>
    </form>


  </div>
  
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength, alpha, numeric, sameAs } from '@vuelidate/validators'
import { mapGetters } from 'vuex'
//import axios from 'axios'

import firebase from 'firebase';


export default {
   
   data () {
    return {
      nameUser: '',
            phoneUser:'',
            emailUser:'',
            passwordUser:'',
            passwordUserCon:'',
            isAdmin:false
    }
  },
  computed: {
      ...mapGetters(['getUser', 'isUserAuth'])
    },
  setup() {

        return {
                    v$: useVuelidate() 
                    
                }
       

    },
    methods: {

        register(){
            

            firebase
                .auth()
                .createUserWithEmailAndPassword(this.emailUser, this.passwordUser)
                .then(() => {

                    
                    let uid = firebase.auth().currentUser.uid;


                    console.log(this.nameUser + ": "+ this.phoneUser +" "+uid)

                    

                firebase.database().ref('users/' + uid).set({
                    phoneUser: this.phoneUser,
                    nameUser: this.nameUser,
                    isAdmin: false
                })

                    
                })
                .catch(err => alert(err.message));
        

        }
    },
    validations () {
    return {
      
        nameUser: {
          required,
          minLength: minLength(4),
          maxLength: maxLength(15),
          alpha
        },
        phoneUser: {
          required,
          minLength: minLength(8),
          numeric
        },
        emailUser: {
          required,
          email
        },
        passwordUser: {
          required,
          minLength: minLength(6)
        },
        passwordUserCon: {
          required,
          sameAsPass: sameAs(this.passwordUser)
        }
      
    }
    }
}
</script>

<style>

.text-danger{
  color: red;
}
</style>

