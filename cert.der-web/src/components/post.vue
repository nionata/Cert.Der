<template>
<div class="row pt-2 pb-1 mb-2"
    :class="{ pinned : pinned }"
>
    <div class="col-md-2 avatar">
        <!-- Profile pic goes here -->
        <img :src="correctedProfilePicUrl"
            class="rounded-circle"
            height="75px"
        />
    </div>

    <div class="col-md-8">
        <strong>{{ username }}</strong><br>
        {{ content }}
    </div>

    <div v-if="isAdmin"
        class="col-md-2 text-right"
        style="float: right;"
        @click.prevent="adminPinPost()"
    >
        <span class="small">
            Admin:
            <font-awesome-icon icon="thumbtack" />
        </span>

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
            profilePicUrl: String,
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

                return axios.put(path)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'W00t!',
                        text: 'Successfully favorited post, Admin!'
                    })

                    setTimeout(() => {
                        self.$emit('getPosts')
                    }, 500)
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

        correctedProfilePicUrl()
        {
            return (this.profilePicUrl !== null && this.profilePicUrl !== "")
                ? this.profilePicUrl
                : "//i.stack.imgur.com/l60Hf.png"
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
