<template>
	<div>
		<h2>Where am i ?</h2>
		<input type="text" name="title">
		
		<button @click="edit" class="edit">Edit</button>
		<div v-if="editing">
			  <form>
			  	<input type="text" name="name">
			  	<button @click="update" class="update">Update</button>
			  	<button class="cancel">Cancel</button>
			  </form>
		</div>
		<ul v-show="false"><li>Hidden</li></ul>

		<button @click="$emit('applied')" id="emit">Emit Event</button>
		
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
			update() {
				 this.$emit('applied')
				 this.editing = true
			},

			edit(){
				 this.$emit('isEditing');
				 this.editing = true;
			}
		}
		
	}
</script>

