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
        txtSpeakers += '
        <div class ="col-sm-4">
         <div class ="team-member">
            <img id="${speaker.idSpeaker}" class="mx-auto rounded-circle viewSpeaker" src="${speaker.foto}" alt="">
            <h4>${speaker.nome}</h4>
            <p class="text-muted"> ${speaker.cargo}</p>
            <ul class="list-inline social-buttons">
        if(speaker.twitter!==null){
            txtSpeakers += '
                <li class="list-inline-item">
                     <a href="${speaker.twitter}" target="_blank">
                         <i class="fab fa-twitter"></i>
                     </a> 
                </li> '
        }
        if(speaker.facebook!==null){
            txtSpeakers += '
                <li class= "list-inline-item">
                    <a href="${speaker.facebook}" target="_blank">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                </li>'
        }
        if(speaker.linkedin!==null){
            txtSpeakers += '
                <li class= "list-inline-item" >
                    <a href="${speaker.linkedin}" target="_blank">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                </li>'
        }
        txtSpeakers += '
            </ul>
         </div>
        </div>
        ' 
    }
    renderSpeakers.innerHTML = txtSpeakers
        /*gerir clique na imagem para exibiçao da janela modal*/
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



}



