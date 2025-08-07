const mongoose = require("mongoose")
const config = require("config")

const { host, port, user, pass, dbname } = config.get("db_config")
console.log(host, port, user, pass, dbname)
mongoose
  .connect(
    `mongodb://${user}:${pass}@${host}:${port}/ecommerce?authSource=admin`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true, // Mongoose 6.x以后可以去掉
    }
  )
  .then(() => console.log("数据库连接成功"))
  .catch(err => console.log("数据库连接失败", err));
