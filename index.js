let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
let select_algo = document.getElementById("algorithms");
let speed = document.getElementById("speed");

let minRange = 5;
let maxRange = 50;
let numOfBars = 40;
let heightFactor = 5;
let speedFactor = 100;

let array = new Array(numOfBars);

//e stands for event. The e.target property refers to the DOM element on which the event occurred, and e.target.value refers to the value of that element.
speed.addEventListener("change", (e) => {
    speedFactor = parseInt(e.target.value);
});

let algotouse = "";
select_algo.addEventListener("change", function () {
    algotouse = select_algo.value;
});

// Creating a random array with random values
function createRandomArray() {
    let array = new Array(numOfBars);
    for (let i = 0; i < numOfBars; i++) {
        array[i] = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    }
    return array;
}

document.addEventListener("DOMContentLoaded", function () {
    array = createRandomArray();
    renderBars(array);
});

function renderBars(array) {
    for (let i = 0; i < numOfBars; i++) {
        let bar = document.createElement("div"); // Create a new <div> element
        bar.classList.add("bar"); // Add the CSS class "bar" to the new <div>
        bar.style.height = array[i] * heightFactor + "px"; // Set the height of the bar based on array value
        bars_container.appendChild(bar); // Add the new bar to the bars_container
    }
}

// Randomizing Array on clicking the button
randomize_array.addEventListener("click", function () {
    array = createRandomArray();

    // This line clears the contents of the bars_container. This is done to remove any previously rendered bars before rendering the new ones.
    bars_container.innerHTML = "";

    renderBars(array);
});

// To pause the execution for a fixed amount of time.
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

//Async-To write promise based code
//Await-Makes the code wait until the promise returns a result




// Selection Sort
async function selectionSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i <= array.length - 2; i++) {
        let index_min = i;
        bars[i].style.backgroundColor = "red"; // Highlight the current minimum element in "red"

        for (let j = i + 1; j <= array.length - 1; j++) {
            bars[j].style.backgroundColor = "yellow";  // Highlight the compared element in "yellow"
            await sleep(speedFactor);

            if (array[j] < array[index_min]) {
                index_min = j;                           // Update the minimum index
            }
            bars[j].style.backgroundColor = "purple";     // Reset the color of the compared element to the default "purple"
        }

        // Swap the minimum value with the current element if needed
        if (index_min !== i) {

            // The bars which are going to be swapped are in red
            bars[index_min].style.backgroundColor = "red";
            bars[i].style.backgroundColor = "red";

            let temp = array[index_min];
            array[index_min] = array[i];
            array[i] = temp;

            // Update the heights of the swapped bars
            bars[index_min].style.height = array[index_min] * heightFactor + "px";
            bars[i].style.height = array[i] * heightFactor + "px";

            // After swapping the red coloured bars are back to purple
            await sleep(speedFactor);
            bars[index_min].style.backgroundColor = "purple";
            bars[i].style.backgroundColor = "purple";
        }

        // Set the color of the current element to "green" to indicate it's sorted
        bars[i].style.backgroundColor = "green";
    }

    // Set the color of the last bar to "green" to indicate it's sorted
    bars[array.length - 1].style.backgroundColor = "green";

    return array;
}




// Bubble Sort
async function bubbleSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {

            bars[j].style.backgroundColor = "yellow";                 // Highlighting bars being compared in yellow
            bars[j + 1].style.backgroundColor = "yellow";

            await sleep(speedFactor);
            if (array[j] > array[j + 1]) {

                // The bars which are going to be swapped are in red
                bars[j].style.backgroundColor = "red";
                bars[j + 1].style.backgroundColor = "red";

                // Swap elements if they are out of order
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                // Update the heights to visualize the swap
                bars[j].style.height = array[j] * heightFactor + "px";
                bars[j + 1].style.height = array[j + 1] * heightFactor + "px";

                // Introduce a delay to visualize the swap
                await sleep(speedFactor);

                // After swapping the red coloured bars are back to purple
                bars[j].style.backgroundColor = "purple";
                bars[j + 1].style.backgroundColor = "purple";
            }

            // Reset the color of bars after comparison
            bars[j].style.backgroundColor = "purple";
            bars[j + 1].style.backgroundColor = "purple";
        }
        // Set the color of the last element (sorted element) to green
        bars[array.length - i - 1].style.backgroundColor = "green";
    }
    // Set the color of the first element (already sorted) to green
    bars[0].style.backgroundColor = "green";

    return array;
}




// Insertion Sort
async function InsertionSort(array) {
    let bars = document.getElementsByClassName("bar");

    for (let i = 1; i < array.length; i++) {

        bars[i].style.backgroundColor = "red";             // Highlight the current key element in red
        await sleep(speedFactor);

        let key = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > key) {

            bars[j + 1].style.backgroundColor = "yellow";    // Mark the element being moved in yellow
            bars[j].style.backgroundColor = "yellow";        // Mark the key element being compared in yellow

            // Move elements greater than the key to the right
            array[j + 1] = array[j];
            array[j] = key;
            bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
            bars[j].style.height = array[j] * heightFactor + "px";

            await sleep(speedFactor);

            // Reset the color of other elements to purple 
            bars[j].style.backgroundColor = "purple";
            bars[j + 1].style.backgroundColor = "aqua"; // Change the color to aqua for sorted part

            j--;
        }

        // Place the key element in its correct position
        array[j + 1] = key;
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "aqua"; // Change the color to aqua to indicate that the element is sorted

        await sleep(speedFactor);
    }

    // Set the color of all bars to green to indicate sorting is done
    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "green";
    }

    return array;
}





