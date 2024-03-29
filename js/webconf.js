window.onload = function(){ 

   

const urlBase = "https://fcawebbook.herokuapp.com";

const btnLogin = document.getElementById("btnLogin");

const btnRegister = document.getElementById("btnRegister");



/*----------------login admin-------------*/
btnLogin.addEventListener("click", () => {
    swal({
        title:"Login de admin",
        html:
        '<input id="txtName"class="swal2-input" placeholder="email">' + 
        '<input id="txtEmail" class="swal2-input" placeholder="password">',
        showCancelButton:true,
        confirmButtontext:"Entrar",
        cancelButtonText:"cancelar",
        showLoaderOnConfirm:true,
        preConfirm:() =>{
            const name = document.getElementById('txtEmail').value
            const email = document.getElementById('txtPass').value
            return fetch ('${urlBase}/signin',{
                headers:{
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method:"POST",
                body:'email=${email}&password=${pass}'
            })
            .then (response =>{
                if(!response.ok){
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .catch(error => {
                swal.showValidationError('Pedido Falhou: ${error}');
            });
        }

    }) .then (result => {
        if(result.value) {
        if(!result.value.err_code) {
        swal ({title: "Login sucesso!"})
      } else {
        swal ({title:'${result.value.err_message}'})
        }
      }
 });

});





/*--------------------increver na webconference--------------------------*/
btnRegister.addEventListener("click", function() {
swal({
     title:"Inscrição na WebConference",
     html: 
     '<input id="txtName" class="swal2-input" placeholder="nome">'+
     '<input id="txtEmail" class="swal2-input" placeholder="e-mail">',
     showCancelButton : true,
     confirmButtontext: "Inscrever",
     cancelButtonText:"cancelar",
     showLoaderOnConfirm: true,
     preConfirm: ()=> {
        const name = document.getElementById('txtName').value
        const email = document.getElementById('txtEmail').value       
        
             return fetch('$ {urlBase}/conferences/1/participants/${email}', {
                 headers: { "Content-Type": "application/x-www-form-urlencoded"},
                 method: "POST",
                 body: 'nomeparticipant=${name}'
             })                             
             .then (response =>{
             if (!response.ok) {
                 throw new Error(response.statusText);
             }
             return response.json();
            })
         .catch (error => {
             swal.showValidationError('Pedido falhou: ${error}');
         });
      },
     allowOutsideClick: () => !swal.isLoading() 

    }) .then (result => {
        if(result.value) {
        if(!result.value.err_code) {
        swal ({title: "inscrição feita com sucesso!"})
      } else {
        swal ({title:'${result.value.err_message}'})
        }
      }
 });
});


/*----------Get speakers from server----------------*/
(async ()=> {
    const renderSpeakers = document.getElementById("renderSpeakers")
    let txtSpeakers = ""
    const response = await fetch(`${urlBase}/conferences/1/speakers`)
    const speakers = await response.json()

    for (const speaker of speakers) {
        txtSpeakers += `
        <div class="col-sm-4">
          <div class ="team-member">
            <img id="${speaker.idSpeaker}" class="mx-auto rounded-circle viewSpeaker" src="${speaker.foto}" alt="">
            <h4>${speaker.nome}</h4>
            <p class="text-muted"> ${speaker.cargo}</p>
            <ul class="list-inline social-buttons">`
        if(speaker.twitter!==null) {
            txtSpeakers += '<li class="list-inline-item"><a href="${speaker.twitter}" target="_blank"><i class="fab fa-twitter"></i></a> </li> '
        }
        if(speaker.facebook!==null){
            txtSpeakers += '<li class= "list-inline-item"><a href="${speaker.facebook}" target="_blank"><i class="fab fa-facebook-f"></i></a></li>'
        }
        if(speaker.linkedin!==null){
            txtSpeakers += '<li class= "list-inline-item" ><a href="${speaker.linkedin}" target="_blank"><i class="fab fa-linkedin-in"></i></a></li>'
        }
        txtSpeakers += `
            </ul>
            </img>
         </div>
        </div>
        `
    }
    renderSpeakers.innerHTML = txtSpeakers

        /*-----------------gerir click na imagem para exibiçao da janela modal------------------*/
        const btnView = document.getElementsByClassName("viewSpeaker")
        for(let i = o;i< btnView.lenght;i++){
            btnView[i].addEventListener("click", () =>{
                for (const speaker of speakers){
                    if(speaker.idspeaker == btnView[i].getAttribute("id")){
                        swall({
                            title:speaker.nome,
                            text:speaker.bio,
                            imageUrl:speaker.foto,
                            imageWidth:400,
                            imageHeight:400,
                            imageAlt:'Foto do Orador',
                            animation:false
                        })
                    }
                }
            })
        }
    }) ();
    

/*-----------------------Get sponsor from server-------------------------*/
(async () => {
    const renderSponsors = document.getElementById("renderSponsors")
    let txtSponsors = ""
    const response = await fetch('${urlBase}/conference/1/sponsors')
    const sponsors = await response.json()

    for(const sponsor of sponsors) {
        txtSponsors +=  `
         <div class="col-md-3 col-sm-6"> 
            <a href="${sponsor.link}" target="_blank"> 
             <img class="img-fluid d-block mx-auto" src="${sponsor.logo}" alt="${sponsor.nome}">  
            </a>
        </div> `
    }
    renderSponsors.innerHTML = txtSponsors
}) ();

/*-----------------------------contact form------------------------------*/
const contactForm =document.getElementById("contactForm")

contactForm.addEventListener ("submit",async function () {
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const message = document.getElementById("message").value
    const response = await fetch('${urlBase}/contact/emails', {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        body: 'email = ${email}&name=${name}&subject=${message}'
    })
    const result = await response.json()
    if (result.value.success) {
        swall ('Envio de Mensagem', result.value.message.pt, 'success')
    } 
    else {
        swall ('Mensagem não Enviada', result.value.message.pt, 'error')
    }
});

    


/*--------------------------Map---------------------------------*/
/*--ponto no mapa a localizar na cidade do Porto--*/
function myMap(){
const porto = new google.maps.LatLng (41.14961, -8.61099);

const mapProp = {
    center:porto,
    zoom:12,
    scrollwheel:false,
    draggable:false,
    mapTypeId:google.maps.MapTypeId.ROADMAP
}
/*-------mapa--------*/
const map = new google.maps.Map (document.getElementById("googleMap"),mapProp)

/*------janela de informaçao-------*/
const infowindow = new google.maps.InfoWindow ({
    content: "É aqui a WebConference!"
})
/*------------marcador-----------*/
const marker = new google.maps.Marker({
    position:porto,
    map:map,
    title:"WebConference"
})
/*-------listener-------*/
marker.addListener('click', function() {
    infowindow.open(map, marker)
})

};





}
