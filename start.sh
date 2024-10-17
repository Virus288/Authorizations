#!/bin/bash

echo "Starting migrations"
npm run migrate

echo "Starting service"

if [ "$NODE_ENV" = "production" ]; then
  npm run start
else
  npm run start:testDev
fi
