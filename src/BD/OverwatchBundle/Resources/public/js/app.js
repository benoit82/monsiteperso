var ctx = document.getElementById("graph-ratio").getContext('2d');

var ratioGraph = new Chart(ctx, {
  type: 'pie',
  data: {
    datasets:[{
      data:[2,5,1],
      backgroundColor: ['green','red','black']
    }],
    labels:['victoires','défaites','égalités'],
  }
});
