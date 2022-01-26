const baseUrl = "http://localhost/mahasiswa/index.php/mahasiswa";
const leagueId = "2021";
const baseEndPoin = `${baseUrl}competitions/${leagueId}`;
const teamEndPoin = `${baseUrl}competitions/${leagueId}/teams`;
const standingEndPoin = `${baseUrl}competitions/${leagueId}/standings`;
const matchEndPoin = `${baseUrl}competitions/${leagueId}/matches`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
const fetchHeader = {
    headers: {
      
    }
};

function getListMahasiswa() {
    title.innerHTML = "Data Mahasiswa"
    fetch(baseUrl)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson);
            let teams = ""; 
            resJson.data.forEach(data  => {
                teams += `
               
                  <tr>
                    <td>'${data.nim}'</td>
                    <td>'${data.nama_mhs}'</td>
                    <td>'${data.alamat_mhs}'</td>
                    <td>'${data.prodi}'</td>
                    <td> <a class="waves-effect waves-light btn modal-trigger" href="#modal1" >Update</a> 
                    <a class="red-effect red lighten-2 btn tombolhapus" data-id="`+data.nim+`" >Delete</a> <td/>
                    
        
                    </tr>
                
                  `
                

            });
            contents.innerHTML = `<table>
            <thead>
              <tr>
                  <th>Nim</th>
                  <th>Nama Mahasiswa</th>
                  <th>Alamat Mahasiswa</th>
                  <th>Prodi</th>
                  <th>Action</th>
              </tr>
              
            
              <tbody> </thead>` + teams + ` </tbody>
            </table>`;
    
           
         
        }).catch(err => {
            console.error(err);
        })
}

function deletemhs(idhapus){
    //     fetch(baseUrl,{
    //     method : 'DELETE',
    //     headers: {
            
    //         'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    //     },
    //     body : new URLSearchParams({
    //         'id': idhapus,
    //     })
    // })
    //     .then(response => response.json())
    //     .then(teks => {
    //         alert(teks.msg);
    //         window.location.reload();
    //     }).catch(err => {
    //         console.error(err);
    //     })
    fetch(baseUrl,{
        method : 'DELETE',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body : new URLSearchParams({
            'id': idhapus,
        })
    }
)
.then(res => res.json())
.then(teks => {
        alert(teks.msg);
        

        window.location.reload();
    })
.catch(err => {
    console.log(err);
    if (err.msg == 'Data tidak ditemukan') {
        console.log('masuk delet');
        window.location.reload();
    }
});
}

function loadPage(page) {
    switch (page) {
        case "teams":
            getListMahasiswa();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
    var elemsmodal = document.querySelectorAll('.modal');
    var instancesmodal = M.Sidenav.init(elemsmodal);
    
    

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "teams";
    loadPage(page);
});