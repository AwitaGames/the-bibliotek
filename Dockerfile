FROM alpine:latest


# Install pocketbase
ARG PB_VERSION=0.34.2

RUN apk add --no-cache \
    unzip \
    ca-certificates \
    npm

ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb

# Copy project files
COPY . /pb

WORKDIR /pb

RUN npm install
RUN npm run build

RUN ls -l /pb/pb_public

EXPOSE 8090

# start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8090", "--publicDir=/pb/pb_public", "--dir=/pb/pb_data", "--migrationsDir=/pb/pb_migrations"]