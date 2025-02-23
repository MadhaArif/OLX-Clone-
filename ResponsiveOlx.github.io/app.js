function login() {
  location.href = "email.html";
}

// ========login/logout on single page=========
// var flag = sessionStorage.getItem("mail");
// const element = document.getElementById("log");
// if (flag) {
//   if (element) element.innerText = "LogOut";
// } else {
//   if (element) element.innerText = "LogIn";
// }

var allmail = [];
var userMailData = localStorage.getItem("UserDataEmail");
if (userMailData !== null) {
  allmail = JSON.parse(userMailData);
}

function genMail() {
  var mail = document.getElementById("mail");
  //   console.log(mail.value);
  if (mail.value === "") {
    alert("Please enter email");
  } else if (!mail.value.includes("@")) {
    alert("please includes '@' in the email adrress");
  } else if (!mail.value.includes(".com")) {
    alert("please enter a part following '@'");
  } else {
    sessionStorage.setItem("mail", mail.value);
    var isEmailExist = allmail.includes(mail.value);
    if (!isEmailExist) {
      // email = mail.value;
      console.log(mail.value);
      allmail.push(mail.value);
      localStorage.setItem("UserDataEmail", JSON.stringify(allmail));
    }
    if (isEmailExist) {
      location.href = "passlogin.html";
    } else {
      location.href = "PassCreate.html";
    }
  }
}

var allpass = [];
var userPassData = localStorage.getItem("UserDataPass");
if (userPassData !== null) {
  allpass = JSON.parse(userPassData);
}
function createpass() {
  var newPass = document.getElementById("newPass").value;
  var conPass = document.getElementById("conPass").value;
  if (newPass === "") {
    alert("All field Required");
  } else {
    if (newPass !== conPass) {
      alert("Password not match, \nEnter same password on both field ");
    } else {
      allpass.push(newPass);
      localStorage.setItem("UserDataPass", JSON.stringify(allpass));
      location.href = "user.html";
      var logvalue = document.getElementById("log").innerText;
      console.log(logvalue);
    }
  }
}

function loginpass() {
  var mail = sessionStorage.getItem("mail");
  var pass = document.getElementById("pass").value;
  var isPassExist = allpass.includes(pass);
  var match = true;
  if (isPassExist) {
    for (var i = 0; i < allmail.length; i++) {
      if (allpass[i] === pass && allmail[i] === mail) {
        location.href = "user.html";
        var logvalue = document.getElementById("log");
        console.log(logvalue);
        match = false;
      }
    }
    if (match === true) {
      alert("Password is incorrect");
    }
  } else {
    alert("Password is incorrect");
  }
}

function loadfun() {
  var mail = sessionStorage.getItem("mail");
  document.getElementById("para").childNodes[1].innerText = mail;
  // var log = sessionStorage.getItem("log");
}

function sell() {
  location.href = "sell.html";
}

function forSell() {
  alert("SignIn Required to post your product ads");
}

