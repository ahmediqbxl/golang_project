FROM mongo:latest

# Create data directory
RUN mkdir -p /data/db

# Expose MongoDB port
EXPOSE 27017

# Set environment variables
ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=password
ENV MONGO_INITDB_DATABASE=taskmanager

# Create initialization script
COPY init.js /docker-entrypoint-initdb.d/

# Start MongoDB
CMD ["mongod"] 