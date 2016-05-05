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
    hl = hl.concat("<span style=\"background-color:" + light_blue + "; padding-left:", padding, "em\">", highlight, "</span><br>");
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
var selectionRef = "<object type=\"text/html\" data=\"template/reference/selection.html\"></object>";

var insertionRef = "<object type=\"text/html\" data=\"template/reference/insertion.html\"></object>";
var bubbleRef = "<object type=\"text/html\" data=\"template/reference/bubble.html\"></object>";
var quickRef = "<object type=\"text/html\" data=\"template/reference/quick.html\"></object>";
var mergeRef = "<object type=\"text/html\" data=\"template/reference/merge.html\"></object>";
var radixRef = "<object type=\"text/html\" data=\"template/reference/radix.html\"></object>";
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
        //empty the array, generate garbage, will be collected later
        results = [];
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
                // canvas.canvas.height = canvas_height*2;
                radixSort(data, canvas);
                break;
            case "quick":
                // canvas.canvas.height = canvas_height*2;
                quickSort(data, canvas);
                break;
            case "merge":
                // canvas.canvas.height = canvas_height*2;
                mergeSort(data, canvas);
                break;
        }
    }
};
//only reset delay in data, we do NOT want to touch any other data
var resetDelay = function(){
    var delay = document.getElementById("delay").value;
    if(delay<50 || delay>1000){
        document.getElementById("alert").innerHTML = "Delay must be in 50 ~ 1000";
    }else{
        data.delay = delay;
        console.log(data);
        document.getElementById("alert").innerHTML = "";
    }
}
//reset everything!
var reset = function(){
    //initialize the data
    var size = document.getElementById("array_size").value;
    var method = document.getElementById("method").value;
    var delay = document.getElementById("delay").value;
    if(size<5 || size>15){
        document.getElementById("alert").innerHTML = "Size must be in 5 ~ 15";
    }else if(delay<50 || delay>1000){
        document.getElementById("alert").innerHTML = "Delay must be in 50 ~ 1000";
    }else{
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
        canvas.canvas.height = canvas_height;//reset canvas size


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
    //     for(i=0; i<size; i++){
    //         min = i;
    //         for(j=i; j<size; j++){
    //             if(array[min] > array[j]){
    //                 min = j;
    //             }
    //         }
    //         swap(array, i, min);
    //     }
    // }
    ////helper funtioin to swap 2 element in an array
    // swap(array, i, j){
    //     tmp = array[i];
    //     array[i] = array[j];
    //     array[j] = tmp;
    // };
    selectionCode.push(codeGenerator("selectioinSort(array, size){", "selectioinSort(array, size){", 0));
    selectionCode.push(codeGenerator("for(i=0; i &lt; size; i++){", "for(i=0; i &lt; size; i++){", 1));
    selectionCode.push(codeGenerator("min = i;", "min = i;", 2));
    selectionCode.push(codeGenerator("for(j=i; j &lt; size; j++){", "for(j=i; j &lt; size; j++){", 2));
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
    selectionCode.push(codeGenerator("tmp = array[i];", "tmp = array[i];", 1));
    selectionCode.push(codeGenerator("array[i] = array[j];", "array[i] = array[j];", 1));
    selectionCode.push(codeGenerator("array[j] = tmp;", "array[j] = tmp;", 1));
    selectionCode.push(codeGenerator("}", "}", 0));

    //generate insertion sort code
    // insertionSort(array, size){
    //     for(i=1; i<size; i++){
    //         if(array[i] < array[i-1]){
    //             tmp = array[i];
    //             j = i;
    //             for(; j>0 && array[j-1]>tmp; j--){
    //                 array[j] = array[j-1];
    //                 array[j-1] = tmp;
    //             }
    //         }
    //     }
    // }
    insertionCode.push(codeGenerator("insertionSort(){", "insertionSort(){", 0));
    insertionCode.push(codeGenerator("for(i=1; i &lt; size; i++){", "for(i=1; i &lt; size; i++){", 1));
    insertionCode.push(codeGenerator("if(array[i] &lt; array[i-1]){", "if(array[i] &lt; array[i-1]){", 2));
    insertionCode.push(codeGenerator("tmp = array[i];", "tmp = array[i];", 3));
    insertionCode.push(codeGenerator("j = i;", "j = i;", 3));
    insertionCode.push(codeGenerator("for(; j &gt; 0 && array[j-1] &gt; tmp; j--){", "for(; j &gt; 0 && array[j-1] &gt; tmp; j--){", 3));
    insertionCode.push(codeGenerator("array[j] = array[j-1];", "array[j] = array[j-1];", 4));
    insertionCode.push(codeGenerator("array[j-1] = tmp;", "array[j-1] = tmp;", 4));
    insertionCode.push(codeGenerator("}", "}", 3));
    // insertionCode.push(codeGenerator("B[j] = tmp;", "B[j] = tmp;", 3));
    insertionCode.push(codeGenerator("}", "}", 2));
    insertionCode.push(codeGenerator("}", "}", 1));
    insertionCode.push(codeGenerator("}", "}", 0));
    insertionCode.push(codeGenerator("/*DONE*/", "/*DONE*/", 0));

    // bubbleSort(array, size){
    //     bool sorted = false;
    //     while(!sorted && size>1){
    //         sorted = true;
    //         for(var i=0; i<size-1; i++){
    //             if(array[i]>array[i+1]){
    //                 swap(array,i,i+1);
    //                 sorted = false;
    //             }
    //         }
    //         size--;
    //     }
    // };
    bubbleCode.push(codeGenerator("bubbleSort(array, size){","bubbleSort(array, size){",0));
    bubbleCode.push(codeGenerator("bool sorted = false;","bool sorted = false;",1));
    bubbleCode.push(codeGenerator("while(!sorted && size &gt; 1){","while(!sorted && size &gt; 1){",1));
    bubbleCode.push(codeGenerator("sorted = true;","sorted = true;",2));
    bubbleCode.push(codeGenerator("for(var i=0; i &lt; size-1; i++){","for(var i=0; i &lt; size-1; i++){",2));
    bubbleCode.push(codeGenerator("if(array[i] &gt; array[i+1]){","if(array[i] &gt; array[i+1]){",3));
    bubbleCode.push(codeGenerator("swap(array,i,i+1);","swap(array,i,i+1);",4));
    bubbleCode.push(codeGenerator("sorted = false;","sorted = false;",4));
    bubbleCode.push(codeGenerator("}","}",3));
    bubbleCode.push(codeGenerator("}","}",2));
    bubbleCode.push(codeGenerator("size--;","size--;",2));
    bubbleCode.push(codeGenerator("}","}",1));
    bubbleCode.push(codeGenerator("}","}",0));
    bubbleCode.push(codeGenerator("/*DONE*/", "/*DONE*/", 0));
    bubbleCode.push(codeGenerator("//helper funtioin to swap 2 element in an array", "//helper funtioin to swap 2 element in an array", 0));
    bubbleCode.push(codeGenerator("swap(array, i, j){", "swap(array, i, j){", 0));
    bubbleCode.push(codeGenerator("var tmp = array[i];", "var tmp = array[i];", 1));
    bubbleCode.push(codeGenerator("array[i] = array[j];", "array[i] = array[j];", 1));
    bubbleCode.push(codeGenerator("array[j] = tmp;", "array[j] = tmp;", 1));
    bubbleCode.push(codeGenerator("}", "}", 0));

    // mergeSort(array, size){
    //     merge(B, 0, size-1);
    // }
    // //herlper function of merge sort (recursion)
    // merge(array, left, right){
    //     if(left < right){
    //         mid = (left + right) / 2;
    //         //--- split down ---
    //         merge(array, left, mid);
    //         merge(array, mid+1, right);
    //         //--- merge up ---
    //         tmpA = new Array;
    //         for(ll = left, rl = mid+1; ll<=mid || rl<=right; ){
    //             if(ll <= mid && (rl > right || array[ll] <= array[rl])){
    //                 tmpA.push(array[ll]);
    //                 ll++;
    //             }else{
    //                 tmpA.push(array[rl]);
    //                 rl++;
    //             }
    //         }
    //         //--- copy back to array ---
    //         for(i = 0; i<= right-left; i++)
    //             array[left + i] = tmpA[i];
    //     }
    // }；
    mergeCode.push(codeGenerator("mergeSort(array, size){","mergeSort(array, size){",0));
    mergeCode.push(codeGenerator("merge(B, 0, size-1);","merge(B, 0, size-1);",1));
    mergeCode.push(codeGenerator("}","}",0));
    mergeCode.push(codeGenerator("//herlper function of merge sort (recursion)","//herlper function of merge sort (recursion)",0));
    mergeCode.push(codeGenerator("merge(array, left, right){","merge(array, left, right){",0));
    mergeCode.push(codeGenerator("if(left &lt; right){","if(left &lt; right){",1));
    mergeCode.push(codeGenerator("mid = (left + right) / 2;","mid = (left + right) / 2;",2));
    mergeCode.push(codeGenerator("//--- split down ---","//--- split down ---",2));
    mergeCode.push(codeGenerator("merge(array, left, mid);","merge(array, left, mid);",2));
    mergeCode.push(codeGenerator("merge(array, mid+1, right);","merge(array, mid+1, right);",2));
    mergeCode.push(codeGenerator("//--- merge up ---","//--- merge up ---",2));
    mergeCode.push(codeGenerator("tmpA = new Array;","tmpA = new Array;",2));
    mergeCode.push(codeGenerator("for(ll = left, rl = mid+1; ll &lt; =mid || rl &lt; =right; ){","for(ll = left, rl = mid+1; ll &lt; =mid || rl &lt; =right; ){",2));
    mergeCode.push(codeGenerator("if(ll  &lt; = mid && (rl  &gt;  right || array[ll]  &lt; = array[rl])){","if(ll  &lt; = mid && (rl  &gt;  right || array[ll]  &lt; = array[rl])){",3));
    mergeCode.push(codeGenerator("tmpA.push(array[ll]);","tmpA.push(array[ll]);",4));
    mergeCode.push(codeGenerator("ll++;","ll++;",4));
    mergeCode.push(codeGenerator("}else{","}else{",3));
    mergeCode.push(codeGenerator("tmpA.push(array[rl]);","tmpA.push(array[rl]);",4));
    mergeCode.push(codeGenerator("rl++;","rl++;",4));
    mergeCode.push(codeGenerator("}","}",3));
    mergeCode.push(codeGenerator("}","}",2));
    mergeCode.push(codeGenerator("//--- copy back to array ---","//--- copy back to array ---",2));
    mergeCode.push(codeGenerator("for(i = 0; i &lt; = right-left; i++)","for(i = 0; i &lt; = right-left; i++)",2));
    mergeCode.push(codeGenerator("array[left + i] = tmpA[i];","array[left + i] = tmpA[i];",3));
    mergeCode.push(codeGenerator("}","}",1));
    mergeCode.push(codeGenerator("}","}",0));
    mergeCode.push(codeGenerator("/*DONE*/", "/*DONE*/", 0));

}
