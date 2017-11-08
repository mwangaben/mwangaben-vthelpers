<template>
	<div>
		<h2>Where am i ?</h2>
		<input type="text" name="title">
		
		<button @click="editing = true" class="edit">Edit</button>
		<div v-if="editing">
			  <form>
			  	<input type="text" name="name">
			  	<button class="update">Update</button>
			  	<button class="cancel">Cancel</button>
			  </form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				editing: false
			}
		}
	}
</script>