var form = document.querySelector("form");
var resultList = document.querySelector("ul");


form.addEventListener("submit", function(event) {
    event.preventDefault();
    var attraction = form.query.value;
    var request = new Request("https://api.ltwa.workers.dev/?https://www.zuerich.com/de/data?id=72");
    fetch(request)
    .then(function(response) {
        response.json().then(function(data) {
            for (var elem of data) {
                var descLower = elem.description.en.toLowerCase();
                var attLower = attraction.toLowerCase();
                var cleanDescription = elem.description.en.replaceAll("</p>", "").replaceAll("<p>", "").replaceAll(".", ".\r\n");
                if (descLower.includes(attLower)) {
                    var li = document.createElement("li");
                    li.setAttribute('style', 'white-space: pre;')
                    li.textContent = "Attraction Name: " + elem.name.en + "\r\n";
                    li.textContent += "Description: " + cleanDescription + "\r\n";
                    li.textContent += "Address: " + elem.address.streetAddress + ", " + elem.address.postalCode + " " + elem.address.addressLocality + "\r\n";
                    var im = document.createElement("img")
                    im.src = elem.image.url;
                    im.alt = "image of " + elem.name.en;
                    im.height = 400;
                    im.width = 400;
                    li.appendChild(im);
                    resultList.appendChild(li);
                }
                            }            
        });
        var isEmpty = document.getElementById('list').innerHTML === "";
        if (isEmpty == true) {
            var para = document.createElement("p");
            var node = document.createTextNode("No more results were found or no results at all"); 
            para.appendChild(node);
            var element = document.getElementById("div1");
            element.appendChild(para); 
        }
     })
     .catch(function (error) {
         alert(error);
     });
});






