var idEmpresa = Number(sessionStorage.getItem('ID_EMPRESA'));

function exibirSection(sectionSelecionada) {
    document.querySelectorAll('.abas section').forEach((sectionAtual) => {
        sectionAtual.style.display = 'none';
    });

    // MOSTRA A SECTION 
    let sectionExibir = document.querySelector(`.${sectionSelecionada}`);
    sectionExibir.style.display = 'block';
}


window.addEventListener('load', () => {
    document.querySelectorAll('.abas nav a').forEach((a) => {
        a.addEventListener('click', () => {

            let f = a.parentNode.querySelector('a.selecionado')

            if (f) f.classList.remove('selecionado')
            a.classList.add('selecionado')

            // ADICIONEI ISO 
            // criar variavel para guardar o elemento que foi clicado(o data target varia)
            let div = document.querySelector(`.abas .${a.getAttribute('data-target')}`)

            // pega todas as section dentro da div de classe abas
            document.querySelectorAll('.abas section').forEach((sectionAtual) => {

                // ele checa se é a mesma que foi clicada e some ou dá block nela
                if (sectionAtual == div) {
                    sectionAtual.style.display = 'block'
                } else {
                    sectionAtual.style.display = 'none'
                }
            })

            // AQUI É PRA CHAMAR A FUNÇÃO DO GRÁFICO CORRESONDENTE A ABA
            let selecionado = a.getAttribute('data-target');
            if (selecionado === 'abaEmpresa') {
                MostrarDadosEmpresa();
            } else if (selecionado === 'abaFuncionarios') {
                MostrarListaFuncionarios();
            } else if (selecionado === 'abaComputadores') {
                MostrarListaComputadores();
            }
            //   ---------------------------------------------
        })

        if (location.hash) {
            document.querySelector('a[href="' + location.hash + '"]').click()
        }
    })
})

// PEGAR TODOS OS INPUTS
const inputs = document.querySelectorAll('input');
// QUANDO O USUARIO SAIR DO CAMPO SE ELE ESTIVER APENAS COM ESPAÇOS ELE LIMPA
inputs.forEach(function (input) {
    input.addEventListener('blur', function () {
        input.value = input.value.trim();
    });
});

