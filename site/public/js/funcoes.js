// função da cor do menu
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 1400 || document.documentElement.scrollTop > 1400) {
        document.getElementById("quem_somos_selecao").style.color = "#000"
        document.getElementById("servicos_selecao").style.color = "#000"
        document.getElementById("contato_selecao").style.color = "#6B0CC5"

    } else if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.getElementById("quem_somos_selecao").style.color = "#000"
        document.getElementById("servicos_selecao").style.color = "#6B0CC5"
        document.getElementById("contato_selecao").style.color = "#000"

    } else if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {

        document.getElementById("quem_somos_selecao").style.color = "#6B0CC5"
        document.getElementById("servicos_selecao").style.color = "#000"
        document.getElementById("contato_selecao").style.color = "#000"
    }
}

function MostrarMenu() {
    let menuMobile = document.querySelector('.mobile-menu');

    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
    } else {
        menuMobile.classList.add('open');
    }
}


function CadastrarEmpresa() {
    var nomeVar = nome_empresa.value
    var emailVar = email_empresa.value
    var cnpjVar = cnpj_empresa.value.replace(/\D/g, '');
    var dddVar = 11
    var telefoneSemMascara = telefone_empresa.value.replace(/\D/g, '');
    //removendo os primeiros dois digitos do numero
    telefoneSemMascara = telefoneSemMascara.substring(2);
    var telefoneVar = Number(telefoneSemMascara)
    var cepVar = cep_empresa.value.replace(/\D/g, '');
    var logradouroVar = logradouro_empresa.value
    var complementoVar = complemento_empresa.value

    if (nomeVar == "" || emailVar == "" ||
        cnpjVar == "" || dddVar == null || telefoneVar == null || cepVar == '' || logradouroVar == "" || complementoVar == "") {
        alert("Por favor, preencha todos os campos!")
        return false;

    } else {
        fetch("/empresas/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/empresa.js
                nomeServer: nomeVar,
                emailServer: emailVar,
                cnpjServer: cnpjVar,
                dddServer: dddVar,
                telefoneServer: telefoneVar,
                cepServer: cepVar,
                logradouroServer: logradouroVar,
                complementoServer: complementoVar

            })
        }).then(function(resposta) {
            console.log();
            console.log("resposta: ", resposta);
            // console.log(recordset)

            if (resposta.ok) {

                resposta.json().then(function(response) {
                    console.log(response);
                    // max_uso_cpu, max_utilizado_memoria, max_utilizado_armazenamento, max_download_rede, max_upload_rede, idEmpresa
                    sessionStorage.ID_EMPRESA = response[0].idEmpresa;
                    sessionStorage.PARAMETROS = response[0]
                        // sessionStorage.ID_EMPRESA = 1

                    console.log('DEU BOM');

                    // window.location = "cadastroFuncionario.html";
                })

                // AINDA NAO COLEI O CSS DOS CARD
                // cardErro.style.display = "block";
                // mensagem_erro.innerHTML = "Cadastro da empresa feito com sucesso. Redirecionando para o cadastro de funcionário...";

                let timerInterval
                Swal.fire({
                    title: 'Cadastro da empresa feito com sucesso!',
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft()
                        }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log('I was closed by the timer')
                            // window.location = "/dashboard/relatorio.html";
                        window.location = "../cadastroHemera/cadastroFuncionario.html";

                    }
                })



            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function(resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

        return false;

    }
}

function CadastrarFuncionario() {
    var nomeVar = nome_funcionario.value
    var sobrenomeVar = sobrenome_funcionario.value
    var emailVar = email_funcionario.value
    var cpfVar = cpf_funcionario.value.replace(/\D/g, '');

    var telefoneSemMascara = telefone_funcionario.value.replace(/\D/g, '');
    //removendo os primeiros dois digitos do numero
    telefoneFSemMascara = telefoneSemMascara.substring(2);
    var telefoneVar = Number(telefoneFSemMascara)
    var senhaVar = 'senha123'
    var confSenha = 'senha123'
    var funcaoVar = funcao_funcionario.value
    var flagadmVar = sel_tipo_usuario.value == "colaborador" ? 0 : 1

    if (nomeVar == "" || emailVar == "" || cpfVar == null || telefoneVar == null || senhaVar == '' || confSenha == "" || funcaoVar == "" || sel_tipo_usuario.value == "") {
        alert("Por favor, preencha todos os campos!")
        return false;

    } else {
        if (senhaVar != confSenha) {
            alert('As senhas não combinam')
            return false;
        } else {
            fetch("/funcionarios/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    // crie um atributo que recebe o valor recuperado aqui
                    // Agora vá para o arquivo routes/empresa.js
                    nomeServer: nomeVar,
                    sobrenomeServer: sobrenomeVar,
                    emailServer: emailVar,
                    cpfServer: cpfVar,
                    telefoneServer: telefoneVar,
                    senhaServer: senhaVar,
                    funcaoServer: funcaoVar,
                    flagAdmServer: flagadmVar,
                    idEmpresaServer: sessionStorage.ID_EMPRESA,
                })
            }).then(function(resposta) {

                console.log("resposta: ", resposta);

                if (resposta.ok) {

                    resposta.json().then(function(response) {

                        // sessionStorage.ID_FUNCIONARIO_ADICIONADO = response[0].idFuncionario;

                        console.log('DEU BOM CADASTRAR FUNCIONARIO');

                        // AdicionarFuncao(funcaoVar, flagadmVar);

                        // AINDA NAO COLEI O CSS DOS CARD
                        // cardErro.style.display = "block";
                        // mensagem_erro.innerHTML = "Cadastro do funcionário feito com sucesso <br>Redirecionando para a tela de Login";
                        alert('cadastramos');
                        // setTimeout(() => {
                        //     window.location = "login.html";
                        // }, "2000")
                    })


                    let timerInterval
                    Swal.fire({
                        title: 'Cadastro do funcionário feito com sucesso!',
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            const b = Swal.getHtmlContainer().querySelector('b')
                            timerInterval = setInterval(() => {
                                b.textContent = Swal.getTimerLeft()
                            }, 100)
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log('I was closed by the timer')
                                // window.location = "/dashboard/relatorio.html";

                        }
                    })

                } else {
                    throw ("Houve um erro ao tentar realizar o cadastro!");
                }
            }).catch(function(resposta) {
                console.log(`#ERRO: ${resposta}`);
            });

            return false;

        }

    }
}


