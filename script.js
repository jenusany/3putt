
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
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = '2';
            input.className = 'initial-input';
            input.placeholder = `Player ${i} initials`;
            input.required = 'required';
            document.getElementById('player-initials').append(input);
        }
        confirm()
    })
})

function confirm(){
    document.getElementById('confirm').innerHTML = '';
    const button = document.createElement('button');
    button.className = 'confirm-button';
    button.textContent = 'CONFIRM';
    button.id = 'confirm-button';
    document.getElementById('confirm').append(button);
    button.addEventListener('click', () => {
        let initials = document.querySelectorAll('.initial-input');
        let i = 1;
        let filled = true;
        initials.forEach((initial) => {
            if(initial.value.length === 2){
                localStorage.setItem(`player${i}`, initial.value);
            }else{
                alert("Player Initals Must Be Filled");
                filled = false;
            }
        })
        if(filled){
            window.location.href = 'scorecard.html';
        }
    })
    //document.getElementById('confirm').innerHTML = `<button id='confirm-button' class="confirm-button">CONFIRM</button>`;
}
