<template>
	<div>
		<h2><router-link to="/home">工作实况</router-link>、<router-link to="/user">用户信息</router-link></h2>
		<transition name="router-fade" mode="out-in">
    		<router-view></router-view>
    	</transition>
    </div>
</template>

<script>
	import Firebase from 'firebase'
	// Initialize Firebase
	var firebaseConfig = {
	    apiKey: "AIzaSyAJyjg2BHpnBL68576ktQKSlFj2swblwTA",
	    authDomain: "web-vue.firebaseapp.com",
	    databaseURL: "https://web-vue.firebaseio.com",
	};
	Firebase.initializeApp(firebaseConfig);

  	export default {

  	}
</script>

<style>
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
</style>
