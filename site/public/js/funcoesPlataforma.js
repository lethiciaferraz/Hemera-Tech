// menu sanduiche
let menuSanduiche = document.querySelector('.abre-fecha-menu');

// ele adiciona o a classe 'ativado' nas seguintes classes
let navbar = document.querySelector('.navbar');
let conteudo = document.querySelector('.conteudo');
let logo = document.querySelector(".imagem_logo")

menuSanduiche.onclick = function () {
    navbar.classList.toggle('ativado');
    conteudo.classList.toggle('ativado');
    logo.classList.toggle("ativado");

    let logoAtivado = document.querySelector(".imagem_logo.ativado")

    if (logoAtivado) {
        logoAtivado.src = "../assets/dashboard/icone-logo.png";
    }else{
        logo.src = "../assets/HEMERA.png";
    }
}

var nome = sessionStorage.NOME_USUARIO;
var b_usuario = document.getElementById("usuario_atual");
b_usuario.innerHTML = nome; 
