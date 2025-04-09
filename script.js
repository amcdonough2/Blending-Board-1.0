
const tiles = [
    { text: "sh", class: "green", sound: "sh.mp3", zone: "beginning-sounds" },
    { text: "ch", class: "green", sound: "ch.mp3", zone: "beginning-sounds" },
    { text: "a", class: "yellow", sound: "a.mp3", zone: "vowels" },
    { text: "t", class: "red", sound: "t.mp3", zone: "ending-sounds" },
    { text: "ed", class: "purple", sound: "ed.mp3", zone: "suffixes" }
];

function createTile(tile) {
    const div = document.createElement("div");
    div.className = `tile ${tile.class}`;
    div.draggable = true;
    div.innerText = tile.text;
    div.dataset.sound = tile.sound;
    div.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", JSON.stringify(tile));
    });
    div.addEventListener("click", () => playSound(tile.sound));
    return div;
}

function loadTiles() {
    tiles.forEach(tile => {
        const zone = document.getElementById(tile.zone);
        zone.appendChild(createTile(tile));
    });
}

function allowDrop(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    const tile = createTile(data);
    e.target.innerHTML = "";
    e.target.appendChild(tile);
}

function playSound(file) {
    const audio = new Audio(`sounds/${file}`);
    audio.play();
}

function clearBoard() {
    document.querySelectorAll(".drop-zone").forEach(zone => zone.innerHTML = "[ ]");
}

document.addEventListener("DOMContentLoaded", () => {
    loadTiles();
    document.querySelectorAll(".drop-zone").forEach(zone => {
        zone.addEventListener("dragover", allowDrop);
        zone.addEventListener("drop", drop);
    });
});
