window.addEventListener('load', () => {
    $("#introContent").load("views/intro.html");
    $("#pieContent").load("views/pie.html");
    $("#barsContent").load("views/bars.html");
    $("#lineContent").load("views/lines.html");
    // $("#configsContent").load("views/conf.html");
    // $("#titlesContent").load("views/titles_and_more.html");
    $.getScript("http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/highlight.min.js", function () {
        $('code.language-javascript').each(function (i, block) {
            hljs.highlightBlock(block); //applies the highlight forEach block with a <code> & class: language-javascript. 
        });
    });
})

async function getCSVdata() {
    const response = await fetch("dataset/test.csv");
    const data = await response.text();
    const rows = data.split('\n').slice(8);

    const originLabels = [];
    const ratingData = [];

    rows.forEach(rowElement => {
        let origin, rating;
        let row = rowElement.split(',');

        origin = row[1];
        if (origin.charAt(0) == '"') {
            console.log()
            origin = origin.substring(1, origin.length - 1);
        }

        if (!parseFloat(row[6])) {
            if (!parseFloat(row[7])) {
                rating = row[8];
            } else {
                rating = row[7];
            }
        } else {
            if (row[6][2] == '%') {
                rating = row[8];
            } else {
                rating = row[6];
            }
        }
        originLabels.push(origin);
        ratingData.push(rating);
    })
    return {
        labels: originLabels,
        data: ratingData
    }
}

async function getAPIdata() {
    const casesArray = [];
    const dates = [];
    let province;
    let healthRegion;

    const response = await fetch("https://api.opencovid.ca/timeseries?stat=cases&loc=3595&after=01-01-2022&before=15-02-2022");

    if (!response.ok) {
        throw new Error("Error loading the API");
    }
    response.json()
        .then(data => {
            return data.cases;
        }).catch((error) => {
            console.log(error)
        })
        .then(info => {
            info.forEach(el => {
                if (healthRegion == null) {
                    province = el.province;
                    healthRegion = el.health_region;
                }
                dates.push(el.date_report);
                casesArray.push(el.cases);
            })
            return {
                cases: casesArray,
                dateLabels: dates,
                region: healthRegion,
                prov: province
            };
        })
        .catch((e) => {
            console.error("Critical failure: " + e.message)
        })
}