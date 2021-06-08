<template>
	<div class="home">
		<h1>Welcome, {{ name }}</h1>
		
		<button class="btn btn-secondary" @click="Logout">Logout</button>

		<div class="modal is-active" id="modal-activity">
				<div class="modal-background"></div>
				<div class="modal-card">
					<header class="modal-card-head">
						<p class="modal-card-title">Are you sure?</p>
					</header>

					<selection class="modal-card-body">
						<p class="modal-card-body">You can make this country favourite again after delete</p>
					</selection>
					<footer class="modal-card-foot">
						<button class="button is-danger" @click="deleteFav()">Delete</button>
						<button class="button" @click="closeDeleteModal()">Cancel</button>
					</footer>
				</div>
		</div>



		<br>
		<br>
		<main>
			<div v-for="fav in favourite" :key="fav">
				<button @click="getDataWithButton(fav)" class="btn btn-success">{{fav}}</button>
				<!--<button @click="openDeleteModal(fav)" class="btn btn-danger">X</button>-->
				<button @click="deleteFav(fav)" class="btn btn-danger">X</button>
			</div>


			<div class="search-box">
				<input 
					type="text" 
					class="search-bar" 
					id="inputField"
					placeholder="Search...." 
					v-model="query"
					@keypress="fetchWeather"
				/>

				<button @click="storeDataInFireBase()" class="btn btn-dark">Add To Favourites</button>
			</div>
			


			<div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
				<div class="location-box">
					<div class="location" id="location">{{ weather.name }}, {{ weather.sys.country }}</div>
					<div class="date">{{ dateBuilder() }}</div>
				</div>
				<div class="weather-box">
					<div class="temp">{{ Math.round(weather.main.temp)}}°C</div>
					<div class="weather">{{ weather.weather[0].main }}</div>
				</div>
			</div>
		</main>

		

	</div>


</template>





<script>

import { ref, onBeforeMount } from 'vue';
import firebase from 'firebase'


export default {

	name: 'home',
	created (){
		/*console.log('Start')*/
		setTimeout(() =>{
			
			this.getFavs();
		},1000)
	},
	data () {
		return {
			api_key: '52e00bf9b32fafde44a775302b6084c4',
			url_base: 'https://api.openweathermap.org/data/2.5/',
			query: '',
			weather: {},
			favourite: []
		}
	},
	methods: {
		getFavs(){
			let uid = firebase.auth().currentUser.uid;
			
			this.retrieveDataFromFireBase(uid)
		},
		getName(){
			let uid = firebase.auth().currentUser.uid;
			const user = firebase.auth().currentUser;
			if(user){
				name.value = user.email.split('@')[0];
				uid.value = user.uid;
			}
		},
		fetchWeather (e) {
			if (e.key == "Enter") {
				fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
					.then(res => {
						return res.json();
					}).then(this.setResults);
			}
		},
		setResults (results) {
			this.weather = results;
		},
		dateBuilder () {
			let d = new Date();
			let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

			let day = days[d.getDay()];
			let date = d.getDate();
			let month = months[d.getMonth()];
			let year = d.getFullYear();

			return `${day} ${date} ${month} ${year}`;
		},
	
		async storeDataInFireBase () {

			let uid = firebase.auth().currentUser.uid;

			console.log(uid)

			var country = document.getElementById('inputField').value
			console.log(country)

			this.retrieveDataFromFireBase(uid)


			setTimeout(() => {
				var country = document.getElementById('inputField').value

				if(!this.favourite.includes(country)) {

					console.log(country)

					this.favourite.push(country)
					firebase.database().ref('users/' + uid).update({
						favourite: this.favourite
					})
				}
			}, 1000)
		},
		retrieveDataFromFireBase (uid) {
			var userPrefs = firebase.database().ref('users/' + uid)
			console.log(uid)
			userPrefs.once('value', (snapshot) => {
				const data = snapshot.val()

				console.log(data.favourite)
				/*if (data.favorite !== undefined) {
					
					this.favorite = data.favorite
				}*/
				this.favorite = data.favorite

				console.log("saved")
				console.log(this.favourite)
			})
		},
		getDataWithButton(fav){

			var country = fav
			console.log(country)
			
			fetch(`${this.url_base}weather?q=${country}&units=metric&APPID=${this.api_key}` )
					.then(res => {
						return res.json();
					}).then(this.setResults);

		},
		deleteFav(fav){

			this.retrieveDataFromFireBase()
			var country = fav
			let uid = firebase.auth().currentUser.uid;

			setTimeout(() => {
				var index = this.favourite.indexOf(country)
				console.log(index)
				this.favourite.splice(index,1)
				firebase.database().ref('users/'+ uid).update({
					favourite: this.favourite
				})
			}, 100)
			
		},
		openDeleteModal(fav){
			this.deleteSelection = fav
			document.getElementById('modal-activity').classList.add('is-active')
			console.log("openModal fav:" + fav)
		},
		closeDeleteModal(){
			document.getElementById('modal-activity').classList.remove('is-active')
		}
		
	},
	
	setup (){

		const name = ref("");
		const uid = ref("");

		onBeforeMount(() => {
			const user = firebase.auth().currentUser;
			if(user){
				name.value = user.email.split('@')[0];
				uid.value = user.uid;
			}

		});

		const Logout = () => {
			firebase
				.auth()
				.signOut()
				.then(() => console.log("Signed out"))
				.catch(err => alert(err.message));
		}

		return {
			name,
			uid,
			Logout
		}
	}
}
</script>



<style>
*{
	margin:0;
	padding:0;
	box-sizing: border-box;
}

body{
	font-family: 'montserrat', sans-serif;
}

.search-box .search-bar{
	display: block;
	width: 100%;
	padding:15px;

	color: #313131;
	font-size: 20px;

	appearance: none;
	border: none;
	outline: none;
	background: none;

	box-shadow: 0px 0px 16px rgba(0,0,0,0.25);
	background-color: rgba(255,255,255,0.5);
	border-radius: 0px 16px 0px 16px;
	transition: 0.4s;
}

.search-box .search-bar:focus{
	box-shadow: 0px 0px 16px rgba(0,0,0,0.25);
	background-color: rgba(255,255,255,0.75);
	border-radius: 16px 0px 16px 0px;

}

.location-box .location {
	color: white;
	font-size: 32px;
	font-weight: 500px;
	text-align: center;
	text-shadow: 1px 3px rgba(0,0,0,0.25);
}

.location-box .date{
	color: white;
	font-size: 20px;
	font-weight: 300;
	font-style: italic;
	text-align: centre;

}

.weather-box .temp{
	display:inline-block;
	padding: 10px 25px;
	color: white;
	font-size:102px;
	font-weight: 900;

	text-shadow: 3px 6px rgba(0,0,0,0.25);
	background-color: rgba(255,255,255,0.25);
	border-radius:16px;
	margin: 30px 0px;

	box-shadow: 3px 6px rgba(0,0,0,0.25);
}

.weather-box .weather {
	color: white;
	font-size: 48px;
	font-weight: 700;
	font-style: italic;
	text-shadow: 3px 6px rgba(0,0,0,0.25);

}

</style>
