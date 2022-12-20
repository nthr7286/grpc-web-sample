#!/bin/sh

SRC_DIR=../protos
SRC_FILENAME=app.proto
OUT_DIR=generated
if [ -d $OUT_DIR ]; then
  rm -rf $OUT_DIR
fi
mkdir -p $OUT_DIR
yarn proto-loader-gen-types --grpcLib=grpc --outDir=$OUT_DIR $SRC_DIR/$SRC_FILENAME