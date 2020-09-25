<template>
	<div class="wrapper contacts">
		<h1 class="caption">Contacts list</h1>

		<!-- Триггер вызова модального окна добавления новых контактов -->
		<button class="contacts__add" @click="openModal('add')">Add new contact</button>

		<!-- Вывод списка контактов -->
		<ul class="contacts__list" v-if="getAllItems.length != 0">
			<li class="contacts-item" v-for="(item, index) in getAllItems" :key="index">
				<h2 class="contacts-item__name">{{ item.name }}</h2>
				<a :href="`tel:${$options.filters.phoneDecoder(item.phone)}`" class="contacts-item__phone">{{ item.phone }}</a>
				<div class="contacts-item__btns">
					<router-link :to="`/id${index}`" class="contacts-item__button contacts-item__button_link">Details</router-link>
					<button class="contacts-item__button contacts-item__button_del" @click="openModal('del', [index, item.name])">Delete</button>
				</div>
				<hr class="contacts-item__border">
			</li>
		</ul>

		<!-- Вывод сообщения в случае пустого списка контактов -->
		<div class="contacts__empty" v-else>Your contacts list is empty</div>

		<!-- Модальное окно добавления нового контакта -->
		<div class="modal" ref="modalAdd">
			<div class="modal__wrapper" @click.self="closeModal('add')">
				<div class="modal__box">
					<h2 class="modal__title">Add contact</h2>
					<p class="modal__text">Fill in the fields below:</p>
					<div class="modal__fields">
						<label class="modal__label modal__label_add">
							<input type="text" class="modal__input" id="addName" placeholder="Your name...">
							<div class="modal__error">Error: incorrect name format!</div>
						</label>
						<label class="modal__label modal__label_add">
							<TheMask type="text" class="modal__input" id="addPhone" placeholder="Your tel number..." :mask="['+# (###) ###-##-##']" v-model="unmaskedPhoneVal"/>
							<div class="modal__error">Error: field is empty!</div>
						</label>
					</div>
					<div class="modal__btns">
						<button class="modal__button modal__button_green" @click="addItem">Add</button>
						<button class="modal__button modal__button_gray" @click="closeModal('add')">Cancel</button>
					</div>
					<span class="modal__close" @click="closeModal('add')">&times;</span>
				</div>
			</div>
		</div>

		<!-- Модальное окно удаления контакта -->
		<div class="modal" ref="modalDel">
			<div class="modal__wrapper" @click.self="closeModal('del')">
				<div class="modal__box">
					<h2 class="modal__title">Delete "{{ contactsDelName }}"?</h2>
					<p class="modal__text">Are you sure you want to confirm the delete this contact?</p>
					<div class="modal__btns">
						<button class="modal__button modal__button_red" @click="delItem">Delete</button>
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
	name: 'contacts',
	components: {
		TheMask
	},
	data() {
		return {
			id: 0,
			contactsDelName: '',
			unmaskedPhoneVal: ''
		}
	},
	filters: {
		phoneDecoder(phone) { // Преобразование номера телефона контакта в приемлемый для ссылки формат
			if (!phone) return
			return phone.replace(/-|\)|\(|\s/gi, '')
		}
	},
	computed: mapGetters(["getAllItems"]),
	methods: {
		...mapActions(["commitAddItem", "commitDelItem"]),
		openModal(type, prop) { // Открытие модального окна (type - тип модального окна; prop - дополнительные параметры)
			document.body.style.paddingRight = window.innerWidth - document.body.clientWidth + "px"
			document.body.style.overflow = 'hidden'

			if (type === 'add') {
				this.$refs.modalAdd.classList.add('modal_show')
			}

			if (type === 'del') {
				this.id = prop[0]
				this.contactsDelName = prop[1]
				this.$refs.modalDel.classList.add('modal_show')
			}
		},
		closeModal(type) { // Закрытие модального окна (type - тип модального окна)
			setTimeout(() => {
				document.body.removeAttribute('style')
			}, 300)

			if (type === 'add') {
				this.$refs.modalAdd.classList.remove('modal_show')
			}
			
			if (type === 'del') {
				this.$refs.modalDel.classList.remove('modal_show')
			}
		},
		addItem() { // Добавление контакта в список контактов
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
				this.commitAddItem({
					name: document.querySelector("#addName").value,
					phone: document.querySelector("#addPhone").value
				})
				this.closeModal('add')

				document.querySelector("#addName").value = this.unmaskedPhoneVal = ''
			}
		},
		delItem() { // Удаление контакта по идентификатору (id) из списка контактов
			this.commitDelItem(this.id)
			this.closeModal('del')
		}
	}
}
</script>

<style lang="scss">
@import '@/scss/mixins.scss';

.contacts {
	&__add {
		@include button;
		display: block;
		width: 170px;
		margin: 20px auto;
		padding: 14px 5px;
		font-size: 14px;
		background-color: rgb(50,205,50);
		border-radius: 30px;
	}

	&__list {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0px;
		padding: 0px;
		list-style-type: none;
	}

	&__empty {
		margin-top: 30px;
		text-align: center;
		font-family: 'Inter-LightBETA';
		font-size: 16px;
	}
}

.contacts-item {
	margin-bottom: 20px;
	text-align: center;

	&__name {
		margin-bottom: 10px;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 22px;
		overflow: hidden;
	}

	&__phone {
		padding-bottom: 2px;
		text-decoration: none;
		font-size: 16px;
		color: rgba(0,0,0,0.5);
		border-bottom: 1px dashed rgba(0,0,0,0.5);
		transition: .3s;

		&:hover {
			color: rgba(37,116,169,1);
			border-bottom: 1px dashed rgba(37,116,169,1);
		}
	}

	&__btns {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}

	&__button {
		@include button;
		width: 100px;
		margin: 0 5px;
		padding: 10px 5px;
		border-radius: 25px;

		&_link {
			background-color: rgb(169,169,169);
		}

		&_del {
			background-color: rgb(139,0,0);
		}
	}

	&__border {
		width: 50%;
		margin-top: 20px;
	}
}
</style>
