module.exports = {
    apps: [
        {
            name: 'soundcloud-api',
            script: './dist/crawler/soundcloud-api.js',
            watch: 'false',
            instances: 1,
            autorestart: false,
            cron_restart: "*,10 * * * *"
        },
    ]
};
