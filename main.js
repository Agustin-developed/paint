import Gum from './js/gum.js';
import Imagen from './js/imagen.js';
import Pen from './js/pen.js';

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

canvas.width = (windowWidth * 80) / 100;
canvas.height = (windowHeight * 80) / 100;

let canvasWidth = canvas.width;
let canvasHeigth = canvas.height;


let mouseUp = true;
let mouseDown = false;

let figura = null;

// Utiles
let cursor = true; //CREAMOS una flag para cada util seteando como predeterminado el cursor
let lapiz = false;
let goma = false;
let balde = false;


let utiles = document.getElementsByClassName('util');
for (let i = 0; i < utiles.length; i++) {
    utiles[i].addEventListener('click',(e)=>{ // Le damos una  arrowfunction para cada util
        pickUtil(e.target.value);
    });
}

function pickUtil(value){ //Cambiamos las vandera en base a que util se seleccionó
    if(value == "lapiz"){
        cursor = false;
        lapiz = true;
        goma = false;
        balde = false;
    }
    if(value == "goma"){
        cursor = false;
        lapiz = false;
        goma = true;
        balde = false;
    }
    if(value == "balde"){
        cursor = false;
        lapiz = false;
        goma = false;
        balde = true;
    }
    if(value == "cursor"){
        cursor = true;
        lapiz = false;
        goma = false;
        balde = false;
    }
}

    //Tamaño de utiles
    let Ttrazo;

    let tamanio_utiles = document.getElementsByClassName('tamanio_util');
    for (let i = 0; i < tamanio_utiles.length; i++) {
        tamanio_utiles[i].addEventListener('click', (e)=>{
             //Esto es para que todos los inputs range (inputs de tamaño), esten "conectados" con el tamaño definido
            setTamanio(e.target.value);
            console.log(e.target.value);
        });
    }

    function setTamanio(tamanio) {
        Ttrazo = tamanio;
        for (let i = 0; i < tamanio_utiles.length; i++) {
            tamanio_utiles[i].value = tamanio;
        }
    }
    //end Tamaño de utiles

    //Color de Utiles
    let color;
    let selec_color = document.getElementsByClassName('colors');
    for (let i = 0; i < selec_color.length; i++) {
        selec_color[i].addEventListener('input', (e)=>{
            setColor(e.target.value);
        })
    }

    function setColor(c){
        color = c;
    }
    //end Color de Utiles

    //Tipo de trazo
    //let tipoTrazo;
    //end Tipo de trazo
// end utiles


//Eventos para Mouse
canvas.addEventListener('mousedown', (e)=>{
    //Agregamos unas condiciones en base a las banderas (Para ir cambiando de utiles)
    if (cursor == true) {
        // SELECCIONAR 
    }
    if (lapiz == true) {
        figura = new Pen(e.layerX,e.layerY,color,context,"circulo",Ttrazo);
        figura.draw();
    }
    if(goma == true){
        figura = new Gum(e.layerX,e.layerY,'white',context, "cuadrado" ,Ttrazo);
        figura.draw();
    }
    mouseDown = true;
    mouseUp = false;
})
canvas.addEventListener('mouseup', (e)=>{
    mouseDown = false;
    mouseUp = true;
    figura = null;
})

canvas.addEventListener('mousemove', (e)=>{
    if(mouseDown == true && figura != null){ // preguntamos si se apreta el cursor
        figura.moveTo(e.layerX,e.layerY);
        figura.draw();
    }
})
//end Eventos para Mouse

//Eventos para movil EN DESARROLLO
canvas.addEventListener('touchstart', (e)=>{
    // e.preventDefault();
    //Agregamos unas condiciones en base a las banderas (Para ir cambiando de utiles)
    if (cursor == true) {
        // SELECCIONAR 
    }
    if (lapiz == true) {
        console.log("apretaste lapiz");
        figura = new Pen(e.targetTouches[0].clientX,e.targetTouches[0].clientY,color,context,"circulo",Ttrazo);
        figura.draw();
    }
    if(goma == true){
        figura = new Gum(e.targetTouches[0].clientX,e.targetTouches[0].clientY,'white',context, "cuadrado" ,Ttrazo);
        figura.draw();
    }
    mouseDown = true;
    mouseUp = false;
})
canvas.addEventListener('touchend', (e)=>{
    console.log("soltaste");
    mouseDown = false;
    mouseUp = true;
    figura = null;
})

canvas.addEventListener('touchmove', (e)=>{
    if(mouseDown == true && figura != null){ // preguntamos si se apreta el cursor
        // e.preventDefault();
        console.log(e.targetTouches[0].clientX,e.targetTouches[0].clientY);
        figura.moveTo(e.targetTouches[0].clientX,e.targetTouches[0].clientY);
        figura.draw();
    }
})

// end Eventos para movil




// Funcionalidad de imagen capturada desde archivos

let tImg = null;
let imagenes = [];

let tamanio_img = document.getElementById('tamanio_img').addEventListener('input',(e)=>{
        tImg = e.target.value;
})
let archImg = document.getElementById('file');
    archImg.addEventListener('change', (e)=>{
    let img = new Imagen(context, canvasWidth, canvasHeigth, tImg);
    img.crearImagen(e);
    imagenes.push(img);
    archImg.value = null;
    console.log(imagenes);
})


//end Funcionalidad de imagen capturada desde archivos






//funcionalidad de botones
let f = false;
let btn_togle = document.getElementById('btn_togle').addEventListener('click', (e)=>{
    let arrow = document.getElementById('arrow');
    if(f == false){
        arrow.style.transform = "rotate(180deg)";
        f = true;
    }else{
        arrow.style.transform = "rotate(0deg)";
        f = false;
    }
    

    console.log("Ancho: " + windowWidth + " Altura: " + windowHeight);
    
});
//end funcionalidad de botones






// Seteo de valores predeterminados
setTamanio(50);
setColor("black");
context.fillStyle='white';
context.fillRect(0,0, canvasWidth, canvasHeigth);
// end Seteo de valores predeterminados