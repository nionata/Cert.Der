const fs = require('fs')

module.exports = {
    devServer: {
        https: {
            key: process.env.NODE_ENV === 'production' ? null : fs.readFileSync('./certs/example.com+5-key.pem'),
            cert: process.env.NODE_ENV === 'production' ? null : fs.readFileSync('./certs/example.com+5.pem'),
        },
        public: process.env.NODE_ENV === 'production' ? null : 'https://localhost:8080/',
        proxy: process.env.NODE_ENV === 'production' ? null : process.env.VUE_APP_API_HOST
    }
}