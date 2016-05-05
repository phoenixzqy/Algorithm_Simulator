//----------------------------------global variables----------------------------------
//a global timer for window.setTimeout
var timer = 0;
//a global iterator for animation, record which step it is animating
var iterator = 0;
//a global variable indicates that if the animation is playing or NOT
var playing = false;
//colors
var light_blue = '#66ccff';
var dark_blue = '#0066ff';
var black = 'black';
var green = '#4dff4d';
var orange = '#ff9900';
var red = '#cc0051';
var yellow = '#ffff33';
//canvas size
var canvas_width = 780;
var canvas_height = 250;
var width_scale = 25;//width_scale will be reset every time when user reset the array size
var height_scale = 1.2;
var gap = 10;
var array_pos_x = 50;
var array_pos_y = 140;
//----------------------------------global variables----------------------------------

//initialize the canvas with Data
//data: data of array, size, method, delay
var initDraw = function(data, canvas){

    //draw array in canvas
    drawArray(data, canvas, array_pos_x, array_pos_y);
    //draw progress bar
    syncPrograssBar(iterator,data.size);
    //print code
    switch(data.method) {
        case "selection":
            printCode(selectionCode, 0);
            printRef(selectionRef);
            break;
        case "insertion":
            printCode(insertionCode, 0);
            printRef(insertionRef);
            break;
        case "bubble":
            printCode(bubbleCode, 0);
            printRef(bubbleRef);
            break;
        case "radix":
            printCode(radixCode, 0);
            printRef(radixRef);
            break;
        case "quick":
            printCode(quickCode, 0);
            printRef(quickRef);
            break;
        case "merge":
            printCode(mergeCode, 0);
            printRef(mergeRef);
            break;
    }
};

//adjast the width_scale
var adjastWidth = function(size){
    return (canvas_width - 2*array_pos_x)/size - gap;
};

//animation process call
//data: original array data with array, size, method and delay
//output: output of sorting process steps with coresponding object
//i: number of loops, starts from 0
//canvas: canvas needs to be draw
var draw = function(){
    timer = setTimeout(function () {
        //draw one step of the processes
        drawOneStep();
        iterator ++;
        //recursively run draw function
        if(iterator < results.length)
            draw();
        else
            playing = false;
    }, data.delay);
};

//draw initial array before sorting
var drawArray = function(data, canvas, x, y){
    var A = data.array;
    //clear canvas
    canvas.clearRect(0, 0, canvas_width, canvas_height);
    //draw array with bars
    canvas.font = "15px Arial";
    for(var i=0; i<data.size; i++){
        canvas.fillStyle = red;
        canvas.fillRect(x + i*width_scale + i*gap, y - height_scale*A[i], width_scale, height_scale*A[i]);
        canvas.fillStyle = black;
        canvas.fillText(A[i],x + i*width_scale + width_scale/4 + i*gap, y+20);
    }
};
//print the code of the coresponding algorithm
//code: a array of obejcts contains codes
//highlight: the number of line which need to be highlighted
var printCode = function(code, highlight){
    var output = "";
    for(var i=0; i<code.length; i++){
        if(i==highlight)
            output = output.concat(code[i].highlight);
        else
            output = output.concat(code[i].normal);
    }
    document.getElementById("code").innerHTML = output;
};
//print the coresponding algorithm reference
var printRef = function(ref){
    document.getElementById("reference").innerHTML = ref;
};
//prograss bar chaging
var syncPrograssBar = function(value, max){
    document.getElementById("progress_bar").max = (max-1);
    document.getElementById("progress_bar").value = value
};


