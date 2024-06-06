const courses = document.getElementById('result-list');

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
                        localStorage.setItem('course', this.textContent);
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
