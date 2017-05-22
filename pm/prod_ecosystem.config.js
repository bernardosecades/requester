module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : "Requester-PROD",
      script    : "./app.js",
      watch     : false,
      exec_mode : "cluster",
      instances : 8,
      max_restarts: 15,
      max_memory_restart: "3G",
      cwd: "/var/www/current"
    }
  ]
}
