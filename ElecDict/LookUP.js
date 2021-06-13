document.getElementById("search-input")
    .addEventListener("keyup", function(event) {
        if (event.code === 'Enter') {
            searchTap();
        }
    });

document.getElementById('search-tap').addEventListener('click', function (event) {
    searchTap();
})

function searchTap() {
    let word = document.getElementById('search-input').value.toLowerCase().replace(/(^\s*)|(\s*$)/g,"");
    document.getElementById('search-input').value = ""
    if (word  === "") {
        document.getElementById('content').innerHTML = "<div class=\"content-default\">Welcome to Search English!</div>"
        return
    }
    LookUP(word)
}

function LookUP(word) {

    document.getElementById('content').innerHTML = "<div class=\"content-default\">Searching...</div>"

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        // get main content
        const patten = new RegExp('<div class="entry">.*<small');
        let entries = patten.exec(this.responseText.replace(/[\r\n]/g,""));

        if (entries != null) {
            let content = entries[0].replace("<small","");

            content = content.replaceAll("href=\"/","href=\"https://dictionary.cambridge.org/");

            let otherpatten = new RegExp("class=\"lbt lb-cm lpb-10 lpt-10 lpb-25 lmb-10 ddef had hdb\".*?Press\\)");
            content = content.replace(otherpatten,"");

            content = '<link href="https://dictionary.cambridge.org/common.css?version=5.0.175" rel="stylesheet" type="text/css">' + content;

            document.getElementById('content').innerHTML = content;
        } else {
            document.getElementById('content').innerHTML = "<div class=\"content-default\">It seems not a word.</div>"
        }
    }
    xhttp.open("GET", "https://dictionary.cambridge.org/dictionary/english/" + word, true);
    xhttp.send();
}