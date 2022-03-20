FROM node:16-alpine as runner
LABEL maintainer="maxime.vincent@helloaria.eu"

# Create app folder
RUN mkdir /app

# Create data folder
RUN mkdir /data

# Set working directory
WORKDIR /app

# Copy application files
COPY application .

# Install app dependencies
RUN npm ci --production

# Start server
CMD ["node", "/app/cc-api.js"]

