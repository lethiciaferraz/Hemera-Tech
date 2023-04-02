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
    var confEmailVar = confirmacaoEmail.value
    var cnpjVar = cnpj_empresa.value
    var senhaVar = senha_empresa.value
    var confSenhaVar = confirmacaoSenha.value

    if (emailVar != confEmailVar) {
        alert('E-mails divergentes')
        return false;

    } else if (senhaVar != confSenhaVar) {
        alert('Senhas divergentes')
        return false;

    } else if (nomeVar == "" || emailVar == "" || confEmailVar == "" || cnpjVar == "" || senhaVar == "" || confSenhaVar == "") {
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
                senhaServer: senhaVar

            })
        }).then(function(resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {

                resposta.json().then(function(response) {

                    dados = response[0]
                    sessionStorage.ID_EMPRESA = dados[0].idEmpresa
                    sessionStorage.NOME_EMPRESA = dados[0].nome

                    console.log('DEU BOM');
                })

                window.location.href ="login.html"
            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function(resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

        return false;

    }
}

function entrar() {

    var emailVar = ip_email.value;
    var senhaVar = ip_senha.value;

    if (emailVar == "" || senhaVar == "") {
        alert('Por favor preencha todos os campos com valores válidos')
        return false;
    } else {
        console.log("FORM EMAIL: ", emailVar);
        console.log("FORM SENHA: ", senhaVar);

        fetch("/empresas/autenticar", {
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
                    sessionStorage.NOME_EMPRESA = json.nome;

                    window.location.href ="dashboard.html"

                });

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