FROM mcr.microsoft.com/playwright:v1.48.0-focal

# Set the work directory for the application
WORKDIR /app

# Set the environment path to node_modules/.bin
ENV PATH /app/node_modules/.bin:$PATH

# create a folder to copy code
RUN mkdir /automation

# project scope
WORKDIR /automation

# copy code
COPY ./ ./

# Install the dependencies in Node environment
RUN npm install

# keep alive
CMD ["tail", "-f", "/dev/null"]
