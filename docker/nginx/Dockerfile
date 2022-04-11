FROM nginx:1.14

RUN apt-get update

# Set timezone
RUN rm /etc/localtime
RUN ln -s /usr/share/zoneinfo/Europe/Oslo /etc/localtime
RUN "date"

COPY default.conf /etc/nginx/conf.d/default.conf
