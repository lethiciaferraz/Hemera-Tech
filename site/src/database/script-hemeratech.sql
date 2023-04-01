-- drop database HemeraTech;
create database HemeraTech;
use HemeraTech;

create table Empresa (
idEmpresa int primary key auto_increment,
nome varchar(45),
email varchar(60),
CNPJ char(14) unique,
senha varchar(45),
constraint chkemail check (email like '%@%.%')
);

delimiter $$
create procedure sp_cadastrar_empresa(
	in email varchar(60),
	in nome varchar(45),
    in cnpj char(14),
    in senha varchar(45) 
)
begin
	insert into empresa (nome, email, CNPJ, senha) values (nome, email, cnpj, senha);
    select idEmpresa, nome from Empresa 
    where nome = nome and email = email
    order by idEmpresa desc limit 1;
end$$
delimiter ;