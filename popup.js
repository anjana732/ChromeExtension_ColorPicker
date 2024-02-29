const btn = document.querySelector('.selectColorBtn')
const colorGrid = document.querySelector('.colorGrid')
const colorValue = document.querySelector('.colorValue')

btn.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: pickColor,
    },
    async(injectionResults) =>{
        const [data] = injectionResults;
        if(data.result){
            const color = data.result.sRGBHex;
            colorGrid.style.backgroundColor = color;
        }
        console.log(injectionResults);
    }
    );
});

async function pickColor() {
    console.log("Script working");
    try{
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open();
       // console.log(selectedColor);
    }catch(e){
        console.log(e);
    }
}
