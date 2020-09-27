<template>
	<div class="modal" @click.self="$emit('close-confirm-edit-field')">
		<div class="modal__box">
			<h2 class="modal__title">Confirm your actions</h2>
			<p class="modal__text">Are you sure you want to undo editing?</p>
			<div class="modal__btns">
				<button class="modal__button modal__button_red" @click="confirmCancelEdit">Confirm</button>
				<button class="modal__button modal__button_gray" @click="$emit('close-confirm-edit-field')">Cancel</button>
			</div>
			<span class="modal__close" @click="$emit('close-confirm-edit-field')">&times;</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ConfirmEditField',
	methods: {
		confirmCancelEdit() {
			this.$emit('close-edit-field')
		},
		closeKeyDown(e) {
			if (e.keyCode === 27) {
				this.$emit('close-confirm-edit-field')
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
