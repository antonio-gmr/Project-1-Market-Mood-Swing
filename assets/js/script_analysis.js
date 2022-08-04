var newsObject = {
  '0': {
    id: '',
    title: '',
    text: '',
    sentiment: '',
    sentimentIcon: '',
    companyName: '',
  },
  '1': {
    id: '',
    title: '',
    text: '',
    sentiment: '',
    sentimentIcon: '',
    companyName: '',
  },
  '2': {
    id: '',
    title: '',
    text: '',
    sentiment: '',
    sentimentIcon: '',
    companyName: '',
  },
  '3': {
    id: '',
    title: '',
    text: '',
    sentiment: '',
    sentimentIcon: '',
    companyName: '',
  }
}

// var sentimentData = document.querySelectorAll('.sentiment');
var numberData = document.querySelectorAll('.number');
var titleRow = document.querySelectorAll('.titleRow');
var table = document.querySelector('.table');
var saveNewsButton = document.querySelector('#saveNewsButton')

var newsId = [];
var newsTitleArray = []
var sentimentResultArray = [];
var textToAnalyzeArray = [];
var companyInfo;

var apiK = '0a0df23692mshac18e5e471bd5fdp1bfcadjsn411fe1be785f';
var apiK2 = '36d1e27f4fmsh47c374d19337a38p189fa0jsn1737be2a34ee';

// var analisis;
// var abc;
// var xyz;
// var textToAnalyze;
// var notaDeAnalista;



var performanceId = location.search.split('?')[1];
consulta(performanceId);



window.onload = (event) => {

  savedNewslist = JSON.parse(localStorage.getItem("savedNewslist"));

  if (savedNewslist != null) {
    populateSavedNewsList(savedNewslist)
  }
  

};


function consulta (ticker) {

  companyInfo = companiesArray1.filter(element => {return element.performanceId == performanceId})

  document.querySelector('#companyImg').src = companyInfo[0].pictureSrc;
  document.querySelector('#CompanyName').textContent = companyInfo[0].id.toUpperCase();

 
  
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiK2,
      'X-RapidAPI-Host': 'ms-finance.p.rapidapi.com'
    }
  };

      // Get Analyst Note (MS FINANCE API Query)

      fetch('https://ms-finance.p.rapidapi.com/stock/v2/get-analysis-report?performanceId=' + performanceId, options)

      .then(function (response) {
          return response.json();
      }).then(function (data) {
          // console.log(data);

          // jkl = data;
          
          var analystNote = document.querySelector('.analystNote');
    
          notaDeAnalista = data.analystNote.note;
          

          if (data.analystNote.note != null) {
            analystNote.innerHTML = data.analystNote.note;
            // document.querySelector('#analystNoteDiv').hidden = false
            
            if (data.analystNote.author.authorImage != null) {
            document.querySelector('#analystPic').src = data.analystNote.author.authorImage;}
            document.querySelector('#analystPic').hidden = false;
            document.querySelector('#authorName').textContent = data.analystNote.author.authorName;
          
          }
            

      }); 



  // Get News Titles (MS FINANCE API Query)
  fetch('https://ms-finance.p.rapidapi.com/news/list?performanceId=' + performanceId, options)


    .then(function (response) {
        return response.json();
    }).then(function (data) {
        // console.log(data);


        data = data.filter(element => {return element.sourceId != 'pr-newswire'});
        var titleNews = document.querySelectorAll('.titleNews');
        
        

        // xyz = data;
      
        for (let i = 0; i < titleNews.length; i++) {


            numberData[i].textContent = eval(i) + 1
            titleNews[i].textContent = data[i].title;
            titleNews[i].innerHTML += '<br><small>' + data[i].sourceName + ', ' +  data[i].publishedDate + '</small>';
            
            
            titleRow[i].setAttribute('data-articleId', data[i].id);
            titleRow[i].setAttribute('data-sourceId', data[i].sourceId);
            titleRow[i].setAttribute('data-position', i);

            // console.log('https://ms-finance.p.rapidapi.com/news/get-details?id='+ data[i].id +'&sourceId='+ data[i].sourceId);

            newsTitleArray.push(data[i].title);
            newsId.push(data[i].id);

          // Populate news Object Part 1

          


            getNewsText (data[i].id, data[i].sourceId);


          }
        
    })

    loadingWait();


  }


