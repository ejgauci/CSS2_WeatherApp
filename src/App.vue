<template>
  <div>
    <Navigation></Navigation>
  </div>
  <!--<router-view/>-->

  <router-view v-slot="{ Component }">
          <transition name="slide-fade" mode="out">
            <component :is="Component" />
          </transition>
        </router-view>
        
</template>


<script>
import { onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import firebase from 'firebase';
import Navigation from './components/Navigation'


export default {
  
  setup () {
    const router = useRouter();
    const route = useRoute();

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if(!user){
          router.replace('/login');
        }else if(route.path == "/login" || route.path == "/register"){
          router.replace('/');
        }
      });
    });
  },
  components: { 
  'Navigation': Navigation
  }


}
</script>


<style lang="scss">


body{
background: white;
color: #FFF;
}



#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

a{
  color: inherit;
}



.slide-fade-enter-from{
  transform: translateX(-10px);
  opacity: 0;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

</style>