// Chat box functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chatBox');
    const toggleChat = document.getElementById('toggleChat');
    const chatBody = document.getElementById('chatBody');
    const userInput = document.getElementById('userInput');
    const sendMessage = document.getElementById('sendMessage');
    const messages = document.getElementById('messages');

    // Toggle chat body
    toggleChat.addEventListener('click', function() {
        chatBody.style.display = chatBody.style.display === 'none' ? 'block' : 'none';
        toggleChat.innerHTML = chatBody.style.display === 'none' ? 
            '<i class="fas fa-plus"></i>' : 
            '<i class="fas fa-minus"></i>';
    });

    // Comprehensive response database for all OLX categories
    const responses = {
        // Basic greetings
        "hello": "Hi! How can I help you today?",
        "hey": "Hello! What can I do for you?",
        "hi": "Hello! How may I assist you?",
        
        // Mobile & Tablets
        "mobile": "I can help you find mobile phones! Popular options include:\n1. iPhone (20,000 - 400,000)\n2. Samsung (15,000 - 300,000)\n3. Vivo (20,000 - 100,000)\nWhat's your preferred brand or budget?",
        "iphone": "Available iPhone models:\n1. iPhone 14 Series (250,000+)\n2. iPhone 13 Series (180,000+)\n3. iPhone 12 Series (120,000+)\n4. Used iPhones also available\nWhich model interests you?",
        "samsung": "Samsung phones available:\n1. S23 Series (250,000+)\n2. A Series (40,000 - 120,000)\n3. Used Samsung phones\nWhat's your budget range?",
        "tablet": "Popular tablets available:\n1. iPad (Various models)\n2. Samsung Tabs\n3. Lenovo Tabs\nWhich brand do you prefer?",

        // Vehicles
        "car": "What type of car are you looking for?\n1. Family cars\n2. Luxury cars\n3. Small cars\n4. SUVs\nI can help with new or used options!",
        "bike": "Motorcycles available:\n1. Honda (125cc, 70cc)\n2. Yamaha\n3. Suzuki\n4. Super Power\nNew and used options available!",
        "toyota": "Toyota models available:\n1. Corolla (2015-2023)\n2. Yaris\n3. Fortuner\n4. Used options\nWhat's your budget range?",
        "honda": "Honda vehicles available:\n1. Civic (2015-2023)\n2. City\n3. BR-V\n4. Motorcycles\nWhich model interests you?",

        // Property (existing responses kept)
        "plot": "I can help you find plots! Are you looking for residential or commercial plots?",
        "house": "I can help you find houses! What's your preferred location and budget?",
        "rent": "Are you looking for houses or apartments for rent? Please specify your preferred area.",
        
        // Electronics & Home Appliances
        "tv": "Available TV options:\n1. LED TVs (Smart/Non-smart)\n2. Android TVs\n3. Used TVs\nWhat's your preference?",
        "laptop": "Popular laptop brands:\n1. HP (40,000+)\n2. Dell (45,000+)\n3. Lenovo\n4. MacBook\nNew and used available!",
        "ac": "AC options available:\n1. 1 Ton (Inverter/Non-inverter)\n2. 1.5 Ton\n3. 2 Ton\nWhat capacity do you need?",
        
        // Furniture
        "furniture": "Furniture categories:\n1. Bedroom sets\n2. Sofa sets\n3. Dining tables\n4. Office furniture\nWhat are you looking for?",
        "sofa": "Sofa options:\n1. 5 Seater (40,000+)\n2. 7 Seater (60,000+)\n3. L-Shape\n4. Used sofas\nWhat's your preference?",
        
        // Fashion & Beauty
        "clothes": "Browse clothing categories:\n1. Men's Fashion\n2. Women's Fashion\n3. Kids Clothing\n4. Traditional Wear\nWhat are you looking for?",
        "shoes": "Shoe categories:\n1. Men's Shoes\n2. Women's Shoes\n3. Sports Shoes\n4. Formal Shoes\nWhat type do you need?",
        
        // Jobs
        "job": "Job categories available:\n1. IT & Software\n2. Sales & Marketing\n3. Teaching\n4. Office Work\nWhat field interests you?",
        "work": "Work opportunities:\n1. Full-time jobs\n2. Part-time work\n3. Freelance\n4. Internships\nWhat type of work are you looking for?",
        
        // Animals
        "pets": "Available pets:\n1. Dogs (Various breeds)\n2. Cats\n3. Birds\n4. Fish\nWhat pet are you interested in?",
        "dog": "Dog breeds available:\n1. German Shepherd\n2. Labrador\n3. Pug\n4. Local breeds\nWhich breed interests you?",
        
        // Books & Hobbies
        "books": "Book categories:\n1. Academic books\n2. Novels\n3. Religious books\n4. Children's books\nWhat type of books do you need?",
        "games": "Gaming items:\n1. PlayStation (PS4/PS5)\n2. Xbox\n3. Gaming PCs\n4. Used consoles\nWhat are you looking for?",
        
        // General queries
        "price": "I can help with prices! Please specify which item you're interested in.",
        "cheap": "I can help find budget-friendly options! What item are you looking for?",
        "new": "Looking for new items? Please specify what you're interested in!",
        "used": "Used items often offer great value! What are you looking for?",
        "location": "I can help find items in your area! Which city are you in?",
        "delivery": "Many sellers offer delivery! Which item are you interested in?",
        "warranty": "Want to know about warranty? Which product are you looking at?",
        
        // Help & Support
        "help": "I can help you with:\n1. Finding products\n2. Price information\n3. Seller details\n4. Buying process\n5. Selling items\n6. Account issues\nWhat do you need help with?",
        "sell": "To sell on OLX:\n1. Click 'Sell' button\n2. Choose category\n3. Add photos & details\n4. Set price\n5. Post ad\nNeed help with any step?",
        "account": "Account related help:\n1. Create account\n2. Login issues\n3. Post ads\n4. Manage profile\nWhat do you need help with?",
        
        // Default response
        "default": "I'm here to help with anything on OLX! Could you please specify:\n1. What you're looking for?\n2. Your budget range?\n3. New or used preference?\n4. Your location?\nI can then provide detailed information!"
    };

    async function sendUserMessage() {
        const message = userInput.value.trim().toLowerCase();
        if (message) {
            // Add user message
            const userDiv = document.createElement('div');
            userDiv.className = 'message user';
            userDiv.textContent = userInput.value.trim();
            messages.appendChild(userDiv);

            // Get response based on keywords
            let response = responses.default;
            
            // Check for keywords in the message
            for (let key of Object.keys(responses)) {
                if (message.includes(key)) {
                    response = responses[key];
                    break;
                }
            }
            
            // Add AI response with slight delay
            setTimeout(() => {
                const aiDiv = document.createElement('div');
                aiDiv.className = 'message ai';
                aiDiv.textContent = response;
                messages.appendChild(aiDiv);
                
                // Scroll to bottom
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 500);

            // Clear input
            userInput.value = '';
            // Scroll to bottom
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }

    // Send message on button click
    sendMessage.addEventListener('click', sendUserMessage);

    // Send message on Enter key
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });
});
