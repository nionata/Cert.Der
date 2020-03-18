<template>
    <div id="app">
        <h1>CERT.DER</h1>

        <div v-if="isLoggedIn">
            <dashboard :user="user">
            </dashboard>
        </div>

        <div v-else>
            <!-- Do login here -->
        </div>
    </div>
</template>

<script>

export default {
    name: 'App',
    data: function() {
        return {
            user: null,
        }
    },

    mounted()
    {
        // Do login shit here
        // for now, just set a username to 'wcosker'
        this.user = 'wcosker'
    },

    computed:
    {
        isLoggedIn()
        {
            return this.user !== null
        },
    },

    methods:
    {
        // ...
    }
}
</script>

<style>
body {
    background-color: #42b883;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
}

h1 {
    text-align: center;
    color: #fff;
}
</style>
