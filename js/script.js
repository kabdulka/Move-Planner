
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');


    $wikiElem.text("");
    $nytElem.text("");

    // load streetview here
    var streetInput = $("#street").val();
    var cityInput = $("#city").val();
    var address = streetInput + ', ' + cityInput;
    var apiKey = "AIzaSyCebedLJ9rvIByNJrQJAGv-y47zLIlf35k";
    alert("printing test for street Input " + address);

    var imgElement = $("<img>");
    var imgSrcUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + '&key=AIzaSyCebedLJ9rvIByNJrQJAGv-y47zLIlf35k';
    // $body.append('<img class="bgimg" src="' + imgSrcUrl + '">');
    $body.append(imgElement);
    imgElement.addClass("bgimg");
    imgElement.attr("src",  imgSrcUrl);
   
    $nytHeaderElem.text("New York Times Articles about " + cityInput);

    var articles;

    // example call
    // https://api.nytimes.com/svc/search/v2/articlesearch.json?q=new+york+times&page=2&sort=oldest&api-key=your-api-key
    var ntyAPIKey = "S3RrIAAUJO7qZMLl3GgCjPKAohBG3qa4";
    var ntyURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + cityInput + "&sort=newest" + "&api-key=" + ntyAPIKey;

    $.getJSON(ntyURL, function(data) {
        console.log(data);
        articles = data.response.docs;
        for (var i = 0; i<articles.length; i++) {
            article = articles[i];
            var liTag = $("<li> </li>");
            liTag.addClass("article");
            var aTag = $("<a> </a>");
            var pTag = $("<p> </p>");
            var url = article.web_url;
            var headLine = article.headline.main;
            var snippet = article.snippet;
            aTag.attr("href", url);
            aTag.text(headLine);
            pTag.text(snippet);
            $nytElem.append(liTag);
            liTag.append(pTag);
            liTag.append(aTag);
        }
    }).error(function(e){
        $nytHeaderElem.text("This page could not be loaded");
    });

};













