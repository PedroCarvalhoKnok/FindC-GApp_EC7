
    var html = '';

    $('#Tipo').on('change', function () {
        let val = $(this).val()
        if (val == 'carros') {
          tipoVeiculo = val;
          load(val)
        } else if(val = 'motos') {
          load(val);
        }
        else{
          load(val);
        }
      });

    function load(tipoVeiculo){

    var url = `https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas`;

    const myRequest = new Request(url, {method: 'GET'});

    fetch(myRequest)
     .then(response => {
    if (response.status === 200) {
     // return response.json();
      return response;
    } else {
      throw new Error('Ops! Houve um erro em nosso servidor.');
    }
   })
    .then(function(data) {
     for(var i = 0; i < data.length; i++){
        html += '<option value='+ data[i].codigo +'>'+ data[i].nome + '</option>';
     }

     $('#Modelo').html(html);

     $(document).on('change', '#Modelo', function(){
        var modelo_id = $(this).val();
        console.log(modelo_id);
        if(modelo_id != null){
            load_Year('Modelo', modelo_id);
        }
    });
   }).catch(error => {
    console.error(error);
   });

};

 // function load_Year(id, modelo_id){
    // $.getJSON(`https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas`, function(data){
    //     html += '<option>Selecionar '+ id +'</option>';
    //     console.log(data);
    //     if(id == 'Estado' && modelo_id == null){
    //         for(var i = 0; i < data.estados.length; i++){
    //             html += '<option value='+ data.estados[i].sigla +'>'+ data.estados[i].nome+'</option>';
    //         }
    //     }else{
    //         for(var i = 0; i < data.estados.length; i++){
    //             if(data.estados[i].sigla == cidade_id){
    //                 for(var j = 0; j < data.estados[i].cidades.length; j++){
    //                     html += '<option value='+ data.estados[i].sigla +'>'+data.estados[i].cidades[j]+ '</option>';
    //                 }
    //             }
    //         }
    //     }

       //  $('#Ano').html(html);
    // });
    //};
    
