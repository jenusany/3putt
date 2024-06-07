
document.getElementById('search-input').addEventListener('input', function() {
    let filter = this.value.toLowerCase();
    let items = document.querySelectorAll('.result-item');

    items.forEach(function(item) {
        if (item.textContent.toLowerCase().includes(filter)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});

let players = document.querySelectorAll('.players');

players.forEach((event) => {
    event.addEventListener('click', () => {
        players.forEach((event) => {
            event.classList = 'players';
        });
        event.classList += ' players-selected';
        localStorage.setItem("players", Number(event.innerText));

        document.getElementById('player-initials').innerHTML = ``;

        for(let i = 1; i <= Number(event.innerText); i++){
            document.getElementById('player-initials').insertAdjacentHTML('beforeend', `<input type="text" maxlength="2" class="middle" placeholder="Player ${i} initials" required>`)
        }
        confirm()
    })
})

function confirm(){
    document.getElementById('confirm').innerHTML = `<button class="confirm-button">CONFIRM</button>`;
}