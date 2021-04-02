
/**
 * @autores Felipe S.,Lucas C.,Milena B. e Pedro C.
 */


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


$('#btnSearch').on('click', function(event) {

   //Ativo quando o botao e clicado chamando a api de conversao dolar-real

    event.preventDefault();

    let titulo = document.getElementById('jogo');

    if(titulo.value == '' || titulo.value == null || titulo.value == undefined)
    {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Digite o titulo do jogo'
      });

      return;
    }

    let url = "https://economia.awesomeapi.com.br/all/USD-BRL";
    //let conversao = 0;

    const myRequest = new Request(url, {method: 'GET'});
 
      fetch(myRequest)
     .then(function(response){
      if (response.status === 200) {
            return response.json();   
      } else {
        Swal.fire({
            icon: 'error',
            title: 'Erro na API',
            text: 'Ocorreu um erro na conversão'
          });
      }
    })
    .then(function(data) {
        
        let media = parseFloat(data.USD.high) + parseFloat(data.USD.low);

        media = media / 2; 
        
        games(media,titulo.value);
        
   }).catch(error => 
    console.log(error)
   );

    
});



function games(conversao,titulo){

    //Ativa quando a conversao e feita montando a tabela dos jogos com suas caract

    let url = `https://www.cheapshark.com/api/1.0/games?title=${titulo}&limit=60&exact=0`;
    let html = '';

    const myRequest = new Request(url, {method: 'GET'});
 
      fetch(myRequest)
     .then(function(response){
      if (response.status === 200) {
            return response.json();   
      } else {
        Swal.fire({
            icon: 'error',
            title: 'Jogo não encontrado!',
            showConfirmButton: true
          });
      }
    })
    .then(function(data) {
      Swal.fire(
        'Sucesso',
        'Jogo(s) encontrado(s)',
        'success'
      ) 

        for(var i = 0; i < data.length ; i++){
          html += '<tr>';
          html += `<td>${data[i].external}</td>`;
          html += `<td> R$ ${parseFloat(data[i].cheapest * conversao).toFixed(2).replace('.',',')}</td>`;
          html += `<td><img src="${data[i].thumb}" width="100" height="100"/></td>`;
          html += `<td>${data[i].gameID}</td>`;
          html += '</tr>';

        }
        
        $('#game_items').html(html);

        html = '';

        document.getElementById("div_games").style.visibility = "visible";
       
     
   }).catch(error => 
    console.log(error)
   );

}


$("#filter_games").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#game_items tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });



});
