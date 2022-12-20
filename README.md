# gRPC-Web Sample

### 事前準備

- Docker Deamon が起動している
- Docker Compose V2 コマンドが実行できる

### 準備

.env の作成

```sh
echo "REACT_APP_PROXY_TARGET_PORT=40000" > client-react-app/.env
echo "PORT=50051
APP_TARGET_PORT=50000" > proxy-app/.env
echo "PORT=50051" > server-app/.env
```

Docker のビルド

```
docker compose build
```

### 起動

```sh
docker compose up -d
```

### 終了

```sh
docker compose down
```

### 注意

OSやアーキテクチャによってうまく動かないかもしれないところ

**proxy-app/src/index.ts**

```typescript
host.docker.internal
```

**client-react-app.Dockerfile**

```dockerfile
RUN if [ `uname -m` = "aarch64" ]; then \
    wget -O /usr/local/bin/protoc-gen-grpc-web https://github.com/grpc/grpc-web/releases/download/${_GRPC_WEB_VERSION}/protoc-gen-grpc-web-${_GRPC_WEB_VERSION}-linux-aarch64; \
  else \
    wget -O /usr/local/bin/protoc-gen-grpc-web https://github.com/grpc/grpc-web/releases/download/${_GRPC_WEB_VERSION}/protoc-gen-grpc-web-${_GRPC_WEB_VERSION}-linux-x86_64; \
  fi
```

### 参考

https://github.com/grpc/grpc-web/blob/master/net/grpc/gateway/examples/echo/tutorial.md