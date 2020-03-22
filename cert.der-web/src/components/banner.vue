<template>
<div>
    <h4 class="text-center" v-html="bannerText">
    </h4>
</div>
</template>

<script>
import axios from 'axios'
import apiMixin from '../mixins/api'

export default {
    name: 'Banner',

    props: {
        user: Object,
    },

    mixins: [
        apiMixin
    ],

    data: function() {
        return {
            username: null,
        }
    },

    watch: {
        user: () => {
            if (this.user.userId != null && this.user.userId != "")
                this.getUserFromApi()
        }
    },

    mounted()
    {
        if (this.user.userId != null)
            this.getUserFromApi()
    },

    computed:
    {
        bannerText()
        {
            return (this.username != null && this.username != "")
                ? `Welcome back, <strong>${this.username}</strong>!`
                : `Welcome back!`
        },
    },

    methods:
    {
        getUserFromApi()
        {
            if (typeof this.user.userId !== 'number')
                return

            const self = this
            const path = self.getPath(`users/${this.user.userId}`)

            return axios.get(path)
            .then((res) => {
                self.username = res.data.user[0].Username
            })
            .catch((err) => {
                console.error('Error getting user', err)
            })
        },
    }
}
</script>

<style>
    /* ... */
</style>
