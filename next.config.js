module.exports = {
  webpack: (config) => {
    config.experiments = config.experiments || {}
    config.experiments.topLevelAwait = true
    return config
  },
  reactStrictMode: true,
    images: {
    domains: ['cdn.discordapp.com'],
  },
  distDir: "dev",
}
