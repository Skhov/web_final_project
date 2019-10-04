$(function(){
    $('#showModal').click(function(){
        $('#modalArticle').modal('show')
    })
    $('#save').click(function(){
       let article = {
           TITLE: $('#title').val(),
           DESCRIPTION: $('#desc').val()
       }
       console.log(article)
       insertArticle(article)
    })
    $('#search').keyup(function(){
        searchByTitle($(this).val())
    })
})

//load data from article.json
function loadLocalJSON(){
    var xhtp = new XMLHttpRequest()
    xhtp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            var o = JSON.parse(this.response);
           appendToTable(o.DATA)
        }
    }
    xhtp.open("GET", "../json/article.json", true);
    xhtp.send()
}
function loadArticle(){
    var xhtp = new XMLHttpRequest()
    xhtp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            var o = JSON.parse(this.response);
           appendToTable(o.DATA, o.MESSAGE)
           
        }
    }
    xhtp.open("GET", "http://api-ams.me/v1/api/articles?page=1&limit=15", true);
    xhtp.send()
}
loadArticle()
function appendToTable(article, msg){
    var content = "";
    for (a of article){
        content +=`
        <tr>
            <td>${a.ID}</td>
            <td>${a.TITLE}</td>
            <td>${a.DESCRIPTION}</td>
            <td><img src=${a.IMAGE} /></td>
            <td><button class="btn btn-outline-primary waves-effect">DELETE</button></td>
        </tr>
    `
    }
    $('tbody').html(content)
    toastr.success(`${msg}`)
}
function loadPhotos(){
    var xhtp = new XMLHttpRequest()
    xhtp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            var o = JSON.parse(this.response);
           appendTable(o)
        }
    }
    xhtp.open("GET", "https://jsonplaceholder.typicode.com/photos", true);
    xhtp.send()
}
function appendTable(data){
    var content = "";
    for (a of data){
        content +=`
        <tr>
            <td>${a.id}</td>
            <td>${a.title}</td>
            <td><img src=${a.thumbnailUrl} /></td>
            <td><button class="btn btn-outline-primary waves-effect">DELETE</button></td>
        </tr>
    `
    }
    $('tbody').html(content)
}
// loadPhotos()

//insert article
function insertArticle(article){
    $.ajax({
        url: "http://api-ams.me/v1/api/articles",
        method: "POST",
        headers: {
            "content-type":"application/json"
        },
        data: JSON.stringify(article),
        success: function(res){
            loadArticle()
            $('#modalArticle').modal('hide')
        },
        error: function(er){
            console.log(er)
        }
    })
}
// Search function 
function searchByTitle(title)
{
    $.ajax({
        url: `http://api-ams.me/v1/api/articles?title=${title}&page=1&limit=15`,
        method: "GET",
        success: function(res){
           appendToTable(res.DATA)
           
        },
        error: function(er){
            console.log(er)
        }
    })
}