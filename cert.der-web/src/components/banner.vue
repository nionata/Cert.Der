<template>
<div>
    <div style="height: 100%;">
        {{ bannerText }}
    </div>
</div>
</template>

<script>
import axios from 'axios'
import apiMixin from '../mixins/api'

export default {
    name: 'Banner',

    props: {
        user: Object,
        username: null,
    },

    mixins: [
        apiMixin
    ],

    data: function() {
        return {
            // ...
        }
    },

    mounted()
    {
        if (this.userId != null)
        {
            this.getUserFromApi()
        }
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

            return axios.post(path)
            .then((res) => {
                console.log('get user response', res.data[0].Username)
                self.username = res.data[0].Username
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