// Quick Sort Visualization
async function visualizeQuickSort(arr) {
    const bars = document.getElementsByClassName("bar");
    await quickSort(arr, 0, arr.length - 1, bars);

    // Change the color of all bars to green after sorting is complete
    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "green";
        // await sleep(speedFactor); // Add a delay for visualization
    }
}

// Swap
async function swap(items, left, right, bars) {
    var temp = items[left];
    items[left] = items[right];
    items[right] = temp;

    // Swap heights and colors in aqua
    bars[left].style.height = items[left] * heightFactor + "px";
    bars[right].style.height = items[right] * heightFactor + "px";
    bars[left].style.backgroundColor = "aqua";
    bars[right].style.backgroundColor = "aqua";

    // Add a delay to visualize the swap
    await sleep(speedFactor);

    // Reset the color of swapped bars to their original state (purple)
    bars[leftIndex].style.backgroundColor = "purple";
    bars[rightIndex].style.backgroundColor = "purple";
}


// Partition function for Quick Sort
async function partition(items, left, right, bars) {
    let pivot = items[left]; // Choose the first element as the pivot
    let i = left + 1;
    let j = right;

    bars[left].style.backgroundColor = "red"; // Set pivot to red

    while (i <= j) {
        while (i <= j && items[i] <= pivot) {
            i++;
        }
        while (i <= j && items[j] > pivot) {
            j--;
        }
        if (i < j) {
            await swap(items, i, j, bars);
        }
    }

    // Swap the pivot with the element at index j
    await swap(items, left, j, bars);

    // Reset the color of all bars to their original state
    for (let k = left; k <= right; k++) {
        if (k !== j) {
            bars[k].style.backgroundColor = "purple";
        }
    }

    // Change the color of the pivot element to green when in correct place
    bars[j].style.backgroundColor = "green";

    return j;
}

// Quick Sort Algorithm
async function quickSort(items, left, right, bars) {
    if (left < right) {
        let pivotIndex = await partition(items, left, right, bars);

        await quickSort(items, left, pivotIndex - 1, bars);
        await quickSort(items, pivotIndex + 1, right, bars);
    }
    return items;
}







// Merge Sort Visualization
async function visualizeMergeSort(arr) {
    let bars = document.getElementsByClassName("bar");
    await mergeSort(arr, bars, 0, arr.length - 1);

    // After sorting is complete, change the color of all bars to green
    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "green";
        // await sleep(speedFactor); // Add a delay for visualization
    }
}

// Merge Sort Algorithm
async function mergeSort(arr, bars, low, high) {
    if (low < high) {
        const middle = Math.floor((low + high) / 2);
        await mergeSort(arr, bars, low, middle);
        await mergeSort(arr, bars, middle + 1, high);
        await merge(arr, bars, low, middle, high);
    }
}

async function merge(arr, bars, low, middle, high) {
    const leftSize = middle - low + 1;
    const rightSize = high - middle;

    const left = new Array(leftSize);
    const right = new Array(rightSize);

    // Copy data to temp arrays left[] and right[]
    for (let i = 0; i < leftSize; i++) {
        left[i] = arr[low + i];
    }
    for (let j = 0; j < rightSize; j++) {
        right[j] = arr[middle + 1 + j];
    }

    let i = 0,
        j = 0,
        k = low;

    while (i < leftSize && j < rightSize) {
        if (left[i] <= right[j]) {
            arr[k] = left[i];
            bars[k].style.height = arr[k] * heightFactor + "px";
            bars[k].style.backgroundColor = "aqua";
            await sleep(speedFactor);
            i++;
        } else {
            arr[k] = right[j];
            bars[k].style.height = arr[k] * heightFactor + "px";
            bars[k].style.backgroundColor = "aqua";
            await sleep(speedFactor);
            j++;
        }
        k++;
    }

    // Copy remaining elements of left[] if any
    while (i < leftSize) {
        arr[k] = left[i];
        bars[k].style.height = arr[k] * heightFactor + "px";
        bars[k].style.backgroundColor = "aqua";
        await sleep(speedFactor);
        i++;
        k++;
    }

    // Copy remaining elements of right[] if any
    while (j < rightSize) {
        arr[k] = right[j];
        bars[k].style.height = arr[k] * heightFactor + "px";
        bars[k].style.backgroundColor = "aqua";
        await sleep(speedFactor);
        j++;
        k++;
    }
}


// Main Program
sort_btn.addEventListener("click", function () {
    switch (algotouse) {

        case "bubble":
            bubbleSort(array);
            break;

        case "selection":
            selectionSort(array);
            break;

        case "insertion":
            InsertionSort(array);
            break;

        case "merge":
            visualizeMergeSort(array);
            break;

        case "quick":
            visualizeQuickSort(array)
            break;

        // default:
        //   bubbleSort(array);
        //   break;
    }
});