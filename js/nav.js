document.addEventListener("DOMContentLoaded", function(){
    // Activate sidebar nav
    loadNav();

    var page = window.location.hash.substr(1);
    if(page == "") page = "home";
    loadPage(page);

    function loadPage(page){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4){
                var content = document.querySelector("#body-content");
                if(this.status != 200) content.innerHTML = "<p>Upps.. Halaman tidak dapat di akses.</p>";
                if(this.status == 200){
                    content.innerHTML = xhttp.responseText;
                }else if(this.status == 404){
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>"
                }
            }
        }
        xhttp.open("GET", "pages/"+ page + ".html", true);
        xhttp.send();
    }

    function loadNav(){
        var elemements = document.querySelectorAll(".sidenav");
        M.Sidenav.init(elemements);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4){
                if (this.status != 200) return;

                // Muat daftar tautan menu
                document.querySelectorAll(".sidenav, .topnav").forEach(function(elem){
                    elem.innerHTML = xhttp.responseText;
                    elem.addEventListener("click", function(){
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        }
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }
});