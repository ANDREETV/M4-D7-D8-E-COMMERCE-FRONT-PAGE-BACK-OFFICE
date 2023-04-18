const apiUrl = `https://striveschool-api.herokuapp.com/api/product/`
const apiKey =  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNkNDRkMzZhMTllZjAwMTRkNmU0NTEiLCJpYXQiOjE2ODE3MzY5MTUsImV4cCI6MTY4Mjk0NjUxNX0.5jIj6nRgEP_a4Jtm4CLtCxslun_bKaNKtc9rNmuqfY4`
async function getToken() {
    try{
        const response = await fetch("https://striveschool-api.herokuapp.com/api/product/",{
            headers: {
                "Authorization": `Bearer ${apiKey}`
                }
        })
        const data = await response.json()
        // prodottiAggiunti = data
        // cardProdact(prodottiAggiunti)
        setTimeout(() => {
            document.querySelector(".spinner-container").classList.add("d-none")
            cardProdact(data);
        }, 100)
        console.log("vedi prodotti ", prodottiAggiunti);
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
            <img src="${element.imageUrl}" class="img-fluid object-fit-fill img-prodotto rounded-top w-100" alt="foto-libro"/>
            <div class="card-body d-flex justify-content-between">
                <h5 class="card-title">${element.name}</h5>
                <i class="heart fa-heart fa-regular "></i>
            </div>
            <ul class="list-group list-group-light list-group-small">
                <li class="list-group-item px-4 asin">Id : ${element._id}</li>
                <li class="list-group-item px-4 prezzo fs-3 fw-bold">€ ${element.price} 
                </li>
                <li class="list-group-item px-4 category"> 
                <h5>Descrizione</h5
                <span>${element.description}</span>
                </li>
            </ul>
            <div class="card-body btn-group">
            <button onclick="addCarrello(event)" class="btn btn-sm btn-outline-secondary btn-carrello d-flex align-items-center justify-content-center">
            <i class="me-3 fa-solid fa-cart-plus"></i> 
            Aggiungi al carrello 
            </button>
            <button onclick="nascondiCard(event)" class="btn btn-sm btn-outline-secondary btn-nascondi d-flex align-items-center justify-content-center">
            <i class=" me-3 fa-solid fa-eye"></i> 
            Visualizza il prodotto
            </button>
            </div>
        </div>`

        container.appendChild(col)
        
    });
}


function backOffice() {
    window.location.href = 'formAggiunta.html?status=crea-nuovo-prodotto'
    
}


