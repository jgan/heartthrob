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
  }

  updateCardState() {
    if (this.revealedValue) {
      this.cardTarget.classList.add("card--revealed")
    } else {
      this.cardTarget.classList.remove("card--revealed")
    }
  }
} 
