const header = document.getElementById('player-header');

// Retrieve and parse the player list from localStorage
const playerList = localStorage.getItem('playerList').split(',');


playerList.forEach((player, index) => {

    let totalSum = document.createElement('div');
    totalSum.className = 'sums';
    totalSum.innerText = 0;
    document.getElementById('totals').append(totalSum);

    const playerDiv = document.createElement('div');
    playerDiv.className = 'col';
    playerDiv.id = `col-${index + 1}`;
    playerDiv.innerText = player.toUpperCase();

    for (let i = 1; i <= 18; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'score';
        //input.value = 1;
        input.id = `score-${index + 1}-${i}`;
        playerDiv.appendChild(input);
        input.addEventListener('input', (num) => {
            //totalSum.innerText = Number(totalSum.innerText) + Number(num.data);
            updateTotal(totalSum,index);
        });
    }

    header.append(playerDiv);
});

function updateTotal(total, index){
    let sum = 0;
    for(let i = 1; i <= 18; i++){
        sum += Number(document.getElementById(`score-${index + 1}-${i}`).value);
    }
    total.innerText = '';
    total.innerText = sum;
}