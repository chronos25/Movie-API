# Use the official Node.js image as a base
FROM node:21-alpine

# Set the working directory inside the container
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3000
# Define the command to run the application
CMD ["npm", "run", "start"]
