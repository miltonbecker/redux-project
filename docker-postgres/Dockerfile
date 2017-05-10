FROM postgres:9.6-alpine

EXPOSE 5432

COPY seed.sql /docker-entrypoint-initdb.d/

LABEL maintainer="miltonbecker@gmail.com"