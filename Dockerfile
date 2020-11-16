FROM node:12.19.0-alpine AS debug

# Setup Working Directory && Add node_modules to path
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Install Package Dependencies
COPY package.json package-lock.json serverless.yml ./
RUN npm install --silent

# Copy Remaining Files
COPY . .

# Expose Lambda HTTP Port
EXPOSE 5000
