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