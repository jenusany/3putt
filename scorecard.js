let pars = '';

function readCSV(file) {
    if (window.FileReader) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const text = event.target.result;
            const lines = text.split('\n');
            lines.forEach(line => {
                const words = line.split(',');
                if (words.length > 0) {
                    if(words[0] === localStorage.getItem('course')){
                        words.forEach((num) => {
                            if(num.length === 1 && num !== ','){
                                pars += (num);
                            }
                        })
                    }
                }
            });
            localStorage.setItem('pars', pars);
        };
        reader.readAsText(file);
    } else {
        console.error('FileReader API is not supported in this browser.');
    }
}

// Function to fetch the CSV file
function fetchCSV(filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.blob();
        })
        .then(blob => {
            const file = new File([blob], 'data.csv', { type: 'text/csv' });
            readCSV(file);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Define the path to the CSV file
const filePath = 'data.csv';

// Fetch and read the CSV file
fetchCSV(filePath);

document.getElementById('course-header').innerText = localStorage.getItem('course');

let parString = localStorage.getItem('pars');



const parBox = document.getElementById('par');

const par = document.createElement('h1');
par.style.fontSize = '0.75em';
par.innerText = 'PAR';
parBox.append(par);


let totalPar = 0;

try {
    for(let i = 0; i < parString.length; i++){
        const innerHTML =`
        <div class="par-boxes">
                    ${parString[i]}
                </div>
        `
        totalPar += Number(parString[i]);
        parBox.insertAdjacentHTML('beforeend', innerHTML);
    }   
} catch (error) {
    location.reload();
}

document.getElementById('course-total').innerText = totalPar;


const header = document.getElementById('player-header');

// Retrieve and parse the player list from localStorage
const playerList = localStorage.getItem('playerList').split(',');


playerList.forEach((player, index) => {

    let totalSum = document.createElement('div');
    totalSum.className = 'sums';
    totalSum.innerText = (localStorage.getItem(`total-${index}`) || 0);
    document.getElementById('totals').append(totalSum);

    const playerDiv = document.createElement('div');
    playerDiv.className = 'col';
    playerDiv.id = `col-${index + 1}`;
    
    const name = document.createElement('h1');
    name.style.fontSize = '2em';
    name.innerText = player.toUpperCase();
    playerDiv.append(name);

    for (let i = 0; i <= parString.length; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'score';
        input.value = (localStorage.getItem(`score-${index + 1}-${i}`) || "");
        input.id = `score-${index + 1}-${i}`;
        playerDiv.appendChild(input);
        input.addEventListener('input', (num) => {
            localStorage.setItem(`score-${index + 1}-${i}`, num.data)
            updateTotal(totalSum,index);
        });
    }

    header.append(playerDiv);
});

function updateTotal(total, index){
    let sum = 0;
    for(let i = 0; i <= parString.length; i++){
        sum += Number(document.getElementById(`score-${index + 1}-${i}`).value);
    }
    total.innerText = sum;
    localStorage.setItem(`total-${index}`, sum);
}