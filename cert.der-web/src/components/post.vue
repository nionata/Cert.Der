<template>
<div class="row pt-2 pb-1 mb-2"
    :class="{ pinned : pinned }"
>
    <div class="col-md-10">
        <strong>{{ username }}</strong><br>
        {{ content }}
    </div>

    <div v-if="isAdmin"
        class="col-md-2"
        style="float: right;"
        @click.prevent="adminPinPost()"
    >
        <font-awesome-icon icon="thumbtack" />

        <font-awesome-icon v-if="isFavoritingPost"
            icon="spinner" spin/>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import apiMixin from '../mixins/api'
import Swal from 'sweetalert2'

    export default {
        name: 'Post',

        mixins: [
            apiMixin,
        ],

        props: {
            content: String,
            id: Number,
            pinned: Boolean,
            username: String,
            isAdmin: Boolean,
        },

        data: () => {
            return {
                isFavoritingPost: false,
            }
        },

        methods: {
            adminPinPost()
            {
                const self = this
                this.isFavoritingPost = true

                const path = self.getPath(`posts/${this.id}`)
                const params = {

                }

                return axios.put(path, params)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'W00t!',
                        text: 'Successfully favorited post, Admin!'
                    })
                })
                .catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'WHO ARE YOU',
                        text: 'ARE YOU AN ADMIN?!?'
                    })
                })
                .finally(() => {
                    self.isFavoritingPost = false
                })
            },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .avatar {
        text-align: center;
    }

    .pinned {
        border-style: dotted;
    }
</style>
