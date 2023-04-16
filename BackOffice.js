const apiUrl = `https://striveschool-api.herokuapp.com/api/product/`
const apiKey =  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM2ZjI1ODMzYjE1MjAwMTQ3NjE3OWIiLCJpYXQiOjE2ODE1ODMyOTQsImV4cCI6MTY4Mjc5Mjg5NH0.umi_YCOqwne8MlazDbKXFPP-MKY0s7fTEfHjg7291qM`

const form = document.getElementById('user-form');

const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const brandInput = document.getElementById('brand');
const imageUrlInput = document.getElementById('image-url');
const priceInput = document.getElementById('price');


// const createdAt = Date.now().getTime()
// const updatedAt = Date.now().getTime()

form.addEventListener('submit', async (event) =>{
    event.preventDefault();
    const product = {
        name: nameInput.value,
        description: descriptionInput.value,
        brand: brandInput.value,
        imageUrl: imageUrlInput.value,
        price: priceInput.value
    }

    try {
        const response = await fetch(apiUrl, {
            method : 'POST',
            body : JSON.stringify(product),
            headers : new Headers ({
                "Authorization": `Bearer ${apiKey}`,
                "Content-type" : 'application/json; charset=UTF-8'
            })
        })
        window.location.href = 'formAggiunta.html?status=aggiunta-prodotto'
    
    } catch (error) {
        console.log(error);
    }
})

async function getToken() {
    try{
        const response = await fetch(apiUrl,{
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM2ZjI1ODMzYjE1MjAwMTQ3NjE3OWIiLCJpYXQiOjE2ODE1ODMyOTQsImV4cCI6MTY4Mjc5Mjg5NH0.umi_YCOqwne8MlazDbKXFPP-MKY0s7fTEfHjg7291qM"
                }
        })
        const data = await response.json()
        tableBody(data)
    } 
    catch (error){
        console.log('Errore nel recupero degli utenti: ', error);
    }
}

getToken()


// CREAZIONE DELLA TABBELLA 
function tableBody(product) {
    const tableBody = document.getElementById('users-table-body');
    tableBody.innerHTML = '';
    product.forEach((element) => {
        const row = `
        <tr>
            <td class="td-body">${element._id}</td>
            <td class="td-body">${element.name}</td>
            <td class="td-body">${element.description}</td>
            <td class="td-body">${element.brand}</td>
            <td class="td-body"><p class="td-img">${element.imageUrl}</p></td>
            <td class="td-body">${element.price} € </td>
            <td class="td-body">${element.userId}</td>
            <td class="td-body">${element.createdAt}</td>
            <td class="td-body">${element.updatedAt}</td>
            <td class="td-button">
            <button class="btn btn-primary me-2" onclick="editUsers(${element._id})">Modifica</button>
            <button class="btn btn-danger" onclick="deleteProduct('${element._id}')">Elimina</button>
            </td>
        </tr>
        `
        tableBody.innerHTML += row 

    });
}

// async function deleteUser(elementId) {
//         try {
//             await fetch(`${apiUrl}${elementId}` ,{
//                 headers: {
//                     "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM5OTk5OTFhZjZmNjAwMTRiODUyMjIiLCJpYXQiOjE2ODE0OTY0NzMsImV4cCI6MTY4MjcwNjA3M30.jG0GuK5GcJq9Sk6fzuDzY_948NYVRnNZ_bcbURxfgno"
//                     },
//                 method: 'DELETE'})    
//                 console.log(elementId);
//         } catch (error) {
//             console.log('Errore durante cancellazione del prodotto: ', error);
//         }
// }


async function deleteProduct(productId) {
    if (confirm('Sei siuro di voler eliminare questo Prodotto?')) {
    try {
        await fetch(`${apiUrl}${productId}`, { 
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-type" : 'application/json; charset=UTF-8'
                },
            method: 'DELETE'} );
        window.location.href = 'formAggiunta.html?status=delete-ok'
    } catch (error) {
        console.log('Errore durante cancellazione di questo Prodotto: ', error);
    }
    }
}



