
var idEmpresa = Number(sessionStorage.getItem('ID_EMPRESA'));

document.addEventListener('DOMContentLoaded', () => {
    let linksAbas = document.querySelectorAll('.abas nav a');

    linksAbas.forEach((a) => {
        if (!a.hasAttribute('data-listener')) {
            a.setAttribute('data-listener', true);

            a.addEventListener('click', () => {
                mudarAba(a.getAttribute('data-target'));
            });
        }
    });
});

function mudarAba(target) {
    let a = document.querySelector(`.abas nav a[data-target="${target}"]`);


    if (!a.classList.contains('selecionado')) {
        let f = a.parentNode.querySelector('a.selecionado');

        if (f) f.classList.remove('selecionado');
        a.classList.add('selecionado');

        let div = document.querySelector(`.abas .${target}`);

        document.querySelectorAll('.abas section').forEach((sectionAtual) => {
            if (sectionAtual == div) {
                sectionAtual.style.display = 'block';
            } else {
                sectionAtual.style.display = 'none';
            }
        });

        if (target == 'abaEmpresa') {
            MostrarDadosEmpresa();
        } else if (target == 'abaFuncionarios') {
            MostrarListaFuncionarios();
        } else if (target == 'abaComputadores') {
            MostrarListaComputadores();
        }
    }
}


const nomeEmpresaInput = document.querySelector('#nome_empresa');
const cnpjInput = document.querySelector('#cnpj_empresa');
const emailInput = document.querySelector('#email_empresa');
const telefoneInput = document.querySelector('#telefone_empresa');
const cepInput = document.querySelector('#cep_empresa');
const complementoInput = document.querySelector('#complemento_empresa');
const logradouroInput = document.querySelector('#logradouro_empresa');
const botoesEmpresa = document.querySelector('#botoes_dados_empresa');

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
                texto_destaque_empresa.innerHTML = '';
                texto_destaque_empresa.innerHTML = '<h3>Dados da Empresa</h3>'

                var botaoExistente = document.querySelector("#botao_cancelar");
                if (botaoExistente) {
                    // Remove o botão se ele existir
                    botoesEmpresa.removeChild(botaoExistente);
                }

                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];


                    // desabilitando a edição
                    nomeEmpresaInput.setAttribute('disabled', 'true');
                    cnpjInput.setAttribute('disabled', 'true');
                    emailInput.setAttribute('disabled', 'true');
                    telefoneInput.setAttribute('disabled', 'true');
                    cepInput.setAttribute('disabled', 'true');
                    logradouroInput.setAttribute('disabled', 'true');
                    complementoInput.setAttribute('disabled', 'true');


                    // colocando os dados da empresa
                    nomeEmpresaInput.value = publicacao.nome;
                    emailInput.value = publicacao.email;
                    cnpjInput.value = publicacao.CNPJ;
                    telefoneInput.value = publicacao.telefone;
                    cepInput.value = publicacao.cep;
                    logradouroInput.value = publicacao.logradouro;
                    complementoInput.value = publicacao.complemento;
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

