
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


//   Query - Sentiment Analysis
var analisis;

function sentimentAnalysis () {


    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0a0df23692mshac18e5e471bd5fdp1bfcadjsn411fe1be785f',
            'X-RapidAPI-Host': 'twinword-sentiment-analysis.p.rapidapi.com'
        }
    };
    
    // analyzeText = "Narrow-moat%20Apple%20reported%20healthy%20fiscal%20third-quarter%20results%20that%20came%20in%20line%20with%20our%20estimates.%20We%20are%20maintaining%20our%20%24130%20fair%20value%20estimate%20and%20still%20view%20shares%20as%20overvalued.%20While%20we%20remain%20positive%20on%20Apple's%20ability%20to%20extract%20sales%20from%20its%20installed%20base%20via%20new%20products%20and%20services%2C%20we%20believe%20demand%20for%20Apple%E2%80%99s%20products%20is%20likely%20to%20slow%20in%20the%20next%20few%20quarters%2C%20following%20several%20stellar%20quarters%20of%20growth."
    analyzeText = "<p>Tesla's second-quarter results reflected the company's temporary issues as gross profits fell over 20% versus the first quarter but were still up over 45% year on year. During the quarter, revenue and profits were affected by COVID-19-related lockdowns that affected production at the company's Shanghai factory. Additionally, the opening and ramp-up of the new factories in Austin and Berlin weighed on profits. However, we had largely expected that the second quarter would be the low point of the year, and we maintain our outlook for Tesla to deliver around 1.5 million vehicles in 2022. Our outlook for the automotive segment is largely unchanged.</p>"

    fetch('https://twinword-sentiment-analysis.p.rapidapi.com/analyze/?text=' + analyzeText, options)

  
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        
        analisis = data;

    
    
});


}