#!/bin/sh
# line endings must be \n, not \r\n !
# Script to generate env-config.js file from .env file
echo "window._env_ = {" > ./env-config.js
awk -F '=' '{ print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : $2) "\"," }' ./default.env >> ./env-config.js
echo "}" >> ./env-config.js