
   $(function() {
    //altera o tema para escuro/claro
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');
  
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
      
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }
  
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
        else {        document.documentElement.setAttribute('data-theme', 'light');
              localStorage.setItem('theme', 'light');
        }    
    }
  
    toggleSwitch.addEventListener('change', switchTheme, false);
    //
    
    var html = '';
    var htmlModel = '';
    var htmlYear = '';
    var url;


    $('#Tipo').on('change', function () {

        //Monta a partir da escolha do tipo de veiculo no combo

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

     //Monta as marcas disponiveis de acordo com o tipo

    url = `https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas`;

    let myRequest = new Request(url, {method: 'GET'});

    fetch(myRequest)
     .then(function(response){
    if (response.status === 200) {
     // return response.json();
      return response.json();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro na API',
        text: 'Ocorreu um erro no carregamento das marcas'
      });
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

   //Monta os modelos disponiveis de acordo com a marca

   url = url + `/${marca_id}/modelos`;

   const myRequest = new Request(url, {method: 'GET'});

   fetch(myRequest)
    .then(function(response){
   if (response.status === 200) {
     return response.json();   
   } else {
    Swal.fire({
      icon: 'error',
      title: 'Erro na API',
      text: 'Ocorreu um erro no carregamento dos modelos'
    });
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

    //Seleciona os anos disponiveis de acordo com o modelo

    url = url + `/${modelo_id}/anos`;
 
    const myRequest = new Request(url, {method: 'GET'});
 
    fetch(myRequest)
     .then(function(response){
    if (response.status === 200) {
      return response.json();   
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro na API',
        text: 'Ocorreu um erro no carregamento dos anos'
      });
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

    //Ativo quando o botao e clicado montando o veiculo de acordo com as carac selecionadas

    event.preventDefault();
    let selectTipo = document.getElementById('Tipo');
    let selectMarca = document.getElementById('Marca');
    let selectModelo = document.getElementById('Modelo');
    let selectAno = document.getElementById('Ano');

    //Validacao do select

    if (selectTipo.value == "Selecionar Tipo de Veiculo" || selectTipo.value == null || selectTipo.value == undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Selecione o tipo do veiculo'
      });
      return;
    }

    if (selectMarca.value == "Selecionar a marca do Veiculo" || selectMarca.value == null || selectMarca.value == undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Selecione a marca do veiculo'
      });
      return;
    }
    
    else if (selectModelo.value == "Selecionar o modelo do Veiculo" || selectModelo.value == null || selectModelo.value == undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Selecione o modelo do veiculo'
      });
      return;
    }
    else if (selectAno.value == "Selecionar o ano do Veiculo" || selectAno.value == null || selectAno.value == undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Selecione o ano do veiculo'
      });
      return;
    }
    else{

      let urlVehicle = `https://parallelum.com.br/fipe/api/v1/${selectTipo.value}/marcas/${selectMarca.value}/modelos/${selectModelo.value}/anos/${selectAno.value}`;

      const myRequest = new Request(urlVehicle, {method: 'GET'});
 
      fetch(myRequest)
     .then(function(response){
      if (response.status === 200) {

      return response.json();   
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro na API',
          text: 'Ocorreu um erro ao encontrar o veiculo'
        });
      }
    })
    .then(function(data) {

      Swal.fire(
        'Sucesso',
        'Veículo encontrado',
        'success'
      )
    
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
    