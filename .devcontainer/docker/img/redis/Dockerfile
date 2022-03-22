FROM redis:5

USER root

RUN apt-get update && apt-get install sudo && rm -rf /var/lib/apt/lists/*

# Debian way to add user & group
RUN id -u docker >/dev/null 2>&1 || { addgroup --gid 9999 docker && adduser --uid 9999 \ 
	   --ingroup docker --home /home/docker --shell /bin/bash --disabled-password \
	   --gecos "" docker && usermod -aG sudo docker && \
	   echo "docker ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/docker; }

USER docker