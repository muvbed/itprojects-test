<template>
	<div class="wrapper item">
		<h1 class="caption">Detail information</h1>
		<div class="item__control">

			<!-- Триггер вызова модального окна добавления новых полей -->
			<button class="item__button item__button_add" @click="openModal('add')">Add field</button>

			<!-- Триггер вызова метода отмены последних внесенных изменений -->
			<button :class="{item__button_disable: step === 0, item__button_rllbck: step > 0}" class="item__button" @click="backStep">Roll back</button>
		</div>

		<!-- Вывод полей контакта -->
		<ul class="item__list">
			<li class="item-block" v-for="(value, key, index) in localeItem[step]" :key="index">
				<div class="item-block__text">
					<span class="item-block__key">{{ key }}: </span>
					<span class="item-block__value">{{ value }}</span>
				</div>
				<div class="item-block__control">
					<span class="item-block__button item-block__button_edit"  @click="openModal('edit', {value, key})">
						<img src="@/svg/edit.svg" alt="Edit">
					</span>
					<span class="item-block__button item-block__button_del" @click="openModal('del', key)" v-if="key != 'name' && key != 'phone'">
						<img src="@/svg/del.svg" alt="Delete">
					</span>
				</div>
			</li>
		</ul>

		<!-- Модальное окно добавления нового поля в контакт -->
		<div class="modal" ref="modalAdd">
			<div class="modal__wrapper" @click.self="closeModal('add')">
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
						<button class="modal__button modal__button_gray" @click="closeModal('add')">Cancel</button>
					</div>
					<span class="modal__close" @click="closeModal('add')">&times;</span>
				</div>
			</div>
		</div>

		<!-- Модальное окно редактирования поля контакта -->
		<div class="modal" ref="modalEdit">
			<div class="modal__wrapper" @click.self="openModal('confirm')">
				<div class="modal__box">
					<h2 class="modal__title">Edit field "{{ fieldToEdit.key }}"</h2>
					<p class="modal__text">Edit value in the fields below:</p>
					<div class="modal__fields">
						<label class="modal__label modal__label_edit">
							<TheMask type="text" class="modal__input" id="editValue" placeholder="Value..." :mask="['+# (###) ###-##-##']" v-model="fieldToEdit.value" v-if="fieldToEdit.key === 'phone'"/>
							<input type="text" class="modal__input" id="editValue" v-model="fieldToEdit.value" placeholder="Value..." v-else>
							<div class="modal__error">Error: field is empty!</div>
						</label>
					</div>
					<div class="modal__btns">
						<button class="modal__button modal__button_green" @click="editField">Edit</button>
						<button class="modal__button modal__button_gray" @click="openModal('confirm')">Cancel</button>
					</div>
					<span class="modal__close" @click="openModal('confirm')">&times;</span>
				</div>
			</div>
		</div>

		<!-- Модальное окно подтверждения отмены процесса редактирования -->
		<div class="modal" ref="modalConfirm">
			<div class="modal__wrapper" @click.self="closeModal('confirm')">
				<div class="modal__box">
					<h2 class="modal__title">Confirm your actions</h2>
					<p class="modal__text">Are you sure you want to undo editing?</p>
					<div class="modal__btns">
						<button class="modal__button modal__button_red" @click="confirmCancelEdit">Confirm</button>
						<button class="modal__button modal__button_gray" @click="closeModal('confirm')">Cancel</button>
					</div>
					<span class="modal__close" @click="closeModal('confirm')">&times;</span>
				</div>
			</div>
		</div>

		<!-- Модальное окно удаления поля контакта -->
		<div class="modal" ref="modalDel">
			<div class="modal__wrapper" @click.self="closeModal('del')">
				<div class="modal__box">
					<h2 class="modal__title">Delete "{{ fieldsDelName }}"?</h2>
					<p class="modal__text">Are you sure you want to confirm the delete this field?</p>
					<div class="modal__btns">
						<button class="modal__button modal__button_red" @click="delField(fieldsDelName)">Delete</button>
						<button class="modal__button modal__button_gray" @click="closeModal('del')">Cancel</button>
					</div>
					<span class="modal__close" @click="closeModal('del')">&times;</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { TheMask } from 'vue-the-mask'
import { mapGetters, mapActions } from "vuex";

