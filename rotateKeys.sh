#!/bin/bash -l -c
# This file is used to rotateKeys in k8s
NODE_ENV=$NODE_ENV /usr/local/bin/node ./src/tools/rotateKeys.js