//pause the animation
var pause = function(){
    if(playing && iterator > 0  && timer > 0){
        playing = false;
        clearTimeout(timer);
    }
};
//next the animation by one step
var next = function(){
    if(!playing && iterator>=0 && iterator<results.length){
        iterator++;
        drawOneStep();
    }
};
//prev the animation by one step
var prev = function(){
    if(!playing && iterator>0 && results.length != 0){
        iterator--;
        drawOneStep();
    }
};
//play the animation
var play = function(){
    if(!playing && iterator< results.length){
        playing = true;
        draw();
    }
};
//helper function to draw single step of processing
var drawOneStep = function(){
    switch(data.method) {
        case "selection":
            selectionDraw(results[iterator], canvas, array_pos_x, array_pos_y);
            printCode(selectionCode, results[iterator].processing_line);
            break;
        case "insertion":
            insertionDraw(results[iterator], canvas, array_pos_x, array_pos_y);
            printCode(insertionCode, results[iterator].processing_line);
            break;
        case "bubble":
            bubbleDraw(results[iterator], canvas, array_pos_x, array_pos_y);
            printCode(bubbleCode, results[iterator].processing_line);
            break;
        case "radix":
            radixDraw(results[iterator], canvas, array_pos_x, array_pos_y);
            printCode(radixCode, results[iterator].processing_line);
            break;
        case "quick":
            quickDraw(results[iterator], canvas, array_pos_x, array_pos_y);
            printCode(quickCode, results[iterator].processing_line);
            break;
        case "merge":
            mergeDraw(results[iterator], canvas, array_pos_x, array_pos_y);
            printCode(mergeCode, results[iterator].processing_line);
            break;
    }
    //draw progress bar
    syncPrograssBar(iterator,results.length);
};








//slection sort process single step animation
//obj: one single step of sort result
//x: array starting x position in canvas
//y: array starting y position in canvas
//rules:
//  1. any bars before (including) i should be in linght_blue color
//  2. bar of min should be in green color
//  3. bar of j should be in dark_blue color
//  4. rest bars (un-sorted bars) should all in red color
//  5. all text color should be in black
//  6. ↑ and coresponding symbols (min, i, j) should appear at the bottom of the coresponding bar
//  7. symbols (min, i, j) can NOT overlap to each other, they should be in correct order: i -> j -> min
var selectionDraw = function(obj, canvas, x, y){
    var A = obj.array;
    //clear canvas
    canvas.clearRect(0, 0, canvas_width, canvas_height);
    //draw array with bars
    canvas.font = "15px Arial";
    for(var i=0; i<A.length; i++){
        //draw bars
        if(i<=obj.i)
            canvas.fillStyle = light_blue;
        else if(i == obj.min)
            canvas.fillStyle = green;
        else if(i == obj.j)
            canvas.fillStyle = dark_blue;
        else
            canvas.fillStyle = red;
        canvas.fillRect(x + i*width_scale + i*gap, y - height_scale*A[i], width_scale, height_scale*A[i]);

        //draw numbers
        canvas.fillStyle = black;
        canvas.fillText(A[i],x + i*width_scale + width_scale/3 + i*gap, y+20);
    }
    //draw symbols: ↑ and (min, i, j)
    var moveDownJ = 0;
    var moveDownMin = 0;
    if(obj.i == obj.j){
        moveDownJ += 15;
        if(obj.j == obj.min)
            moveDownMin += 30;
    }else if(obj.j == obj.min || obj.i == obj.min)
        moveDownMin += 15;
    canvas.fillStyle = black;
    canvas.fillText("i",x + obj.i*width_scale + obj.i*gap + width_scale/3, y+55);
    canvas.fillText("j",x + obj.j*width_scale + obj.j*gap + width_scale/3, y + 55 + moveDownJ);
    canvas.fillText("min",x + obj.min*width_scale + obj.min*gap - 5 + width_scale/3, y + 55 + moveDownMin);
    canvas.fillText("↑",x + obj.i*width_scale + obj.i*gap + width_scale/3, y + 35);
    canvas.fillText("↑",x + obj.j*width_scale + obj.j*gap + width_scale/3, y + 35);
    canvas.fillText("↑",x + obj.min*width_scale + obj.min*gap + width_scale/3, y + 35);
};


