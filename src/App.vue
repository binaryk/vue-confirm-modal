<template>
    <div id="app">
        <vue-confirm-modal ref="confirm" message="Hey modal"></vue-confirm-modal>
        <button @click="showModal">Show modal</button>
    </div>
</template>

<script>
    export default {
        name: 'app',
        components: {},
        methods: {
            showModal() {
                this.$refs.confirm.show().ok(() => {
                    console.log('Ok');
                }).cancel(() => {
                    console.log('Cancel');

                })
            }
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
