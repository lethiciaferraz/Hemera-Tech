
// menu sanduiche
// ele adiciona o a classe 'ativado' nas seguintes classes
let menuSanduiche = document.querySelector('.abre-fecha-menu');
let navbar = document.querySelector('.navbar');
let conteudo = document.querySelector('.conteudo');

menuSanduiche.onclick = function(){
    navbar.classList.toggle('ativado');
    conteudo.classList.toggle('ativado');
}