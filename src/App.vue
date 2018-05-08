<template>
    <div id="app">
        <img src="./assets/logo.png">
        <confirm-modal ref="confirm" message="Hey modal" :visible="true"></confirm-modal>
        <button @click="$refs.confirm.show()">Show modal</button>
    </div>
</template>

<script>
    import ConfirmModal from '@/components/ConfirmModal'

    export default {
        name: 'app',
        components: {
            ConfirmModal
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
