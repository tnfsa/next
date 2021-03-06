const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const prod = process.env.NODE_ENV === 'production'

module.exports = withPWA({
    pwa:{
        dest: 'public',
        disable: !prod,
        runtimeCaching
    },
    webpack5: true,
    images: {
        domains: [
            "database.tnfsa.org",
            "lunchapi.hsuan.app",
            "raw.sivir.pw",
            "via.placeholder.com"
        ]
    }
})