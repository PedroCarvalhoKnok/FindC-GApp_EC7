
$(function() {

var _GamesTable = $("#Games-table");

$('#btnSearch').on('click', function(event) {

    event.preventDefault();

    let titulo = document.getElementById('jogo');

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

    let url = `https://www.cheapshark.com/api/1.0/games?title=${titulo}&limit=60&exact=0`;
    let html;

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
        for(var i = 0; i < data.length ; i++){
          html += '<tr>';
          html += `<td>${data[i].external}</td>`;
          html += `<td> R$ ${parseFloat(data[i].cheapest * conversao).toFixed(2)}</td>`;
          html += `<td><img src="${data[i].thumb}" width="100" height="100"/></td>`;
          html += '</tr>';

        }

        
        $('#game_items').html(html);

        html = '';

        document.getElementById("div_games").style.visibility = "visible";
        // _GamesTable.DataTable({
        //     autoWidth: true,
        //     responsive: true,
        //     language:{
        //         searchPlaceholder:"Pesquise seu jogo.."
        //     },
        //     "dom": '<"row justify-content-center mt-5"<"col-md-9"<"card"<"card-body"<"row justify-content-center"<"col-md-7 col-sm-6"f><"col-md-2 col-sm-6"l>>>>>>' +
        //     '<"row"<"col-sm-12"tr>>' +
        //     '<"row mb-2"<"col-sm-12 col-md-12 text-center"i>>' +
        //     '<"row mb-5"<"col-sm-12 col-md-12 text-center"p>>',
        //     aaData: data,
        //     order:[[2,"desc"]],
        //     sZeroRecords: "Nenhum registro Encontrado",
        //     pageLength: 6,
        //     columns:
        //     [
        //        {
        //             data: 'external',
        //             class: 'card-title pb-3 pr-3 pl-card',
        //             render: function(data,type,full,meta){
        //                 return '<p class="card-text pt-1 pl-4 pr-4 pb-3">' + data + '</p>';
        //             }

        //        },
        //        {
        //             data: 'gameID',
        //             class: 'card-title pb-3 pr-3 pl-card',
        //             render: function(data,type,full,meta){
        //                 return '<p class="card-text pt-1 pl-4 pr-4">' + data + '</p>';
        //             }

        //         },
        //         {
        //             data: 'cheapest',
        //             class: 'card-title pb-3 pr-3 pl-card',
        //             render: function(data,type,full,meta){
        //                 let valorReal;
        //                 valorReal = data * conversao;
        //                 return '<p class="card-text pt-1 pl-4 pr-4 pb-3">R$ ' + valorReal + '</p>';
        //             }
    
        //         },
        //         {
        //             data: 'thumb',
        //             render: function (data,type,full,meta) {
        //                 return full.thumb != null || image != undefined ? `<div class="case-thumbnail aw-tooltip admin-tooltip" style="background-image: url(${full.thumb});"></div>` : '';
        //             },
        //             name: 'image-background',
        //             title: 'Image',
        //             orderable: false
        //         }
        //     ]
        // });

     
     
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
