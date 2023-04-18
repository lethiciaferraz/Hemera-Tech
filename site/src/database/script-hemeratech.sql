-- drop database HemeraTech;
create database HemeraTech;
use HemeraTech;

create table Empresa (
idEmpresa int primary key auto_increment,
nome varchar(45),
email varchar(60),
CNPJ char(14) unique,
ddd char(2),
telefone varchar(9),
cep char(8),
logradouro varchar(100),
complemento varchar(30),
constraint chkemail_emp check (email like '%@%.%')
);

create table Funcionario (
idFuncionario int primary key auto_increment,
nome varchar(45),
sobrenome varchar(45),
ddd char(2),
telefone varchar(9),
email varchar(75),
senha varchar(45),
constraint chkemail_func check (email like '%@%.%'));

create table Funcao (
idEmpresa int,
idFuncionario int, 
funcao varchar(45),
nivel varchar(45),
flag_administrador boolean,
constraint fk_emp_funcao foreign key (idEmpresa) references Empresa(idEmpresa),
constraint fk_func_funcao foreign key (idFuncionario) references Funcionario(idFuncionario)
);

-- CALL sp_cadastrar_empresa('estela1@teste.com', 'Estela', '28491725473829', '1234', 'Rua V', '83629583', 'ab');

-- drop procedure sp_cadastrar_empresa;
delimiter $$
create procedure sp_cadastrar_empresa(
	in email varchar(60),
	in nome varchar(45),
    in cnpj char(14),
    in ddd char(2),
    in telefone varchar(9),
    in logradouro varchar(100),
    in cep char(8),
    in complemento varchar(30)
)
begin
	insert into empresa (nome, email, CNPJ, ddd, telefone, logradouro, cep, complemento) values (nome, email, cnpj, ddd, telefone, logradouro, cep, complemento);
    select idEmpresa, nome from Empresa 
    where nome = nome and email = email
    order by idEmpresa desc limit 1;
end$$
delimiter ;

delimiter $$
create procedure sp_cadastrar_funcionario(
	in nome varchar(45),
	in sobrenome varchar(45),
	in ddd char(2),
	in telefone varchar(9),
	in email varchar(75),
	in senha varchar(45)
)
begin
	insert into funcionario (nome, sobrenome, ddd, telefone, email, senha) values (nome, sobrenome, ddd, telefone, email, senha);
    select idFuncionario from Funcionario 
    where email = email
    order by idFuncionario desc limit 1;
end$$
delimiter ;

