
var performanceId;

populateIndex();

function populateIndex() {

  let htmlCode = ``;
  companiesArray1.forEach(function(element) {
    
    htmlCode =
      htmlCode +
      `<div class="card column is-2 m-2" data-key=${element.performanceId}>
          <div class="card-image">
            <figure class="image is-4by3">
              <img id="tickerImg" src="${element.pictureSrc}" alt="${element.imageAlt}">
            </figure>
          </div>
        </div>
    `
    ;
  });

  const companiesCards1 = document.querySelector(".all-companies1");
  companiesCards1.innerHTML = htmlCode;

}

document.querySelectorAll('.card').forEach(item => {
  item.addEventListener('click', event => {
    selection = event.target;


    if (selection.matches('img')) {performanceId = selection.parentElement.parentElement.parentElement.getAttribute("data-key");}
    if (selection.matches('figure')) {performanceId = selection.parentElement.parentElement.getAttribute("data-key");}
    if (selection.matches('.card-image')) {performanceId = selection.parentElement.getAttribute("data-key");}
    if (selection.matches('.card')) {performanceId = selection.getAttribute("data-key");}


    console.log('estea es la clave ' + event.target)
    console.log('estea es la clave ' + performanceId)
    document.location.assign('display_analysis.html?'+ performanceId)



    
    

    
  })
})


