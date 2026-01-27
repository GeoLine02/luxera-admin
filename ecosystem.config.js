module.exports = {
  apps: [
    {
      name: "luxera-admin",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 0.0.0.0 -p 3000",
      cwd: "/root/luxera-admin",
      // Environment variables (used at RUNTIME)
      env: {
        NODE_ENV: "production",
      },
      // Environment variables (used at BUILD TIME)
      env_production: {
        NODE_ENV: "production",
        PROD_API_URL: "https://api.luxeragift.com",
      },
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
    },
  ],
};
