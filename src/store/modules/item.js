export default {
    state: {
        items: [
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
        commitAddItem({commit}, item) {
            commit('ADD_ITEM', item);
        },
        commitDelItem({commit}, id) {
            commit('DEL_ITEM', id);
        },
        commitUpdItem({commit}, args) {
            commit('UPD_ITEM', args)
        }
    },
    mutations: {
        ADD_ITEM(state, item) { // Занесение нового контакта в начало списка всех контактов
            state.items.unshift(item)
        },
        DEL_ITEM(state, id) { // Удаление контакта по идентификатору из списка всех контактов
            state.items.splice(id, 1)
        },
        UPD_ITEM(state, [id, item]) { // Обновление контакта по идентификатору
            state.items[id] = {...item}
        }
    },
    getters: {
        getAllItems(state) { // Получение списка всех контактов
            return state.items
        }
    }
}
