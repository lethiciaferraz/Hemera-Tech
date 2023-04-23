#!/bin/bash
	ls Hemera-Tech &>/dev/null 
        if [ $? -eq 0 ];

                then
                echo -e "Voce ja possui nosso sistema instalado!\n"
        else

                echo  "Ola, Bem Vindo a HemereTech!"
		echo  "Gostaria de instalar o nosso sistema em sua maquina? [s/n]"

	read get

                if [ \"$get\" == \"s\" ];
        then
		echo -e "Instalando os sistema HeremaTech.../n"
        	sudo apt install openjdk-17-jre -y
   		git clone 'https://github.com/lethiciaferraz/Hemera-Tech.git'    
		echo -e "\n"
		echo "O sistema foi instalado com sucesso!"	
	
	else

		echo -e  "\nAté logo!" 
		
fi
fi

