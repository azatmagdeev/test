import {Manager} from "./manager.js";
import {View} from "./view.js";

const form = document.querySelector('#form');
const root = document.querySelector('#root');
const addButton = document.querySelector('#add');


const manager = new Manager('lpu.json');
const view = new View(addButton, form, root, manager);






