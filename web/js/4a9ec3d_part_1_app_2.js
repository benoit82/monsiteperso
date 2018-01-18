var ctxGraph = document.getElementById("graph").getContext('2d');
var typeGraph = 'bar';
// initialisation des data en aléatoire
var tabDatas = [
    ["rouge", Math.ceil(Math.random()*100)],
    ["bleu", Math.ceil(Math.random()*100)],
    ["jaune", Math.ceil(Math.random()*100)],
    ["vert", Math.ceil(Math.random()*100)],
    ["mauve", Math.ceil(Math.random()*100)],
    ["orange", Math.ceil(Math.random()*100)]
   ];

//Pour chaque valeur, on affiche la valeur dans le champ en dessous du graph
for (var i = 0; i < tabDatas.length; i++) {
  document.getElementById(tabDatas[i][0]).value = tabDatas[i][1];
}

var refreshGraph = function(tab){
  ctxGraph.clearRect(0,0,500,400);
  var colors = ['rgba(255,99,132,1)',
                  'rgba(54, 162, 235,1)',
                  'rgba(255, 206, 86,1)',
                  'rgba(75, 192, 192,1)',
                  'rgba(153, 102, 255,1)',
                  'rgba(255, 159, 64,1)'];
  var colorsT = ['rgba(255,99,132,0.2)',
                  'rgba(54, 162, 235,0.2)',
                  'rgba(255, 206, 86,0.2)',
                  'rgba(75, 192, 192,0.2)',
                  'rgba(153, 102, 255,0.2)',
                  'rgba(255, 159, 64,0.2)'];

var myChart = new Chart(ctxGraph, {
    type: typeGraph,
    data: {
        labels: [tab[0][0], tab[1][0], tab[2][0], tab[3][0], tab[4][0], tab[5][0]],
        datasets: [{
            label: 'nb de votes',
            data: [tab[0][1], tab[1][1], tab[2][1], tab[3][1], tab[4][1], tab[5][1]],
            borderColor: colors,
            hoverBackgroundColor: colors,
            backgroundColor: colorsT,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    max: 100
                }
            }]
        }
    }
});
}

refreshGraph(tabDatas);
var camembert = document.getElementById("camembert");
var ctx = camembert.getContext('2d');

// initialisation des data en aléatoire
var tabDatas2 = [];
var sumTab = 0;
for (var i = 0; i < 3; i++) {
  tabDatas2[i] = Math.ceil(Math.random()*100);
  sumTab += tabDatas2[i];
}

var myChart2 = new Chart(ctx, {
    type: 'pie',
    data: {
        datasets: [{
            data: tabDatas2,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            hoverBackgroundColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
        }],
        labels: ['Rouge '+'('+ Math.round((tabDatas2[0]/sumTab)*100) +'%)', 'Bleu '+'('+ Math.round((tabDatas2[1]/sumTab)*100) +'%)', 'Jaune '+'('+ Math.round((tabDatas2[2]/sumTab)*100) +'%)']
    }
});

$("select").change(function(event) {
  event.preventDefault();
  if (isNaN($("select").val()) == false) {

  $.ajax({
    url: 'https://overwatch-api.net/api/v1/map/'+$("select").val(),
    type: 'GET',
    dataType: 'json',
    success: function(res){
      var resultat = document.getElementById('res');
      resultat.innerHTML = "";
      resultat.innerHTML += "La map cible est : " + res["name"] + ", situé en : " + res["location"];
      console.log(res);
    },
    error: function(){
      var resultat = document.getElementById('res');
      resultat.innerHTML = "Aucun résultat";
    }
  });
    }
});

$("#sendBTag").click(function(event) {
  event.preventDefault();
  var resultat = document.getElementById('res');
  resultat.innerHTML = 'Chargement en cours... <img src="https://loading.io/spinners/hourglass/lg.sandglass-time-loading-gif.gif" alt="loading" style="height:50px;width:50px;"/>';
  $.ajax({
    url: 'https://owapi.net/api/v3/u/'+ $("#BTag").val().replace("#","-") +'/stats',
    type: 'GET',
    dataType: 'json',
    success: function(res){
      resultat.innerHTML = ''+
      '<p>Avatar du compte : <img src="'+res["eu"]["stats"]["competitive"]["overall_stats"]["avatar"]+'" alt="avatar" style="height:50px;width:50px;" /></p>';
      if (res["eu"]["stats"]["competitive"]["overall_stats"]["comprank"] != null) {
        resultat.innerHTML += '<p> Côte actuel de  : <img src="'+res["eu"]["stats"]["competitive"]["overall_stats"]["tier_image"]+'" alt="icon_rank" style="height:40px;width:40px;"/> '+res["eu"]["stats"]["competitive"]["overall_stats"]["comprank"]+' - win rate : '+res["eu"]["stats"]["competitive"]["overall_stats"]["win_rate"]+'%</p>';
      } else {
        resultat.innerHTML += '<p>Classement non terminé pour cette saison sur ce compte</p>';
      }
    },
    error: function(){
      var resultat = document.getElementById('res');
      resultat.innerHTML = "Aucun résultat";
    }
  });
});

$(".new-color").on('propertychange input',function(event) {
  //On annule l'action par défault de l'envoie de donnée
  event.preventDefault();
  //On stock la valeur du conteneur de la classe "new-color"
  var value = $(this).val();
  //On vérifie sa valeur pour voir si elle est numérique, non vide, et bien entre 0 et 100 inclus
  if (isNaN(value) == false && value != '' && value>=0 && value<=100) {
    //Si c'est le cas, on stock la couleur puis on la recherche dans le tableau initiale
      var color = $(this).attr('id');
      tabDatas.forEach(function(tab){
        //Si la couleur correspond alors on change la valeur du tableau par celle du champs indiqué
        if (color === tab[0]) {
          tab[1] = value;
          //On rafraichit le tableau avec la nouvelle donnée
          refreshGraph(tabDatas);
        }
      });
  }
;
});

$("input[name='select-type']").change(function(event) {
  typeGraph = $(this).val();
      refreshGraph(tabDatas);
});
