module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_LOCATION,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                disallow: '/sells*'
            },
            {
                userAgent: '*',
                disallow: '/service*'
            },{
                userAgent: '*',
                disallow: '/settings*'
            }
        ]
    },
    exclude: [
        "/sells/test",
        "/service",
        "/settings*",
    ]
}
