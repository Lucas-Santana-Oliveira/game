const scoreEl = document.querySelector('#scoreEl');
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

let player = new Player();
let projectiles = [];
let grids = [];
let invaderProjectiles = [];
let particles = [];
let bombs = [];
let powerUps = [];

let keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  space: {
    pressed: false,
  },
};

let frames = 0;
let randomInterval = Math.floor(Math.random() * 500 + 500);
let game = {
  over: false,
  active: true,
};
let score = 0;

let spawnBuffer = 500;
let fps = 60;
let fpsInterval = 1000 / fps;
let msPrev = window.performance.now();

function init() {
  player = new Player();
  projectiles = [];
  grids = [];
  invaderProjectiles = [];
  particles = [];
  bombs = [];
  powerUps = [];

  keys = {
    a: {
      pressed: false,
    },
    d: {
      pressed: false,
    },
    space: {
      pressed: false,
    },
  };

  frames = 0;
  randomInterval = Math.floor(Math.random() * 500 + 500);
  game = {
    over: false,
    active: true,
  };
  score = 0;
  document.querySelector('#finalScore').innerHTML = score;
  scoreEl.innerHTML = score;

  for (let i = 0; i < 100; i++) {
    particles.push(
      new Particle({
        position: {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
        },
        velocity: {
          x: 0,
          y: 0.3,
        },
        radius: Math.random() * 2,
        color: 'white',
      })
    );
  }
}


// Função para registrar e salvar pontuações
function saveScore(name, score) {
  let scores = [];
  
  
  if (localStorage.getItem('scores')) {
    scores = JSON.parse(localStorage.getItem('scores'));
  }

  
  scores.push({ name: name, score: score });
  
  
  localStorage.setItem('scores', JSON.stringify(scores));
}


// Função para finalizar o jogo
function endGame() {
  console.log('you lose');
  audio.gameOver.play();

  
  setTimeout(() => {
    player.opacity = 0;
    game.over = true;
  }, 0);

 
  setTimeout(() => {
    game.active = false;
    document.querySelector('#restartScreen').style.display = 'flex';
    
    const playerName = document.getElementById("playerName").value;

    document.querySelector('#finalScore').innerHTML = score; // Now you can access score

    // Salva a pontuação do jogador
    saveScore(playerName, score);

    updateScoreList();
  }, 2000);
}

// Função para resetar o histórico de pontuações
function resetScore() {
 
  localStorage.removeItem('scores');

  // Exibe novamente o scoreContainer, se estiver oculto
  document.querySelector('#scoreContainer').style.display = 'block';

  // Exibe a mensagem na tela
  const resetMessage = document.createElement('p');
  resetMessage.textContent = 'Histórico de pontuação apagado e reiniciado.';
  document.body.appendChild(resetMessage); // Adiciona a mensagem ao corpo do documento

  // Remove a mensagem após 3 segundos
  setTimeout(() => {
    resetMessage.remove();
  }, 3000);

  console.log('Histórico de pontuação apagado e reiniciado.');
}

// Event listener para o botão "Zerar Pontuação"
document.querySelector('#clearscoreButton').addEventListener('click', () => {
  resetScore(); // Chama a função resetScore para apagar o histórico

  // Atualiza a lista de pontuações na tela
  updateScoreList();
});

// Event listener para o botão de reinício do jogo
document.querySelector('#restartButton').addEventListener('click', () => {
  audio.select.play();
  document.querySelector('#restartScreen').style.display = 'none';
  document.querySelector('#menuButtons').style.display = 'none'; // Esconder os botões do menu
  resetScore(); // Chama a função resetScore para apagar o histórico

  // Reinicia a pontuação diretamente
  score = 0;
  scoreEl.innerHTML = score;

  init();
  animate();
});

