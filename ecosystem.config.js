module.exports = {
  apps : [
    {
      name      : 'blog',
      script    : 'app.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },
  ],
  deploy : {
    production : {
      user : 'houxingyi',
      host : '47.254.26.35',
      port : '3999',
      ref  : 'origin/master',
      repo : 'git@houxingyi:HouXingYi/my_blog.git',
      path : '/www/blog',
      'ssh_options': "StrictHostKeyChecking=no",
      'post-deploy' : "cnpm install express && pm2 startOrRestart ecosystem.config.js --env production",
      'env': {
          "NODE_NEV": "production"
      }
    },
  }
};
