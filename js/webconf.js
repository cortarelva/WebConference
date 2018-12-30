window.onload = function(){

const btnRegister = document.getElementById("btnRegister")
btnRegister.addEventListener("click", function(){
swal({
    title:"Inscrição na WebConference",
    html: 
    '<input id="txtName" class="swal2-input" placeholder="name">'+
    'input id="txtEmail" class="swal2-input" placeholder="e-mail">',
    showCancelButton = true,
    confirmButtontext: "Inscrever",
    cancelButtonText:"cancelar",
    showLoaderOnConfirm: true,
    preConfirm: () => {
        const name = document.getElementById('txtName').value
        const email =document.getElementById('txtEmail').value
        const url_base = "https.//fcawebbook.herokuap.com"
        returnfetch('$ {url_base}/conferences/1/participants/${email}',{
            headers:{"Content-Type": "aplication/x-ww-form-urlencoded"},
            method: "Post",
            body:'nomeparticipant=${name}'
        })
        .then(response) => {
            if(!response.ok){
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .catch(error=>{
            swal.showValidationError('Pedido falhou: ${error}');
        });
    },
    allowOutsideClick: () =>!swal.isloading()
    }).then(result=>{
        if(!result.value.err_code)
    })
    swal({title: "inscrição feita com sucesso!"})
    } else{
        swal({title:'${result.value.err_message}'})
    }
}
})
