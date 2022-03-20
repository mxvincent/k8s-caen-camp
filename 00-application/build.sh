#!/usr/bin/env bash

echo $GHCR_TOKEN | docker login https://ghcr.io -u mxvincent --password-stdin

echo 'Build docker image'

docker buildx build . \
  --push \
  --platform linux/amd64,linux/arm64 \
  --tag ghcr.io/mxvincent/k8s-caen-camp:1.0.0 \
  --tag ghcr.io/mxvincent/k8s-caen-camp:1.0 \
  --tag ghcr.io/mxvincent/k8s-caen-camp:1 \
  --tag ghcr.io/mxvincent/k8s-caen-camp:latest
