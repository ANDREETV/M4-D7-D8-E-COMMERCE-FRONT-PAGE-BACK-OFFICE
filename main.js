const apiUrl = `https://striveschool-api.herokuapp.com/api/product/`
const apiKey =  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM2ZjI1ODMzYjE1MjAwMTQ3NjE3OWIiLCJpYXQiOjE2ODE1ODMyOTQsImV4cCI6MTY4Mjc5Mjg5NH0.umi_YCOqwne8MlazDbKXFPP-MKY0s7fTEfHjg7291qM`
async function getToken() {
    try{
        const response = await fetch("https://striveschool-api.herokuapp.com/api/product/",{
            headers: {
                "Authorization": `Bearer ${apiKey}`
                }
        })
        const data = await response.json()
        prodottiAggiunti = data
        cardProdact(prodottiAggiunti)
        tableBody()
        console.log(data);
    } 
    catch (error){
        console.log('Errore nel recupero degli utenti: ', error);
    }
}

getToken()

let prodottiAggiunti = null
function cardProdact(prodottiAggiunti) {
    let container = document.getElementById('prodotti')
    prodottiAggiunti.forEach((element) => {
        let col = document.createElement('div')
        col.classList.add('col')
        col.innerHTML = `
        <div class="card shadow-sm">
            <img src="${element.imageUrl}" class="img-fluid object-fit-fill img-libro rounded-top w-100" alt="foto-libro"/>
            <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
            </div>
            <ul class="list-group list-group-light list-group-small">
                <li class="list-group-item px-4 asin">${element.id}</li>
                <li class="list-group-item px-4 prezzo d-flex justify-content-between">€ ${element.price} 
                <i class="heart fa-heart fa-regular "></i>
                </li>
                <li class="list-group-item px-4 category"> ${element.description}</li>
            </ul>
            <div class="card-body btn-group">
            <button onclick="addCarrello(event)" class="btn btn-sm btn-outline-secondary btn-carrello">Aggiungi al carrello </button>
            <button onclick="nascondiCard(event)" class="btn btn-sm btn-outline-secondary btn-nascondi">Nascondi</button>
            </div>
        </div>`

        container.appendChild(col)
        
    });
}

