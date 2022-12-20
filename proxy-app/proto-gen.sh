#!/bin/sh

SRC_DIR=../protos
# PROTOFILE_APP=app.proto
# PROTOFILE_WEB=web.proto
OUT_DIR=generated
if [ -d $OUT_DIR ]; then
  rm -rf $OUT_DIR
fi
mkdir -p $OUT_DIR
yarn proto-loader-gen-types --grpcLib=grpc --outDir=$OUT_DIR $SRC_DIR/*.proto
# protoc -I=$SRC_DIR $PROTOFILE_WEB \
#     --js_out=import_style=typescript:$OUT_DIR \
#     --grpc-web_out=import_style=typescript,mode=grpcwebtext:$OUT_DIR