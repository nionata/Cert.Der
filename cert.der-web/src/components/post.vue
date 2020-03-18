<template>
    <div class="container m-2">
        <div class="row">
            <div class="col-md-2 avatar">
                <!-- Profile pic goes here -->
                <img :src="avatar"
                    class="rounded-circle"
                    height="75px">
            </div>
            <div class="col-md-10">
                <!-- Body goes here -->
                <strong>{{ author }}</strong><br>
                {{ msg }}
            </div>
        </div>

        <hr v-if="!isLastPost">
    </div>
</template>

<script>
    export default {
        name: 'Post',
        props: {
            author: String,
            msg: String,
            avatar: String,
            isLastPost: Boolean,
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .avatar {
        text-align: center;
    }
</style>