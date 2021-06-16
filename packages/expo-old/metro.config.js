const { createMetroConfiguration } = require('expo-yarn-workspaces')

const config = createMetroConfiguration(__dirname)

config.resolver.assetExts = [...config.resolver.assetExts, 'hcscript']

module.exports = config
