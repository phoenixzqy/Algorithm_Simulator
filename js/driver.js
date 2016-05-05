//include algorithm.js
var algorithm = document.createElement('script');
algorithm.src = 'js/sorting_algorithm.js';
document.head.appendChild(algorithm);
//include animation.js
var animation = document.createElement('script');
animation.src = 'js/animation.js';
document.head.appendChild(animation);

//generate a data object
//array: the initial array before sorting
//size: array size
//method: user selected sorting algorithm
//delay: user inputed delay time in ms
var dataGenerator = function(array, size, method, delay){
    return{
        array:array,
        size:size,
        method:method,
        delay:delay
    };
};
//code generator to store same line of code with 2 different effect
//normal: normal code
//highlight: code with highlights
//tabsNum: number of tabs in front of the line
var codeGenerator = function(normal, highlight, tabsNum){
    var padding = tabsNum * 2;
    var norm = "";
    var hl = "";

    norm = norm.concat("<span style=\"padding-left:", padding, "em\">", normal, "</span><br>");
    hl = hl.concat("<span style=\"background-color:#66ccff; padding-left:", padding, "em\">", highlight, "</span><br>")
    return{
        normal:norm,
        highlight:hl
    };
};
//----------------------------------global variables----------------------------------
var c;
var canvas;
//a global variable which contains the initial data
var data = dataGenerator(null,0,null, 300);
//global arrays of coresponding code contents
var selectionCode = [];
var insertionCode = [];
var bubbleCode = [];
var mergeCode = [];
var quickCode = [];
var radixCode = [];
//global variables of coresponding algorithm references
var selectionRef = "In computer science, selection sort is a sorting algorithm, specifically an in-place comparison sort. It has O(n2) time complexity, making it inefficient on large lists, and generally performs worse than the similar insertion sort. Selection sort is noted for its simplicity, and it has performance advantages over more complicated algorithms in certain situations, particularly where auxiliary memory is limited.<br>The algorithm divides the input list into two parts: the sublist of items already sorted, which is built up from left to right at the front (left) of the list, and the sublist of items remaining to be sorted that occupy the rest of the list. Initially, the sorted sublist is empty and the unsorted sublist is the entire input list. The algorithm proceeds by finding the smallest (or largest, depending on sorting order) element in the unsorted sublist, exchanging (swapping) it with the leftmost unsorted element (putting it in sorted order), and moving the sublist boundaries one element to the right.";

var insertionRef = "<h4>Best, worst, and average cases</h4>Animation of the insertion sort sorting a 30 element array.<br>The best case input is an array that is already sorted. In this case insertion sort has a linear running time (i.e., O(n)). During each iteration, the first remaining element of the input is only compared with the right-most element of the sorted subsection of the array.<br>The simplest worst case input is an array sorted in reverse order. The set of all worst case inputs consists of all arrays where each element is the smallest or second-smallest of the elements before it. In these cases every iteration of the inner loop will scan and shift the entire sorted subsection of the array before inserting the next element. This gives insertion sort a quadratic running time (i.e., O(n2)).<br>The average case is also quadratic, which makes insertion sort impractical for sorting large arrays. However, insertion sort is one of the fastest algorithms for sorting very small arrays, even faster than quicksort; indeed, good quicksort implementations use insertion sort for arrays smaller than a certain threshold, also when arising as subproblems; the exact threshold must be determined experimentally and depends on the machine, but is commonly around ten.<br>Example: The following table shows the steps for sorting the sequence {3, 7, 4, 9, 5, 2, 6, 1}. In each step, the key under consideration is underlined. The key that was moved (or left in place because it was biggest yet considered) in the previous step is shown in bold.";
var bubbleRef = "";
var quickRef = "";
var mergeRef = "";
var radixRef = "";

//----------------------------------global variables----------------------------------

