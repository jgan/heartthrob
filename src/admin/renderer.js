const information = document.getElementById('info')
const boyfriendCardsList = document.getElementById('boyfriend-cards-list')
const pingButton = document.getElementById('ping')
const newGameButton = document.getElementById('new-game')

// Display app versions
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

// Handle ping button
pingButton.addEventListener('click', async () => {
  const response = await window.versions.ping()
  information.textContent = `Ping: ${response}`
})

// Handle new game button
newGameButton.addEventListener('click', async () => {
  try {
    await window.versions.newGame()
    information.textContent = 'New game started!'
  } catch (error) {
    console.error('Failed to start new game:', error)
    information.textContent = 'Error starting new game'
  }
})

// Load and display boyfriend cards
const loadBoyfriendCards = async () => {
  try {
    const cards = await window.versions.getBoyfriendCards()
    boyfriendCardsList.innerHTML = cards
      .map(card => `
        <tr class="boyfriend-card-row">
          <td>${card.name}</td>
          <td>${card.imagePath}</td>
        </tr>
      `)
      .join('')
  } catch (error) {
    console.error('Failed to load boyfriend cards:', error)
    boyfriendCardsList.innerHTML = '<tr><td colspan="2">Error loading boyfriend cards</td></tr>'
  }
}

// Load boyfriend cards when the page loads
loadBoyfriendCards()
