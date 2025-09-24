# 线上部署指南

本文档详细介绍如何将 Ant Design Pro 前端项目部署到生产环境。

## 部署方式选择

### 1. 云服务器部署（推荐）
适用于有云服务器（阿里云、腾讯云、AWS等）的情况。

### 2. 容器平台部署
适用于使用 Docker 容器服务的情况。

### 3. 静态网站托管
适用于纯静态部署的情况。

---

## 方式一：云服务器部署

### 前置条件
- 云服务器（Ubuntu/CentOS）
- 已安装 Docker 和 Docker Compose
- 域名（可选）
- SSL 证书（可选，用于 HTTPS）

### 步骤 1：准备服务器环境

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 安装 Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 启动 Docker 服务
sudo systemctl start docker
sudo systemctl enable docker

# 将当前用户添加到 docker 组
sudo usermod -aG docker $USER
```

### 步骤 2：上传项目文件

```bash
# 方式一：使用 git clone
git clone https://github.com/your-username/yiji-antd-frontend.git
cd yiji-antd-frontend

# 方式二：使用 scp 上传
# 在本地执行：
scp -r ./yiji-antd-frontend user@your-server-ip:/home/user/
```

### 步骤 3：配置生产环境

创建生产环境的 `docker-compose.prod.yml`：

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "80:80"
      - "443:443"  # 如果使用 HTTPS
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    volumes:
      # 如果有 SSL 证书
      - ./ssl:/etc/nginx/ssl:ro
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

### 步骤 4：部署应用

```bash
# 构建并启动服务
docker-compose -f docker-compose.prod.yml up -d --build

# 查看服务状态
docker-compose -f docker-compose.prod.yml ps

# 查看日志
docker-compose -f docker-compose.prod.yml logs -f frontend
```

### 步骤 5：配置域名和 SSL（可选）

如果有域名，可以配置 Nginx 反向代理：

```nginx
# /etc/nginx/sites-available/yiji-frontend
server {
    listen 80;
    server_name your-domain.com;
    
    # 重定向到 HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 方式二：容器平台部署

### 阿里云容器服务 ACK

1. **创建镜像仓库**
```bash
# 登录阿里云容器镜像服务
docker login --username=your-username registry.cn-hangzhou.aliyuncs.com

# 构建镜像
docker build -t registry.cn-hangzhou.aliyuncs.com/your-namespace/yiji-frontend:latest .

# 推送镜像
docker push registry.cn-hangzhou.aliyuncs.com/your-namespace/yiji-frontend:latest
```

2. **创建 Kubernetes 部署文件**

`k8s-deployment.yaml`：
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: yiji-frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: yiji-frontend
  template:
    metadata:
      labels:
        app: yiji-frontend
    spec:
      containers:
      - name: frontend
        image: registry.cn-hangzhou.aliyuncs.com/your-namespace/yiji-frontend:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: yiji-frontend-service
spec:
  selector:
    app: yiji-frontend
  ports:
  - port: 80
    targetPort: 80
  type: LoadBalancer
```

3. **部署到集群**
```bash
kubectl apply -f k8s-deployment.yaml
kubectl get pods
kubectl get services
```

### 腾讯云容器服务 TKE

类似阿里云，使用腾讯云的容器镜像仓库和 TKE 集群。

---

## 方式三：静态网站托管

### Vercel 部署（推荐）

1. **安装 Vercel CLI**
```bash
npm i -g vercel
```

2. **登录并部署**
```bash
vercel login
vercel --prod
```

3. **配置 vercel.json**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Netlify 部署

1. **构建项目**
```bash
npm run build
```

2. **上传 dist 目录到 Netlify**

3. **配置重定向规则**

创建 `public/_redirects` 文件：
```
/*    /index.html   200
```

### 阿里云 OSS + CDN

1. **构建项目**
```bash
npm run build
```

2. **上传到 OSS**
```bash
# 使用 ossutil 工具
ossutil cp -r dist/ oss://your-bucket-name/ --update
```

3. **配置 CDN 加速**

---

## 生产环境优化

### 1. 性能优化

```dockerfile
# 在 Dockerfile 中添加多阶段构建优化
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production --silent
COPY . .
RUN npm run build

# 使用更小的 nginx 镜像
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
```

### 2. 安全配置

```nginx
# 在 Nginx 配置中添加安全头
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

### 3. 监控和日志

```yaml
# docker-compose.prod.yml 中添加日志配置
services:
  frontend:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

### 4. 自动化部署

创建 GitHub Actions 工作流 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.KEY }}
        script: |
          cd /path/to/your/project
          git pull origin main
          docker-compose -f docker-compose.prod.yml up -d --build
```

---

## 故障排除

### 常见问题

1. **容器启动失败**
```bash
# 查看详细日志
docker-compose logs -f frontend

# 检查容器状态
docker ps -a
```

2. **端口被占用**
```bash
# 查看端口占用
sudo netstat -tulpn | grep :80

# 修改端口映射
# 在 docker-compose.yml 中改为 "8080:80"
```

3. **内存不足**
```bash
# 检查系统资源
free -h
df -h

# 清理 Docker 资源
docker system prune -a
```

### 性能监控

```bash
# 监控容器资源使用
docker stats

# 查看 Nginx 访问日志
docker exec -it container_name tail -f /var/log/nginx/access.log
```

---

## 备份和恢复

### 备份策略

```bash
# 备份镜像
docker save yiji-frontend:latest > yiji-frontend-backup.tar

# 备份配置文件
tar -czf config-backup.tar.gz docker-compose.yml nginx.conf
```

### 回滚策略

```bash
# 快速回滚到上一个版本
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build
```

---

选择适合你的部署方式，按照对应的步骤进行部署。如果是第一次部署，建议先在测试环境验证，确保一切正常后再部署到生产环境。