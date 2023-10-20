FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Change owner to non-root user
RUN chown -R node:node /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

USER node

RUN npm install \
    npm install socket.io
# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY --chown=node:node . .

EXPOSE 3001
CMD [ "node", "index.js" ]