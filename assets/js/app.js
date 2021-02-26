// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import "../css/app.scss"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//
//     import {Socket} from "phoenix"
//     import socket from "./socket"
//
import "phoenix_html"
import { Socket } from "phoenix"
import NProgress from "nprogress"
import { LiveSocket } from "phoenix_live_view"

import Alpine from 'alpinejs'

let Hooks = {};



Hooks.Numbers = {
  getNumberRandom (){
    let simulated_random_numbers = [
      994517, 463780, 439966, 118769, 719542,
      951243, 889047, 366582, 521397, 869364
    ]
    const random = Math.floor(Math.random() * simulated_random_numbers.length);
    return simulated_random_numbers[random];
  },
  mounted() {
    // this enables numbersHook to use in front html
    window.numbersHook = this;
  },
  updated() {
    // from backend, we get the result number
    this.deactivate();
  },
  activate() {
    let el = this.el;
    let result = el.getAttribute('result')   ;
    let i = 0;
    this.random_numbers_interval = setInterval( function() {
      var randomNumber = Hooks.Numbers.getNumberRandom();
      let event = new CustomEvent('numbers-updated', {
        detail: {
          result: randomNumber
        }
      });
      el.dispatchEvent(event);
    }, 200)
  },
  deactivate() {
    clearInterval(this.random_numbers_interval);
  }
}

let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")
let liveSocket = new LiveSocket('/live', Socket, {
  dom: {
    onBeforeElUpdated(from, to) {
      if (from.__x) {
        Alpine.clone(from.__x, to)
      }
    }
  },
  params: {
    _csrf_token: csrfToken
  },
  hooks: Hooks
})
// Show progress bar on live navigation and form submits
window.addEventListener("phx:page-loading-start", info => NProgress.start())
window.addEventListener("phx:page-loading-stop", info => NProgress.done())

// connect if there are any LiveViews on the page
liveSocket.connect()

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket
