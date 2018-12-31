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
/*--------------------------*/




}



