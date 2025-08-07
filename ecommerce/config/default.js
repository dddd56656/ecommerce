module.exports = {
  db_config: {
    host: process.env.DB_HOST || "192.168.31.100",
    dbname: process.env.DB_NAME || "ecommerce",
    user: process.env.DB_USER || "admin",
    pass: process.env.DB_PASS || "YourStrongPassword",
    secret: process.env.JWT_SECRET || "your_super_secret_key",
    port: process.env.DB_PORT || "27017"
  }
};
