FROM node:12.19.0-alpine
# FROM node:12-alpine
# FROM openjdk:8

# # Download nodejs 12
# RUN curl --silent --location https://deb.nodesource.com/setup_12.x | bash -
# RUN curl --silent --location https://rpm.nodesource.com/setup_12.x | bash -
# RUN yum install -y nodejs
# RUN apt-get install -y nodejs

# Setup Working Directory && Add node_modules to path
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Install Serverless Framework
RUN npm install -g serverless --silent

# Install Package Dependencies
COPY package.json package-lock.json serverless.yml ./
RUN npm install --silent

# COPY serverless.yml .
# RUN serverless plugin install --name serverless-dynamodb-local
# RUN serverless dynamodb install

# Setup dynamodb (for serverless-dynamodb-local)


# RUN yum install -y gcc python3-devel.x86_64

# COPY requirements.txt ./
# RUN pip3 install -r requirements.txt

# Copy Remaining Files
COPY . .

# Expose Lambda HTTP Port
EXPOSE 5000

# ENTRYPOINT [ "executable" ]
