import { Application } from "@hotwired/stimulus"
import CardController from "./controllers/card_controller.js"

const application = Application.start()
application.register("card", CardController) 
