
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

function CadastrarEmpresa() {

}