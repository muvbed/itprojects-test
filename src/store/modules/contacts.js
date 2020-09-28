export default {
    state: {
        contacts: [
            {
                name: 'Vlad Igorev',
                phone: '+7 (495) 640-44-16',
                email: 'igorevv@mail.ru'
            },
            {
                name: 'Alex Prosandeev',
                phone: '+7 (987) 111-22-33',
                email: 'appro@gmail.com'
            },
            {
                name: 'Elena Surikova',
                phone: '+7 (099) 654-32-13',
                email: 'esur@gmail.com'
            }
        ]
    },
    actions: {
        addContact({commit}, contact) {
            commit('ADD_CONTACT', contact)
        },
        delContact({commit}, index) {
            commit('DEL_CONTACT', index)
        },
        updContact({commit}, args) {
            commit('UPD_CONTACT', args)
        }
    },
    mutations: {
        ADD_CONTACT(state, contact) { // Занесение нового контакта в начало списка всех контактов
            state.contacts.unshift(contact)
        },
        DEL_CONTACT(state, index) { // Удаление контакта по индексу из списка всех контактов
            state.contacts.splice(index, 1)
        },
        UPD_CONTACT(state, [index, contact]) { // Обновление контакта по индексу
            state.contacts[index] = {...contact}
        }
    }
}