export default {
	name: 'item',
	components: {
		TheMask
	},
	data: () => {
		return {
			step: 0,
			localeItem: [],
			id: window.location.hash.split('id')[1], // Получение идентификатора контакта
			fieldsDelName: '',
			fieldToEdit: {
				value: '',
				key: ''
			}
		}
	},
	computed: mapGetters(["getAllItems"]),
	methods: {
		...mapActions(["commitUpdItem"]),
		openModal(type, prop) { // Открытие модального окна (type - тип модального окна; prop - дополнительные параметры)
			document.body.style.paddingRight = window.innerWidth - document.body.clientWidth + "px"
			document.body.style.overflow = 'hidden'

			if (type === 'add') {
				this.$refs.modalAdd.classList.add('modal_show')
			}

			if (type === 'edit') {
				this.fieldToEdit = prop
				this.$refs.modalEdit.classList.add('modal_show')
			}

			if (type === 'del') {
				this.fieldsDelName = prop
				this.$refs.modalDel.classList.add('modal_show')
			}

			if (type === 'confirm') {
				this.$refs.modalConfirm.classList.add('modal_show')
			}
		},
		closeModal(type) { // Закрытие модального окна (type - тип модального окна)
			setTimeout(() => {
				document.body.removeAttribute('style')
			}, 300)

			if (type === 'add') {
				this.$refs.modalAdd.classList.remove('modal_show')
			}

			if (type === 'edit') {
				this.$refs.modalEdit.classList.remove('modal_show')
			}
			
			if (type === 'del') {
				this.$refs.modalDel.classList.remove('modal_show')
			}

			if (type === 'confirm') {
				this.$refs.modalConfirm.classList.remove('modal_show')
			}
		},
		backStep() { // Отмена последнего внесенного изменения (шаг назад)
			if (this.step === 0) return
			this.step--
			this.commitUpdItem([this.id, this.localeItem[this.step]])
		},
		addField() { // Добавление нового поля в контакт
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
				this.step++
				this.localeItem[this.step] = {...this.localeItem[this.step - 1]}
				this.localeItem[this.step][document.querySelector("#addName").value] = document.querySelector("#addValue").value
				this.commitUpdItem([this.id, this.localeItem[this.step]])
				this.closeModal('add')
				document.querySelector("#addName").value = document.querySelector("#addValue").value = ''
			}
		},
		editField() { // Процесс редактирование поля контакта
			let errCount = 0

			for (let i = 0; i < document.querySelectorAll('.modal__label_edit').length; i++) {
				document.querySelectorAll('.modal__label_edit')[i].classList.remove('modal__label_error')
			}

			if (!document.querySelector("#editValue").value.match(/\S/gi)) {
				document.querySelector("#editValue").parentNode.classList.add('modal__label_error')
				errCount++
			}

			if (errCount === 0) {
				this.step++
				this.localeItem[this.step] = {...this.localeItem[this.step - 1]}
				this.localeItem[this.step][this.fieldToEdit.key] = document.querySelector("#editValue").value
				this.commitUpdItem([this.id, this.localeItem[this.step]])
				this.closeModal('edit')
				document.querySelector("#editValue").value = ''
			}
		},
		confirmCancelEdit() { // Подтверждение отмены процесса редактирования
			this.closeModal('confirm')
			this.closeModal('edit')
			document.querySelector("#editValue").value = ''
		},
		delField(field) { // Удаление поля контакта
			this.step++
			this.localeItem[this.step] = {...this.localeItem[this.step - 1]}
			delete this.localeItem[this.step][field]
			this.commitUpdItem([this.id, this.localeItem[this.step]])
			this.closeModal('del')
		}
	},
	created() {
		this.localeItem.push({...this.getAllItems[this.id]}) // Копирование контакта по идентификатору из списка контактов в локальную переменную 
															// для реализации истории внесенных изменений
	}
}
</script>

<style lang="scss">
@import '@/scss/mixins.scss';

.item {
	&__control {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	&__button {
		@include button;
		margin: 0 10px;
		width: 120px;
		padding: 14px 5px;
		font-size: 14px;
		border-radius: 30px;

		&_add {
			background-color: rgb(50,205,50);
		}

		&_rllbck {
			background-color: rgb(135,206,235);
		}

		&_disable {
			pointer-events: none;
		}
	}

	&__list {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		margin-top: 30px;
		padding: 0px;
		list-style-type: none;
	}
}

.item-block {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 15px 0;
	padding-bottom: 5px;
	font-size: 16px;
	word-break: break-all;
	border-bottom: 1px solid #181C43;

	&__text {
		width: 80%;
	}

	&__key {
		text-transform: capitalize;
		font-weight: bold;
	}

	&__control {
		display: flex;
	}

	&__button {
		width: 18px;
		cursor: pointer;
		transition: .3s;

		&:hover {
			transform: scale(1.2);
		}

		&_del {
			margin-left: 10px;
		}
	}
}
</style>
