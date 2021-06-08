import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import 'firebase/database'

//import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/main.css'



// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

require('@/assets/main.scss');



const firebaseConfig = {
    apiKey: "AIzaSyA1G24YohNEy3xKJlMqtrzc-mRpqr9BYwk",
    authDomain: "css2-88f81.firebaseapp.com",
    projectId: "css2-88f81",
    storageBucket: "css2-88f81.appspot.com",
    messagingSenderId: "841840939698",
    appId: "1:841840939698:web:ad8c5b3419c2d26a112fab"
  };

  

  firebase.initializeApp(firebaseConfig);
  
createApp(App).use(store).use(router).mount('#app')

