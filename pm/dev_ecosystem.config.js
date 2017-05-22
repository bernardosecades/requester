module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : "Requester-DEV",
      script    : "./app.js",
      watch     : true,
      exec_mode : "cluster",
      instances : 4,
      max_restarts : 5,
      min_uptime : "1",
      max_memory_restart: "3G",
      env: {
        NODE_ENV: "dev",
        NODE_DEBUG_REQUESTER: true,
        RABBITMQ_HOST: "rabbit01-devel",
        RABBITMQ_PORT: 5672,
        RABBITMQ_USER: "user",
        RABBITMQ_PASSWORD: "password",
        RABBITMQ_VHOST: "vhost",
        STATSD_HOST: "localhost",
        STATSD_PORT: 8125
      }
    }
  ]
}
