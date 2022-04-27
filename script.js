const grids = document.querySelectorAll('.grid')
const headings = document.querySelectorAll('.heading .wrapper .text') // Pegaa o .text dentro do .wrapper 

function enterScreen(index) {
  const grid = grids[index]
  const heading = headings[index]
  const gridColumns = grid.querySelectorAll('.column')

  grid.classList.add('active')

  gridColumns.forEach(element => { // Para cada um dos elementos = columns 
    element.classList.remove('animate-before', 'animate-after') // Vai retirar o restilo padrão
  })

  heading.classList.remove('animate-before', 'animate-after')
}

function exitScreen(index, exitDelay) {
  const grid = grids[index]
  const heading = headings[index]
  const gridColumns = grid.querySelectorAll('.column')

  gridColumns.forEach(element => {
    element.classList.add('animate-after')
  })

  heading.classList.add('animate-after')

  setTimeout(() => {
    grid.classList.remove('active')
  }, exitDelay)
}

function setupAnimationCycle({ timePerScreen, exitDelay }) {
  const cycleTime = timePerScreen + exitDelay
  let nextIndex = 0

  function nextCycle() {
    const currentIndex = nextIndex

    enterScreen(currentIndex)

    setTimeout(() => exitScreen(currentIndex, exitDelay), timePerScreen)

    nextIndex = nextIndex >= grids.length - 1 ? 0 : nextIndex + 1
  }

  nextCycle()

  setInterval(nextCycle, cycleTime)
}

setupAnimationCycle({
  timePerScreen: 2000, // Tempo que o usuário permanece em cada uma das telas 2 segundos.   
  exitDelay: 200 * 7 // 200 ms x o número de colunas que tem = 7
})