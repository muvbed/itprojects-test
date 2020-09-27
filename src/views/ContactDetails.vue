<template>
	<div class="wrapper contactDetails">
		<h1 class="caption">Contact details</h1>
		<div class="contactDetails__control">

			<!-- Триггер вызова модального окна добавления новых полей -->
			<button class="contactDetails__button contactDetails__button_add" @click="modalsParams = {type: 'AddField', args: {localeItem, step, contactIndex}}">Add field</button>

			<!-- Триггер вызова метода отмены последних внесенных изменений -->
			<button :class="{contactDetails__button_disable: step === 0, contactDetails__button_rllbck: step > 0}" class="contactDetails__button" @click="backStep">Roll back</button>
		</div>

		<!-- Вывод полей контакта -->
		<ul class="contactDetails__list">
			<li class="contactField" v-for="(value, key, index) in localeItem[step]" :key="index">
				<div class="contactField__text">
					<span class="contactField__key">{{ key }}: </span>
					<span class="contactField__value">{{ value }}</span>
				</div>
				<div class="contactField__control">
					<i class="material-icons contactField__button contactField__button_edit" @click="modalsParams = {type: 'EditField', args: {localeItem, step, value, key, index}}">edit</i>
					<i class="material-icons contactField__button contactField__button_del" @click="modalsParams = {type: 'DelField', args: {localeItem, step, key, index}}" v-if="key != 'name' && key != 'phone'">cancel</i>
				</div>
			</li>
		</ul>

		<!-- Компонент вывода модальных окон -->
		<transition name="fade">
			<ModalsWrapper 
			:params="modalsParams"
			@close-modals="modalsResult"
			v-if="modalsParams.type != ''"
			/>
		</transition>
	</div>
</template>

<script>
import { mapState } from "vuex"

import ModalsWrapper from '@/components/ModalsWrapper'

export default {
	name: 'ContactDetails',
	components: {
		ModalsWrapper
	},
	data() {
		return {
			localeItem: [],
			step: 0,
			contactIndex: window.location.hash.split('index')[1], // Получение индекса контакта
			modalsParams: {
				type: '',
				args: {}
			}
		}
	},
	computed: mapState({contacts: state => state.contacts.contacts}),
	methods: {
		backStep() { // Отмена последнего внесенного изменения (шаг назад)
			if (this.step === 0) return
			this.step--
			this.updContact([this.contactIndex, this.localeItem[this.step]])
		},
		modalsResult(arg) {
			this.modalsParams.type = ''
			if (!arg) return
			this.localeItem = arg.localeItem
			this.step = arg.step
		}
	},
	created() {
		this.localeItem.push({...this.contacts[this.contactIndex]}) // Копирование контакта по индексу из списка контактов в локальную переменную 
																	// для реализации истории внесенных изменений
	}
}
</script>

<style lang="scss" scoped>
.contactDetails {
	&__control {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	&__button {
		@include button;
		width: 120px;
		margin: 0 10px;
		padding: 14px 5px;
		font-size: 14px;
		border-radius: 30px;

		&_add {
			background-color: $green;
		}

		&_rllbck {
			background-color: $light-blue;
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

.contactField {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 15px 0;
	padding-bottom: 5px;
	word-break: break-all;
	font-size: 16px;
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

		&_edit {
			color: $gray;
		}

		&_del {
			margin-left: 10px;
			color: $red;
		}
	}
}
</style>
