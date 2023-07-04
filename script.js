const $imagemPrincipal = document.querySelector("#imagem-principal");
const $botaoGeraGato = document.querySelector("#btn-gera-gato");
const $coracaoIcon = document.querySelector("#coracao-favorito");
const $header1 = document.querySelector(".header1");
const $section1 = document.querySelector(".section1");
const $header2 = document.querySelector(".header2");
const $section2 = document.querySelector(".section2");
const $efeitoTransparente = document.querySelector(".efeito-transparente");
const $containerImagemTelaCheia = document.querySelector(".container-imagem-tela-cheia")
const $imagemTelaCheia = document.querySelector("#imagem-tela-cheia");
const $colecaoImagensFavoritas = document.querySelector(".collection");


const fotosFavoritadas = [];
let pagina1 = true;
let coracaoClicado = false;
let urlImagemPrincipalAtual = $imagemPrincipal.src;

const urlDaApi = "https://api.thecatapi.com/v1/images/search";

function mudarImagemPrincipal(urlDaImagem){
    $imagemPrincipal.src = urlDaImagem;

}

function gerarGatinho(){
    fetch(urlDaApi)
    .then(array=>array.json())
    .then(arrayJson=>{
        const objetoUrl = arrayJson[0].url;
        urlImagemPrincipalAtual = objetoUrl;
        mudarImagemPrincipal(objetoUrl);
        atualizarCoracao()
        console.log("Sucesso ao obter url: " + objetoUrl);
    })
    .catch(erro=>console.log("Erro ao obter imagem: " + erro))
}

function likeCoracao(){
    coracaoClicado = true;
    $coracaoIcon.style.color = "red";
    fotosFavoritadas.push(urlImagemPrincipalAtual);
    adicionarFotoNaColecaoDeFavoritos()

}

function deslikeCoracao(){
    coracaoClicado = false;
    $coracaoIcon.style.color = "#EEEEEE";
    fotosFavoritadas.pop();
    adicionarFotoNaColecaoDeFavoritos()

}

function atualizarCoracao(){
    coracaoClicado = false;
    $coracaoIcon.style.color = "#EEEEEE";
    console.log("Atualizou coração")
}

function interagirCoracaoIcon(){
    if(!(coracaoClicado)){
        likeCoracao()
        
    } else if(coracaoClicado){
        deslikeCoracao()
    }
}

function carregarFavoritos(){

    if(pagina1){
        pagina1 = false;
        $header1.style.display = "none";
        $section1.style.display = "none";
        $header2.style.display = "block";
        $section2.style.display = "block";
    } 

}

function carregarPaginaPrincipal(){
    if(!pagina1){
        pagina1 = true;
        $header1.style.display = "block";
        $section1.style.display = "block";
        $header2.style.display = "none";
        $section2.style.display = "none";
    }
}

function adicionarFotoNaColecaoDeFavoritos(){
    $colecaoImagensFavoritas.innerHTML = "";
    for(let i = 0; i < fotosFavoritadas.length; i++){
        const img = document.createElement("img")
        img.src = fotosFavoritadas[i]
        img.onclick = function(){
            transferirImagemParaTelaCheia(this)
            verImagem()
        }   
        $colecaoImagensFavoritas.appendChild(img)
    }
}

function verImagem(){
    $efeitoTransparente.style.display = "block";
    $containerImagemTelaCheia.style.display = "block";
}

function voltarAoNormal(){
    $efeitoTransparente.style.display = "none";    
    $containerImagemTelaCheia.style.display = "none";
}

function transferirImagemParaTelaCheia(imagem){
    console.log(imagem.src)
    $imagemTelaCheia.src = imagem.src

}

$efeitoTransparente.addEventListener("click", voltarAoNormal);
$coracaoIcon.addEventListener("click", interagirCoracaoIcon);


