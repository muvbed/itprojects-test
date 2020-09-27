<template>
	<div class="wrapper contactsList">
		<h1 class="caption">Contacts list</h1>

		<!-- Триггер вызова модального окна добавления новых контактов -->
		<button class="contactsList__add" @click="modalsParams.type = 'AddContact'">Add new contact</button>

		<!-- Вывод списка контактов -->
		<ul class="contactsList__list" v-if="contacts.length != 0">
			<li class="contactItem" v-for="({name, phone}, index) in contacts" :key="index">
				<h2 class="contactItem__name">{{ name }}</h2>
				<a :href="`tel:${$options.filters.phoneDecoder(phone)}`" class="contactItem__phone">{{ phone }}</a>
				<div class="contactItem__btns">
					<router-link :to="`/index${index}`" class="contactItem__button contactItem__button_link">Details</router-link>
					<button class="contactItem__button contactItem__button_del" @click="modalsParams = {type: 'DelContact', args: {name, index}}">Delete</button>
				</div>
				<hr class="contactItem__border">
			</li>
		</ul>

		<!-- Вывод сообщения в случае пустого списка контактов -->
		<div class="contactsList__empty" v-else>Your contacts list is empty</div>

		<!-- Компонент вывода модальных окон -->
		<transition name="fade">
			<ModalsWrapper 
			:params="modalsParams"
			@close-modals="modalsParams.type = ''"
			v-if="modalsParams.type != ''"
			/>
		</transition>
	</div>
</template>

<script>
import { mapState } from "vuex"

import ModalsWrapper from '@/components/ModalsWrapper'

export default {
	name: 'ContactsList',
	components: {
		ModalsWrapper
	},
	data() {
		return {
			modalsParams: {
				type: '',
				args: {}
			}
		}
	},
	filters: {
		phoneDecoder(phone) { // Преобразование номера телефона контакта в приемлемый для ссылки формат
			if (!phone) return
			return phone.replace(/-|\)|\(|\s/gi, '')
		}
	},
	computed: mapState({contacts: state => state.contacts.contacts})
}
</script>

<style lang="scss" scoped>
.contactsList {
	&__add {
		@include button;
		display: block;
		width: 170px;
		margin: 20px auto;
		padding: 14px 5px;
		font-size: 14px;
		background-color: $green;
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

.contactItem {
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
			color: $light-blue;
			border-bottom: 1px dashed $light-blue;
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
			background-color: $gray;
		}

		&_del {
			background-color: $red;
		}
	}

	&__border {
		width: 50%;
		margin-top: 20px;
	}
}
</style>
