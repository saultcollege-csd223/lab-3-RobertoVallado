window.addEventListener('load', () => {
    $("#introContent").load("views/intro.html");
    $("#barsContent").load("views/bars.html");
    // $("#lineContent").load("views/lines.html");
    // $("#pieContent").load("views/pie.html");
    // $("#configsContent").load("views/conf.html");
    // $("#titlesContent").load("views/titles_and_more.html");
    $.getScript("http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/highlight.min.js", function () {
        $('code.language-javascript').each(function (i, block) {
            hljs.highlightBlock(block); //applies the highlight forEach block with a <code> & class: language-javascript. 
        });
    });
})