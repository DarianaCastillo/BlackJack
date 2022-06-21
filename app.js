let baraja = [];
let carta;
let TotalPuntosJugador = 0;
let TotalPuntosComputadora = 0;

function NuevaBaraja(){
    baraja = [];
const numeros = [2, 3, 4, 5, 6, 7, 8, 9, 10]
const letras = ['A', 'J', 'Q', 'K']
const palo = ['C', 'D', 'H', 'S']

for (const n of numeros) {
    for (const p of palo) {
        baraja.push(n + p);
    }
}
for (const l of letras) {
    for (const p of palo) {
        baraja.push(l + p);
    }
}
//revolver cartas
baraja = _.shuffle(baraja);
//console.log(baraja);
}

function NuevoJuego(){
    $('#CartasJugador').html(''); 
   $('#CartasComputadora').html('');
    console.clear();
    NuevaBaraja();
   TotalPuntosJugador = 0;
   $('#PuntosJugador').text(TotalPuntosJugador);
   TotalPuntosComputadora = 0;
   $('#PuntosComputadora').text(TotalPuntosComputadora);
    $('#btn-carta').removeAttr('disabled')
    $('#btn-parar').removeAttr('disabled')
    $('#Ganador').addClass('hidden');
}
//valor de la carta
function valor(carta){

    let ValorCarta = carta.substring(0, carta.length - 1);

    if (['A' , 'Q', 'J', 'K'].includes(ValorCarta)){
        if (ValorCarta == 'A'){
            return 11;
        } else{
            return 10;
        }
    } else{
        //ValorCarta = ValorCarta * 1;
        return parseInt(ValorCarta);
    }
}

function TurnoJugador(){
    carta = baraja.shift();
    $('#CartasJugador').html($('#CartasJugador').html() + `<img src='./cartas/${carta}.png'>`);
 
TotalPuntosJugador += valor(carta);
$('#PuntosJugador').text(TotalPuntosJugador); 
if(TotalPuntosJugador > 21) {
    $('#btn-carta').attr('disabled','true')
    $('#btn-parar').attr('disabled','true')
    TurnoComputadora();
}
}
function TurnoComputadora(){
    let GanaJugador = true;
    do{
      carta = baraja.shift();
      $('#CartasComputadora').html($('#CartasComputadora').html() + `<img src='./cartas/${carta}.png'>`);
      
      TotalPuntosComputadora += valor(carta);
      $('#PuntosComputadora').text(TotalPuntosComputadora);
     if (TotalPuntosJugador > 21){
       break
      }
    } while( TotalPuntosComputadora <= 21 && TotalPuntosComputadora < TotalPuntosJugador);
    
    if (TotalPuntosComputadora <= 21 && TotalPuntosComputadora >= TotalPuntosJugador) {
        GanaJugador = false;
    }
    Ganador(GanaJugador ? 'El jugador ganó' : 'La computadora gana');

}
function Ganador(Ganador){
    $('#Ganador').removeClass('hidden');
    $('#Ganador').text(Ganador);
}

//nuevo juego
$('#btn-nuevo').click(function () {
   NuevoJuego()
});

//sacar cartas de la baraja
$('#btn-carta').click(function () {
  TurnoJugador()  
});
 
//Detener juego
$('#btn-parar').click(TurnoComputadora);


//incio del juego
NuevaBaraja();


