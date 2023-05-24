var idEmpresa = Number(sessionStorage.getItem('ID_EMPRESA'));

document.addEventListener('DOMContentLoaded', () => {
    const linksAbas = document.querySelectorAll('.abas nav a');

    linksAbas.forEach((a) => {
        if (!a.hasAttribute('data-listener')) {
            a.setAttribute('data-listener', true);

            a.addEventListener('click', () => {
                let f = a.parentNode.querySelector('a.selecionado')

                if (f) f.classList.remove('selecionado')
                a.classList.add('selecionado')

                let div = document.querySelector(`.abas .${a.getAttribute('data-target')}`)

                document.querySelectorAll('.abas section').forEach((sectionAtual) => {
                    if (sectionAtual == div) {
                        sectionAtual.style.display = 'block'
                    } else {
                        sectionAtual.style.display = 'none'
                    }
                })

                let selecionado = a.getAttribute('data-target')

                if (selecionado) {
                    if (selecionado == 'abaEmpresa') {
                        MostrarDadosEmpresa()


                    } else if (selecionado == 'abaFuncionarios') {
                        MostrarListaFuncionarios()
                        console.log('aba3')
                    } else if (selecionado == 'abaComputadores') {
                        MostrarListaComputadores()
                    }
                }
            });
        }
    });
});


