<template>
	<div class="modals-wrapper">
		<!-- Модальное окно добавления нового контакта -->
		<AddContact 
		@close-add-contact="closeModals"
		v-if="params.type === 'AddContact'" 
		/>

		<!-- Модальное окно удаления контакта -->
		<DelContact 
		:args="params.args"
		@close-del-contact="closeModals"
		v-if="params.type === 'DelContact'" 
		/>

		<!-- Модальное окно добавления нового поля в контакт -->
		<AddField 
		:args="params.args"
		@close-add-field="closeModals"
		v-if="params.type === 'AddField'" 
		/>

		<!-- Модальное окно удаления поля контакта -->
		<DelField 
		:args="params.args"
		@close-del-field="closeModals"
		v-if="params.type === 'DelField'" 
		/>

		<!-- Модальное окно редактирования поля контакта -->
		<EditField 
		:args="params.args"
		@open-confirm-edit-field="confirmOver = true"
		@close-edit-field="closeModals"
		v-if="params.type === 'EditField'"
		/>

		<!-- Модальное окно подтверждения отмены редактирования поля контакта -->
		<ConfirmEditField 
		@close-confirm-edit-field="confirmOver = false" 
		@close-edit-field="closeModals"
		v-if="confirmOver" 
		/>
	</div>
</template>

<script>
import AddContact from './modals/AddContact'
import DelContact from './modals/DelContact'
import AddField from './modals/AddField'
import DelField from './modals/DelField'
import EditField from './modals/EditField'
import ConfirmEditField from './modals/ConfirmEditField'

export default {
	name: 'ModalsWrapper',
	components: {
		AddContact,
		DelContact,
		AddField,
		DelField,
		EditField,
		ConfirmEditField
	},
	props: ["params"],
	data() {
		return {
			confirmOver: false
		}
	},
	methods: {
		closeModals(args) {
			setTimeout(() => {
				document.body.removeAttribute('style')
			}, 300)

			args ? this.$emit('close-modals', args) : this.$emit('close-modals')
		}
	},
	mounted() {
		document.body.style.paddingRight = window.innerWidth - document.body.clientWidth + "px"
		document.body.style.overflow = 'hidden'
	}
}
</script>

<style lang="scss">
.modals-wrapper {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(0,0,0,0.5);
	overflow: auto;
}

.modal {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 350px;

	&__box {
		position: relative;
		width: 250px;
		padding: 25px;
		text-align: center;
		background-color: #fff;
		box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.75);
	}

	&__title {
		margin-top: 15px;
	}

	&__text {
		margin-bottom: 10px;
		font-family: 'Inter-LightBETA';
	}

	&__label {
		&_error {
			.modal__input {
				color: $red;
				border-bottom: 1px solid $red;
			}

			.modal__error {
				opacity: 1;
				visibility: visible;
			}
		}
	}

	&__input {
		width: 100%;
		margin: 5px 0;
		padding: 10px 0;
		border: 0;
		border-bottom: 1px solid black;
		outline: 0;

		&::placeholder {
			color: rgba(0,0,0,0.3);
		}
	}

	&__error {
		margin-bottom: 15px;
		text-align: left;
		font-size: 14px;
		color: $red;
		opacity: 0;
		visibility: hidden;
	}

	&__btns {
		display: flex;
		justify-content: center;
		margin-top: 25px;
	}

	&__button {
		@include button;
		width: 100%;
		margin: 0 5px;
		padding: 10px 5px;
		border-radius: 25px;

		&_green {
			background-color: $green;
		}

		&_red {
			background-color: $red;
		}

		&_gray {
			background-color: $gray;
		}
	}

	&__close {
		position: absolute;
		top: 10px;
		right: 14px;
		font-size: 30px;
		line-height: 0.66;
		overflow: hidden;
		cursor: pointer;
		transition: .3s;

		&:hover {
			color: $red;
			transform: scale(1.2);
		}
	}
}
</style>
