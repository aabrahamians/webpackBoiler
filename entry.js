import 'style.css';
import $ from 'jquery';
import _ from 'underscore';
import app from './src/js/app.js';


document.addEventListener("DOMContentLoaded",function(){
    window.$ = $;
    window._ = _;
    app();
   
});
