import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["card", "front", "back"]
  static values = {
    revealed: { type: Boolean, default: false }
  }

  connect() {
    // Initialize the card state
    this.updateCardState()
  }

  flip() {
    this.revealedValue = !this.revealedValue
    this.updateCardState()
    if (this.revealedValue) {
      setTimeout(() => {
        const imageUrl = this.frontTarget.querySelector("img").src
        this.element.dispatchEvent(new CustomEvent("card:zoom", {
          bubbles: true,
          detail: { imageUrl }
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
