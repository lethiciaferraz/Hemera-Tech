
// função da cor do menu
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 1400 || document.documentElement.scrollTop > 1400) {
        document.getElementById("quem_somos_selecao").style.color = "#000"
        document.getElementById("servicos_selecao").style.color = "#000"
        document.getElementById("contato_selecao").style.color = "#6B0CC5"

    } else if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200){
        document.getElementById("quem_somos_selecao").style.color = "#000"
        document.getElementById("servicos_selecao").style.color = "#6B0CC5"
        document.getElementById("contato_selecao").style.color = "#000"

    } else if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0){

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

function ConfirmacaoSenha() {
    var senha1 = senha_empresa.value
    var senha2 = confirmacaoSenha.value

    if (senha1 != senha2) {
        div_senha.InnerHTML = '<input type="password" id="confirmacaoSenha" placeholder="Confirmação de senha:" onchange="ConfirmacaoSenha()" style="border: 2px solid red;">'

        botao_cadastro.innerHTML = '<button id="bt_cadastrar" >Cadastrar</button>'
    }
}

function ConfirmacaoEmail() {
    var email1 = email_empresa.value
    var email2 = confirmacaoEmail.value

    if (email1 != email2) {
        div_email.InnerHTML = '<input type="text" id="confirmacaoEmail" placeholder="Confirmação de E-mail:" onchange="ConfirmacaoEmail()" style="border: 2px solid red;">'

        botao_cadastro.innerHTML = '<button id="bt_cadastrar" >Cadastrar</button>'
    }
}

function CadastrarEmpresa() {
    var nomeVar = nome_empresa.value
    var emailVar = email_empresa.value
    var confEmailVar = confirmacaoEmail.value
    var cnpjVar = cnpj_empresa.value
    var senhaVar = senha_empresa.value
    var confSenhaVar = confirmacaoSenha.value

    if (nomeVar == "" || emailVar == "" || confEmailVar == "" || cnpjVar == "" || senhaVar == "" || confSenhaVar == "") {
        alert("Por favor, preencha todos os campos!")
    }


}