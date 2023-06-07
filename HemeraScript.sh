#!/bin/bash

BOLD="\033[1m"
RESET="\033[0m"

echo -e "$(tput setaf 5)${BOLD}[BOT MERA]:${RESET}$(tput setaf 13) Olá Usuário, serei seu assistente para instalação do Sistema HeremaTech!"

echo -e "$(tput setaf 5)${BOLD}[BOT MERA]:${RESET}$(tput setaf 13) Verificando se você possui o Java instalado...\n"
sleep 2

java -version
if [ $? -eq 0 ]; then
    echo -e "$(tput setaf 5)${BOLD}[BOT MERA]:${RESET}$(tput setaf 13) Você já tem o Java instalado!"
else
    echo -e "$(tput setaf 5)${BOLD}[BOT MERA]:${RESET}$(tput setaf 13) Opa! Não identifiquei nenhuma versão do Java instalada, mas sem problemas."
    echo -e "$(tput setaf 5)${BOLD}[BOT MERA]:${RESET}$(tput setaf 13) Confirme para mim se realmente deseja instalar o Java para utilizar o Sistema HeremaTech? (s/n)\n"
fi

read get
if [ "$get" == "s" ]; then
    echo -e "$(tput setaf 5)${BOLD}[BOT MERA]:${RESET}$(tput setaf 13) Ok! Você escolheu instalar o Java"
    sleep 2
    echo -e "$(tput setaf 5)${BOLD}[BOT MERA]:${RESET}$(tput setaf 13) Atualizando os pacotes! Quase lá."
    sleep 2
    sudo apt update && apt upgrade -y
    clear

    echo -e "$(tput setaf 5)${BOLD}[BOT MERA]:${RESET}$(tput setaf 13) Preparando para instalar a versão 17 do Java..."
    sudo apt install openjdk-17-jdk-headless -y
    clear
    echo -e "$(tput setaf 5)${BOLD}[BOT MERA]:${RESET}$(tput setaf 13) Java instalado com sucesso!\n"
else
    echo -e "$(tput setaf 5)${BOLD}[BOT MERA]:${RESET}$(tput setaf 13) Você optou por não instalar o Java"
    echo -e "$(tput setaf 5)${BOLD}[BOT MERA]:${RESET}$(tput setaf 13) Instalando nosso sistema HeremaTech..."
    sleep 2

    echo -e "$(tput setaf 5)${BOLD}[BOT MERA]:${RESET}$(tput setaf 13) Criando diretório..."
    # Coloque o wget e o link do repositório e os containers
    sudo wget https://raw.github.com/jgmatosmota/MySqlConfig/main/docker-compose.yaml
    sudo apt-get install docker.io
    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
	sudo docker-compose up -d
    echo -e "$(tput setaf 5)${BOLD}[BOT MERA]:${RESET}$(tput setaf 13) Banco de dados local criado com sucesso!"
    sleep 2
    echo -e "$(tput setaf 5)${BOLD}[BOT MERA]:${RESET}$(tput setaf 13)"
    echo -e "$(tput setaf 5)${BOLD}[BOT MERA]:${RESET}$(tput setaf 13) Executando nosso sistema...\n"
    sudo wget https://raw.github.com/jgmatosmota/Java-grupo7-projeto-integrado/main/jarHemera.jar
	sudo chmod 777 jarHemera.jar
    
    java -jar jarHemera.jar -d
    sleep 2

    sudo bash -c 'cat > /etc/systemd/system/meuapp.service' << EOF
[Unit]
Description=Meu Aplicativo Java

[Service]
ExecStart=/usr/bin/java -jar /home/usuario/Desktop/New/jarHemera.jar

[Install]
WantedBy=multi-user.target
EOF

    # Recarregar a configuração do systemd
    sudo systemctl daemon-reload

    # Iniciar o serviço
    sudo systemctl start meuapp.service

    # Habilitar o serviço para iniciar na inicialização
    sudo systemctl enable meuapp.service

    echo -e "$(tput setaf 5)${BOLD}[BOT MERA]:${RESET}$(tput setaf 13) Sistema instalado com sucesso"
fi