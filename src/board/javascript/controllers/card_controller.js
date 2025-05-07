import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["card", "front", "back"]
  static values = {
    revealed: { type: Boolean, default: false },
    zoomScale: { type: Number, default: 1.4 }
  }

  connect() {
    this.updateCardState()
  }

  flip() {
    this.revealedValue = !this.revealedValue
    this.updateCardState()
    if (this.revealedValue) {
      setTimeout(() => {
        const content = this.element.cloneNode(true)
        // TODO: Consider renaming this "event" to "card:zoom"
        // The inclusion of the zoomScaleValue in the event detail makes this
        // event more of a command than a notifying event.
        this.element.dispatchEvent(new CustomEvent("card:revealed", {
          bubbles: true,
          detail: { content, zoomScale: this.zoomScaleValue }
        }))
      // Timeout delay to give the flip animation time to _almost_ complete.
      // The flip animation duration is set in the CSS transition property of
      // the card-inner element.
      }, 800) 
    }
  }

  updateCardState() {
    if (this.revealedValue) {
      this.cardTarget.classList.add("card--revealed")
    } else {
      this.cardTarget.classList.remove("card--revealed")
    }
  }
} 
