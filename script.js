if (window.innerWidth > 600){
    document.getElementById('new-game').style.width = '50%';
}else{
    document.getElementById('new-game').style.width = '100%';
}

const courses = document.getElementById('result-list');

let course = '';
// Function to read the CSV file and print the first word of each line
function readCSV(file) {
    if (window.FileReader) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const text = event.target.result;
            const lines = text.split('\n');
            lines.forEach(line => {
                const words = line.split(',');
                if (words.length > 0) {
                    const li = document.createElement('li');
                    li.className = 'result-item';
                    li.textContent = words[0].trim();
                    courses.appendChild(li);

                    // Attach event listener to the new 'li' element
                    li.addEventListener('click', function() {
                        let items = document.querySelectorAll('.result-item');
                        items.forEach(function(item) {
                            item.style.display = 'none';
                        });
                        document.getElementById('search-input').value = this.textContent;
                        course = this.textContent;
                    });
                }
            });
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
        event.className = 'players-selected';

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
    button.textContent = 'PLAY';
    button.id = 'confirm-button';
    document.getElementById('confirm').append(button);
    button.addEventListener('click', () => {
        let initials = document.querySelectorAll('.initial-input');
        let i = 1;
        let filled = true;
        let list = [];
        initials.forEach((initial) => {
            if(!course){
                filled = false;
            }
            if(initial.value.length === 2){
                list.push(initial.value);
            }else{
                filled = false;
            }
        })
        if(filled){
            localStorage.clear();
            localStorage.setItem('playerList', list);
            localStorage.setItem('course', course);
            window.location.href = 'scorecard.html';
        }else{
            alert("Fill in all Fields!")
        }
    })
    //document.getElementById('confirm').innerHTML = `<button id='confirm-button' class="confirm-button">CONFIRM</button>`;
}
