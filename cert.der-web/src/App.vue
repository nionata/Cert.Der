<template>
    <div id="app">
        <div v-if="isLoggedIn"
            class="pull-right"
        >
            <button
                class="btn btn-primary mr-3"
                style="float: right;"
                @click.prevent="logout()"
            >
                Log out
            </button>
        </div>

        <h1>CERT.DER</h1>

        <div v-if="isLoggedIn">
            <dashboard :user="user">
            </dashboard>
        </div>

        <div v-else
            class="container">
            <div class="col-md-8 offset-md-2 align-items-center text-center">
                <h3>{{ currentMethod }}</h3>
                <p>
                    {{ logInHelpText }} <a href="#" @click.prevent="toggleSignup()">Click here to {{ changeMethodText }}.</a>
                </p>

                <input id="login"
                    type="text"
                    class="col mb-2"
                    v-model="credentials.user"
                    name="login"
                    placeholder="Username">

                <input id="password"
                    type="password"
                    class="col mb-2"
                    v-model="credentials.pass"
                    name="pass"
                    placeholder="Password">

                <input id="confirmPass"
                    v-show="isSigningUp"
                    type="password"
                    class="col mb-2"
                    v-model="credentials.confirmPass"
                    name="confirmPass"
                    placeholder="Confirm Password">

                <input id="profilePicUrl"
                    v-show="isSigningUp"
                    type="text"
                    class="col mb-2"
                    v-model="credentials.profilePicUrl"
                    name="profilePicUrl"
                    placeholder="URL to Profile Picture (Optional)">

                <input id="submit"
                    type="submit"
                    class="btn btn-primary mb-2"
                    :value="submitText"
                    @click.prevent="requestAction()">
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import apiMixin from './mixins/api'

export default {
    name: 'App',

    mixins: [apiMixin],

    data: function() {
        return {
            // Page
            isSigningUp: false,

            // Session
            user: {
                userId: null,
                admin: false,
                auth: false,
            },
            credentials: {
                user: null,
                pass: null,
                confirmPass: null,
                profilePicUrl: null,
            },
        }
    },

    mounted()
    {
        const self = this
        const path = self.getPath('auth/status')

        axios.get(path)
        .then((res) => {
            const { userId, admin, auth } = res.data.status

            self.user.userId = userId
            self.user.admin = admin
            self.user.auth = auth
        })
        .catch((err) => {
            console.error(err)
        })
    },

    computed:
    {
        isLoggedIn()
        {
            return this.user.userId !== null
        },

        submitText()
        {
            return this.isSigningUp
                ? "Sign Up"
                : "Log In"
        },

        logInHelpText()
        {
            return this.isSigningUp
                ? 'Already have an account?'
                : 'Don\'t have an account yet?'
        },

        currentMethod()
        {
            return this.isSigningUp
                ? 'Sign Up'
                : 'Log In'
        },

        changeMethodText()
        {
            return this.isSigningUp
                ? 'log in'
                : 'sign up'
        },
    },

    methods:
    {
        requestAction()
        {
            return this.isSigningUp
                ? this.attemptSignUp()
                : this.attemptLogin()
        },

        attemptSignUp()
        {
            const self = this
            const path = self.getPath('auth/signup')
            const params = {
                "Username": self.credentials.user,
                "Password": self.credentials.pass,
                "Admin": false,
                "ProfilePic": self.credentials.profilePicUrl,
            }

            if (!this.validateSignUp())
                return

            return axios.post(path, params)
            .then((res) => {
                self.user.userId    = res.data.id
                self.user.admin     = (res.data.admin == 1 ? true : false)
            })
            .catch((err) => {
                console.error('Error signing up', err)
            })
        },

        attemptLogin()
        {
            const self = this

            const path = self.getPath('auth/login')
            const params = {
                "Username": self.credentials.user,
                "Password": self.credentials.pass,
            }

            axios.post(path, params)
            .then((res) => {
                self.user.userId    = res.data.id
                self.user.admin     = (res.data.admin == 1 ? true : false)
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Invalid login. Please try again.'
                })

                console.error(err)
            })
            .finally(() => {
                self.credentials.pass = null
            })
        },

        toggleSignup()
        {
            this.isSigningUp = ! this.isSigningUp

            if (!this.isSigningUp)
            {
                this.credentials.confirmPass = null
                this.credentials.profilePicUrl = null
            }
        },

        validateSignUp()
        {
            let errors = []
            if (this.credentials.pass !== this.credentials.confirmPass)
                errors.push('Passwords do not match.')

            if (this.credentials.user === null || this.credentials.user === '')
                errors.push('Please supply a Username.')

            if (errors.length > 0)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html: errors.join(`<br>`)
                })

            return errors.length === 0
        },

        getCookie(c_name)
        {
            if (document.cookie.length > 0) {
                let c_start = document.cookie.indexOf(c_name + "=")
                if (c_start != -1) {
                    c_start = c_start + c_name.length + 1
                    let c_end = document.cookie.indexOf(";", c_start)
                    if (c_end == -1) {
                        c_end = document.cookie.length
                    }
                    return unescape(document.cookie.substring(c_start, c_end))
                }
            }
            return null
        },

        createCookie(name,value,days) {
            let expires
            if (days) {
                const date = new Date()
                date.setTime(date.getTime()+(days*24*60*60*1000))
                expires = "; expires="+date.toGMTString()
            }
            else
                expires = ""
            document.cookie = name+"="+value+expires+"; path=/"
        },

        eraseCookie(name)
        {
            this.createCookie(name, "", -1)
        },

        logout()
        {
            var cookies = document.cookie.split(";")

            for (var i = 0; i < cookies.length; i++)
                this.eraseCookie(cookies[i].split("=")[0])

            this.user.admin     = false
            this.user.auth      = false
            this.user.userId    = null
        },
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
    color: #35495e;
}
</style>
