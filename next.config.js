module.exports = {
    exportPathMap: function() {
      return {
        '/': { page: '/' }
      }
    },
    assetPrefix: '',
    webpack: function(config){
      config.output.publicPath = '.'
      return config
    }
  }