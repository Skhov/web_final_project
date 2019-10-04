$(function () {
    console.log(window.location.href.split('?'))
    var arrId = window.location.href.split('?')
    var id = arrId[1].substring(3, arrId[1].length)
    var id=116213
    // var id = arrId[1].substr(3, arrId[1].length-2)
    console.log(id)
    fetchArticleDetail(id)
})

function fetchArticleDetail(id) {
    $.ajax({
        url: `http://api-ams.me/v1/api/articles/${id}`,
        method: "GET",
        success: function (res) {
            appendJumbotron(res.DATA)
        },
        error: function (er) {
            console.log(er)
        }
    })
}

function appendJumbotron(articles) {
    var content = ""
    content = `
    <div class="jumbotron">
            <h2 class="display-4">${articles.TITLE}</h2>
            <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content
                or information.</p>
            <hr class="my-4">
            <p>${articles.DESCRIPTION}</p>
            <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
        
        </div>`
    $('.container').html(content)
}