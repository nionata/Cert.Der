<template>
    <div id="app">
        <h1>CERT.DER</h1>

        <div v-if="isLoggedIn">
            <dashboard :user="user">
            </dashboard>
        </div>

        <div v-else
            class="container">
            <div class="col-md-6 offset-md-3 align-items-center">
                <input id="login"
                    type="text"
                    class="col mb-2"
                    v-model="credentials.user"
                    name="login"
                    placeholder="login">

                <input id="password"
                    type="password"
                    class="col mb-2"
                    v-model="credentials.pass"
                    name="login"
                    placeholder="password">

                <input id="submit"
                    type="submit"
                    class="col mb-2"
                    value="Log In"
                    @click.prevent="attemptLogin()">
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'App',
    data: function() {
        return {
            user: null,
            credentials: {
                user: null,
                pass: null,
            }
        }
    },

    mounted()
    {
        // Do login shit here
        // for now, just set a username to 'wcosker'
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
        attemptLogin()
        {
            const self = this

            const path = process.env.VUE_APP_API_HOST + 'auth/login'

            axios.post(path, {
                "Username": self.credentials.user,
                "Password": self.credentials.pass,
            })
            .then(function (response) {
                console.log(response)
                self.user = response
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Invalid login. Please try again.'
                })
            })
            .finally(function () {
                self.credentials.pass = null
            })
        }
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
