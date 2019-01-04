window.onload = function(){ 

    

const url_base = "https://fcawebbook.herokuap.com"

const btnRegister = document.getElementById("btnRegister")
/*increver na webconference*/
btnRegister.addEventListener("click", function(){
swal({
     title:"Inscrição na WebConference",
     html: 
     '<input id="txtName" class="swal2-input" placeholder="nome">'+
     '<input id="txtEmail" class="swal2-input" placeholder="e-mail">',
     showCancelButton : true,
     confirmButtontext: "Inscrever",
     cancelButtonText:"cancelar",
     showLoaderOnConfirm: true,
     preConfirm: () => {
        const name = document.getElementById('txtName').value
        const email = document.getElementById('txtEmail').value       
        
             return fetch('$ {url_base}/conferences/1/participants/${email}', {
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
    const response = await fetch('${urlBase}/conferences/1/speakers')
    const speakers = await response.json()

    for (const speaker of speakers) {
        txtSpeakers += " ";
        <div class ="col-sm-4">
          <div class ="team-member">
            <img id="${speaker.idSpeaker}" class="mx-auto rounded-circle viewSpeaker" src="${speaker.foto}" alt="">
            <h4>${speaker.nome}</h4>
            <p class="text-muted"> ${speaker.cargo}</p>
            <ul class="list-inline social-buttons">
        if(speaker.twitter!==null) {
            txtSpeakers += '<li class="list-inline-item"><a href="${speaker.twitter}" target="_blank"><i class="fab fa-twitter"></i></a> </li> '
        }
        if(speaker.facebook!==null){
            txtSpeakers += '<li class= "list-inline-item"><a href="${speaker.facebook}" target="_blank"><i class="fab fa-facebook-f"></i></a></li>'
        }
        if(speaker.linkedin!==null){
            txtSpeakers += '<li class= "list-inline-item" ><a href="${speaker.linkedin}" target="_blank"><i class="fab fa-linkedin-in"></i></a></li>'
        }
        txtSpeakers += '
        </ul>
        </img>
        </div>
    </div>
    ' 
    }
    renderSpeakers.innerHTML = txtSpeakers

        /*gerir click na imagem para exibiçao da janela modal*/
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
    const rendersponsors = document.getElementById("renderSponsors")
    let txtsponsors = " "
    const resposne  = await fetch('${urlBase}/conference/1/sponsors')
    const sponsors = await response.json()

    for(const sponsor of sponsors) {
        txtSponsors += ' <div class = "col-md-3 col-sm-6"> <a href="${sponsor.link}" target="_blank'>
                <img class=" img-fluid d-block mx-auto " src =" $ {sponsor.logo} " alt=" $ {sponsor.nome} ">
                </img>
             </a> 
        </div> '
    }
    rendersponsors.innerHTML=txtSponsors
}) ();

/*-----------------------------contact form------------------------------*/
const contactForm =document.getElementById("contactform")
contactForm.addEventListener("submit",async() => {
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const message = document.getElementById("message").value
    const response = await fetch('${urlBase}/contact/emails', {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        body: 'email = ${email} &name=${name}&subject=${message}'
    })
    const result = await response.json()
    if (result.value.success) {
        swall ('Envio de Mensagem', result.value.message.pt, 'success')
    } else{
        swall ('Mensagem não Enviada', result.value.message.pt, 'error')
    }
})




}