//insertion sort process single step animation
//obj: one single step of sort result
//x: array starting x position in canvas
//y: array starting y position in canvas
//rules:
//  1. any bars before (including) i should be in linght_blue color
//  2. there should be a special place at top-left to display current tmp value (only if tmp > 0)
//  3. bar of j should be in dark_blue color
//  4. bar of j-1 should be in green
//  5. rest bars (un-sorted bars) should all in red color
//  6. all text color should be in black
//  7. ↑ and coresponding symbols (i, j) should appear at the bottom of the coresponding bar
//  8. symbols (i, j) can NOT overlap to each other, they should be in correct order: i -> j
var insertionDraw = function(obj, canvas, x, y){
    var A = obj.array;
    //clear canvas
    canvas.clearRect(0, 0, canvas_width, canvas_height);
    //draw array with bars
    canvas.font = "15px Arial";
    for(var i=0; i<A.length; i++){
        //draw bars
        if(obj.i == -1 || (i<=obj.i && i!=obj.j))
            canvas.fillStyle = light_blue;
        else if(i == obj.j)
            canvas.fillStyle = dark_blue;
        else
            canvas.fillStyle = red;
        canvas.fillRect(x + i*width_scale + i*gap, y - height_scale*A[i], width_scale, height_scale*A[i]);

        //draw numbers
        canvas.fillStyle = black;
        canvas.fillText(A[i],x + i*width_scale + width_scale/3 + i*gap, y+20);
    }
    //draw symbols: ↑ and (i, j)
    var moveDownJ = 0;
    if(obj.i == obj.j){
        moveDownJ += 15;
    }
    canvas.fillStyle = black;
    if(obj.i != -1){
        canvas.fillText("i",x + obj.i*width_scale + obj.i*gap + width_scale/3, y+55);
        canvas.fillText("↑",x + obj.i*width_scale + obj.i*gap + width_scale/3, y + 35);
    }
    if(obj.j != -1){
        canvas.fillText("j",x + obj.j*width_scale + obj.j*gap + width_scale/3, y + 55 + moveDownJ);
        canvas.fillText("↑",x + obj.j*width_scale + obj.j*gap + width_scale/3, y + 35);
    }
    //draw tmp at top left corner
    if(obj.tmp != -1)
        canvas.fillText("tmp: " + obj.tmp, 50, 30);
    else
        canvas.fillText("tmp: null", 50, 30);
};

//bubble sort process single step animation
//obj: one single step of sort result
//x: array starting x position in canvas
//y: array starting y position in canvas
//rules:
//  1. any bars after (including) size should be in linght_blue color
//  2. bar of i and i+1 should be in green and dark_blue
//  3. rest bars (un-sorted bars) should all in red color
//  4. all text color should be in black
//  5. ↑ and coresponding symbols (i, i+1) should appear at the bottom of the coresponding bar
var bubbleDraw = function(obj, canvas, x, y){
    var A = obj.array;
    //clear canvas
    canvas.clearRect(0, 0, canvas_width, canvas_height);
    //draw array with bars
    canvas.font = "15px Arial";
    for(var i=0; i<A.length; i++){
        //draw bars
        if(i>=obj.size || obj == results[results.length-1])
            canvas.fillStyle = light_blue;
        else if(obj.i!=-1 && i == obj.i)
            canvas.fillStyle = green;
        else if(obj.i!=-1 && i==obj.i+1)
            canvas.fillStyle = dark_blue;
        else
            canvas.fillStyle = red;
        canvas.fillRect(x + i*width_scale + i*gap, y - height_scale*A[i], width_scale, height_scale*A[i]);

        //draw numbers
        canvas.fillStyle = black;
        canvas.fillText(A[i],x + i*width_scale + width_scale/3 + i*gap, y+20);
    }
    //draw symbols: ↑
    if(obj.i != -1){
        canvas.fillText("i",x + obj.i*width_scale + obj.i*gap + width_scale/3, y+55);
        canvas.fillText("↑",x + obj.i*width_scale + obj.i*gap + width_scale/3, y + 35);
        canvas.fillText("i+1",x + (obj.i+1)*width_scale + (obj.i+1)*gap + width_scale/3, y+55);
        canvas.fillText("↑",x + (obj.i+1)*width_scale + (obj.i+1)*gap + width_scale/3, y + 35);
    }
};