// Função para atualizar a lista de pontuações
function updateScoreList() {
  const scoreList = document.getElementById('scoreList');
  scoreList.innerHTML = ''; // Limpa a lista antes de preencher novamente

  // Verifica se existem pontuações no localStorage
  if (localStorage.getItem('scores')) {
    const scores = JSON.parse(localStorage.getItem('scores'));
    
    // Adicione os registros à lista de pontuações
    scores.forEach((score, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${score.name}: ${score.score} points`;
      scoreList.appendChild(listItem);
    });
  } else {
    // Se não houver pontuações armazenadas, exibe uma mensagem
    const listItem = document.createElement('li');
    listItem.textContent = 'No scores available';
    scoreList.appendChild(listItem);
  }
}

// Quando a página é carregada, atualize a lista de pontuações
document.addEventListener('DOMContentLoaded', () => {
  updateScoreList();
});

// Event listener para o botão de registro de pontuação
document.querySelector('#scoreButton').addEventListener('click', () => {
  // Esconde outros elementos e mostra o menu de pontuação
  document.querySelector('#startScreen').style.display = 'none';
  document.querySelector('#restartScreen').style.display = 'none';
  document.querySelector('#scoreScreen').style.display = 'block';

  // Atualiza a lista de pontuações
  updateScoreList();
});

// Função para gerar pontuação aleatória
function savePlayerScore(score) {
  // Salva a pontuação do jogador
  return score;
}

function goBack() {
  // Aqui você pode adicionar o código para redirecionar para a tela inicial do jogo
  
  // Substitua "tela_inicial.html" pelo caminho correto para a tela inicial do seu jogo.
  window.location.href = "./index.html";
}



function backToMenu() {
  document.querySelector('#scoreScreen').style.display = 'none';
  document.querySelector('#restartScreen').style.display = 'none';
  document.querySelector('#startScreen').style.display = 'flex';
}


function animate() {
  // Seu código de animação aqui...
}

document.querySelector('#startButton').addEventListener('click', () => {
  audio.backgroundMusic.play();
  audio.start.play();

  document.querySelector('#startScreen').style.display = 'none';
  document.querySelector('#scoreContainer').style.display = 'block';
  init();
  animate();
});

document.querySelector('#restartButton').addEventListener('click', () => {
  audio.select.play();
  document.querySelector('#restartScreen').style.display = 'none';
  init();
  animate();
});

addEventListener('keydown', ({ key }) => {
  // Seu código de controle de teclado aqui...
});

addEventListener('keyup', ({ key }) => {
  // Seu código de controle de teclado aqui...
});

document.querySelector('#scoreButton').addEventListener('click', () => {
  // Esconde outros elementos e mostra o menu de pontuação
  document.querySelector('#startScreen').style.display = 'none';
  document.querySelector('#restartScreen').style.display = 'none';
  document.querySelector('#scoreScreen').style.display = 'block';

  // Aqui você pode carregar e exibir a pontuação de cada partida do jogador
  // por exemplo, usando localStorage ou fazendo uma solicitação ao servidor
});

// Quando a página é carregada, verifique se há pontuações armazenadas no localStorage
document.addEventListener('DOMContentLoaded', () => {
  const scoreList = document.querySelector('#scoreList');
  scoreList.innerHTML = ''; // Limpa a lista antes de preencher novamente

  // Verifica se existem pontuações no localStorage
  if (localStorage.getItem('scores')) {
    const scores = JSON.parse(localStorage.getItem('scores'));

    // Adiciona cada pontuação como um item de lista
    scores.forEach((score, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `Game ${index + 1}: ${score}`;
      scoreList.appendChild(listItem);
    });
  } else {
    // Se não houver pontuações armazenadas, exibe uma mensagem
    const listItem = document.createElement('li');
    listItem.textContent = 'No scores available';
    scoreList.appendChild(listItem);
  }
});


function animate() {
  if (!game.active) return
  requestAnimationFrame(animate)

  const msNow = window.performance.now()
  const elapsed = msNow - msPrev

  if (elapsed < fpsInterval) return

  msPrev = msNow - (elapsed % fpsInterval) // 3.34

  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)

  for (let i = powerUps.length - 1; i >= 0; i--) {
    const powerUp = powerUps[i]

    if (powerUp.position.x - powerUp.radius >= canvas.width)
      powerUps.splice(i, 1)
    else powerUp.update()
  }

  // spawn powerups
  if (frames % 500 === 0) {
    powerUps.push(
      new PowerUp({
        position: {
          x: 0,
          y: Math.random() * 300 + 15
        },
        velocity: {
          x: 5,
          y: 0
        }
      })
    )
  }

  // spawn bombs
  if (frames % 200 === 0 && bombs.length < 3) {
    bombs.push(
      new Bomb({
        position: {
          x: randomBetween(Bomb.radius, canvas.width - Bomb.radius),
          y: randomBetween(Bomb.radius, canvas.height - Bomb.radius)
        },
        velocity: {
          x: (Math.random() - 0.5) * 6,
          y: (Math.random() - 0.5) * 6
        }
      })
    )
  }

  for (let i = bombs.length - 1; i >= 0; i--) {
    const bomb = bombs[i]

    if (bomb.opacity <= 0) {
      bombs.splice(i, 1)
    } else bomb.update()
  }

  player.update()

  for (let i = player.particles.length - 1; i >= 0; i--) {
    const particle = player.particles[i]
    particle.update()

    if (particle.opacity === 0) player.particles[i].splice(i, 1)
  }

  particles.forEach((particle, i) => {
    if (particle.position.y - particle.radius >= canvas.height) {
      particle.position.x = Math.random() * canvas.width
      particle.position.y = -particle.radius
    }

    if (particle.opacity <= 0) {
      setTimeout(() => {
        particles.splice(i, 1)
      }, 0)
    } else {
      particle.update()
    }
  })

  invaderProjectiles.forEach((invaderProjectile, index) => {
    if (
      invaderProjectile.position.y + invaderProjectile.height >=
      canvas.height
    ) {
      setTimeout(() => {
        invaderProjectiles.splice(index, 1)
      }, 0)
    } else invaderProjectile.update()

    // projectile hits player
    if (
      rectangularCollision({
        rectangle1: invaderProjectile,
        rectangle2: player
      })
    ) {
      invaderProjectiles.splice(index, 1)
      endGame()
    }
  })

  for (let i = projectiles.length - 1; i >= 0; i--) {
    const projectile = projectiles[i]

    for (let j = bombs.length - 1; j >= 0; j--) {
      const bomb = bombs[j]

      // if projectile touches bomb, remove projectile
      if (
        Math.hypot(
          projectile.position.x - bomb.position.x,
          projectile.position.y - bomb.position.y
        ) <
          projectile.radius + bomb.radius &&
        !bomb.active
      ) {
        projectiles.splice(i, 1)
        bomb.explode()
      }
    }

    for (let j = powerUps.length - 1; j >= 0; j--) {
      const powerUp = powerUps[j]

      // if projectile touches bomb, remove projectile
      if (
        Math.hypot(
          projectile.position.x - powerUp.position.x,
          projectile.position.y - powerUp.position.y
        ) <
        projectile.radius + powerUp.radius
      ) {
        projectiles.splice(i, 1)
        powerUps.splice(j, 1)
        player.powerUp = 'MachineGun'
        console.log('powerup started')
        audio.bonus.play()

        setTimeout(() => {
          player.powerUp = null
          console.log('powerup ended')
        }, 5000)
      }
    }

    if (projectile.position.y + projectile.radius <= 0) {
      projectiles.splice(i, 1)
    } else {
      projectile.update()
    }
  }

  grids.forEach((grid, gridIndex) => {
    grid.update()

    // spawn projectiles
    if (frames % 100 === 0 && grid.invaders.length > 0) {
      grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(
        invaderProjectiles
      )
    }

    for (let i = grid.invaders.length - 1; i >= 0; i--) {
      const invader = grid.invaders[i]
      invader.update({ velocity: grid.velocity })

      for (let j = bombs.length - 1; j >= 0; j--) {
        const bomb = bombs[j]

        const invaderRadius = 15

        // if bomb touches invader, remove invader
        if (
          Math.hypot(
            invader.position.x - bomb.position.x,
            invader.position.y - bomb.position.y
          ) <
            invaderRadius + bomb.radius &&
          bomb.active
        ) {
          score += 50
          scoreEl.innerHTML = score

          grid.invaders.splice(i, 1)
          createScoreLabel({
            object: invader,
            score: 50
          })

          createParticles({
            object: invader,
            fades: true
          })
        }
      }

      // projectiles hit enemy
      projectiles.forEach((projectile, j) => {
        if (
          projectile.position.y - projectile.radius <=
            invader.position.y + invader.height &&
          projectile.position.x + projectile.radius >= invader.position.x &&
          projectile.position.x - projectile.radius <=
            invader.position.x + invader.width &&
          projectile.position.y + projectile.radius >= invader.position.y
        ) {
          setTimeout(() => {
            const invaderFound = grid.invaders.find(
              (invader2) => invader2 === invader
            )
            const projectileFound = projectiles.find(
              (projectile2) => projectile2 === projectile
            )

            // remove invader and projectile
            if (invaderFound && projectileFound) {
              score += 100
              scoreEl.innerHTML = score

              // dynamic score labels
              createScoreLabel({
                object: invader
              })

              createParticles({
                object: invader,
                fades: true
              })

              // singular projectile hits an enemy
              audio.explode.play()
              grid.invaders.splice(i, 1)
              projectiles.splice(j, 1)

              if (grid.invaders.length > 0) {
                const firstInvader = grid.invaders[0]
                const lastInvader = grid.invaders[grid.invaders.length - 1]

                grid.width =
                  lastInvader.position.x -
                  firstInvader.position.x +
                  lastInvader.width
                grid.position.x = firstInvader.position.x
              } else {
                grids.splice(gridIndex, 1)
              }
            }
          }, 0)
        }
      })

      // remove player if invaders touch it
      if (
        rectangularCollision({
          rectangle1: invader,
          rectangle2: player
        }) &&
        !game.over
      )
        endGame()
    } // end looping over grid.invaders
  })

  if (keys.a.pressed && player.position.x >= 0) {
    player.velocity.x = -7
    player.rotation = -0.15
  } else if (
    keys.d.pressed &&
    player.position.x + player.width <= canvas.width
  ) {
    player.velocity.x = 7
    player.rotation = 0.15
  } else {
    player.velocity.x = 0
    player.rotation = 0
  }

  // spawning enemies
  if (frames % randomInterval === 0) {
    spawnBuffer = spawnBuffer < 0 ? 100 : spawnBuffer
    grids.push(new Grid())
    randomInterval = Math.floor(Math.random() * 500 + spawnBuffer)
    frames = 0
    spawnBuffer -= 100
  }

  if (
    keys.space.pressed &&
    player.powerUp === 'MachineGun' &&
    frames % 2 === 0 &&
    !game.over
  ) {
    if (frames % 6 === 0) audio.shoot.play()
    projectiles.push(
      new Projectile({
        position: {
          x: player.position.x + player.width / 2,
          y: player.position.y
        },
        velocity: {
          x: 0,
          y: -10
        },
        color: 'yellow'
      })
    )
  }

  frames++
}

document.querySelector('#startButton').addEventListener('click', () => {
  audio.backgroundMusic.play()
  audio.start.play()

  document.querySelector('#startScreen').style.display = 'none'
  document.querySelector('#scoreContainer').style.display = 'block'
  init()
  animate()
})

document.querySelector('#restartButton').addEventListener('click', () => {
  audio.select.play()
  document.querySelector('#restartScreen').style.display = 'none'
  init()
  animate()
})

addEventListener('keydown', ({ key }) => {
  if (game.over) return

  switch (key) {
    case 'a':
      keys.a.pressed = true
      break
    case 'd':
      keys.d.pressed = true
      break
    case ' ':
      keys.space.pressed = true

      if (player.powerUp === 'MachineGun') return

      audio.shoot.play()
      projectiles.push(
        new Projectile({
          position: {
            x: player.position.x + player.width / 2,
            y: player.position.y
          },
          velocity: {
            x: 0,
            y: -10
          }
        })
      )

      break
  }
})

addEventListener('keyup', ({ key }) => {
  switch (key) {
    case 'a':
      keys.a.pressed = false
      break
    case 'd':
      keys.d.pressed = false
      break
    case ' ':
      keys.space.pressed = false

      break
  }
})
document.querySelector('#scoreButton').addEventListener('click', () => {
  // Esconde outros elementos e mostra o menu de pontuação
  document.querySelector('#startScreen').style.display = 'none';
  document.querySelector('#restartScreen').style.display = 'none';
  document.querySelector('#scoreScreen').style.display = 'block';

  // Aqui você pode carregar e exibir a pontuação de cada partida do jogador
  // por exemplo, usando localStorage ou fazendo uma solicitação ao servidor
});
// Quando a página é carregada, verifique se há pontuações armazenadas no localStorage
document.addEventListener('DOMContentLoaded', () => {
  const scoreList = document.querySelector('#scoreList');
  scoreList.innerHTML = ''; // Limpa a lista antes de preencher novamente

  // Verifica se existem pontuações no localStorage
  if (localStorage.getItem('scores')) {
    const scores = JSON.parse(localStorage.getItem('scores'));

    // Adiciona cada pontuação como um item de lista
    scores.forEach((score, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `Game ${index + 1}: ${score}`;
      scoreList.appendChild(listItem);
    });
  } else {
    // Se não houver pontuações armazenadas, exibe uma mensagem
    const listItem = document.createElement('li');
    listItem.textContent = 'No scores available';
    scoreList.appendChild(listItem);
  }
});
