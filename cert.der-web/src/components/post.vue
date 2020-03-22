<template>
    <div class="container m-2">
        <div class="row">
            <div class="col-md-2 avatar">
            </div>
            <div class="col-md-10">
                <strong>{{ username }}</strong><br>
                {{ content }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Post',
        props: {
            content: String,
            id: Number,
            pinned: Boolean,
            username: String,
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .avatar {
        text-align: center;
    }
</style>
