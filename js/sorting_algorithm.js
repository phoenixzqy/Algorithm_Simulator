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

//object to store one step of bubble sort progress
//array: current array state
//i: iterator i
//size: current sorting size (array_size minus sorted part)
//processing_line: current runing processing line number of the code
var bubbleDataGenerator = function(array, i, size, processing_line){
    var A = [];
    for(var n=0; n<array.length; n++)
        A.push(array[n]);//deep copy
    return{
        array:A,
        i:i,
        size:size,
        processing_line:processing_line
    };
};

//object to store one step of merge sort progress
//array: current array state
//left: left bound of the sub array
//right: right bound of the sub array
//tmpA: temp array used to temparaly store sorted sub array
//ll: iterator of left sub array
//rl: iterator of right sub array
//processing_line: current runing processing line number of the code
var mergeDataGenerator = function(array, left, right, tmpA, ll, rl, processing_line){
    var A = [];
    for(var n=0; n<array.length; n++)
        A.push(array[n]);//deep copy

    var B;
    if(tmpA!=null){
        B = [];
        for(var n=0; n<tmpA.length; n++)
            B.push(tmpA[n]);//deep copy
    }else{
        B = null;
    }
    return{
        array:A,
        left:left,
        right:right,
        tmpA:B,
        ll:ll,
        rl:rl,
        processing_line:processing_line
    };
};



//selection sort
//data: data with array, size, method, and delay
//canvas: canvas to draw
var selectionSort = function(data, canvas){
    var B = data.array;
    var size = data.size;
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
    //DONE
    results.push(selectionDataGenerator(B, size-1, size-1, size-1, 11));

    draw();//drow canvas step by step
};


//insertion sort
//data: data with array, size, method, and delay
//canvas: canvas to draw
var insertionSort = function(data, canvas){
    var B = data.array;
    var size = data.size;
    for(var i=1; i<size; i++){
        results.push(insertionDataGenerator(B, i, -1, -1, 1));
        if(B[i] < B[i-1]){
            results.push(insertionDataGenerator(B, i, -1, -1, 2));
            var tmp = B[i];
            results.push(insertionDataGenerator(B, i, -1, tmp, 3));
            var j = i;
            results.push(insertionDataGenerator(B, i, j, tmp, 4));
            for(; j>0 && B[j-1]>tmp; j--){
                results.push(insertionDataGenerator(B, i, j, tmp, 5));
                B[j] = B[j-1];
                results.push(insertionDataGenerator(B, i, j, tmp, 6));
                B[j-1] = tmp;
                results.push(insertionDataGenerator(B, i, j-1, tmp, 7));
            }
        }
    }
    //DONE
    results.push(insertionDataGenerator(B, -1, -1, -1, 12));

    draw();//drow canvas step by step
};

//bubble sort
//data: data with array, size, method, and delay
//canvas: canvas to draw
var bubbleSort = function(data, canvas){
    var B = data.array;
    var size = data.size;
    var sorted = false;
    results.push(bubbleDataGenerator(B, -1, size, 1));
    while(!sorted && size>1){
        results.push(bubbleDataGenerator(B, -1, size, 2));
        sorted = true;
        results.push(bubbleDataGenerator(B, -1, size, 3));
        for(var i=0; i<size-1; i++){
            results.push(bubbleDataGenerator(B, i, size, 4));
            results.push(bubbleDataGenerator(B, i, size, 5));
            if(B[i]>B[i+1]){
                swap(B,i,i+1);
                results.push(bubbleDataGenerator(B, i, size, 6));
                sorted = false;
                results.push(bubbleDataGenerator(B, i, size, 7));
            }
        }
        size--;
        results.push(bubbleDataGenerator(B, -1, size, 10));
    }
    //DONE
    results.push(bubbleDataGenerator(B, -1, size, 13));

    draw();//drow canvas step by step
};

//merge sort
//data: data with array, size, method, and delay
//canvas: canvas to draw
var mergeSort = function(data, canvas){
    var B = data.array;
    var size = data.size;
    results.push(mergeDataGenerator(B, 0, size-1, null, null, null, 1));
    merge(B, 0, size-1);
    //DONE
    results.push(mergeDataGenerator(B, 0, size-1, null, null, null, 26));

    draw();//drow canvas step by step
};
//herlper function of merge sort (recursion)
var merge = function(array, left, right){
    results.push(mergeDataGenerator(array, left, right, null, null, null, 5));
    if(left < right){
        results.push(mergeDataGenerator(array, left, right, null, null, null, 6));
        var mid = Math.floor((left + right) / 2);
        //--- split down ---
        results.push(mergeDataGenerator(array, left, mid, null, null, null, 8));
        merge(array, left, mid);
        results.push(mergeDataGenerator(array, mid+1, right, null, null, null, 9));
        merge(array, mid+1, right);

        //--- merge up ---
        results.push(mergeDataGenerator(array, left, right, null, null, null, 11));
        var tmpA = new Array;
        for(ll = left, rl = mid+1; ll<=mid || rl<=right;){
            results.push(mergeDataGenerator(array, left, right, tmpA, ll, rl, 12));
            results.push(mergeDataGenerator(array, left, right, tmpA, ll, rl, 13));
            if(ll <= mid && (rl > right || array[ll] <= array[rl])){
                results.push(mergeDataGenerator(array, left, right, tmpA, ll, rl, 14));
                tmpA.push(array[ll]);
                results.push(mergeDataGenerator(array, left, right, tmpA, ll, rl, 15));
                ll++;
            }else{
                results.push(mergeDataGenerator(array, left, right, tmpA, ll, rl, 17));
                tmpA.push(array[rl]);
                results.push(mergeDataGenerator(array, left, right, tmpA, ll, rl, 18));
                rl++;
            }
        }

        //--- copy back to array ---
        results.push(mergeDataGenerator(array, left, right, tmpA, null, null, 22));
        for(i = 0; i<= right-left; i++){
            array[left + i] = tmpA[i];
        }
    }
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

//swap i and j in Array A
//A: target array
//i: index i
//j: index j
var swap = function(A, i, j){
    var tmp = A[i];
    A[i] = A[j];
    A[j] = tmp;
};
