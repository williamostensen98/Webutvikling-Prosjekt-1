var body_part = ["#head", "#torso", "#body", "#left_arm", "#left_tit", "#right_tit", "#right_arm", "#left_elbow", "#right_shoulder", "#left_elbow", "#left_shoulder", "#leg", "#foot", "#right_elbow", "#thigh"];
var list = ['#DEB887','#DEB887','#DEB887','#b89866','#D2B48C','#d3b17d'];
var index = 0
var i = 0

// Tegner kroppen og noen av bena/armene
function draw_body(){
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.arc(200, 150, 40, 0, 2 * Math.PI);

  ctx.moveTo(250,200);
  ctx.ellipse(150, 200, 100, 30, 0, 0, 2 * Math.PI);
  ctx.fillStyle = "purple";
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(100, 150, 100, 30, -Math.PI/5, 0, 2 * Math.PI)
  ctx.fillStyle = "pink";
  ctx.fill();

  ctx.beginPath();
  ctx.translate(150, 75);
  ctx.rotate(30);
  ctx.translate(-150, -75);

  ctx.fillStyle = "#dd33FF";
  ctx.fillRect(-200, 150, 250, 100);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(-150, 130, 120, 30, -Math.PI/3, 0, 2 * Math.PI)
  ctx.fillStyle = "purple";
  ctx.fill();
}
 // Tegner resterende føtter
function draw_legs(){
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.ellipse(-150, 50, 100, 30, 230, 0, 2 * Math.PI);
  ctx.fillStyle = "purple";
  ctx.fill();

}
// Tegner resterende armer
function draw_arm(){
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(90, 200);
  ctx.lineTo(-50, 345);
  ctx.lineTo(70, 160);
  ctx.closePath();
  ctx.fillStyle = "red";
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(-50, 350);
  ctx.lineTo(-150, 345);
  ctx.lineTo(-50, 330);
  ctx.closePath();
  ctx.fillStyle = "green";
  ctx.fill();

}

//kall på alle funksjonene for å tegne hele kroppen
draw_body();
draw_legs()
draw_arm();

// !-------- jQuery FUNKSJONER FOR INTERAKTIVITET--------!

// INTERAKTIVITET PÅ SVG

// Trykk på hodet og høyre arm forsvinner
$(document).ready(function(){
  $("#head").click(function(){
  $("#right_arm").hide(500);
  });


// Trykk på venstre bryst og høyre armen kommer tilbake

  $("#left_tit").click(function(){
  $("#right_arm").show(1000);
  });

// For hvert klikk så vil funksjonen gå gjennom listen over kroppsdeler samtidig som den går over listen over
// farger og vil fylle respektive kroppsdel med fargen som vil endre seg for hvert klikk
  $(".svg_img").click(function(){
    $(body_part[index%body_part.length]).css("fill", list[index%list.length]);
    index++;
 });


// Ved mouseenter så vil hodet vokse i lengden og ved mouseleave vil det gåt tilbake til vanlig.

  $("#head").on({
    mouseenter: function(){
    $("#head").animate({rx: 100});
  },
  mouseleave: function(){
    $(this).animate({rx: 50});
  }
 });


// Ved mouseenter på lår skifter fargen til grå
// Ved mouseleave skifter fargen til lyseblå
// Ved klikk skifter fargen til hvit (forsvinner)


  $("#thigh").on({
    mouseenter: function(){
      $(this).css("fill", "lightgray");
    },
    mouseleave: function(){
      $(this).css("fill", "lightblue");
    },
    click: function(){
      $(this).css("fill", "#ffffff");
    }
  });


// INTERAKTIVITET PÅ CANVAS

// For en viss mengde klikk så vil bakgrunnen skiftes, det vil dukke opp en sol som forstørres for hvert klikk
// kroppsfargen vil endres (blir tan) og Tekst vil komme opp ved siste klikk
// Etter dette vil skjermen bli hvit og når musen går vekk vil det igjen komme tekst opp

 $(".canvas_img").on({
   click: function(){
     if (i == 0) {
       $(".canvas_img").css("background-color", "#DEB887");
       i++;
   }
   else if (i == 2) {
     var canvas = document.getElementById("myCanvas");
     var ctx = canvas.getContext("2d");
     ctx.fillStyle = "#b89866";
     ctx.fillRect(-200, 150, 250, 100);
     i++;
   }
   else if (i == 1) {
     var canvas = document.getElementById("myCanvas");
     var ctx = canvas.getContext("2d");
     ctx.beginPath();
     ctx.arc(200, 50, 40, 0, 2 * Math.PI);
     ctx.fillStyle = "yellow";
     ctx.fill();
     i++;
   }
   else if (i == 20) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.font = "100px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("The End", -200, 200);
    i++;
   }
   else if (i>20) {
     var canvas = document.getElementById("myCanvas");
     var ctx = canvas.getContext("2d");
     ctx.fillStyle = "white";
     ctx.fill();
   }

   else {
     var canvas = document.getElementById("myCanvas");
     var ctx = canvas.getContext("2d");
     ctx.beginPath();
     ctx.arc(200, 50, 40+30*i, 0, 2 * Math.PI);
     ctx.fillStyle = "yellow";
     ctx.fill();
     i++;
   }


   },
    mouseleave: function() {
      if (i >20){
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("This piece was brought to you by Pico Pablasso", -200, 200);
      }
    }


 });



// Funksjon som toggler dokumentasjonsvisning

  $(".down").click(function(){
    $("#documentation_txt").toggle(500);
 });

});
