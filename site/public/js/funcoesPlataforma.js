// função para a página de dashboard momentaneo, pois isso deve mudar ao clicar e nao passar o mouse!!!!
    let lista = document.querySelectorAll('.menu-lateral a');

    function ativarLink() {
        lista.forEach((item) => item.classList.remove('hovered'));
        this.classList.add('hovered');
    }

    lista.forEach((item) => {
        item.addEventListener('mouseover', ativarLink);
    });


// menu sanduiche
// ele adiciona o a classe 'ativado' nas seguintes classes
let menuSanduiche = document.querySelector('.abre-fecha-menu');
let navbar = document.querySelector('.navbar');
let conteudo = document.querySelector('.conteudo');

menuSanduiche.onclick = function(){
    navbar.classList.toggle('ativado');
    conteudo.classList.toggle('ativado');
}