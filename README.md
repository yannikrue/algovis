# Sorting and Search Algorithms Visualization
This website aims to help users understand and visualize various sorting and search algorithms through interactive demonstrations.

## Sorting Algorithms

The website allows users to visualize the progress and steps of popular sorting algorithms as they sort an array of user-specified size. The array is represented by a series of bars, with the height of each bar corresponding to the value of the element in the array. As the sorting algorithm runs, the bars are rearranged to reflect the sorted order of the elements. The user can also change the speed of the sorting by sliding a bar for the size of the array. The implemented sorting algorithms include:

Bubble sort: This algorithm repeatedly iterates through the array, compares adjacent elements, and swaps them if they are in the wrong order. It repeats this process until the array is sorted.

Insertion sort: This algorithm divides the array into a sorted and an unsorted section. It then takes the first element of the unsorted section and inserts it into the correct position in the sorted section. It repeats this process until the entire array is sorted.

Merge sort: This algorithm divides the array in half, sorts each half, and then merges the two sorted halves back together. It uses a recursive approach to divide and conquer the array until it is fully sorted.

Quick sort: This algorithm uses a pivot element to divide the array into two subarrays. It then recursively sorts the subarrays until the entire array is sorted.

Selection sort: This algorithm repeatedly finds the minimum element in the unsorted portion of the array and places it at the end of the sorted portion. It repeats this process until the entire array is sorted.

## Searching Algorithms

The website also includes a search algorithm that helps users visualize the process of finding a specific point in a maze. The user can sketch their own maze on a canvas or use one of the default mazes. The algorithm searches for the way to the target point, which is represented by a distinct color or symbol in the maze. There are two algorithms available:

Breath first search: This algorithm spreads out in all directions simultaneously until it finds the target point, and then backtracks to the start point and finds the shortest path for sure. It uses a queue to keep track of the unexplored paths, following the principle of first in, first out.

Depth first search: This algorithm searches one way until it ends in a dead end, and then goes back and takes the next available path. It does not necessarily find the shortest path, but rather any available path. It uses a stack to keep track of the unexplored paths, following the principle of first in, last out.
