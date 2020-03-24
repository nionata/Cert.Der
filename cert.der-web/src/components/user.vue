<template>
<div class="mb-3 mt-3">
    <div class="col-md-2">
        <img :src="correctedProfilePicUrl"
            class="rounded-circle"
            height="75px" />
    </div>

    <div class="col-md-10">
        <strong>Username</strong>: {{ username }}<br>
        <strong>ID</strong>: {{ id }}<br>
        <strong>Admin</strong>: {{ isAdmin }}
    </div>
</div>
</template>

<script>
    export default {
        name: 'Post',

        mixins: [
            // ...
        ],

        props: {
            id: Number,
            username: String,
            isAdmin: Boolean,
            profilePicUrl: String,
        },

        data: () => {
            return {
                // ...
            }
        },

        methods:
        {
            // ...
        },

        computed: {
            correctedProfilePicUrl()
            {
                return (this.profilePicUrl !== null && this.profilePicUrl !== "")
                    ? this.profilePicUrl
                    : "/default.png"
            },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    /*  */
</style>
