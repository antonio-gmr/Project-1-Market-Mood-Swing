const companiesArray = [
    {
      id: "tesla",
      pictureSrc:"./assets/images/Tesla_logo.png",
      imageAlt: "tesla logo"
    },
    {
        id: "visa",
      pictureSrc:"./assets/images/Visa_logo.png",
      imageAlt: "visa logo"
    },
    {
        id: "walmart",
      pictureSrc:"./assets/images/Walmart_logo.png",
      imageAlt: "walmart logo"
    },
    {
        id: "samsung",
      pictureSrc:"./assets/images/Samsung_logo.png",
      imageAlt: "samsung logo"
    },
    {
        id: "paypal",
      pictureSrc:"./assets/images/PayPal_logo.png",
      imageAlt: "paypal logo"
    },
    {
        id: "nvidia",
      pictureSrc:"./assets/images/Nvidia_logo.png",
      imageAlt: "nvidia logo"
    },
    {
        id: "netflix",
      pictureSrc:"./assets/images/Netflix_logo.png",
      imageAlt: "netflix logo"
    },
    {
        id: "microsoft",
      pictureSrc:"./assets/images/Microsoft_logo.png",
      imageAlt: "microsoft logo"
    },
    {
        id: "meta",
      pictureSrc:"./assets/images/Meta_logo.png",
      imageAlt: "meta logo"
    },
    {
        id: "intel",
      pictureSrc:"./assets/images/Intel_logo.png",
      imageAlt: "intel logo"
    },
    {
        id: "hp",
      pictureSrc:"./assets/images/HP_logo.png",
      imageAlt: "hp logo"
    },
    {
        id: "general electric",
      pictureSrc:"./assets/images/General_Electric_logo.png",
      imageAlt: "general electric logo"
    },
    {
        id: "ford",
      pictureSrc:"./assets/images/Ford_logo.png",
      imageAlt: "ford logo"
    },
    {
        id: "dell",
      pictureSrc:"./assets/images/DEll_logo.png",
      imageAlt: "dell logo"
    },
    {
        id: "coca cola",
      pictureSrc:"./assets/images/Coca_cola_logo.png",
      imageAlt: "coca cola logo"
    },
    {
        id: "bank of america",
      pictureSrc:"./assets/images/Bank_of_america_logo.png",
      imageAlt: "bank of america logo"
    },
    {
        id: "apple",
      pictureSrc:"./assets/images/Apple_logo.png",
      imageAlt: "apple logo"
    },
    {
        id: "amd",
      pictureSrc:"./assets/images/AMD_logo.png",
      imageAlt: "amd logo"
    },
    {
        id: "amazon",
      pictureSrc:"./assets/images/Amazon_logo.png",
      imageAlt: "amazon logo"
    },
    {
        id: "alphabet",
      pictureSrc:"./assets/images/Alphabet_logo.png",
      imageAlt: "alphabet logo"
    }
]
let htmlCode = ``;

companiesArray.forEach(function(element) {
  
  htmlCode =
    htmlCode +
    `
    <article>
      <div>
      <img src="${element.pictureSrc}" alt="${
      element.imageAlt
    }">
      </div>
    </article>
  `;
});

const companiesCards = document.querySelector(".all-companies");

companiesCards.innerHTML = htmlCode;