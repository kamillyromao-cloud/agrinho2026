// Variáveis do jogo
let pontos = 0;
let energia = 100;
let aranhaPosicaoX = 275; // Posição X inicial do Aranha
const cenarioLargura = 550; // Limite da tela do jogo

// Elementos do HTML
const aranha = document.getElementById('aranha');
const itemBom = document.getElementById('item-bom');
const itemRuim = document.getElementById('item-ruim');
const pontosTxt = document.getElementById('pontos');
const energiaTxt = document.getElementById('energia');

// Lista de emojis de coisas boas do tema Agrinho
const coisasBoas = ['💧', '💩', '🛸', '🌱', '🍎']; 

// Posições iniciais dos itens caindo
let itemBomY = -50, itemBomX = Math.random() * cenarioLargura;
let itemRuimY = -100, itemRuimX = Math.random() * cenarioLargura;

let velocidadeItem = 4;

// Função para mover o Aranha
function moverEsquerda() {
    if (aranhaPosicaoX > 0) {
        aranhaPosicaoX -= 25;
        aranha.style.left = aranhaPosicaoX + 'px';
    }
}

function moverDireita() {
    if (aranhaPosicaoX < cenarioLargura - 50) {
        aranhaPosicaoX += 25;
        aranha.style.left = aranhaPosicaoX + 'px';
    }
}

// Ouvir teclas do teclado
document.addEventListener('keydown', (evento) => {
    if (evento.key === 'ArrowLeft') moverEsquerda();
    if (evento.key === 'ArrowRight') moverDireita();
});

// Loop principal do Jogo (roda o tempo todo)
function atualizarJogo() {
    if (energia <= 0) {
        alert(`Fim de Jogo! O Aranha ajudou a salvar a fazenda e conseguiu ${pontos} pontos de sustentabilidade!`);
        pontos = 0;
        energia = 100;
        velocidadeItem = 4;
    }

    // Fazendo o item BOM cair
    itemBomY += velocidadeItem;
    if (itemBomY > 400) { // Passou do chão, reinicia no topo
        itemBomY = -50;
        itemBomX = Math.random() * (cenarioLargura - 40);
        // Muda o desenho do item sustentável aleatoriamente
        itemBom.innerText = coisasBoas[Math.floor(Math.random() * coisasBoas.length)];
    }
    itemBom.style.top = itemBomY + 'px';
    itemBom.style.left = itemBomX + 'px';

    // Fazendo o item RUIM cair
    itemRuimY += velocidadeItem + 0.5; // Cai um pouquinho mais rápido
    if (itemRuimY > 400) {
        itemRuimY = -100;
        itemRuimX = Math.random() * (cenarioLargura - 40);
    }
    itemRuim.style.top = itemRuimY + 'px';
    itemRuim.style.left = itemRuimX + 'px';

    // Checar colisão com Item Bom
    if (itemBomY > 340 && itemBomY < 390 && Math.abs(itemBomX - aranhaPosicaoX) < 40) {
        pontos += 10;
        pontosTxt.innerText = pontos;
        itemBomY = -50; // Reseta o item
        itemBomX = Math.random() * (cenarioLargura - 40);
        
        // Aumenta a velocidade aos poucos para ficar desafiador
        if (pontos % 50 === 0) velocidadeItem += 1; 
    }

    // Checar colisão com Item Ruim (Poluição)
    if (itemRuimY > 340 && itemRuimY < 390 && Math.abs(itemRuimX - aranhaPosicaoX) < 40) {
        energia -= 20;
        energiaTxt.innerText = energia;
        itemRuimY = -100; // Reseta o item
        itemRuimX = Math.random() * (cenarioLargura - 40);
    }

    requestAnimationFrame(atualizarJogo);
}

// Inicia o jogo automaticamente
atualizarJogo();