//----------------------------------global variables----------------------------------
//an array to restore sorting progress results
var results = [];
//----------------------------------global variables----------------------------------

//object to store one step of selection sort progress
//array: current array state
//i: iterator i
//j: iterator j
//min: current min position
//processing_line: current runing processing line number of the code
var selectionDataGenerator = function(array, i, j, min, processing_line){
    var A = [];
    for(var n=0; n<array.length; n++)
        A.push(array[n]);//deep copy
    return{
        array:A,
        i:i,
        j:j,
        min:min,
        processing_line:processing_line
    };
};

//object to store one step of insertion sort progress
//array: current array state
//i: iterator i
//j: iterator j
//tmp: current min position
//processing_line: current runing processing line number of the code
var insertionDataGenerator = function(array, i, j, tmp, processing_line){
    var A = [];
    for(var n=0; n<array.length; n++)
        A.push(array[n]);//deep copy
    return{
        array:A,
        i:i,
        j:j,
        tmp:tmp,
        processing_line:processing_line
    };
};

//selection sort
//data: data with array, size, method, and delay
//canvas: canvas to draw
var selectionSort = function(data, canvas){
    var B = data.array;
    var size = data.size;
    results = [];//empty the array, generate garbage, will be collected later
    for(var i=0; i<size; i++){
        var min = i;
        results.push(selectionDataGenerator(B, i, i, min, 1));
        results.push(selectionDataGenerator(B, i, i, min, 2));
        for(var j=i; j<size; j++){
            results.push(selectionDataGenerator(B, i, j, min, 3));
            results.push(selectionDataGenerator(B, i, j, min, 4));
            if(B[min] > B[j]){
                min = j;
                results.push(selectionDataGenerator(B, i, j, min, 5));
            }
        }
        swap(B, i, min);
        results.push(selectionDataGenerator(B, i, i, min, 8));
    }
    results.push(selectionDataGenerator(B, size-1, size-1, size-1, 11));

    draw();//drow canvas step by step
};


//insertion sort
//data: data with array, size, method, and delay
//canvas: canvas to draw
var insertionSort = function(data, canvas){
    var B = data.array;
    var size = data.size;
    results = [];//An array which stores the process steps
    for(var i=1; i<size; i++){
        results.push(insertionDataGenerator(B, i, i, -1, 1));
        if(B[i] < B[i-1]){
            results.push(insertionDataGenerator(B, i, -1,  2));
            var tmp = B[i];
            results.push(insertionDataGenerator(B, i, j, tmp, 3));
            var j = i;
            results.push(insertionDataGenerator(B, i, j, tmp, 4));
            for(; j>0 && B[j-1]>tmp; j--){
                results.push(insertionDataGenerator(B, i, j, tmp, 5));
                B[j] = B[j-1];
                results.push(insertionDataGenerator(B, i, j, tmp, 6));
            }
            B[j] = tmp;
            results.push(insertionDataGenerator(B, i, j, tmp, 8));
        }
    }
    results.push(insertionDataGenerator(B, i, j, tmp, 12));

    draw();//drow canvas step by step
};

//bubble sort
//data: data with array, size, method, and delay
//canvas: canvas to draw
var bubbleSort = function(data, canvas){
    //TODO:
};

//quick sort
//data: data with array, size, method, and delay
//canvas: canvas to draw
var quickSort = function(data, canvas){
    //TODO:
};

//radix sort
//data: data with array, size, method, and delay
//canvas: canvas to draw
var radixSort = function(data, canvas){
    //TODO:
};

//merge sort
//data: data with array, size, method, and delay
//canvas: canvas to draw
var mergeSort = function(data, canvas){
    //TODO:
};

//swap i and j in Array A
//A: target array
//i: index i
//j: index j
var swap = function(A, i, j){
    var tmp = A[i];
    A[i] = A[j];
    A[j] = tmp;
};
