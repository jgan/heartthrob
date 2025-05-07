import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["container", "image"]

  open(event) {
    const imageUrl = event.detail.imageUrl
    this.imageTarget.src = imageUrl
    this.containerTarget.hidden = false
  }

  close() {
    this.containerTarget.hidden = true
    this.imageTarget.src = ""
  }
}
