var _GamesTable = $("#Games-table");

function getGamesbyTitle(){

    let titulo = document.getElementById('jogo');

    let url = `https://www.cheapshark.com/api/1.0/games?title=${titulo.value}&limit=60&exact=0`;

    const myRequest = new Request(url, {method: 'GET'});
 
      fetch(myRequest)
     .then(response => {
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Jogo encontrado!',
          showConfirmButton: true
        });
            return response;   
      } else {
      throw new Error('Ops! Houve um erro em nosso servidor.');
      }
    })
    .then(function(data) {
        let cotacaoMedia;
        cotacaoMedia = conversaoDolar();

        _GamesTable.DataTable({
            autoWidth: true,
            responsive: true,
            language:{
                searchPlaceholder:"Pesquise seu jogo.."
            },
            "dom": '<"row justify-content-center mt-5"<"col-md-9"<"card"<"card-body"<"row justify-content-center"<"col-md-7 col-sm-6"f><"col-md-2 col-sm-6"l>>>>>>' +
            '<"row"<"col-sm-12"tr>>' +
            '<"row mb-2"<"col-sm-12 col-md-12 text-center"i>>' +
            '<"row mb-5"<"col-sm-12 col-md-12 text-center"p>>',
            aaData: data,
            order:[[2,"desc"]],
            sZeroRecords: "Nenhum registro Encontrado",
            pageLength: 6,
            columns:
            [
               {
                    data: 'external',
                    class: 'card-title pb-3 pr-3 pl-card',
                    render: function(data,type,full,meta){
                        return '<p class="card-text pt-1 pl-4 pr-4 pb-3">' + data + '</p>';
                    }

               },
               {
                    data: 'gameID',
                    class: 'card-title pb-3 pr-3 pl-card',
                    render: function(data,type,full,meta){
                        return '<p class="card-text pt-1 pl-4 pr-4">' + data + '</p>';
                    }

                },
                {
                    data: 'cheapest',
                    class: 'card-title pb-3 pr-3 pl-card',
                    render: function(data,type,full,meta){
                        let valorReal;
                        valorReal = data * cotacaoMedia;
                        return '<p class="card-text pt-1 pl-4 pr-4 pb-3">R$ ' + valorReal + '</p>';
                    }
    
                },
                {
                    data: 'thumb',
                    render: function (data,type,full,meta) {
                        return full.thumb != null || image != undefined ? `<div class="case-thumbnail aw-tooltip admin-tooltip" style="background-image: url(${full.thumb});"></div>` : '';
                    },
                    name: 'image-background',
                    title: 'Image',
                    orderable: false
                }
            ]
        });

     
     
   }).catch(error => {
    console.error(error);
   });

}


function conversaoDolar(){

    let url = "https://economia.awesomeapi.com.br/all/USD-BRL";
    let conversao = 0;

    const myRequest = new Request(url, {method: 'GET'});
 
      fetch(myRequest)
     .then(response => {
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
    
        let media = (data.USD.high + data.USD.low) / 2
        conversao = media;   
   }).catch(error => {
    console.error(error);
   });


   return conversao;

}
