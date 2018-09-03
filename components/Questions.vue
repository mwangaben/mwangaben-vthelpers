<template>
<div class="container">
    <h2>Where am i ?</h2>
    <div class="form-group">
      <input type="text" name="title">  
    </div>

    <button class="edit" @click="edit">Edit</button>
    <div v-if="editing">
        <form>
            <div  class="form-group">
               <input type="text" name="name">
            </div>
            <button class="update" @click="update">Update</button>
            <button class="cancel">Cancel</button>
        </form>
    </div>
    <ul v-show="false">
        <li>Hidden</li>
    </ul>

    <button id="emit" @click="$emit('applied')">Emit Event</button>

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

        edit() {
            this.$emit('isEditing', 40)
            this.editing = true
        },
        
        fireStatus(){
            this.$emit('status', 200, 300, 400, 404, 500)
        },
        
        fireObject(){

            let data = {
                company: 'Apple.inc',
                product: 'iPhone X',
                price  : '1200 usd'
            }
            this.$emit('obj', data)
        },

        firePrices() {
            let prices = [10, 12, 20, 40, 30]
            
            this.$emit('prices', prices)
        }
    }
}
</script>
