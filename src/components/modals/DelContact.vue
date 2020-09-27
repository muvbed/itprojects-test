<template>
	<div class="modal" @click.self="$emit('close-del-contact')">
		<div class="modal__box">
			<h2 class="modal__title">Delete "{{ args.name }}"?</h2>
			<p class="modal__text">Are you sure you want to confirm the delete this contact?</p>
			<div class="modal__btns">
				<button class="modal__button modal__button_red" @click="delItem">Delete</button>
				<button class="modal__button modal__button_gray" @click="$emit('close-del-contact')">Cancel</button>
			</div>
			<span class="modal__close" @click="$emit('close-del-contact')">&times;</span>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex"

export default {
	name: 'DelContact',
	props: ["args"],
	methods: {
		...mapActions(["delContact"]),
		delItem() {
			this.delContact(this.args.index)
			this.$emit('close-del-contact')
		},
		closeKeyDown(e) {
			if (e.keyCode === 27) {
				this.$emit('close-del-contact')
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
