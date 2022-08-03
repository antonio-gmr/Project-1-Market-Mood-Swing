
var performanceId =location.search.split('?')[1];
console.log("la clave " + performanceId)

consulta(performanceId);

function consulta (ticker) {

    // var ticker = '0P0000CPCP';
  
  
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '85833d30d9msh85eb490dc8a99e2p115b44jsn06448356e16c',
        'X-RapidAPI-Host': 'ms-finance.p.rapidapi.com'
      }
    };
  
    // Get News Titles (MS FINANCE API Query)
    fetch('https://ms-finance.p.rapidapi.com/news/list?performanceId=' + performanceId, options)
  
      .then(function (response) {
          return response.json();
      }).then(function (data) {
          console.log(data);
          
          var titleNews = document.querySelectorAll('.titleNews')
  
          for (let i = 0; i < titleNews.length; i++) {
            titleNews[i].textContent = data[i].title;
          }
          
      });
  
  
    // Get Analyst Note (MS FINANCE API Query)
      fetch('https://ms-finance.p.rapidapi.com/stock/v2/get-analysis-report?performanceId=' + performanceId, options)
  
      .then(function (response) {
          return response.json();
      }).then(function (data) {
          console.log(data);
          
          var analystNote = document.querySelector('.analystNote');
          
          
          analystNote.innerHTML = data.analystNote.note;
          
          if (data.analystNote.author.authorImage != null) {
          document.querySelector('#analystPic').src = data.analystNote.author.authorImage;}

          document.querySelector('#authorName').textContent = data.analystNote.author.authorName;
  
          
          
      });
  
  }
  