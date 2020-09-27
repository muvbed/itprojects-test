<template>
	<div class="modal" @click.self="$emit('close-del-field')">
		<div class="modal__box">
			<h2 class="modal__title">Delete "{{ params.key }}"?</h2>
			<p class="modal__text">Are you sure you want to confirm the delete this field?</p>
			<div class="modal__btns">
				<button class="modal__button modal__button_red" @click="delField">Delete</button>
				<button class="modal__button modal__button_gray" @click="$emit('close-del-field')">Cancel</button>
			</div>
			<span class="modal__close" @click="$emit('close-del-field')">&times;</span>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex"

export default {
	name: 'DelField',
	props: ["args"],
	data() {
		return {
			params: this.args
		}
	},
	methods: {
		...mapActions(["updContact"]),
		delField() {
			this.params.step++
			this.params.localeItem[this.params.step] = {...this.params.localeItem[this.params.step - 1]}
			delete this.params.localeItem[this.params.step][this.params.key]
			
			this.updContact([this.params.index, this.params.localeItem[this.params.step]])
			this.$emit('close-del-field', {localeItem: this.params.localeItem, step: this.params.step})
		},
		closeKeyDown(e) {
			if (e.keyCode === 27) {
				this.$emit('close-del-field')
			}
		}
	},
	mounted() {
		document.addEventListener('keydown', this.closeKeyDown)
	},
	destroyed() {
		document.removeEventListener('keydown', this.closeKeyDown)
	}
}
</script>