//merge sort process single step animation
//obj: one single step of sort result
//x: array starting x position in canvas
//y: array starting y position in canvas
//rules:
//  1. bar of ll and rl should be in green
//  2. bars of tmpA should be in light_blue
//  3. bars of final step should all in light_blue
//  4. 2 transparent rectangles between left and mid (right-left) and right
//  5. rest bars (un-sorted bars) should all in red color
//  6. all text color should be in black
//  7. ↑ and coresponding symbols (ll, rl) should appear at the bottom of the coresponding bar
//  8. There should be sub array tmpA under the major array, display all element from tmpA
var mergeDraw = function(obj, canvas, x, y){
    var A = obj.array;
    var left = obj.left;
    var right = obj.right;
    var B = obj.tmpA;
    //clear canvas
    canvas.clearRect(0, 0, canvas_width, canvas_height);
    //draw array with bars
    canvas.font = "15px Arial";
    for(var i=0; i<A.length; i++){
        //draw bars
        if(obj.processing_line == 26)
            canvas.fillStyle = light_blue;
        else if(obj.ll!=null && obj.ll<=Math.floor((left+right)/2) && i == obj.ll)
            canvas.fillStyle = green;
        else if(obj.rl!=null && obj.rl<=right && i==obj.rl)
            canvas.fillStyle = green;
        else
            canvas.fillStyle = red;
        canvas.fillRect(x + i*width_scale + i*gap, y - height_scale*A[i], width_scale, height_scale*A[i]);

        //draw numbers
        canvas.fillStyle = black;
        canvas.fillText(A[i],x + i*width_scale + width_scale/3 + i*gap, y+20);
    }
    //draw 2 rectangles
    if(obj.processing_line != 26){
        var mid = Math.floor((right + left)/2);
        canvas.strokeStyle = green;
        canvas.strokeRect(x + left*width_scale + left*gap - gap/2, 10 , (mid - left + 1)*(width_scale + gap), 200);
        canvas.strokeRect(x + (mid+1)*width_scale + (mid+1)*gap - gap/2, 10 , (right - mid)*(width_scale + gap), 200);
    }

    //draw symbols: ↑ and (ll, rl)
    canvas.fillStyle = black;
    if(obj.ll != null && obj.ll<=Math.floor((left+right)/2)){
        canvas.fillText("ll",x + obj.ll*width_scale + obj.ll*gap + width_scale/3, y+55);
        canvas.fillText("↑",x + obj.ll*width_scale + obj.ll*gap + width_scale/3, y + 35);
    }
    if(obj.rl != null && obj.rl<=right){
        canvas.fillText("rl",x + obj.rl*width_scale + obj.rl*gap + width_scale/3, y + 55);
        canvas.fillText("↑",x + obj.rl*width_scale + obj.rl*gap + width_scale/3, y + 35);
    }

    // //draw tmpA array
    // if(B != null){
    //     for(var i=0; i<B.length; i++){
    //         //draw bars
    //         canvas.fillStyle = light_blue;
    //         canvas.fillRect(x + i*width_scale + i*gap, y - height_scale*B[i] + 250, width_scale, height_scale*B[i]);
    //
    //         //draw numbers
    //         canvas.fillStyle = black;
    //         canvas.fillText(B[i],x + i*width_scale + width_scale/3 + i*gap, y+20+250);
    //     }
    // }
};

//quick sort process single step animation
//obj: one single step of sort result
//x: array starting x position in canvas
//y: array starting y position in canvas
var quickDraw = function(obj, canvas, x, y){
    //TODO:
};

//radix sort process single step animation
//obj: one single step of sort result
//x: array starting x position in canvas
//y: array starting y position in canvas
var radixDraw = function(obj, canvas, x, y){
    //TODO:
};