function EditarEmpresa() {
    if (nomeEmpresaInput.disabled) {
        // VERIFIFANDO SE OS CAMPOS ESTAO HABILITADOS PARA EDIÇÃO,PARA HABILITALOS
        texto_destaque_empresa.innerHTML = '';
        texto_destaque_empresa.innerHTML = '<h3> Editar Dados da Empresa</h3>'
        nomeEmpresaInput.removeAttribute('disabled');
        cnpjInput.removeAttribute('disabled');
        emailInput.removeAttribute('disabled');
        telefoneInput.removeAttribute('disabled');
        cepInput.removeAttribute('disabled');
        logradouroInput.removeAttribute('disabled');
        complementoInput.removeAttribute('disabled');

        let botaoCancelar = document.createElement("button");
        botaoCancelar.textContent = "Cancelar";
        botaoCancelar.id = 'botao_cancelar'
        botaoCancelar.onclick = MostrarDadosEmpresa;

        botoesEmpresa.appendChild(botaoCancelar);

    } else {
        fetch(`/empresas/editarEmpresa/${idEmpresa}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nomeEmpresaInput.value,
                cnpj: cnpjInput.value,
                email: emailInput.value,
                telefone: telefoneInput.value,
                cep: cepInput.value,
                logradouro: logradouroInput.value,
                complemento: complementoInput.value
            })
        }).then(function (resposta) {

            if (resposta.ok) {
                window.alert("Dados da empresa atualizados com sucesso pelo usuario" + sessionStorage.getItem("NOME_USUARIO") + "!");
                MostrarDadosEmpresa();
            } else if (resposta.status == 404) {
                window.alert("Deu 404!");
            } else {
                throw ("Houve um erro ao tentar editar os dados Código da resposta: " + resposta.status);
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    }
}

const nomeFuncionarionput = document.querySelector('#nome_funcionario');
const sobrenomeFuncionarioInput = document.querySelector('#sobrenome_funcionario');
const cpfFuncionarioInput = document.querySelector('#email_funcionario');
const telefoneFuncionarioInput = document.querySelector('#telefone_funcionario');
const emailFuncionarioInput = document.querySelector('#email_funcionario');
const funcaoFuncionarioInput = document.querySelector('#telefone_empresa');


// MostrarLista de funcionário
function MostrarListaFuncionarios() {
    //aguardar();
    fetch(`/funcionarios/listarFuncionarios/${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed =document.getElementsByClassName("lista_funcionarios")[0];
                
                var mensagem = document.createElement("span");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var feed = document.getElementsByClassName("lista_funcionarios")[0];

                // Remover linhas antigas (exceto o título)

                var linhasAntigas = feed.querySelectorAll("#linha ~ div:not(#titulo)");
                linhasAntigas.forEach(function (linhaAntiga) {
                    linhaAntiga.remove();
                });

                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];

                    var tracinho = document.createElement("div");
                    tracinho.id = "tracinho";
                    tracinho.style.marginBottom = "20px";

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
                    divEditar.setAttribute("onclick", `IrParaEditarFuncionario(${JSON.stringify(publicacao)})`);

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


                    feed.appendChild(tracinho);
                    feed.appendChild(divLinha);
                }
                var tracinhoFinal = document.createElement("div");
                tracinhoFinal.id = "tracinho";
                tracinhoFinal.style.marginBottom = "10px";
                // finalizarAguardar();
                feed.appendChild(tracinhoFinal);

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        // finalizarAguardar();
    });
}

function adicionarFuncionario() {
    // Selecionar a seção desejada
    var secaoFuncionario = document.querySelector('.abaFuncionarioCadastrar');
  
    // Exibir a seção do funcionário
    secaoFuncionario.style.display = 'block';
  
    // Ocultar outras seções, se necessário
    document.querySelectorAll('.abas section').forEach((sectionAtual) => {
      if (sectionAtual !== secaoFuncionario) {
        sectionAtual.style.display = 'none';
      }
    });

  }

function IrParaEditarFuncionario(funcionarioInformacoes) {
    document.querySelector('#nome_funcionario').value = funcionarioInformacoes.nome;
    document.querySelector('#sobrenome_funcionario').value = funcionarioInformacoes.sobrenome;
    document.querySelector('#email_funcionario').value = funcionarioInformacoes.email;
    document.querySelector('#telefone_funcionario').value = funcionarioInformacoes.telefone;
    document.querySelector('#funcao_funcionario').value = funcionarioInformacoes.funcao;
    // Exibe a seção de edição e oculta as outras seções
    var secaoFuncionario = document.querySelector('.abaFuncionarioEditar');
    secaoFuncionario.style.display = 'block';
    document.querySelector('#sel_tipo_usuario').value = funcionarioInformacoes.tipo;
    
      document.querySelectorAll('.abas section').forEach((sectionAtual) => {
        if (sectionAtual !== secaoFuncionario) {
          sectionAtual.style.display = 'none';
        }
      });
 
  }


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

function MostrarListaComputadores() {
    alert('computadores');
}