function MostrarDadosEmpresa() {
    //aguardar();

    fetch(`/empresas/listarEmpresa/${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("feed_container");
                var mensagem = document.createElement("span");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var divDadosEmpresa = document.getElementById("dados_empresa");

                divDadosEmpresa.innerHTML = "";

                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];

                    // criando e manipulando elementos do HTML via JavaScript
                    var divFotoEmpresa = document.createElement("div");
                    divFotoEmpresa.className = "foto_empresa";
                    var imgEmpresa = document.createElement("img");
                    imgEmpresa.src = "../assets/empresa-icone.jpg";
                    divFotoEmpresa.appendChild(imgEmpresa);
                    var divCaixaDados = document.createElement("div");
                    divCaixaDados.className = "caixa_dados";

                    var divDestaqueTxt = document.createElement("div");
                    divDestaqueTxt.className = "destaque_txt";
                    divDestaqueTxt.id = "div_destaque_txt_cadastro_funcionario";
                    var h3Empresa = document.createElement("h3");
                    h3Empresa.textContent = "Empresa";
                    divDestaqueTxt.appendChild(h3Empresa);

                    // CRIANDO A CAIXA DE FORMULARIO QUE VAI LISTAR OS DADOS
                    var divCaixaFormulario = document.createElement("div");
                    divCaixaFormulario.className = "caixa-formulario";

                    // DADOS DA CAIXA

                    var divCampos = document.createElement("div");
                    divCampos.className = "campos";
                    // ----------------------------------------------------------------------
                    var divLinha1 = document.createElement("div");
                    divLinha1.id = "linha";

                    var divCampo1 = document.createElement("div");
                    divCampo1.className = "campo";
                    var labelNomeEmpresa = document.createElement("label");
                    labelNomeEmpresa.className = "user-label";
                    labelNomeEmpresa.textContent = "Nome da Empresa: ";
                    var inputNomeEmpresa = document.createElement("input");
                    inputNomeEmpresa.type = "text";
                    inputNomeEmpresa.placeholder = publicacao.nome;
                    inputNomeEmpresa.disabled = true;
                    // inputNomeEmpresa.value = publicacao.nome;

                    divCampo1.appendChild(labelNomeEmpresa);
                    divCampo1.appendChild(inputNomeEmpresa);

                    var divCampo2 = document.createElement("div");
                    divCampo2.className = "campo";
                    var labelCNPJ = document.createElement("label");
                    labelCNPJ.className = "user-label";
                    labelCNPJ.textContent = "CNPJ: ";
                    var inputCNPJ = document.createElement("input");
                    inputCNPJ.type = "text";
                    inputCNPJ.placeholder = publicacao.CNPJ;
                    inputCNPJ.disabled = true;
                    // inputCNPJ.value = publicacao.CNPJ;

                    divCampo2.appendChild(labelCNPJ);
                    divCampo2.appendChild(inputCNPJ);

                    divLinha1.appendChild(divCampo1);
                    divLinha1.appendChild(divCampo2);
                    // ----------------------------------------------------------------------

                    var divLinha2 = document.createElement("div");
                    divLinha2.id = "linha";

                    var divCampo3 = document.createElement("div");
                    divCampo3.className = "campo";
                    var labelEmail = document.createElement("label");
                    labelEmail.className = "user-label";
                    labelEmail.textContent = "Email: ";
                    var inputEmail = document.createElement("input");
                    inputEmail.type = "text";
                    inputEmail.id = "cpf_funcionario";
                    inputEmail.placeholder = publicacao.email;
                    inputEmail.disabled = true;
                    divCampo3.appendChild(labelEmail);
                    divCampo3.appendChild(inputEmail);

                    var divCampo4 = document.createElement("div");
                    divCampo4.className = "campo";
                    var labelTelefone = document.createElement("label");
                    labelTelefone.className = "user-label";
                    labelTelefone.textContent = "Telefone: ";
                    var inputTelefone = document.createElement("input");
                    inputTelefone.type = "text";
                    inputTelefone.id = "email_funcionario";
                    inputTelefone.placeholder = publicacao.telefone;
                    inputTelefone.disabled = true;
                    divCampo4.appendChild(labelTelefone);
                    divCampo4.appendChild(inputTelefone);

                    divLinha2.appendChild(divCampo3);
                    divLinha2.appendChild(divCampo4);
                    // ----------------------------------------------------------------------

                    var divLinha3 = document.createElement("div");
                    divLinha3.id = "linha";

                    var divCampo5 = document.createElement("div");
                    divCampo5.className = "campo";
                    var labelCEP = document.createElement("label");
                    labelCEP.className = "user-label";
                    labelCEP.textContent = "CEP: ";
                    var inputCEP = document.createElement("input");
                    inputCEP.type = "text";
                    inputCEP.id = "telefone_funcionario";
                    inputCEP.placeholder = publicacao.cep;
                    inputCEP.disabled = true;
                    divCampo5.appendChild(labelCEP);
                    divCampo5.appendChild(inputCEP);

                    var divCampo6 = document.createElement("div");
                    divCampo6.className = "campo";
                    var labelLogradouro = document.createElement("label");
                    labelLogradouro.className = "user-label";
                    labelLogradouro.textContent = "Logradouro: ";
                    var inputLogradouro = document.createElement("input");
                    inputLogradouro.type = "text";
                    inputLogradouro.id = "funcao";
                    inputLogradouro.placeholder = publicacao.logradouro;
                    inputLogradouro.disabled = true;
                    divCampo6.appendChild(labelLogradouro);
                    divCampo6.appendChild(inputLogradouro);

                    divLinha3.appendChild(divCampo5);
                    divLinha3.appendChild(divCampo6);


                    // ----------------------------------------------------------------------

                    var divBotoes = document.createElement("div");
                    divBotoes.className = "botoes";
                    divBotoes.id = "botao_cadastro_funcionario";
                    var linkEditar = document.createElement("a");
                    linkEditar.href = "configuracoes.html#EmpresaEditar";
                    var buttonEditar = document.createElement("button");
                    buttonEditar.textContent = "Editar";
                    linkEditar.appendChild(buttonEditar);
                    divBotoes.appendChild(linkEditar);

                    // Inserir os elementos na estrutura correta
                    divDadosEmpresa.appendChild(divFotoEmpresa);
                    divDadosEmpresa.appendChild(divCaixaDados);

                    divCaixaDados.appendChild(divDestaqueTxt);
                    divCaixaDados.appendChild(divCaixaFormulario);

                    divCampos.appendChild(divLinha1);
                    divCampos.appendChild(divLinha2);
                    divCampos.appendChild(divLinha3);

                    divCaixaDados.appendChild(divBotoes);

                    divCaixaFormulario.appendChild(divCampos);
                }

                // finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        finalizarAguardar();
    });
}


function MostrarListaComputadores() {
    alert('computadores');
}


// MostrarLista de funcionário
function MostrarListaFuncionarios() {
    console.log(idEmpresa)
    //aguardar();
    console.log("OIIIIII")
    fetch(`/funcionarios/listarFuncionarios/${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementsByClassName("lista_funcionarios");
                var mensagem = document.createElement("span");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var feed = document.getElementsByClassName("lista_funcionarios")[0];

                feed.innerHTML = "";

                var infosPrincipais = document.createElement("div");
                infosPrincipais.id = "infos_principais";

                var titulo = document.createElement("h3");
                titulo.textContent = "Lista de Funcionários";

                var nav = document.createElement("nav");
                nav.style.marginTop = "0px";

                var linkCadastrar = document.createElement("a");
                linkCadastrar.href = "#FuncionarioCadastrar";
                linkCadastrar.style.border = "0";
                linkCadastrar.style.padding = "0px";

                var botaoCadastrar = document.createElement("button");
                botaoCadastrar.textContent = "Add Funcionário";

                var tracinho1 = document.createElement("div");
                tracinho1.id = "tracinho";
                tracinho1.style.marginBottom = "20px";

                var linha = document.createElement("div");
                linha.id = "linha";

                var tituloCpf = document.createElement("div");
                tituloCpf.id = "titulo_cpf";
                var cpf = document.createElement("b");
                cpf.textContent = "CPF";
                tituloCpf.appendChild(cpf);

                var tituloNome = document.createElement("div");
                tituloNome.id = "titulo";
                var nome = document.createElement("b");
                nome.textContent = "Nome";
                tituloNome.appendChild(nome);

                var tituloCargo = document.createElement("div");
                tituloCargo.id = "titulo_cargo";
                var cargo = document.createElement("b");
                cargo.textContent = "Função";
                tituloCargo.appendChild(cargo);

                var tituloEmail = document.createElement("div");
                tituloEmail.id = "titulo";
                var email = document.createElement("b");
                email.textContent = "Email";
                tituloEmail.appendChild(email);

                var tituloTipo = document.createElement("div");
                tituloTipo.id = "titulo_tipo";
                var tipo = document.createElement("b");
                tipo.textContent = "Tipo";
                tituloTipo.appendChild(tipo);

                var tituloEditar = document.createElement("div");
                tituloEditar.id = "titulo";

                var tracinho2 = document.createElement("div");
                tracinho2.id = "tracinho";
                tracinho2.style.marginBottom = "20px";

                // Organização dos elementos na estrutura HTML
                linkCadastrar.appendChild(botaoCadastrar);
                nav.appendChild(linkCadastrar);

                infosPrincipais.appendChild(titulo);
                infosPrincipais.appendChild(nav);

                linha.appendChild(tituloCpf);
                linha.appendChild(tituloNome);
                linha.appendChild(tituloCargo);
                linha.appendChild(tituloEmail);
                linha.appendChild(tituloTipo);
                linha.appendChild(tituloEditar);

                // Inserção dos elementos no documento
                feed.appendChild(infosPrincipais);
                feed.appendChild(tracinho1);
                feed.appendChild(linha);
                feed.appendChild(tracinho2);

                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];

                    // CRIAR ELEMENTOS
                    var divLinha = document.createElement("div");

                    var divDado1 = document.createElement("div");
                    var dado1 = document.createElement("p");

                    var divDado2 = document.createElement("div");
                    var dado2 = document.createElement("p");

                    var divDado3 = document.createElement("div");
                    var dado3 = document.createElement("p");

                    var divDado4 = document.createElement("div");
                    var dado4 = document.createElement("p");

                    var divDado5 = document.createElement("div");
                    var dado5 = document.createElement("p");

                    var divEditar = document.createElement("div");
                    var funcaoEditar = document.createElement("div");

                    var divDeletar = document.createElement("div");
                    var funcaoDeletar = document.createElement("div");

                    var tracinho = document.createElement("div");
                    tracinho.id = "tracinho";
                    tracinho.style.marginBottom = "20px";

                    dado1.innerHTML = publicacao.cpf;
                    dado2.innerHTML = publicacao.nome + " " + publicacao.sobrenome;
                    dado3.innerHTML = publicacao.funcao;
                    dado4.innerHTML = publicacao.email;
                    dado5.innerHTML = publicacao.flagAdministrador;
                    funcaoEditar.innerHTML = "editar";
                    funcaoDeletar.innerHTML = "deletar";

                    divLinha.id = "linha";
                    divDado1.id = "dado_cpf";
                    divDado2.id = "dado_nomeFuncionario";
                    divDado3.id = 'dado_cargo'
                    divDado4.id = "dado_email";
                    divDado5.id = "dado_tipoUsuario";
                    divEditar.id = "editar";
                    divEditar.setAttribute("onclick", `editarFuncionario(${publicacao.idFuncionario})`);

                    divDeletar.id = "deletar";
                    divDeletar.setAttribute("onclick", `deletarFuncionario(${publicacao.idFuncionario})`);


                    divLinha.appendChild(divDado1);
                    divLinha.appendChild(divDado2);
                    divLinha.appendChild(divDado3);
                    divLinha.appendChild(divDado4);
                    divLinha.appendChild(divDado5);
                    divLinha.appendChild(divEditar);
                    divLinha.appendChild(divDeletar);

                    divDado1.appendChild(dado1);
                    divDado2.appendChild(dado2);
                    divDado3.appendChild(dado3);
                    divDado4.appendChild(dado4);
                    divDado5.appendChild(dado5);
                    divEditar.appendChild(funcaoEditar);
                    divDeletar.appendChild(funcaoDeletar);


                    feed.appendChild(divLinha);
                    feed.appendChild(tracinho);

                }

                // finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        // finalizarAguardar();
    });
}


// function editarFuncionario(idFuncionario,idEmpresa) {

//     var tabela = document.querySelector('.tabela');
//     for (var i = 1; i < tabela.rows.length; i++) {
//         var idCelula = tabela.rows[i].cells[0];
//         if (idCelula.textContent == idAviso) {
//             var nomeCelula = tabela.rows[i].cells[1];
//             var cargoCelula = tabela.rows[i].cells[2];
//             var emailCelula = tabela.rows[i].cells[3];

//             sessionStorage.ID_POSTAGEM_EDITANDO = idAviso;
//             sessionStorage.NOME_EDITANDO = nomeCelula.textContent;
//             sessionStorage.CARGO_EDITANDO = cargoCelula.textContent;
//             sessionStorage.EMAIL_EDITANDO = emailCelula.textContent;
//             window.location = "editfunc.html";

//             break;
//         }
//     }
// }

function deletarFuncionario(idFuncionario) {
    console.log("FUNCIONÁRIO A SER DELETADO - ID" + idFuncionario);

    fetch(`/funcionarios/deletarFuncionario/${idFuncionario}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {

        if (resposta.ok) {
            window.alert("Funcionário deletado com sucesso " + sessionStorage.getItem("NOME_USUARIO") + "!");
            // window.location = "/dashboard/mural.html"
            MostrarListaFuncionarios();
            console.log("deletado com sucesso")
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar deletar o funcionáro! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}