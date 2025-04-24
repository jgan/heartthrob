const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const ping = async () => {
  const response = await window.versions.ping()
  document.getElementById('info').innerText = `Ping response: ${response}`
}

document.getElementById('ping').addEventListener('click', ping)
