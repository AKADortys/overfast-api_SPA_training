import { App } from "./utils/app.js";

const app = new App(); // instantiate App
app.init(); //launch app

window.app = app; // attach app to window
