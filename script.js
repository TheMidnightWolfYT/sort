// Helper function to create a delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize an array
let array = [];

// Function to generate a new array
function resetArray() {
    array = [...Array(30).keys()].map(() => Math.floor(Math.random() * 100));
    displayArray(array);
}

// Display the array in the array container
function displayArray(arr) {
    requestAnimationFrame(() => {
        const container = document.getElementById('array-container');
        container.innerHTML = '';
        arr.forEach(value => {
            const bar = document.createElement('div');
            bar.style.height = `${value * 3}px`;
            bar.style.width = '20px';
            bar.style.margin = '0 2px';
            bar.style.backgroundColor = 'dodgerblue';
            container.appendChild(bar);
        });
    });
}

// Asynchronous Bubble Sort with animation
async function bubbleSort(arr, delay = 100) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                displayArray(arr);
                await sleep(delay);
            }
        }
    }
}

// Asynchronous Selection Sort with animation
async function selectionSort(arr, delay = 100) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        if (min !== i) {
            let tmp = arr[i];
            arr[i] = arr[min];
            arr[min] = tmp;
            displayArray(arr);
            await sleep(delay);
        }
    }
}

// Asynchronous Insertion Sort with animation
async function insertionSort(arr, delay = 100) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
            displayArray(arr);
            await sleep(delay);
        }
        arr[j + 1] = key;
        displayArray(arr);
        await sleep(delay);
    }
}

// Asynchronous Quick Sort with animation
async function quickSort(arr, delay = 100, start = 0, end = arr.length - 1) {
    if (start < end) {
        let index = await partition(arr, start, end, delay);
        await Promise.all([
            quickSort(arr, delay, start, index - 1),
            quickSort(arr, delay, index + 1, end)
        ]);
    }
}

async function partition(arr, start, end, delay) {
    let pivotValue = arr[end];
    let pivotIndex = start; 
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            pivotIndex++;
            displayArray(arr);
            await sleep(delay);
        }
    }
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
    displayArray(arr);
    await sleep(delay);
    return pivotIndex;
}
// Asynchronous Merge Sort with animation
async function mergeSort(arr, delay = 100, start = 0, end = arr.length - 1) {
    if (start < end) {
        const middle = Math.floor((start + end) / 2);
        await mergeSort(arr, delay, start, middle);
        await mergeSort(arr, delay, middle + 1, end);
        await merge(arr, start, middle, end, delay);
    }
}

async function merge(arr, start, middle, end, delay) {
    let n1 = middle - start + 1;
    let n2 = end - middle;

    let left = new Array(n1);
    let right = new Array(n2);

    for (let i = 0; i < n1; i++) {
        left[i] = arr[start + i];
    }
    for (let j = 0; j < n2; j++) {
        right[j] = arr[middle + 1 + j];
    }

    let i = 0, j = 0, k = start;
    while (i < n1 && j < n2) {
        if (left[i] <= right[j]) {
            arr[k] = left[i];
            i++;
        } else {
            arr[k] = right[j];
            j++;
        }
        k++;
        displayArray(arr);
        await sleep(delay);
    }

    while (i < n1) {
        arr[k] = left[i];
        i++;
        k++;
        displayArray(arr);
        await sleep(delay);
    }

    while (j < n2) {
        arr[k] = right[j];
        j++;
        k++;
        displayArray(arr);
        await sleep(delay);
    }
}

// Heapify function used in Heap Sort
async function heapify(arr, n, i, delay) {
    let largest = i; // Initialize largest as root
    let l = 2 * i + 1; // left = 2*i + 1
    let r = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    if (l < n && arr[l] > arr[largest]) {
        largest = l;
    }

    // If right child is larger than largest so far
    if (r < n && arr[r] > arr[largest]) {
        largest = r;
    }

    // If largest is not root
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        displayArray(arr);
        await sleep(delay);

        // Recursively heapify the affected sub-tree
        await heapify(arr, n, largest, delay);
    }
}

