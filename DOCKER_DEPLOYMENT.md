# Docker 部署指南

本文档介绍如何使用 Docker 部署这个 Ant Design Pro 前端项目。

## 文件说明

- `Dockerfile`: 多阶段构建的 Docker 镜像定义文件
- `.dockerignore`: Docker 构建时忽略的文件和目录
- `docker-compose.yml`: Docker Compose 配置文件，用于简化部署

## 快速开始

### 方式一：使用 Docker Compose（推荐）

```bash
# 构建并启动服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f frontend

# 停止服务
docker-compose down
```

访问 http://localhost:3000 查看应用。

### 方式二：直接使用 Docker

```bash
# 构建镜像
docker build -t yiji-frontend .

# 运行容器
docker run -d -p 3000:80 --name yiji-frontend-container yiji-frontend

# 查看容器状态
docker ps

# 查看日志
docker logs -f yiji-frontend-container

# 停止并删除容器
docker stop yiji-frontend-container
docker rm yiji-frontend-container
```

## 配置说明

### Nginx 配置

Dockerfile 中包含了优化的 Nginx 配置：

- **前端路由支持**: 使用 `try_files` 处理 SPA 路由
- **静态资源缓存**: 对 JS、CSS、图片等设置长期缓存
- **API 代理**: 默认注释掉，如果后端已配置 CORS 支持，前端可直接请求后端 API
- **安全头**: 添加了基本的安全响应头
- **Gzip 压缩**: 启用了文本资源的压缩

### 环境变量

可以通过环境变量配置应用：

```bash
# 在 docker-compose.yml 中添加环境变量
environment:
  - REACT_APP_API_URL=https://api.example.com
  - REACT_APP_ENV=production
```

### API 请求配置

根据后端 CORS 配置情况，有两种方式处理 API 请求：

#### 方式一：直接请求后端（推荐，适用于后端已配置 CORS）

如果后端已经配置了 CORS 支持，前端可以直接请求后端 API：

```javascript
// 前端代码中直接使用完整的后端地址
const API_BASE_URL = 'https://yiji-backend-79688-4-1309493752.sh.run.tcloudbase.com/api';

fetch(`${API_BASE_URL}/user/login`, {
  method: 'POST',
  // ...
});
```

#### 方式二：使用 Nginx 代理

如果需要使用代理，可以取消注释 Dockerfile 中的代理配置：

```nginx
location /api/ {
    proxy_pass https://your-backend-url/api/;
    proxy_set_header Host $proxy_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_ssl_verify off;
    proxy_ssl_server_name on;
}
```

然后前端可以使用相对路径：

```javascript
// 使用相对路径，会被代理到后端
fetch('/api/user/login', {
  method: 'POST',
  // ...
});
```

### 自定义 Nginx 配置

如果需要自定义 Nginx 配置，可以：

1. 创建自定义的 `nginx.conf` 文件
2. 在 `docker-compose.yml` 中挂载配置文件：

```yaml
volumes:
  - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
```

## 生产环境部署

### 1. 构建优化

```bash
# 使用构建参数
docker build --build-arg NODE_ENV=production -t yiji-frontend:latest .

# 多平台构建
docker buildx build --platform linux/amd64,linux/arm64 -t yiji-frontend:latest .
```

### 2. 资源限制

在 `docker-compose.yml` 中添加资源限制：

```yaml
services:
  frontend:
    # ...
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

### 3. 健康检查

Dockerfile 中已包含健康检查配置，确保容器正常运行。

### 4. 日志管理

```bash
# 配置日志驱动
docker-compose up -d --log-driver json-file --log-opt max-size=10m --log-opt max-file=3
```

## 故障排除

### 常见问题

1. **构建失败**
   ```bash
   # 清理构建缓存
   docker builder prune
   
   # 重新构建
   docker-compose build --no-cache
   ```

2. **端口冲突**
   ```bash
   # 修改 docker-compose.yml 中的端口映射
   ports:
     - "8080:80"  # 改为其他端口
   ```

3. **权限问题**
   ```bash
   # 确保 Docker 有足够权限访问项目目录
   sudo chown -R $USER:$USER .
   ```

### 调试命令

```bash
# 进入容器调试
docker exec -it yiji-frontend-container sh

# 查看 Nginx 配置
docker exec yiji-frontend-container cat /etc/nginx/conf.d/default.conf

# 查看构建日志
docker-compose logs --no-color frontend > build.log
```

## 性能优化

1. **多阶段构建**: 减少最终镜像大小
2. **Alpine Linux**: 使用轻量级基础镜像
3. **静态资源缓存**: 提高加载速度
4. **Gzip 压缩**: 减少传输大小
5. **健康检查**: 确保服务可用性

## 安全建议

1. 定期更新基础镜像
2. 使用非 root 用户运行应用
3. 扫描镜像漏洞
4. 配置适当的安全头
5. 使用 HTTPS（在生产环境中）

---

如有问题，请查看 Docker 和 Docker Compose 的官方文档。