const html = document.querySelector('html');
//buttons
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const buttons = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');

//imgs
const banner = document.querySelector('.app__image');
const imgPlayPause = document.querySelector('.app__card-primary-butto-icon');

//texts
const titulo = document.querySelector('.app__title');

//musica
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const somPlay = new Audio('sons/play.wav');
const somPause = new Audio('sons/pause.mp3');
const somFinish = new Audio('sons/beep.mp3');

//temporizador
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
const tempoNaTela = document.querySelector('#timer');

musica.loop = true;

musicaFocoInput.addEventListener('change',() => {
    if(musica.paused){
        musica.play();
    }
    else{
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 10;
    alterarContexto('foco');
    focoBt.classList.add('active');
    })

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
    })

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
    })

function alterarContexto(contexto){ 
    mostrarTempo()
    //para cada botao, remove a classe active quando alterado o contexto
    buttons.forEach(button => button.classList.remove('active'));
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch(contexto){
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.
            <strong class="app__title-strong">Faça uma pausa longa!</strong>`;
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <=0){
        somFinish.play();
        alert('Acabou!');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
};

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if(intervaloId){
        somPause.play();
        zerar();
        return;
    }
    somPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = 'Pausar';
    imgPlayPause.setAttribute('src', '/imagens/pause.png');
}

function zerar(){
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = 'Começar';    
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/play_arrow.png`)
    intervaloId = null;
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML =`${tempoFormatado}`;
}

mostrarTempo()