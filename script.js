// script.js

let array = [];

// Function to generate a new array
function resetArray() {
    array = [...Array(30).keys()].map(() => Math.floor(Math.random() * 100));
    displayArray();
}

// Display the array in the array container
function displayArray() {
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.style.height = `${value * 3}px`;
        container.appendChild(bar);
    });
}

// Bubble Sort
function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
    return arr;
}

// Selection Sort
function selectionSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        if (min != i) {
            let tmp = arr[i];
            arr[i] = arr[min];
            arr[min] = tmp;
        }
    }
    return arr;
}

// Quick Sort
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let pivot = arr[arr.length - 1];
    let left = [];
    let right = [];
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
}

// Functions to start sorting
function startBubbleSort() {
    array = bubbleSort([...array]);
    displayArray();
}

function startSelectionSort() {
    array = selectionSort([...array]);
    displayArray();
}

function startQuickSort() {
    array = quickSort([...array]);
    displayArray();
}

// Initialize array on load
window.onload = resetArray;