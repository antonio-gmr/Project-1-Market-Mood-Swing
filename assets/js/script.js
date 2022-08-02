let htmlCode = ``;

companiesArray1.forEach(function(element) {
  
  htmlCode =
    htmlCode +
    `
    <div class="column">
      <div class="card" data-key=${element.performanceId}>
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${element.pictureSrc}" alt="${element.imageAlt}">
          </figure>
        </div>
      </div>
    </div>
   `
   ;
});

const companiesCards1 = document.querySelector(".all-companies1");
companiesCards1.innerHTML = htmlCode;

htmlCode = ``;
companiesArray2.forEach(function(element) {
  
  htmlCode =
    htmlCode +
    `
    <div class="column">
      <div class="card" data-key=${element.performanceId}>
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${element.pictureSrc}" alt="${element.imageAlt}">
          </figure>
        </div>
      </div>
    </div>
   `
   ;
});

const companiesCards2 = document.querySelector(".all-companies2");
companiesCards2.innerHTML = htmlCode;

htmlCode = ``;
companiesArray3.forEach(function(element) {
  
  htmlCode =
    htmlCode +
    `
    <div class="column">
      <div class="card" data-key=${element.performanceId}>
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${element.pictureSrc}" alt="${element.imageAlt}">
          </figure>
        </div>
      </div>
    </div>
   `
   ;
});

const companiesCards3 = document.querySelector(".all-companies3");
companiesCards3.innerHTML = htmlCode;

htmlCode = ``;
companiesArray4.forEach(function(element) {
  
  htmlCode =
    htmlCode +
    `
    <div class="column">
      <div class="card" data-key=${element.performanceId}>
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${element.pictureSrc}" alt="${element.imageAlt}">
          </figure>
        </div>
      </div>
    </div>
   `
   ;
});

const companiesCards4 = document.querySelector(".all-companies4");
companiesCards4.innerHTML = htmlCode;

htmlCode = ``;
companiesArray5.forEach(function(element) {
  
  htmlCode =
    htmlCode +
    `
    <div class="column">
      <div class="card" data-key=${element.performanceId}>
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${element.pictureSrc}" alt="${element.imageAlt}">
          </figure>
        </div>
      </div>
    </div>
   `
   ;
});

const companiesCards5 = document.querySelector(".all-companies5");
companiesCards5.innerHTML = htmlCode;


document.querySelectorAll('.card').forEach(item => {
  item.addEventListener('click', event => {
    alert("click")
  })
})