// Heap Sort function
async function heapSort(arr, delay = 100) {
    let n = arr.length;

    // Build a maxheap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arr, n, i, delay);
    }

    // One by one extract elements
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        [arr[0], arr[i]] = [arr[i], arr[0]];
        displayArray(arr);
        await sleep(delay);

        // Call max heapify on the reduced heap
        await heapify(arr, i, 0, delay);
    }
}

// Asynchronous Cocktail Shaker Sort with animation
async function cocktailShakerSort(arr, delay = 100) {
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < arr.length - 2; i++) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                displayArray(arr);
                await sleep(delay);
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
        swapped = false;
        for (let i = arr.length - 2; i >= 0; i--) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                displayArray(arr);
                await sleep(delay);
                swapped = true;
            }
        }
    } while (swapped);
}

// Function to check if a number is a power of 2
function isPowerOfTwo(n) {
    return n && (n & (n - 1)) === 0;
}

// Function to round up to the next power of 2
function nextPowerOfTwo(number) {
    let power = 1;
    while (power < number) power *= 2;
    return power;
}

// Main Bitonic Sort function
async function bitonicSort(arr, low, count, dir, delay) {
    if (count > 1) {
        let k = count / 2;
        await bitonicSort(arr, low, k, 1, delay); // Sort in ascending order
        await bitonicSort(arr, low + k, k, 0, delay); // Sort in descending order
        await bitonicMerge(arr, low, count, dir, delay); // Merge whole array in ascending order
    }
}

// Bitonic Merge function
async function bitonicMerge(arr, low, count, dir, delay) {
    if (count > 1) {
        let k = count / 2;
        for (let i = low; i < low + k; i++) {
            await compareAndSwap(arr, i, i + k, dir);
            displayArray(arr);
            await sleep(delay);
        }
        await bitonicMerge(arr, low, k, dir, delay);
        await bitonicMerge(arr, low + k, k, dir, delay);
    }
}

// Compare and Swap function used by Bitonic Merge
async function compareAndSwap(arr, i, j, dir) {
    if ((dir === 1 && arr[i] > arr[j]) || (dir === 0 && arr[i] < arr[j])) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// Start Bitonic Sort function
async function startBitonicSort() {
    disableButtons();
    let maxInt = Number.MAX_SAFE_INTEGER;
    let originalLength = array.length;
    
    // Check if the array length is a power of 2, if not, pad with maxInt
    if (!isPowerOfTwo(array.length)) {
        let paddedLength = nextPowerOfTwo(array.length);
        array = [...array, ...Array(paddedLength - array.length).fill(maxInt)];
    }
    
    await bitonicSort(array, 0, array.length, 1, 100);
    
    // If we padded the array, restore it to its original length
    if (array.length > originalLength) {
        array = array.slice(0, originalLength);
    }
    
    displayArray(array); // Display the sorted array without the padding
    enableButtons();
}

// Button control functions
function disableButtons() {
    document.querySelectorAll('button').forEach(button => button.disabled = true);
}

function enableButtons() {
    document.querySelectorAll('button').forEach(button => button.disabled = false);
}

// Functions to start sorting
async function startBubbleSort() {
    disableButtons();
    await bubbleSort(array);
    enableButtons();
}

async function startSelectionSort() {
    disableButtons();
    await selectionSort(array);
    enableButtons();
}

async function startInsertionSort() {
    disableButtons();
    await insertionSort(array);
    enableButtons();
}

async function startQuickSort() {
    disableButtons();
    await quickSort(array);
    enableButtons();
}

async function startMergeSort() {
    disableButtons();
    await mergeSort(array);
    enableButtons();
}

// Function to start Heap Sort
async function startHeapSort() {
    disableButtons();
    await heapSort(array);
    enableButtons();
}

// Function to start Cocktail Shaker Sort
async function startCocktailShakerSort() {
    disableButtons();
    await cocktailShakerSort(array);
    enableButtons();
}

async function startBitonicSort() {
    disableButtons();
    // Direction 1 means ascending order
    await bitonicSort(array, 0, array.length, 1, 100);
    enableButtons();
}

// Initialize array on load
window.onload = resetArray;