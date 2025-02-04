var pontuacao = 0
var direcao = ''

function pontuar() {
  var ponto = document.getElementById('marcador')
  pontuacao++
  ponto.textContent = pontuacao
}

window.onload = function () {
  var stage = document.getElementById('stage')
  var ctx = stage.getContext('2d')
  document.addEventListener('keydown', keyPush)

  //definindo a velocidade do jogo
  setInterval(game, 80)
  const vel = 1

  //Definindo a posição inicial da snake
  var vx = (vy = 0)
  var px = 11 // posição vertical (eixo x)
  var py = 15 // posição horizontal (eixo y)
  var tp = 15 //tamanho dos pixels
  var qp = 20 // Área da tela que a snake percorre

  // posição inicial da presa
  var ax = (ay = 15)


  var trail = []
  tail = 5

  //Funcionamento do jogo
  function game() {

    // Movimento da snake

    // variáveis de posição são somadas com as variáveis de direção
    px += vx
    py += vy

    // Atravessar a snake para o outro lado da tela quando ultrapassar o limite
    if (px < 0) {
      px = qp - 1
    }
    if (px > qp - 1) {
      px = 0
    }
    if (py < 0) {
      py = qp - 1
    }
    if (py > qp - 1) {
      py = 0
    }

    //cor da tela
    ctx.fillStyle = 'gray'
    ctx.fillRect(0, 0, stage.width, stage.height)

    // cor da presa
    ctx.fillStyle = 'green'
    ctx.fillRect(ax * tp, ay * tp, tp, tp)

    //cor da snake
    ctx.fillStyle = 'blue'

    // atualizando a posição da snake
    for (var i = 0; i < trail.length; i++) {
      ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1)
    
      //O jogo acaba quando a snake encostar no próprio rabo
      if (trail[i].x == px && trail[i].y == py) {
        vx = vy = 0
        tail = 5
      }
    }

    // movimentando a snake
    trail.push({ x: px, y: py })
    while (trail.length > tail) {
      trail.shift()
    }

    // Aumentando o tamanho da snake quando alcançar a presa
    if (ax == px && ay == py) {
      tail++

      // sorteando outro local na tela para a presa aparecer
      ax = Math.floor(Math.random() * qp)
      ay = Math.floor(Math.random() * qp)

      //aumentando a pontuação
      pontuar()
    }
  }

  function keyPush(event) {
    //Fazendo a leitura do botão de direção para alterar o movimento da snake
    switch (event.keyCode) {
      case 37: //  para esquerda
        if (direcao != 'right') {
          vx = -vel
          vy = 0
          direcao = 'left'
        }

        break
      case 38: // para cima
        if (direcao != 'down') {
          vx = 0
          vy = -vel
          direcao = 'up'
        }

        break
      case 39: // para direita
        if (direcao != 'left') {
          vx = vel
          vy = 0
          direcao = 'right'
        }

        break
      case 40: // para baixo
        if (direcao != 'up') {
          vx = 0
          vy = vel
          direcao = 'down'
        }

        break
        defaut: break
    }
  }
}