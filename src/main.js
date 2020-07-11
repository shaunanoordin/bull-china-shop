/*  
Bull, China Shop
----------------

A game about smashing things.

(Shaun A. Noordin | shaunanoordin.com | 20200711)
 */

import {ImportExample} from "./importExample.js";

/*  Primary App Class
 */
//==============================================================================
class App {
  constructor() {
    let importExample = new ImportExample("HI THERE");
    
    this.console = document.getElementById("console");
    this.console.innerHTML =
      "This is a starter template for JS projects. <br>" +
      importExample.getText();
  }
}
//==============================================================================

/*  Initialisations
 */
//==============================================================================
var app;
window.onload = function() {
  window.app = new App();
};
//==============================================================================
