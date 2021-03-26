
   $(function() {
    
    var html = '';
    var htmlModel = '';
    var htmlYear = '';
    var url;


    $('#Tipo').on('change', function () {
        let val = $(this).val()
        if (val == 'carros') {
          load(val);
          
        }
        else if(val == 'motos') {
          load(val);
        }
        else{
          load(val);
        }
         html = '';
         htmlModel = '';
         htmlYear = '';
      });

  function load(tipoVeiculo){

    url = `https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas`;

    let myRequest = new Request(url, {method: 'GET'});

    fetch(myRequest)
     .then(function(response){
    if (response.status === 200) {
     // return response.json();
      return response.json();
    } else {
      throw new Error('Ops! Houve um erro em nosso servidor.');
    }
   })
    .then(function(data) {
     html = '<option value="">Selecionar a marca do Veiculo</option>';
     for(var i = 0; i < data.length; i++){
        html += '<option value='+ data[i].codigo +'>'+ data[i].nome + '</option>';
     }

     $('#Marca').html(html);

     html = '';

     $(document).on('change', '#Marca', function(){
        var marca_id = $(this).val();
        console.log(marca_id);
        if(marca_id != null){
            load_Model('Marca', marca_id, url);
        }
    });
   }).catch(error => 
    console.log(error)
   );

};

 function load_Model(id, marca_id,url){

   url = url + `/${marca_id}/modelos`;

   const myRequest = new Request(url, {method: 'GET'});

   fetch(myRequest)
    .then(function(response){
   if (response.status === 200) {
     return response.json();   
   } else {
     throw new Error('Ops! Houve um erro em nosso servidor.');
   }
  })
   .then(function(data) {
    htmlModel = '<option value="">Selecionar o modelo do Veiculo</option>';
    for(var i = 0; i < data.modelos.length; i++){
      htmlModel += '<option value='+ data.modelos[i].codigo +'>'+ data.modelos[i].nome + '</option>';
    }

    $('#Modelo').html(htmlModel);

    htmlModel = '';

    $(document).on('change', '#Modelo', function(){
       var modelo_id = $(this).val();
       console.log(modelo_id);
       if(modelo_id != null){
           load_Year('Modelo', modelo_id, url);
       }
   });
  }).catch(error => 
    console.log(error)
   );

  };


  function load_Year(id, modelo_id,url){

    url = url + `/${modelo_id}/anos`;
 
    const myRequest = new Request(url, {method: 'GET'});
 
    fetch(myRequest)
     .then(function(response){
    if (response.status === 200) {
      return response.json();   
    } else {
      throw new Error('Ops! Houve um erro em nosso servidor.');
    }
   })
    .then(function(data) {
     htmlYear = '<option value="">Selecionar o ano do Veiculo</option>';
     for(var i = 0; i < data.length; i++){
      htmlYear += '<option value='+ data[i].codigo +'>'+ data[i].nome + '</option>';
     }
 
     $('#Ano').html(htmlYear);

     htmlYear = '';
 
   }).catch(error => 
    console.log(error)
   );
 
   };


   $('#btnSearch').on('click', function(event) {

    event.preventDefault();

    let selectMarca = document.getElementById('Marca');
    let selectModelo = document.getElementById('Modelo');
    let selectAno = document.getElementById('Ano');

    if (selectMarca.value == "Selecionar a marca do Veiculo" || selectMarca.value == null || selectMarca.value == undefined) {
      
      return;
    }
    
    else if (selectModelo.value == "Selecionar o modelo do Veiculo" || selectModelo.value == null || selectModelo.value == undefined) {
      
      return;
    }
    else if (selectAno.value == "Selecionar o ano do Veiculo" || selectAno.value == null || selectAno.value == undefined) {
      
      return;
    }
    else{

      let urlVehicle = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectMarca.value}/modelos/${selectModelo.value}/anos/${selectAno.value}`;

      const myRequest = new Request(urlVehicle, {method: 'GET'});
 
      fetch(myRequest)
     .then(function(response){
      if (response.status === 200) {

      return response.json();   
      } else {
      throw new Error('Ops! Houve um erro em nosso servidor.');
      }
    })
    .then(function(data) {
    
      $("#modelo_veiculo").html('Modelo: ' + data.Modelo);
      $("#marca_veiculo").html('Marca: ' + data.Marca);
      $("#valor_veiculo").html('Preço: ' + data.Valor);
      $("#ano_veiculo").html('Ano de Fabricação: ' + data.AnoModelo);
      $("#combustivel_veiculo").html('Combustível: ' + data.Combustivel);
      $("#referencia").html('Última atualização: ' + data.MesReferencia);

      document.getElementById("div_vehicle").style.visibility = "visible";


     
   }).catch(error => 
    console.log(error)
   );
      
    }

    
  });

  
 
  });
    