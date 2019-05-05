module.exports = {
  lintOnSave: false,
  filenameHashing: false,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
};
