drop database HemeraTech;
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
complemento varchar(30)
);

create table Funcionario (
idFuncionario int auto_increment,
nome varchar(45),
sobrenome varchar(45),
cpf char(11),
ddd char(2),
telefone varchar(9),
email varchar(75),
senha varchar(45),
funcao varchar(45),
flagAdministrador boolean,
idEmpresa int,
constraint fk_func_emp foreign key (idEmpresa) references Empresa(idEmpresa),
primary key(idFuncionario, idEmpresa));

create table Computador (
idComputador int auto_increment,
sistema_operacional varchar(45),
modelo varchar(45),
MacAddress char(17),
total_memoria varchar(45),
total_armazenamento varchar(45),
idEmpresa int,
constraint fk_emp_comp foreign key (idEmpresa) references Empresa(idEmpresa),
primary key(idComputador, MacAddress, idEmpresa)
);

create table Componente(
idComponente int auto_increment,
idComputador int,
MacAddress char(17),
nome varchar(45),
modelo varchar(75),
capacidade varchar(45),
constraint fk_compo_comp1 foreign key (idComputador) references Computador(idComputador),
constraint fk_compo_comp2 foreign key (MacAddress) references Computador(MacAddress),
primary key(idComponente, idComputador, MacAddress));

create table LogAcesso(
idFuncionario int primary key,
MacAddress char(17) primary key,
idComputador int primary key,
idEmpresa int,
horario_inicio datetime default(current_timestamp()),
horario_final datetime,
constraint fk_comp1_logA foreign key (idComputador) references Computador(idComputador),
constraint fk_comp2_logA foreign key (MacAddress) references Computador(MacAddress),
constraint fk_func_logA foreign key (idFuncionario) references Funcioanrio(idFuncionario),
constraint fk_emp_logA foreign key (idEmpresa) references Empresa(idEmpresa)
);

create table Registros(
momento datetime default(current_timestamp()),
uso_cpu double,
utilizado_memoria double,
utilizado_armazenamento double,
download_rede double,
upload_rede double,
idComputador int,
MacAddress char(17),
idEmpresa int,
constraint fk_comp1_reg foreign key (idComputador) references Computador(idComputador),
constraint fk_comp2_reg foreign key (MacAddress) references Computador(MacAddress),
constraint fk_emp_reg foreign key (idEmpresa) references Empresa(idEmpresa));

-- CALL sp_cadastrar_empresa('estela1@teste.com', 'Estela', '28491725473829', '1234', 'Rua V', '83629583', 'ab');


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
	in cpf char(11),
	in telefone varchar(9),
	in email varchar(75),
	in senha varchar(45)
)
begin
	insert into funcionario (nome, sobrenome, cpf, telefone, email, senha) values (nome, sobrenome, cpf, telefone, email, senha);
    select idFuncionario from Funcionario 
    where email = email
    order by idFuncionario desc limit 1;
end$$

delimiter ;

select * from funcionario as fu 
join funcao as f on f.idFuncionario=fu.idFuncionario
join empresa as e on e.idEmpresa = f.idEmpresa
where e.idEmpresa = 4;

