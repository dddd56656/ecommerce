#!/bin/bash

# ========== 配置部分 ==========
IMAGE_NAME="ecommerce-api"
IMAGE_TAG="0.0.1"
OUTPUT_TAR="ecommerce-api.tar"
# ========== 切换淘宝镜像源 ==========
echo "🟢 设置本机 npm 镜像源为淘宝镜像"
npm config set registry https://registry.npmmirror.com/
# ========== 脚本开始 ==========

set -e

echo "1️⃣  开始构建 Docker 镜像..."
docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .

echo "2️⃣  镜像构建完成，准备导出为 images 包..."

# 检查是否有旧的 tar 文件
if [ -f "$OUTPUT_TAR" ]; then
    echo "⚠️  发现已有 $OUTPUT_TAR，删除旧文件..."
    rm -f "$OUTPUT_TAR"
fi

docker save -o $OUTPUT_TAR ${IMAGE_NAME}:${IMAGE_TAG}

echo "✅  镜像已成功导出为 $OUTPUT_TAR"

echo "3️⃣  镜像包校验："
ls -lh $OUTPUT_TAR

echo "🎉  All done! 你可以用 docker load < $OUTPUT_TAR 导入 images 包"
