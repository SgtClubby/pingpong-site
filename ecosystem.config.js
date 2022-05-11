module.exports = {
  apps : [{
    name   : "Pingpong Site",
    script : "npm run start",
    out_file: '/var/log/pm2/pingpong-site/log.log',
    error_file: '/var/log/pm2/pingpong-site/error.log',
    env: {
      "NODE_ENV": "production",
      "NEXTAUTH_URL": "https://clom.by"
    }
  }]
}
