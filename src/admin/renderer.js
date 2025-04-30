const information = document.getElementById('info')
const boyfriendCardsList = document.getElementById('boyfriend-cards-list')

// Display app versions
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

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

const ping = async () => {
  const response = await window.versions.ping()
  document.getElementById('info').innerText = `Ping response: ${response}`
}

document.getElementById('ping').addEventListener('click', ping)
