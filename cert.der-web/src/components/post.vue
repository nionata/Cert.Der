<template>
    <div class="hello">
        <div class="container">
            <div class="row">
                <div class="col-md-2">
                    <!-- Profile pic goes here -->
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
            msg: String
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* CSS Goes here */
</style>