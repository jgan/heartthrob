import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["container", "content"]

  open(event) {
    this.contentTarget.innerHTML = ""

    const content = event.detail.content
    this.contentTarget.appendChild(content)
    this.contentTarget.style.transform = `scale(${event.detail.zoomScale})`
    this.containerTarget.hidden = false
  }

  close() {
    this.containerTarget.hidden = true
    this.contentTarget.innerHTML = ""
  }
}
