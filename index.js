function handlebarsSetup() {
  //put any handlebars setup in here
  Handlebars.registerPartial("userDetails", $("#user-details-partial").html())
}

$(document).ready(function (){
  handlebarsSetup()
});

function searchRepositories() {
  var term = $('#searchTerms').val();
  var url = "https://api.github.com/search/repositories?q=" + term;
  $.get(url, function(data){
    var result="";
    $.each(data["items"], function(i,v){
      result += `<li><h3>${v["name"]}</h3><a href=# onclick="showCommits('${v["full_name"]}')">Show Commits</a><p>description: ${v["description"]}<br><a href="${v["html_url"]}">${v["html_url"]}</a></p><p><img width="32px" height="32px" src="${v["owner"]["avatar_url"]}"><a href="${v["owner"]["html_url"]}">${v["owner"]["login"]}</a></p></li>`;
    });
    $('#results').html(`<ul>${result}</ul>`);
  }).fail(function(err){
    $('#errors').html(err);
  });
}

function showCommits(full_name) {
  var url = `https://api.github.com/repos/${full_name}/commits`
  $.get(url, function(data) {
    console.log('got');
    console.log(data[0]);
    console.log(data[0]["sha"]);
    var commits = "";
    $.each(data, function(i,v){
      commits += `<li>${v["sha"]}</li>`;
    });
    $('#details').html(`<ul>${commits}</ul>`);
  }).fail(function(err){
    $('#errors').html(err);
  });
}
