# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY frontend/package.json .
COPY frontend/package-lock.json .

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY frontend .

# Build the React app for production
RUN npm run build

# Install Flask and other Python dependencies
RUN apt-get update && apt-get install -y python3 python3-pip
COPY backend/requirements.txt .
RUN pip3 install -r requirements.txt

# Expose the desired port
EXPOSE 3000

# Set the command to run the backend server
CMD ["python3", "backend/app.py"]