function CadastrarFuncionarioConfig() {
    console.log(sessionStorage.ID_EMPRESA);
    var nomeVar = nome_funcionario.value
    var sobrenomeVar = sobrenome_funcionario.value
    var emailVar = email_funcionario.value
    var cpfVar = cpf_funcionario.value
    var telefoneVar =  Number(telefone_funcionario.value);
    //  telefoneVar = Number(telefoneFSemMascara)
    var senhaVar = 'senha123'
    var confSenha = 'senha123'
    var funcaoVar = funcao_funcionario.value
    var flagadmVar = sel_tipo_usuario.value == "colaborador" ? 0 : 1

    if (nomeVar == "" || emailVar == "" || cpfVar == '' || telefoneVar == null || senhaVar == '' || confSenha == "" || funcaoVar == "" || sel_tipo_usuario.value == "") {
        alert("Por favor, preencha todos os campos!")
        return false;

    } else {
        if (senhaVar != confSenha) {
            alert('As senhas não combinam')
            return false;
        } else {
            fetch("/funcionarios/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    // crie um atributo que recebe o valor recuperado aqui
                    // Agora vá para o arquivo routes/empresa.js
                    nomeServer: nomeVar,
                    sobrenomeServer: sobrenomeVar,
                    emailServer: emailVar,
                    cpfServer: cpfVar,
                    telefoneServer: telefoneVar,
                    senhaServer: senhaVar,
                    funcaoServer: funcaoVar,
                    flagAdmServer: flagadmVar,
                    idEmpresaServer: sessionStorage.ID_EMPRESA,
                })
            }).then(function(resposta) {

                console.log("resposta: ", resposta);

                if (resposta.ok) {

                    resposta.json().then(function(response) {

                        // sessionStorage.ID_FUNCIONARIO_ADICIONADO = response[0].idFuncionario;

                        console.log('DEU BOM CADASTRAR FUNCIONARIO');

                        // AdicionarFuncao(funcaoVar, flagadmVar);

                        // AINDA NAO COLEI O CSS DOS CARD
                        // cardErro.style.display = "block";
                        // mensagem_erro.innerHTML = "Cadastro do funcionário feito com sucesso <br>Redirecionando para a tela de Login";
                        alert('cadastramos');
                        // setTimeout(() => {
                        //     window.location = "login.html";
                        // }, "2000")
                    })


                    let timerInterval
                    Swal.fire({
                        title: 'Cadastro do funcionário feito com sucesso!',
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            const b = Swal.getHtmlContainer().querySelector('b')
                            timerInterval = setInterval(() => {
                                b.textContent = Swal.getTimerLeft()
                            }, 100)
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log('I was closed by the timer')
                                // window.location = "/dashboard/relatorio.html";

                        }
                    })

                } else {
                    throw ("Houve um erro ao tentar realizar o cadastro!");
                }
            }).catch(function(resposta) {
                console.log(`#ERRO: ${resposta}`);
            });

            return false;

        }

    }
}

// function AdicionarFuncao(funcaoVar, flagadmVar) {
//     fetch("/funcionarios/adicionarFuncao", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             funcaoServer: funcaoVar,
//             flagAdmServer: flagadmVar,
//             idEmpresaServer: sessionStorage.ID_EMPRESA,
//             idFuncionarioServer: sessionStorage.ID_FUNCIONARIO_ADICIONADO
//         })
//     }).then(function(resposta) {

//         console.log("resposta: ", resposta);

//         if (resposta.ok) {

//             console.log('DEU BOM');

//         } else {
//             throw ("Houve um erro ao tentar realizar o cadastro!");
//         }
//     }).catch(function(resposta) {
//         console.log(`#ERRO: ${resposta}`);
//     });

//     return false;
// }

function entrar() {

    var emailVar = ip_email.value;
    var senhaVar = ip_senha.value;

    if (emailVar == "" || senhaVar == "") {
        alert('Por favor preencha todos os campos com valores válidos')
        return false;
    } else {
        console.log("FORM EMAIL: ", emailVar);
        console.log("FORM SENHA: ", senhaVar);

        fetch("/funcionarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar
            })
        }).then(function(resposta) {
            console.log("ESTOU NO THEN DO entrar()!")

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));

                    sessionStorage.ID_EMPRESA = json.idEmpresa;
                    sessionStorage.ID_FUNCIONARIO = json.idFuncionario;
                    sessionStorage.NOME_USUARIO = json.nome;

                });
                // AINDA NAO COLEI O CSS DOS CARD
                // cardErro.style.display = "block";
                // mensagem_erro.innerHTML = "Login feito com sucesso";

                let timerInterval
                Swal.fire({
                    title: 'Login feito com sucesso!',
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft()
                        }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log('I was closed by the timer')
                        window.location = "/dashboard/relatorio.html";
                    }
                })


            } else {
                console.log("Houve um erro ao tentar realizar o login!");

                resposta.text().then(texto => {
                    console.error(texto);
                    alert(texto)
                });
            }

        }).catch(function(erro) {
            console.log(erro);
        })

        return false;
    }
}