//   Query - Sentiment Analysis
function getNewsText (articleId, sourceId) {

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiK2,
      'X-RapidAPI-Host': 'ms-finance.p.rapidapi.com'
    }
  };

  fetch('https://ms-finance.p.rapidapi.com/news/get-details?id='+ articleId +'&sourceId='+ sourceId, options)
    .then(function (response) {
        return response.json();
    }).then(function (extract) {
        // console.log(extract);

      // abc = extract;

      textToAnalyze = '';
      var failedProcess = 0;
      var endProcess = false;
      var extractLength = Object.keys(extract).length;
      i = 0;

      while (!endProcess) {
        // console.log('initiasl i= ' + i);
                        
        if(extract.body && extract.body[i].contentObject && i < extractLength) {
          
          newText = extract.body[i].contentObject[0].content;
          textToAnalyze += newText;
          // console.log(textToAnalyze);
          
          // textLength += newText.length;
  
          if (textToAnalyze.length > 1500) {
            textToAnalyze.substr(0,1500);
            endProcess = true; 
          }

        } else {
          failedProcess ++;
          if (failedProcess > 5) {
            endProcess = true
          }
        }
        

        i++;
        // console.log('final i= ' + i);
      }

    textToAnalyzeArray.push(textToAnalyze);
      
    });

}


function loadingWait () {
  var secondsLeft = 8;

  var timerInterval = setInterval(function() {
    secondsLeft--;

    if(secondsLeft == 0) {
      clearInterval(timerInterval);
      
      sentimentAnalysis();

    }

  },1000);
  
}


function sentimentAnalysis() {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiK,
            'X-RapidAPI-Host': 'twinword-sentiment-analysis.p.rapidapi.com'
        }
    };
    
    sentimentNumber = document.querySelectorAll('.sentimentNumber');
    sentimentData = document.querySelectorAll('.sentimentData');


    for (let index = 0; index < textToAnalyzeArray.length; index++) {
      const element = textToAnalyzeArray[index];
      
    
      fetch('https://twinword-sentiment-analysis.p.rapidapi.com/analyze/?text=' + element, options)

          .then(function (response) {
              return response.json();
          }).then(function (data) {
              // console.log(data);
              // console.log('El sentimiento es: ' + data.type)

              sentimentResultArray.push(data.type);

              // sentimentData[index].textContent = data.type;
              
              newsObject[index].sentiment = data.type;

              newsObject[index].id = newsId[index];
              newsObject[index].title = newsTitleArray[index];
              newsObject[index].text = textToAnalyzeArray[index];
              newsObject[index].companyName = companyInfo[0].id;

              if (data.type == "positive") {
                sentimentIcon = "<span>&#128513;</span>"
                sentimentData[index].setAttribute('class','has-text-centered sentimentData has-background-success-light') 
              }
              if (data.type == "negative") {
                sentimentIcon = "<span>&#128534;</span>"
                // sentimentIcon = "<span style='font-size:40px;'>&#128534;</span>"
                sentimentData[index].setAttribute('class', 'has-text-centered sentimentData has-background-danger-light') 
              
              }
              if (data.type == "neutral") {
                sentimentIcon = "<span>&#128528;</span>"
                sentimentData[index].setAttribute('class', 'has-text-centered sentimentData has-background-warning-light') 
              }


              sentimentNumber[index].textContent = eval(index) + 1;
              sentimentData[index].innerHTML = '<small>' + data.type + '</small><br><span style="font-size:40px;""> ' + sentimentIcon + '</span>';
              newsObject[index].sentimentIcon = sentimentIcon;
  
        });

    }

}


var selection