//initializer for page loading
var init = function(){
    generateAllCodes();
    reset();
};
//sort with selected sorting method
var sort = function(){
    //run the sort only if the timer is off
    if(!playing && timer==0){
        playing = true;
        //canvas
        var c = document.getElementById("myCanvas");
        var canvas = c.getContext("2d");

        switch(data.method) {
            case "selection":
                selectionSort(data, canvas);
                break;
            case "insertion":
                insertionSort(data, canvas);
                break;
            case "bubble":
                bubbleSort(data, canvas);
                break;
            case "radix":
                radixSort(data, canvas);
                break;
            case "quick":
                quickSort(data, canvas);
                break;
            case "merge":
                mergeSort(data, canvas);
                break;
        }
    }
};
//only reset delay in data, we do NOT want to touch any other data
var resetDelay = function(){
    var delay = document.getElementById("delay").value;
    if(delay<100 || delay>1000){
        document.getElementById("alert").innerHTML = "Delay must be in 100 ~ 1000";
    }else{
        data.delay = delay;
        console.log(data);
        document.getElementById("alert").innerHTML = "";
    }
}
//reset everything!
var reset = function(){
    //interrupt setTimeout process
    if(timer){
        clearTimeout(timer);
        timer = 0;
    }
    playing = false;//reset playing
    iterator = 0;//reset iterator
    document.getElementById("alert").innerHTML = "";//reset alert to empty
    results = [];//empty the result array
    //canvas
    c = document.getElementById("myCanvas");
    canvas = c.getContext("2d");

    //initialize the data
    var size = document.getElementById("array_size").value;
    var method = document.getElementById("method").value;
    var delay = document.getElementById("delay").value;
    if(size<5 || size>20){
        document.getElementById("alert").innerHTML = "Size must be in 5 ~ 20";
    }else if(delay<100 || delay>1000){
        document.getElementById("alert").innerHTML = "Delay must be in 100 ~ 1000";
    }else{
        //reset the progress bar
        syncPrograssBar(0, size);
        //reset width_scale
        width_scale = adjastWidth(size);
        var A = new Array();
        for(var i=0; i<size; i++)
            A[i] = Math.floor((Math.random() * 100) + 1);
        data = dataGenerator(A, size, method, delay);
        //draw canvas
        initDraw(data, canvas);
    }
};
//initialize all code content into the coresponding arrays
//add   tag between the code you need to highlight
// means replace me.
var generateAllCodes = function(){
    //generate seleteion codes
    // selectioinSort(array, size){
    //     for(var i=0; i<size; i++){
    //         var min = i;
    //         for(var j=i; j<size; j++){
    //             if(array[min] > array[j]){
    //                 min = j;
    //             }
    //         }
    //         swap(array, i, min);
    //     }
    // }
    ////helper funtioin to swap 2 element in an array
    // swap(array, i, j){
    //     var tmp = array[i];
    //     array[i] = array[j];
    //     array[j] = tmp;
    // };
    selectionCode.push(codeGenerator("selectioinSort(array, size){", "selectioinSort(array, size){", 0));
    selectionCode.push(codeGenerator("for(var i=0; i &lt; size; i++){", "for(var i=0; i &lt; size; i++){", 1));
    selectionCode.push(codeGenerator("var min = i;", "var min = i;", 2));
    selectionCode.push(codeGenerator("for(var j=i; j &lt; size; j++){", "for(var j=i; j &lt; size; j++){", 2));
    selectionCode.push(codeGenerator("if(array[min] &gt; array[j]){", "if(array[min] &gt; array[j]){", 3));
    selectionCode.push(codeGenerator(" min = j;", " min = j;", 4));
    selectionCode.push(codeGenerator("}", "}", 3));
    selectionCode.push(codeGenerator("}", "}", 2));
    selectionCode.push(codeGenerator("swap(array, i, min);", "swap(array, i, min);", 2));
    selectionCode.push(codeGenerator("}", "}", 1));
    selectionCode.push(codeGenerator("}", "}", 0));
    selectionCode.push(codeGenerator("/*DONE*/<br>", "/*DONE*/<br>", 0));
    selectionCode.push(codeGenerator("//helper funtioin to swap 2 element in an array", "//helper funtioin to swap 2 element in an array", 0));
    selectionCode.push(codeGenerator("swap(array, i, j){", "swap(array, i, j){", 0));
    selectionCode.push(codeGenerator("var tmp = array[i];", "var tmp = array[i];", 1));
    selectionCode.push(codeGenerator("array[i] = array[j];", "array[i] = array[j];", 1));
    selectionCode.push(codeGenerator("array[j] = tmp;", "array[j] = tmp;", 1));
    selectionCode.push(codeGenerator("}", "}", 0));

    //generate insertion sort code
    // insertionSort(){
    //     for(var i=1; i<size; i++){
    //         if(B[i] < B[i-1]){
    //             var tmp = B[i];
    //             var j = i;
    //             for(; j>0 && B[j-1]>tmp; j--){
    //                 B[j] = B[j-1];
    //             }
    //             B[j] = tmp;
    //         }
    //     }
    // }
    insertionCode.push(codeGenerator("insertionSort(){", "insertionSort(){", 0));
    insertionCode.push(codeGenerator("for(var i=1; i &lt; size; i++){", "for(var i=1; i &lt; size; i++){", 1));
    insertionCode.push(codeGenerator("if(B[i] &lt; B[i-1]){", "if(B[i] &lt; B[i-1]){", 2));
    insertionCode.push(codeGenerator("var tmp = B[i];", "var tmp = B[i];", 3));
    insertionCode.push(codeGenerator("var j = i;", "var j = i;", 3));
    insertionCode.push(codeGenerator("for(; j &gt; 0 && B[j-1] &gt; tmp; j--){", "for(; j &gt; 0 && B[j-1] &gt; tmp; j--){", 3));
    insertionCode.push(codeGenerator("B[j] = B[j-1];", "B[j] = B[j-1];", 4));
    insertionCode.push(codeGenerator("}", "}", 3));
    insertionCode.push(codeGenerator("B[j] = tmp;", "B[j] = tmp;", 3));
    insertionCode.push(codeGenerator("}", "}", 2));
    insertionCode.push(codeGenerator("}", "}", 1));
    insertionCode.push(codeGenerator("}", "}", 0));
    insertionCode.push(codeGenerator("/*DONE*/", "/*DONE*/", 0));

}
