# Use a Node.js base image
FROM node:22-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Expose the frontend port
EXPOSE 3000

# Start development server
ENTRYPOINT ["npm", "run", "dev"]
