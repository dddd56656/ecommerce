# 选择官方 Node.js 镜像
FROM node:14

# 设置工作目录（镜像内文件夹名，可自定义）
WORKDIR /app

# 只复制 package.json 和 package-lock.json（利用缓存加速）
COPY package*.json ./

# 安装依赖
RUN npm install --production

# 复制项目所有源代码（代码、配置、路由、控制器等）
COPY . .

# （如有 .env 文件，通常也一起 COPY）

# 镜像暴露端口（比如你的服务监听 3000 端口）
EXPOSE 3000

# 启动命令
CMD ["npm", "start"]
