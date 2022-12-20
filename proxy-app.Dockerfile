FROM node:lts

ARG _SRC_DIR=proxy-app

WORKDIR /usr/src/app

COPY ${_SRC_DIR}/package.json ./
RUN yarn install --frozen-lockfile

ADD protos/ ../protos/
COPY ${_SRC_DIR}/proto-gen.sh ./
RUN chmod u+x ./proto-gen.sh
RUN yarn proto:gen

COPY ${_SRC_DIR}/ ./
RUN yarn build

EXPOSE 50051
CMD ["yarn", "start"]