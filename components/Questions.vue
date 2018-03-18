<template>
	<div>
		<h2>Where am i ?</h2>
		<input type="text" name="title">

		<button @click="edit" class="edit">Edit</button>
		<div v-if="editing">
			  <form>
			  	<input type="text" name="name">
			  	<button class="update">Update</button>
			  	<button class="cancel">Cancel</button>
			  </form>
		</div>
		<ul v-show="false"><li>Hidden</li></ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				editing: false
			}
		},
		methods: {
			edit() {
				this.editing = true
				this.$emit('isEditing')
			}
		}
	}
</script>