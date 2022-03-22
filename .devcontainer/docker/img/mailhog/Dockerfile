FROM mailhog/mailhog

USER root

RUN apk add --no-cache sudo bash

# Alpine way to add user & group
RUN id -u docker >/dev/null 2>&1 || { addgroup -g 9999 docker && adduser -u 9999 \ 
	-G docker -h /home/docker -s /bin/bash -D docker && \ 
	echo "docker ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/docker && \ 
	chmod 0440 /etc/sudoers.d/docker; }

USER docker