# Use a Node.js image for building the project
FROM node:22-alpine as build

# Set the working directory
WORKDIR /zalo-app/mobile

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Set environment variables for Node.js
ENV NODE_OPTIONS=--max_old_space_size=4096

# Build the project
RUN npm run build

# Use a Node.js image for running the server
FROM node:22-alpine

# Set the working directory
WORKDIR /zalo-app/mobile

# Copy the build output from the previous stage to the current stage
COPY --from=build /zalo-app/mobile/build ./build

# Install serve package to serve the built files
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 2000

# Command to run the application
CMD ["serve", "-s", "build", "-l", "2000"]


# docker build --tag zalo-docker .
# docker run -p 2000:2000 -d zalo-docker