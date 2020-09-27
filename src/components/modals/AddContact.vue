<template>
	<div class="modal" @click.self="$emit('close-add-contact')">
		<div class="modal__box">
			<h2 class="modal__title">Add contact</h2>
			<p class="modal__text">Fill in the fields below:</p>
			<div class="modal__fields">
				<label class="modal__label modal__label_add">
					<input type="text" class="modal__input" id="addName" placeholder="Your name...">
					<div class="modal__error">Error: incorrect name format!</div>
				</label>
				<label class="modal__label modal__label_add">
					<TheMask 
					type="text" 
					class="modal__input" 
					id="addPhone" 
					placeholder="Your tel number..." 
					:mask="['+# (###) ###-##-##']" 
					v-model="unmaskedPhoneVal"
					/>
					<div class="modal__error">Error: field is empty!</div>
				</label>
			</div>
			<div class="modal__btns">
				<button class="modal__button modal__button_green" @click="addItem">Add</button>
				<button class="modal__button modal__button_gray" @click="$emit('close-add-contact')">Cancel</button>
			</div>
			<span class="modal__close" @click="$emit('close-add-contact')">&times;</span>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex"
import { TheMask } from 'vue-the-mask'

export default {
	name: 'AddContact',
	components: {
		TheMask
	},
	data() {
		return {
			unmaskedPhoneVal: ''
		}
	},
	methods: {
		...mapActions(["addContact"]),
		addItem() {
			let errCount = 0

			for (let i = 0; i < document.querySelectorAll('.modal__label_add').length; i++) {
				document.querySelectorAll('.modal__label_add')[i].classList.remove('modal__label_error')
			}

			if (!document.querySelector("#addName").value.match(/\S/gi)) {
				document.querySelector("#addName").parentNode.classList.add('modal__label_error')
				errCount++
			}

			if (!document.querySelector("#addName").value.match(/\S/gi)) {
				document.querySelector("#addPhone").parentNode.classList.add('modal__label_error')
				errCount++
			}

			if (errCount === 0) {
				this.addContact({
					name: document.querySelector("#addName").value,
					phone: document.querySelector("#addPhone").value
				})
				
				document.querySelector("#addName").value = this.unmaskedPhoneVal = ''

				this.$emit('close-add-contact')
			}
		},
		closeKeyDown(e) {
			if (e.keyCode === 27) {
				this.$emit('close-add-contact')
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
