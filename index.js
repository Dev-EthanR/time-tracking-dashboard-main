const selection = document.querySelectorAll('.selection-toggle');


for(let i = 0; i < selection.length; i++) {
    selection[i].addEventListener('click', () => {
        let selectionId = selection[i].getAttribute('id')
        // console.log(getData(selectionId));
        getData(selectionId)
    });
};


async function getData(typeOfData){
    console.log("data: " + typeOfData)
    try {
        const response = await fetch('data.json');
        const outputData = new Map();
        if(!response.ok) {
            throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const data = await response.json();
       for(let i = 0; i < data.length; i++){
        let timeframe = data[i].timeframes
        for (const [key, value] of Object.entries(timeframe)) {
           if(key === typeOfData){
                outputData.set(`${data[i].title}`, (key, value));               
                // console.log(`${data[i].title} ${key} matches ${typeOfData}`)
           }
        }
       }
    //    console.log(outputData)
        return outputData;
    } catch(e) {
        console.error(`Error Fetching JSON file:`, e)
    }
}

console.log(getData(daily))