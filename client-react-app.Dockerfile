FROM node:lts

ARG DEBIAN_FRONTEND=text
ARG _GRPC_WEB_VERSION=1.4.2

RUN apt-get update \
  && apt-get install -y curl build-essential protobuf-compiler
RUN if [ `uname -m` = "aarch64" ]; then \
    wget -O /usr/local/bin/protoc-gen-grpc-web https://github.com/grpc/grpc-web/releases/download/${_GRPC_WEB_VERSION}/protoc-gen-grpc-web-${_GRPC_WEB_VERSION}-linux-aarch64; \
  else \
    wget -O /usr/local/bin/protoc-gen-grpc-web https://github.com/grpc/grpc-web/releases/download/${_GRPC_WEB_VERSION}/protoc-gen-grpc-web-${_GRPC_WEB_VERSION}-linux-x86_64; \
  fi
RUN chmod +x /usr/local/bin/protoc-gen-grpc-web
RUN npm install --global serve

WORKDIR /usr/src/app

ARG _SRC_DIR=client-react-app

COPY ${_SRC_DIR}/package.json ./
RUN yarn install --frozen-lockfile

ADD protos/ ../protos/
COPY ${_SRC_DIR}/proto-gen.sh ./
RUN chmod u+x ./proto-gen.sh
RUN yarn proto:gen

COPY ${_SRC_DIR}/ ./
RUN yarn build

CMD [ "serve", "-s", "/usr/src/app/build", "-l", "5000", "-n" ]