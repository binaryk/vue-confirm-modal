<template>
    <el-dialog :title="title"
               class="vue-confirm-modal"
               v-bind:class="{'body-none': !message && !$slots.default}"
               center
               :modal-append-to-body="false"
               :append-to-body="appendToBody"
               :visible="showModal"
               :width="'50%'"
               :before-close="beforeCloseNative">
        <slot>
            <span>{{ message }}</span>
        </slot>
        <span slot="footer" class="dialog-footer">
    <slot name="footer">
       <el-button id="save-button" type="success" :loading="loading" @click.native="confirm">
         {{ confirmLabel }}
       </el-button>
      <el-button id="close-button" type="danger" @click.native="close">
        {{ cancelLabel }}
      </el-button>
    </slot>
    </span>
    </el-dialog>
</template>
<script>
    import { Dialog, Button } from 'element-ui';

    export default {
        name: 'Confirm',
        components: {
            [Dialog.name]: Dialog,
            [Button.name]: Button
        },
        props: {
            title: {
                type: String,
                default: undefined
            },
            className: {
                type: String,
                default: ''
            },
            autonom: {
                type: Boolean,
                default: true
            },
            visible: {
                type: Boolean,
                default: false
            },
            message: {
                type: String,
                default: ''
            },
            cancelLabel: {
                type: String,
                default: 'Cancel'
            },
            confirmLabel: {
                type: String,
                default: 'Yes'
            },
            loading: {
                type: Boolean,
                default: false
            },
            closeOnConfirm: {
                type: Boolean,
                default: true
            },
            appendToBody: {
                type: Boolean,
                default: true
            },
            beforeClose: {
                type: Function,
                default: () => ({})
            }
        },
        computed: {
            showModal() {
                if (this.autonom) {
                    return this.autonomVisible;
                }

                return this.visible;
            }
        },
        data() {
            return {
                promise: undefined,
                beforeConfirm: () => {
                },
                beforeCancel: () => {
                },
                autonomVisible: false
            };
        },
        methods: {
            async beforeCloseNative(done) {
                await this.beforeClose();
                if (this.autonom) {
                    this.autonomVisible = false;
                } else {
                    this.$emit('update:visible', false);
                }
                done();
            },
            async close() {
                // This function should be defined as block variable, to not have mutable pointer
                let done = () => {
                    if (this.autonom) {
                        this.autonomVisible = false;
                    } else {
                        this.$emit('update:visible', false);
                    }
                };
                if (this.beforeCancel) {
                    await this.beforeCancel(done);
                }
                done();
            },
            async confirm() {
                let done = () => {
                    if (this.autonom) {
                        this.autonomVisible = false;
                    } else {
                        this.$emit('update:visible', false);
                    }
                };
                if (this.beforeConfirm) {
                    await this.beforeConfirm(done);
                }
                if (this.closeOnConfirm) {
                    done();
                }
            },
            ok(cb) {
                this.beforeConfirm = cb;

                return {
                    cancel: this.cancel
                };
            },
            cancel(cb) {
                this.beforeCancel = cb;
                return {
                    ok: this.ok
                };
            },
            show() {
                if (this.autonom) {
                    this.autonomVisible = true;
                } else {
                    this.$emit('update:visible', true);
                }
                return {
                    ok: this.ok,
                    cancel: this.cancel
                };
            },
            async hide() {
                await this.beforeCloseNative(() => {
                });
            }
        }
    };
</script>
<style lang="scss">
    .vue-confirm-modal {
        .el-dialog {
            .el-dialog__title {
                color: #383E49;
                font-weight: bold;
            }

            .el-dialog__header,
            .el-dialog__body,
            .el-dialog__footer {
                background-color: #F6F6F7;
            }

        }
    }
    .body-none {
        .el-dialog__body {
            display: none !important;
        }
    }
</style>
