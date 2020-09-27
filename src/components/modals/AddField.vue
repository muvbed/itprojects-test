<template>
	<div class="modal" @click.self="$emit('close-add-field')">
		<div class="modal__box">
			<h2 class="modal__title">Add field</h2>
			<p class="modal__text">Fill in the fields below:</p>
			<div class="modal__fields">
				<label class="modal__label modal__label_add">
					<input type="text" class="modal__input" id="addName" placeholder="Field name...">
					<div class="modal__error">Error: field is empty!</div>
				</label>
				<label class="modal__label modal__label_add">
					<input type="text" class="modal__input" id="addValue" placeholder="Value...">
					<div class="modal__error">Error: field is empty!</div>
				</label>
			</div>
			<div class="modal__btns">
				<button class="modal__button modal__button_green" @click="addField">Add</button>
				<button class="modal__button modal__button_gray" @click="$emit('close-add-field')">Cancel</button>
			</div>
			<span class="modal__close" @click="$emit('close-add-field')">&times;</span>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex"

export default {
	name: 'AddField',
	props: ["args"],
	data() {
		return {
			params: this.args
		}
	},
	methods: {
		...mapActions(["updContact"]),
		addField() {
			let errCount = 0

			for (let i = 0; i < document.querySelectorAll('.modal__label_add').length; i++) {
				document.querySelectorAll('.modal__label_add')[i].classList.remove('modal__label_error')
			}

			if (!document.querySelector("#addName").value.match(/\S/gi)) {
				document.querySelector("#addName").parentNode.classList.add('modal__label_error')
				errCount++
			}

			if (!document.querySelector("#addValue").value.match(/\S/gi)) {
				document.querySelector("#addValue").parentNode.classList.add('modal__label_error')
				errCount++
			}

			if (errCount === 0) {
				this.params.step++
				this.params.localeItem[this.params.step] = {...this.params.localeItem[this.params.step - 1]}
				this.params.localeItem[this.params.step][document.querySelector("#addName").value] = document.querySelector("#addValue").value
				document.querySelector("#addName").value = document.querySelector("#addValue").value = ''

				this.updContact([this.params.contactIndex, this.params.localeItem[this.params.step]])
				this.$emit('close-add-field', {localeItem: this.params.localeItem, step: this.params.step})
			}
		},
		closeKeyDown(e) {
			if (e.keyCode === 27) {
				this.$emit('close-add-field')
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
