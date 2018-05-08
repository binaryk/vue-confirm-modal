import ConfirmModal from '@/components/ConfirmModal.vue'
import { events }    from './events'

const Confim = {
    install(Vue, params = {}) {
        if (this.installed) {
            return
        }

        this.installed = true
        this.params = params

        Vue.component('vue-confirm-modal', ConfirmModal)

        Vue.prototype.$confirm = (params) => {
            if (typeof params === 'string') {
                params = { message: '', props: params }
            }

            if (typeof params === 'object') {
                events.$emit('show', params)
            }
        }
    }
}

export default Confim
