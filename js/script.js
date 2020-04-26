
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

    var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + cityInput + "&format=json&callback=wikiCallback";

 	var wikiRequestTimeout = setTimeout (function (){
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);

    $.ajax(wikiUrl, {
        dataType: "jsonp",
        type: "GET",
        // could've put wikiUrl as a key value pair instead of passing it as a string parameter
        success: function(response) {
            console.log(response);
            // var urlList = response[3];
            var articleList = response[1];
            for (var i = 0; i<articleList.length; i++) {
                articleStr = articleList[i];
                articleStr = articleStr.replace(/ /g, "_");
                console.log("the article str is " + articleStr);
                var url = "http://en.wikipedia.org/wiki/" + articleStr;
                console.log("the  url is " + url);
                // var urlStr =  urlList[i];
                $wikiElem.append("<li> <a href=" + url + ">" + articleStr + "</a> </li>");

            }
            clearTimeout(wikiRequestTimeout);
        }
    }); 

};













