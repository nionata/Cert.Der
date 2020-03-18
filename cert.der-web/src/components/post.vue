<template>
    <div class="hello">
        <div class="container">
            <div class="row">
                <div class="col-md-2">
                    <!-- Profile pic goes here -->
                    <img :src="avatar"
                        class="rounded-circle"
                        height="75px">
                </div>
                <div class="col-md-10">
                    <!-- Body goes here -->
                    {{ msg }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Post',
        props: {
            author: String,
            msg: String,
            avatar: String,
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .rounded-circle {
        text-align: center;
    }
</style>