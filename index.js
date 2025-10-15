const selection = document.querySelectorAll('.selection-toggle');
displayData(getData('weekly'), 'weekly')

// loop through selections
for(let i = 0; i < selection.length; i++) {
    selection[i].addEventListener('click', () => {
        // get the id of the current class
        let selectionId = selection[i].getAttribute('id')
        // toggle selection
        currentSelection();
        selection[i].setAttribute('aria-selected', 'true');
        // get the data for the current id
        const data = getData(selectionId)
        displayData(data, selectionId)
    });
};

// toggle selection function
function currentSelection() {
    selection.forEach(element => {
        element.setAttribute('aria-selected', 'false');
    });
}

// retreive json data for selected type
async function getData(typeOfData){
    try {
        const response = await fetch('data.json');
        const outputData = new Map();
        if(!response.ok) {
            throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const data = await response.json();
        // sort the data and map it to a new array
       for(let i = 0; i < data.length; i++){
        let timeframe = data[i].timeframes
        for (let [key, value] of Object.entries(timeframe)) {
           if(key === typeOfData){
                outputData.set(data[i].title, (key, value));               
           }
        }
       }
        return outputData;
    } catch(e) {
        console.error(`Error Fetching JSON file:`, e)
    }
}

// display the data
async function displayData(data, selectionType) {
    const dataToDisplay = await data;
    const cards = document.querySelectorAll('.data-content');    
    const label = {
        daily: 'Yesterday',
        weekly: 'Last Week',
        monthly: 'Last Month'
    };
    cards.forEach(card => {
        const title = card.previousElementSibling.querySelector('.content-heading').textContent.trim().toLowerCase();;
        let timeData;
        // match the data title to the current card
        dataToDisplay.forEach((value, key) => {
            if(key.toLowerCase().trim() === title)
                timeData = value;
        });
        
        if (!timeData) return
        const currentTime = timeData.current > 1 ? 'hrs' : 'hr';
        const previousTime = timeData.previous > 1  ? 'hrs' : 'hr';
        const hours =  card.querySelector('.hours');
        const previous =  card.querySelector('.previous');
        hours.textContent = timeData.current + currentTime;
        previous.textContent = `${label[selectionType]}  - ${timeData.previous}${previousTime}`
    });
}