const nomeEmpresaInput = document.querySelector('#nome_empresa');
const cnpjInput = document.querySelector('#cnpj_empresa');
const emailInput = document.querySelector('#email_empresa');
const telefoneInput = document.querySelector('#telefone_empresa');
const cepInput = document.querySelector('#cep_empresa');
const complementoInput = document.querySelector('#complemento_empresa');
const logradouroInput = document.querySelector('#logradouro_empresa');
const botoesEmpresa = document.querySelector('#botoes_dados_empresa');
const botaoEditar = document.querySelector('#botao_editar');
const titulo = document.querySelector('#texto_titulo');
const obrigatorio = document.querySelectorAll('label.user-label');


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
                titulo.textContent = ''

                titulo.textContent = 'Dados da Empresa'

                // botoes_dados_empresa.innerHTML = '';
                var botaoExistente = document.querySelector("#botao_cancelar");
                if (botaoExistente) {
                    // Remove o botão se ele existir
                    botoesEmpresa.removeChild(botaoExistente);

                }

                for (var i = 0; i < obrigatorio.length; i++) {
                    var span = obrigatorio[i].querySelector('span');
                    if (span) {
                        obrigatorio[i].removeChild(span);
                    }
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

                    botaoEditar.textContent = "Editar Dados";

                    // botoes_dados_empresa.innerHTML = '<button onclick="EditarEmpresa()" id="botao_editar">Editar Dados</button>';



                    // botoesEmpresa.appendChild(botaoEditar);

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
        titulo.textContent = ''

        titulo.textContent = 'Editar Dados da Empresa'
        nomeEmpresaInput.removeAttribute('disabled');
        nomeEmpresaInput.classList.add('transition-input');

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

        botaoEditar.textContent = "Salvar alterações";
        botoesEmpresa.appendChild(botaoCancelar);

        for (var i = 0; i < obrigatorio.length; i++) {
            var span = document.createElement('span');
            span.style.color = 'red';
            span.style.fontSize = '13px';
            span.textContent = '*';

            obrigatorio[i].appendChild(span);
        }

    } else {
        let nomeEmpresaVar = nomeEmpresaInput.value.trim()
        let cnpjVar = cnpjInput.value.trim()
        let emailVar = emailInput.value.trim()
        let telefoneVar = telefoneInput.value.trim()
        let cepVar = cepInput.value.trim()
        let logradouroVar = logradouroInput.value.trim()

        if (nomeEmpresaVar == "" || cnpjVar == "" || emailVar == "" || telefoneVar == '' || cepVar == "" || logradouroVar == '') {
            let timerInterval
            Swal.fire({
                title: 'Não deixe nenhum campo em branco!',
                //   html: 'I will close in <b></b> milliseconds.',
                timer: 1200,
                //              timerProgressBar: true,
                icon: 'error',
                showConfirmButton: false,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('faltam preencher campos')
                    // exibirSection('abaFuncionarios')
                }
            })
            return false;

        } else {
            fetch(`/empresas/editarEmpresa/${idEmpresa}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: nomeEmpresaVar,
                    cnpj: cnpjVar,
                    email: emailVar,
                    telefone: telefoneVar,
                    cep: cepVar,
                    logradouro: logradouroVar,
                    complemento: complementoInput.value
                })
            }).then(function (resposta) {

                if (resposta.ok) {
                    // window.alert("Dados da empresa atualizados com sucesso pelo usuario" + sessionStorage.getItem("NOME_USUARIO") + "!"
                    let timerInterval
                    Swal.fire({
                        title: 'Alterações salvas com sucesso!',
                        //   html: 'I will close in <b></b> milliseconds.',
                        timer: 1200,
                        //              timerProgressBar: true,
                        icon: 'success',
                        showConfirmButton: false,
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log('salvo com sucesso')
                            MostrarDadosEmpresa()
                        }
                    })

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
}

let nomeFuncionarioInput = document.querySelector('#nome_funcionario');
let sobrenomeFuncionarioInput = document.querySelector('#sobrenome_funcionario');
let cpfFuncionarioInput = document.querySelector('#cpf_funcionario');
let telefoneFuncionarioInput = document.querySelector('#telefone_funcionario');
let emailFuncionarioInput = document.querySelector('#email_funcionario');
let funcaoFuncionarioInput = document.querySelector('#funcao_funcionario');
let tipoFuncionarioSelect = document.querySelector('#sel_tipo_usuario');



// MostrarLista de funcionário
function MostrarListaFuncionarios() {
    //aguardar();
    fetch(`/funcionarios/listarFuncionarios/${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementsByClassName("lista_funcionarios")[0];

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

                    tipoUsuario = ""
                    if (publicacao.flagAdministrador == true) {
                        tipoUsuario = 'Administrador';
                    } else {
                        tipoUsuario = 'Colaborador';
                    }
                    dado5.innerHTML = tipoUsuario;
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
                feed.appendChild(tracinhoFinal);
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

function IrParaEditarFuncionario(funcionarioInformacoes) {
    console.log(funcionarioInformacoes)
    // VERIFICA QUAL SECTION ESTÁ APARECENDO E DÁ NONE PRA ELA SUMIR
    document.querySelectorAll('.abas section').forEach((sectionAtual) => {
        sectionAtual.style.display = 'none';
    });

    // MOSTRA A SECTION DE EDITAR FUNCIONARIO
    let secaoFuncionario = document.querySelector('.abaFuncionarioEditar');
    secaoFuncionario.style.display = 'block';

    let divBotoes = document.getElementById("botoes_dados_funcionario");
    divBotoes.innerHTML = "";
    // COLOCANDO AS INFORMAÇÕES DOS FUNCIONÁRIOS NOS INPUTS
    nomeFuncionarioInput.value = funcionarioInformacoes.nome;
    sobrenomeFuncionarioInput.value = funcionarioInformacoes.sobrenome;
    cpfFuncionarioInput.value = funcionarioInformacoes.cpf;
    emailFuncionarioInput.value = funcionarioInformacoes.email;
    telefoneFuncionarioInput.value = funcionarioInformacoes.telefone;
    funcaoFuncionarioInput.value = funcionarioInformacoes.funcao;
    tipoFuncionarioSelect.value = funcionarioInformacoes.flagAdministrador ? 'administrador' : 'colaborador';


    let botaoEditarFuncionario = document.createElement("button");
    botaoEditarFuncionario.innerText = "Salvar alterações";
    botaoEditarFuncionario.setAttribute("onclick", `EditarFuncionario(${funcionarioInformacoes.idFuncionario})`);

    let botaoCancelarEditarFuncionario = document.createElement("button");
    botaoCancelarEditarFuncionario.innerText = "Cancelar";
    botaoCancelarEditarFuncionario.setAttribute("onclick", `exibirSection('abaFuncionarios')`);

    divBotoes.appendChild(botaoEditarFuncionario);
    divBotoes.appendChild(botaoCancelarEditarFuncionario);

}

function EditarFuncionario(idFuncionario) {
    let flagAdministradorVar = tipoFuncionarioSelect.value.trim();
    if (flagAdministradorVar == "colaborador") {
        flagAdministradorVar = false;
    } else if (flagAdministradorVar == "administrador") {
        flagAdministradorVar = true;
    }else {
        flagAdministradorVar = null
    }

    let nomeFuncionarioVar = nomeFuncionarioInput.value.trim()
    let sobrenomeFuncionarioVar = sobrenomeFuncionarioInput.value.trim()
    let cpfFuncionarioVar = cpfFuncionarioInput.value.trim()
    let emailFuncionarioVar = emailFuncionarioInput.value.trim()
    let telefoneFuncionarioVar = telefoneFuncionarioInput.value.trim()
    let funcaoFuncionarioVar = funcaoFuncionarioInput.value.trim()

    if (nomeFuncionarioVar == "" || sobrenomeFuncionarioVar == "" ||
        cpfFuncionarioVar == "" || emailFuncionarioVar == '' || telefoneFuncionarioVar == '' || funcaoFuncionarioVar == '' || flagAdministradorVar == null) {
        // alert("Por favor, preencha todos os campos do funcionário!")

        let timerInterval
        Swal.fire({
            title: 'Não deixe nenhum campo em branco!',
            //   html: 'I will close in <b></b> milliseconds.',
            timer: 1200,
            //              timerProgressBar: true,
            icon: 'error',
            showConfirmButton: false,
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('faltam preencher campos')
                // exibirSection('abaFuncionarios')
            }
        })
        return false;

    } else {
        fetch(`/funcionarios/editarFuncionario/${idFuncionario}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nomeFuncionarioVar,
                sobrenome: sobrenomeFuncionarioVar,
                cpf: cpfFuncionarioVar,
                email: emailFuncionarioVar,
                telefone: telefoneFuncionarioVar,
                funcao: funcaoFuncionarioVar,
                flagAdministrador: flagAdministradorVar

            })
        }).then(function (resposta) {

            if (resposta.ok) {
                // window.location = "/dashboard/mural.html"

                let timerInterval
                Swal.fire({
                    title: 'Alterações salvas com sucesso!',
                    //   html: 'I will close in <b></b> milliseconds.',
                    timer: 1200,
                    //              timerProgressBar: true,
                    icon: 'success',
                    showConfirmButton: false,
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log('salvo com sucesso')
                        exibirSection('abaFuncionarios')
                        MostrarListaFuncionarios();
                    }
                })


            } else if (resposta.status == 404) {
                window.alert("Deu 404!");
            } else {
                throw ("Houve um erro ao tentar editar dados do funcionário! Código da resposta: " + resposta.status);
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    }
}
function deletarFuncionario(idFuncionario) {
    console.log("FUNCIONÁRIO A SER DELETADO - ID" + idFuncionario);
    Swal.fire({
        title: 'Tem certeza?',
        //     text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Deletar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/funcionarios/deletarFuncionario/${idFuncionario}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (resposta) {

                if (resposta.ok) {
                    // window.alert("Funcionário deletado com sucesso " + sessionStorage.getItem("NOME_USUARIO") + "!");
                    Swal.fire(
                        'Funcionário deletado'
                    )
                }
            })

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

    //aguardar();
    fetch(`/computadores/listarComputadores/${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementsByClassName("lista_computadores")[0];

                var mensagem = document.createElement("span");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados computadores recebidos: ", JSON.stringify(resposta));

                var feed = document.getElementsByClassName("lista_computadores")[0];

                // Remover linhas antigas (exceto o título)
                var linhasAntigas = feed.querySelectorAll("#linha ~ div:not(#titulo)");
                linhasAntigas.forEach(function (linhaAntiga) {
                    linhaAntiga.remove();
                });

                for (let i = 0; i < resposta.length; i++) {
                    var computadorAtual = resposta[i];

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

                    dado1.innerHTML = computadorAtual.idComputador;
                    dado2.innerHTML = computadorAtual.MacAddress;
                    dado3.innerHTML = computadorAtual.sistema_operacional;
                    dado4.innerHTML = computadorAtual.total_memoria;
                    dado5.innerHTML = computadorAtual.total_armazenamento;
                    funcaoEditar.innerHTML = "editar";
                    funcaoDeletar.innerHTML = "deletar";

                    divLinha.id = "linha";
                    divDado1.id = "dado_idComputador";
                    divDado2.id = "dado_macAddress";
                    divDado3.id = 'dado_sistemaOperacional';
                    divDado4.id = "dado_totalRAM";
                    divDado5.id = "dado_totalDisco";
                    divEditar.id = "editar";
                    divEditar.setAttribute("onclick", `IrParaEditarComputador(${JSON.stringify(computadorAtual)})`);

                    divDeletar.id = "deletar";
                    divDeletar.setAttribute("onclick", `deletarComputador(${computadorAtual.idComputador})`);


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
                feed.appendChild(tracinhoFinal);
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

let macAddressComputadorInput = document.querySelector('#macAddress_computador');
let sistemaOperacionalComputadorInput = document.querySelector('#sistemaOperacional_computador');
let modeloProcessadorComputadorInput = document.querySelector('#modeloProcessador_computador');
let totalRamComputadorInput = document.querySelector('#totalRam_computador');
let totalDiscoComputadorInput = document.querySelector('#totalDisco_computador');

function IrParaEditarComputador(computadorInformacoes) {
    console.log(computadorInformacoes)
    // VERIFICA QUAL SECTION ESTÁ APARECENDO E DÁ NONE PRA ELA SUMIR
    document.querySelectorAll('.abas section').forEach((sectionAtual) => {
        sectionAtual.style.display = 'none';
    });

    // MOSTRA A SECTION DE EDITAR COMPUTADOR
    let secaoComputador = document.querySelector('.abaComputadorEditar');
    secaoComputador.style.display = 'block';

    let divBotoes = document.getElementById("botoes_dados_computador");
    divBotoes.innerHTML = "";
    // COLOCANDO AS INFORMAÇÕES DOS Computadores NOS INPUTS
    macAddressComputadorInput.value = computadorInformacoes.MacAddress;
    sistemaOperacionalComputadorInput.value = computadorInformacoes.sistema_operacional;
    modeloProcessadorComputadorInput.value = computadorInformacoes.modelo;
    totalRamComputadorInput.value = computadorInformacoes.total_memoria;
    totalDiscoComputadorInput.value = computadorInformacoes.total_armazenamento;


    let botaoEditarComputador = document.createElement("button");
    botaoEditarComputador.innerText = "Editar";
    botaoEditarComputador.setAttribute("onclick", `EditarComputador(${computadorInformacoes.idComputador})`);

    let botaoCancelarEditarComputador = document.createElement("button");
    botaoCancelarEditarComputador.innerText = "Cancelar";
    botaoCancelarEditarComputador.setAttribute("onclick", `exibirSection('abaComputadores')`);

    divBotoes.appendChild(botaoEditarComputador);
    divBotoes.appendChild(botaoCancelarEditarComputador);
}


function EditarComputador(idComputador) {
    let sistemaOperacionalComputadorVar = sistemaOperacionalComputadorInput.value.trim()
    let modeloProcessadorComputadorVar = modeloProcessadorComputadorInput.value.trim()
    let totalRamComputadorVar = totalRamComputadorInput.value.trim()
    let totalDiscoComputadorVar = totalDiscoComputadorInput.value.trim()


    if (sistemaOperacionalComputadorVar == "" || modeloProcessadorComputadorVar == "" ||
        totalRamComputadorVar == "" || totalDiscoComputadorVar == '') {

        let timerInterval
        Swal.fire({
            title: 'Não deixe nenhum campo em branco!',
            //   html: 'I will close in <b></b> milliseconds.',
            timer: 1200,
            //              timerProgressBar: true,
            icon: 'error',
            showConfirmButton: false,
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('faltam preencher campos')
                // exibirSection('abaFuncionarios')
            }
        })
        return false;

    } else {
        fetch(`/computadores/editarComputador/${idComputador}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sistemaOperacional: sistemaOperacionalComputadorVar,
                modelo: modeloProcessadorComputadorVar,
                totalRam: totalRamComputadorVar,
                totalDisco: totalDiscoComputadorVar,

            })
        }).then(function (resposta) {

            if (resposta.ok) {
                // window.location = "/dashboard/mural.html"

                let timerInterval
                Swal.fire({
                    title: 'Alterações salvas com sucesso!',
                    //   html: 'I will close in <b></b> milliseconds.',
                    timer: 1200,
                    //              timerProgressBar: true,
                    icon: 'success',
                    showConfirmButton: false,
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log('salvo com sucesso')
                        exibirSection('abaComputadores')
                        MostrarListaComputadores();
                    }
                })


            } else if (resposta.status == 404) {
                window.alert("Deu 404!");
            } else {
                throw ("Houve um erro ao tentar editar dados do computador! Código da resposta: " + resposta.status);
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    }
}
function deletarComputador(idComputador) {
    console.log("COMPUTADOR A SER DELETADO - ID" + idComputador);
    Swal.fire({
        title: 'Tem certeza?',
        //     text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Deletar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/computadores/deletarComputador/${idComputador}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (resposta) {

                if (resposta.ok) {
                    // window.alert("Funcionário deletado com sucesso " + sessionStorage.getItem("NOME_USUARIO") + "!");
                    Swal.fire(
                        'Computador deletado'
                    )
                }
            })

            MostrarListaComputadores();
            console.log("deletado com sucesso")
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar deletar o computador! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

