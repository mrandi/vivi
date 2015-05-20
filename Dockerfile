FROM zalando/ubuntu:14.04.1-3

MAINTAINER Zalando SE

# Install Nginx.

RUN echo 'deb http://nginx.org/packages/ubuntu/ trusty nginx' >> /etc/apt/sources.list
RUN curl -o /tmp/nginx_signing.key http://nginx.org/keys/nginx_signing.key
RUN apt-key add /tmp/nginx_signing.key
RUN apt-get update

RUN DEBIAN_FRONTEND=noninteractive apt-get install -y nginx
RUN rm -fr /var/lib/apt/lists/*

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

COPY www/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]