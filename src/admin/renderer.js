const information = document.getElementById('info')
const boyfriendCardsList = document.getElementById('boyfriend-cards-list')
const newGameButton = document.getElementById('new-game')
const loadConfigBtn = document.getElementById('load-config-btn')
const configPathSpan = document.getElementById('config-path')


// Display app versions
information.innerText = `Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), Electron (v${versions.electron()})`

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

// Handle load config button
loadConfigBtn.addEventListener('click', async () => {
  try {
    const folderPath = await window.versions.selectConfigFolder()
    if (folderPath) {
      await window.versions.loadConfig(folderPath)
      configPathSpan.textContent = folderPath
      information.textContent = 'Loaded config: ' + folderPath
      loadBoyfriendCards()
    }
  } catch (error) {
    information.textContent = 'Error loading config: ' + error.message
  }
})

// Load and display boyfriend cards
const loadBoyfriendCards = async () => {
  try {
    const hunks = await window.versions.getHunks()
    boyfriendCardsList.innerHTML = hunks
      .map(hunk => `
        <tr class="boyfriend-card-row">
          <td>${hunk.card.name}</td>
          <td>${hunk.card.imagePath}</td>
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
