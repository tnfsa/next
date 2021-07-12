module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_LOCATION,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies:[
            {userAgent: '*',Disallow: '/'}
        ]
    }
}