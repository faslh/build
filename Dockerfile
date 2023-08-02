# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=16.13.1
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="NodeJS"

# NodeJS app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV=production


# Throw-away build stage to reduce size of final image
# FROM base as build

# Install node modules
# COPY --link package.json package-lock.json .
# RUN npm install --production=false

# # Copy application code
# COPY --link . .

# Remove development dependencies
# RUN npm prune --production


# Final stage for app image
# FROM base

# List the contents of the /app directory
RUN ls -la /app
# Copy built application
COPY dist/ /app

# List the contents of the /app directory
RUN ls -la /app
# Start the server by default, this can be overwritten at runtime
CMD [ "npm", "run", "start:prod" ]
