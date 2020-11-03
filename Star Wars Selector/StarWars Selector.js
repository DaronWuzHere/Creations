let name    = document.querySelector('#name')
    
function getInfo() {
    $.get("https://swapi.dev/api/people/1"),function(response){
        updateInfo(response.data)
    }
}

function updateInfo()   {
    name.innerText = data.name
}

button.addEventListener('click', getInfo)