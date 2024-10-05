// Inicializa o mapa
var map = L.map('map').setView([-23.420986, -51.933777], 12); // Exemplo: São Paulo, Brasil

// Adiciona uma camada de tile ao mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Array para armazenar os pontos do polígono
var polygonPoints = [];

// Função para desenhar o polígono
function drawPolygon() {
    // Limpa o polígono anterior se existir
    if (window.polygon) {
        map.removeLayer(window.polygon);
    }

    // Desenha o polígono
    if (polygonPoints.length > 0) {
        window.polygon = L.polygon(polygonPoints, { color: 'blue', fillColor: 'blue', fillOpacity: 0.5 }).addTo(map);
    }
}

// Adiciona o evento de clique ao mapa
map.on('click', function (e) {
    if (polygonPoints.length < 4) {

        polygonPoints.push([e.latlng.lat, e.latlng.lng]);
        console.log(polygonPoints);
    }

    // Tenta desenhar o polígono
    drawPolygon();
});

function clearPolygon() {
    polygonPoints = [];
    if (window.polygon) {
        map.removeLayer(window.polygon);
    }
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'c') {
        clearPolygon();
    }
});

var xhr = new XMLHttpRequest();

function enviarApi() {
    let json = JSON.stringify(polygonPoints);

    xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(json);

    if (xhr.status === 200) {
        var dados = JSON.parse(xhr.responseText);
        console.log(dados);
    }
}