var data = [
  {
    sellername: "Musharraf",
    sellernum: "+92316803889",
    product: "Suzuki Every",
    price: "1,380,000",
    image1: "./images/car1.jpg",
    image2: "./images/car2.jpg",
    image3: "./images/car3.jpg",
    description:
      "Suzuki Every 2012 registration 2016 original genuine car. new tyres two power mirror. comfortable extra seats. price is almost final. neat n clean just like new. just buy n drive. contact only call.",
    postTime: "Walton Road Lahore. 3 mins ago",
  },
  {
    sellername: "OLX User",
    sellernum: "+92312345889",
    product: "Motorcycle New Condition",
    price: "42,500",
    image1: "./images/bike1.jpg",
    image2: "./images/bike2.jpg",
    image3: "./images/bike3.jpg",
    description:
      "bilkul new hai zbrdst hai jisy zaroorat ho bs wohi rabta kry urgent sale",
    postTime: "Nowshera Sansi Road. 1 mins ago",
  },
  {
    sellername: "Kifayat Khan",
    sellernum: "+92312456678",
    product: "Mobile",
    price: "25,000",
    image1: "./images/mobile1.jpg",
    image2: "./images/mobile2.jpg",
    image3: "./images/mobile3.jpg",
    description: "mobile is very nice mobile name is Tecno comen 15 pro",
    postTime: "Dir Colony, Peshawar. 1 week ago",
  },
  {
    sellername: "Fahad Saleem",
    sellernum: "+92312434656",
    product: "HP color Laser Printers",
    price: "40,000",
    image1: "./images/printer1.jpg",
    image2: "./images/printer2.jpg",
    image3: "./images/printer3.jpg",
    description:
      "HP color laserjet printers available HP color laser 251nw HP color laser 451dn HP color laser 451dw HP color laser 452dn HP color laser 452dw",
    postTime: "Dir Colony, Peshawar. 3 week ago",
  },
  {
    sellername: "OLX User",
    sellernum: "+92312345623",
    product: "iPhone 11 Pro Max pta",
    price: "195,000",
    image1: "./images/iphone1.jpg",
    image2: "./images/iphone2.jpg",
    image3: "./images/iphone3.jpg",
    description:
      "iPhone 11 pro max 64 GB PTA Approved Factory Unlock 79% battery health Good Condition Phone with Original Box location: shop # 233, 2nd floor saddar star city mall Hamza: O313 8O482O8",
    postTime: "Saddar, Karachi. 1 mins ago",
  },
];

var onClickFunc = function (item) {
  console.log(item);
  sessionStorage.setItem("products", JSON.stringify(item));
  var getUserMail = sessionStorage.getItem("mail");
  if (getUserMail) {
    location.href = "products.html";
  } else {
    alert("SignIn Required to view the product details");
  }
};

window.onload = function () {
  var productContainer = document.getElementById("product-container");
  
  var products = [
    {
      product: "Suzuki Every",
      price: "1,380,000",
      image: "https://picsum.photos/400/300?random=1",
      location: "Walton Road Lahore",
      time: "3 mins ago"
    },
    {
      product: "Motorcycle New Condition",
      price: "42,500",
      image: "https://picsum.photos/400/300?random=2",
      location: "Nowshera Sansi Road",
      time: "1 mins ago"
    },
    {
      product: "Mobile Phone",
      price: "25,000",
      image: "https://picsum.photos/400/300?random=3",
      location: "Dir Colony, Peshawar",
      time: "1 week ago"
    },
    {
      product: "HP Printer",
      price: "40,000",
      image: "https://picsum.photos/400/300?random=4",
      location: "Dir Colony, Peshawar",
      time: "3 week ago"
    }
  ];

  var html = `
    <div class="container mt-4">
      <h4 class="mb-4">Fresh recommendations</h4>
      <div class="row g-4">
  `;
  
  products.forEach(item => {
    html += `
      <div class="col-md-3 col-sm-6">
        <div class="card h-100 shadow-sm">
          <div class="card-img-wrapper" style="height: 200px; overflow: hidden;">
            <img 
              src="${item.image}" 
              class="card-img-top" 
              alt="${item.product}"
              style="width: 100%; height: 100%; object-fit: cover;"
            >
          </div>
          <div class="card-body">
            <h5 class="card-title text-truncate">${item.product}</h5>
            <p class="card-text fw-bold">Rs. ${item.price}</p>
            <p class="card-text">
              <small class="text-muted">${item.location}<br>${item.time}</small>
            </p>
          </div>
        </div>
      </div>
    `;
  });

  html += '</div></div>';
  productContainer.innerHTML = html;
};

function post() {
  var sellerName = document.getElementById("sellername").value;
  var sellerNum = document.getElementById("sellernum").value;
  var productTitle = document.getElementById("productName").value;
  var price = document.getElementById("price").value;
  var Location = document.getElementById("Location").value;
  var productDetail = document.getElementById("productDetail").value;
  var Image1 = document.getElementById("img1").value;
  var Image2 = document.getElementById("img2").value;
  var Image3 = document.getElementById("img3").value;
  var obj = {
    sellername: sellerName,
    sellernum: sellerNum,
    product: productTitle,
    price: price,
    image1: Image1,
    image2: Image2,
    image3: Image3,
    description: productDetail,
    postTime: Location,
  };

  var getData = localStorage.getItem("DATA");
  var Arrangedata = JSON.parse(getData);
  Arrangedata.push(obj);
  localStorage.setItem("DATA", JSON.stringify(Arrangedata));
  // console.log(Arrangedata);
  location.href = "index.html";
  // match = false;
  // sessionStorage.setItem("SetData", JSON.stringify(data));
  // console.log(setdata);
}

document.addEventListener('DOMContentLoaded', function() {
    // Get all category links
    const categoryLinks = document.querySelectorAll('.category-link');
    
    // Get current page path
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    // Set active state based on current page
    categoryLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
        
        // Add click handler
        link.addEventListener('click', function(e) {
            // Store the clicked category before navigation
            localStorage.setItem('activeCategory', this.dataset.category);
        });
    });
    
    // Check localStorage for active category on page load
    const activeCategory = localStorage.getItem('activeCategory');
    if (activeCategory) {
        const activeLink = document.querySelector(`.category-link[data-category="${activeCategory}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
});

// Add this to your existing CSS or style.css file
.category-link.active {
    color: #002f34 !important;
    font-weight: bold;
    text-decoration: underline;
}
