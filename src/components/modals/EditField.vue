<template>
	<div class="modal" @click.self="$emit('open-confirm-edit-field')">
		<div class="modal__box">
			<h2 class="modal__title">Edit field "{{ params.key }}"</h2>
			<p class="modal__text">Edit value in the fields below:</p>
			<div class="modal__fields">
				<label class="modal__label modal__label_edit">
					<TheMask 
					type="text" 
					class="modal__input" 
					id="editValue" 
					placeholder="Value..." 
					:mask="['+# (###) ###-##-##']" 
					v-model="params.value" 
					v-if="params.key === 'phone'"
					/>
					<input type="text" class="modal__input" id="editValue" v-model="params.value" placeholder="Value..." v-else>
					<div class="modal__error">Error: field is empty!</div>
				</label>
			</div>
			<div class="modal__btns">
				<button class="modal__button modal__button_green" @click="editField">Edit</button>
				<button class="modal__button modal__button_gray" @click="$emit('open-confirm-edit-field')">Cancel</button>
			</div>
			<span class="modal__close" @click="$emit('open-confirm-edit-field')">&times;</span>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex"
import { TheMask } from 'vue-the-mask'

export default {
	name: 'EditField',
	components: {
		TheMask
	},
	props: ["args"],
	data() {
		return {
			params: this.args
		}
	},
	methods: {
		...mapActions(["updContact"]),
		editField() {
			let errCount = 0

			for (let i = 0; i < document.querySelectorAll('.modal__label_edit').length; i++) {
				document.querySelectorAll('.modal__label_edit')[i].classList.remove('modal__label_error')
			}

			if (!document.querySelector("#editValue").value.match(/\S/gi)) {
				document.querySelector("#editValue").parentNode.classList.add('modal__label_error')
				errCount++
			}

			if (errCount === 0) {
				this.params.step++
				this.params.localeItem[this.params.step] = {...this.params.localeItem[this.params.step - 1]}
				this.params.localeItem[this.params.step][this.params.key] = document.querySelector("#editValue").value
				document.querySelector("#editValue").value = ''

				this.updContact([this.params.index, this.params.localeItem[this.params.step]])
				this.$emit('close-edit-field', {localeItem: this.params.localeItem, step: this.params.step})
			}
		},
		closeKeyDown(e) {
			if (e.keyCode === 27) {
				this.$emit('open-confirm-edit-field')
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
