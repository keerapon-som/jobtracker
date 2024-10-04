# Step 1: Choose a Base Image
FROM node:16-alpine AS build

# Step 2: Set Working Directory
WORKDIR /app

# Step 3: Copy Files
COPY package.json package-lock.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./

# Step 4: Install Dependencies
RUN npm install --legacy-peer-deps

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Build the Project
RUN npm run build

# Step 7: Use a lightweight web server to serve the built files
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]