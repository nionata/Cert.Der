<template>
    <div id="app">
        <h1>CERT.DER</h1>

        <div v-if="hasPosts">
            <post v-for="post in posts"
                :key="post.id"
                :author="post.author"
                :msg="post.body"
                :avatar="post.avatar"
                :isLastPost="isLastPost(post.id)"
            ></post>
        </div>
    </div>
</template>

<script>

export default {
    name: 'App',
    data: function() {
        return {
            posts: null
        }
    },

    mounted()
    {
        // On mount of home component, fetch the data
        // and set the posts variable equal to that.
        // For now, just fake it with some data
        this.posts = [
            {
                id: 0,
                author: "Cill Wosker",
                body: "Hi my name is Will and I have a fish tank.",
                avatar: "https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9/62137754_2823978797629280_8994703511249747968_n.jpg?_nc_cat=101&_nc_sid=85a577&_nc_oc=AQnV1CbrS6SaQDDcUoEnG0OvNA9O3GP4I2GqSDxDJp1QjabnD81JQdIj6WAcas9z2cg&_nc_ht=scontent-mia3-1.xx&oh=6c07df497f272fd4fa134ee96b40ebc2&oe=5E966454",
            },
            {
                id: 1,
                author: "Luap Pe Grand",
                body: "Hi my name is Paul and I don't have a fish tank.",
                avatar: "https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9/p960x960/44807397_2457104064316757_7475865172574208000_o.jpg?_nc_cat=100&_nc_sid=7aed08&_nc_oc=AQkbLDDR-dx8YOZyoOY2KksvIGhtvWsEnsWX4uED1oAD18P9vJOQjwedHwYsZTfJBY0&_nc_ht=scontent-mia3-1.xx&_nc_tp=6&oh=c0b99370e223c7824661665b37c602b2&oe=5E964CE7",
            }
        ]
    },

    computed:
    {
        hasPosts()
        {
            return this.posts !== null && this.posts.length > 0
        },
    },

    methods:
    {
        isLastPost(id)
        {
            return this.hasPosts && (id === this.posts.length - 1)
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
    color: #fff;
}
</style>