table.querySelectorAll('.titleRow').forEach(item => {
  item.addEventListener('click', event => {

    selection = event.target;
    // console.log(selection);

    if(selection.matches('small')){newsPosition = selection.parentElement.parentElement.getAttribute('data-position')}
    if(selection.matches('td')){newsPosition = selection.parentElement.getAttribute('data-position')}
    if(selection.matches('tr')){newsPosition = selection.getAttribute('data-position')}

    document.querySelector('#extractTitle').textContent = newsObject[newsPosition].title;

    document.querySelector('.extractContentDiv').hidden = false;
    document.querySelector('#extractContent').innerHTML = textToAnalyzeArray[newsPosition];

    
    saveNewsButton.disabled = false;
    saveNewsButton.setAttribute('data-position', newsPosition);
    

  })
})

var selectedNews;

document.querySelectorAll('#savedNewsDiv').forEach(item => (
  item.addEventListener('click', event => {

    selection = event.target;
    // console.log('este es el boton: ' + selection)

    
    if(selection.matches('strong') || selection.matches('span') ){newsOrder = selection.parentElement.parentElement.getAttribute('data-newsOrder')}
    if(selection.matches('p')){newsOrder = selection.parentElement.getAttribute('data-newsOrder')}
    if(selection.matches('.savedNewsElement ')){newsOrder = selection.getAttribute('data-newsOrder')}

    // newsOrder = selection.getAttribute('data-newsOrder');
    
    
    var savedNewslist = JSON.parse(localStorage.getItem("savedNewslist"));

    selectedNews = savedNewslist.filter(element => {return element.newsOrder ==  newsOrder});

    // console.log(selectedNews[0].text)
    document.querySelector('.extractContentDiv').hidden = false;
    document.querySelector('#extractContent').innerHTML = selectedNews[0].text + '<br><br> Sentiment of Extract: ' +  selectedNews[0].sentiment.toUpperCase();
    document.querySelector('#extractTitle').innerHTML = selectedNews[0].title;
    saveNewsButton.disabled = true;



  })
))




saveNewsButton.addEventListener('click', event => {

  newsPosition = saveNewsButton.getAttribute('data-position');
  
  var newSavedNews = {
    newsOrder: moment().unix(),
    id: newsObject[newsPosition].id,
    title: newsObject[newsPosition].title,
    text: newsObject[newsPosition].text,
    sentiment: newsObject[newsPosition].sentiment,
    sentimentIcon: newsObject[newsPosition].sentimentIcon,
    companyName: newsObject[newsPosition].companyName,

  }

  var savedNewslist = JSON.parse(localStorage.getItem("savedNewslist"));
    
  if (savedNewslist == null) {
    savedNewslist = [] 
  }

  savedNewslist = savedNewslist.filter(element => {return element.id != newsObject[newsPosition].id})
  savedNewslist.push(newSavedNews);
  savedNewslist = savedNewslist.sort(function(a, b){return b.newsOrder - a.newsOrder})

  if (savedNewslist.length > 8) { savedNewslist.pop();}

  localStorage.setItem('savedNewslist', JSON.stringify(savedNewslist))



  populateSavedNewsList(savedNewslist);

})


function populateSavedNewsList(list) {

  document.querySelector('#savedNewsDiv').innerHTML = "";

  for (let i = 0; i < list.length; i++) {
    var newElement2 = document.createElement('div');
    newElement2.setAttribute('class','savedNewsElement notification is-info');
    newElement2.setAttribute('data-newsOrder', list[i].newsOrder);
    
    document.querySelector('#savedNewsDiv').append(newElement2)
    newElement2.innerHTML = '<p class ="is-size-4 list-companyName m-1">' + list[i].companyName.toUpperCase() + '</p>';
    newElement2.innerHTML += '<p class="is-size-6">' + list[i].title + '.<br><strong>Sentiment:</strong> ' + list[i].sentiment.toUpperCase() + ', <span style="font-size:25px;">' + list[i].sentimentIcon + '</span></p>';


  }

}


document.querySelector('#backtoDashboard').addEventListener('click', event => {
  document.location.assign('index.html')

})

