<template>
    <div class="mb-3">
        <strong>{{ username }}</strong><br>
        {{ content }}
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
