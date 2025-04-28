let randomize_array=document.getElementById("randomize_array");
let sort_btn=document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
let minRange =1;
let maxRange=60;
let numOfBars=60;
let heightFactor=6.4;
let unsorted_arr = new Array(numOfBars);

let audioCtx=null;
function playNote(freq){
    if(audioCtx==null){
        audioCtx = new(
            AudioContext ||
            webkitAudioContext ||
            window.webkitAudioContext
        )();
    }
    const dur =0.1;
    const osc = audioCtx.createOscillator(); //object to play the sound
    osc.frequency.value = freq;
    osc.start();
    osc.stop(audioCtx.currentTime +dur);
    const node = audioCtx.createGain(); //volume
    node.gain.value = 0.1;
    node.gain.linearRampToValueAtTime(0, audioCtx.currentTime+dur);
    osc.connect(node);
    node.connect(audioCtx.destination);
}

function randomNum(min,max){
    return Math.floor(Math.random() * (max-min+1))+min;
}

function createRandomArray(){
    for(let i=0; i<numOfBars;i++){
        unsorted_arr[i]= randomNum(minRange,maxRange);
    }
}

document.addEventListener("DOMContentLoaded",function(){
    createRandomArray();
    renderBars(unsorted_arr);
});

function renderBars(array){
    for(let i=0;i<array.length;i++){
        let bar =document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[i] * heightFactor + "px";
        bars_container.appendChild(bar);
    }
}

randomize_array.addEventListener("click",function(){
   createRandomArray();
    bars_container.innerHTML = "";
    renderBars(unsorted_arr);
});

function sleep(ms){
    return new Promise((resolve) => setTimeout(resolve,ms));
}

async function bubbleSort(array){
    let bars=document.getElementsByClassName("bar");
    for(let i=0;i<array.length;i++){
        for(let j=0;j<array.length-i-1;j++){
            if(array[j]>array[j+1]){
                for(let k=0;k<bars.length;k++){
                    if(k!==j && k!==j+1){
                        bars[k].style.backgroundColor="aqua";
                    }
                }
                let temp = array[j];
                array[j]=array[j+1];
                array[j+1]=temp;
                bars[j].style.height=array[j] * heightFactor +"px";
                bars[j].style.backgroundColor="green";
                //bars[j].innerText = array[j];
                bars[j+1].style.height =array[j+1] * heightFactor +"px";
                bars[j+1].style.backgroundColor="green";
                //bars[j+1].innerText = array[j+1];
                let f = 100+(array[j]/maxRange)*500;
                playNote(f);
                // playNote(array[j+1]*20);
                // playNote(200+arr[i]*500);
                // playNote(200+arr[i]*500);
                await sleep(65);
            }
        }
        await sleep(65);
    }

    return array;
}

sort_btn.addEventListener("click",function(){
    let sorted_arr=bubbleSort(unsorted_arr);
    console.log(sorted_arr);
});