let arr = [];
turn = 'x';

for(let i = 0; i < 9; i++){
    arr[i] = '';
}

$("#reset").hide();

$(".cell").click(function(){
    if(arr[$(this).attr("id")] == ''){
        $(this).addClass("x");
        $(this).text("X");
        arr[$(this).attr("id")] = 'x';
        $(this).addClass("disabled");
        turn = 'o';
        if(check()){
            endGame();
            return;
        }
        $("#status").text("AI Turn");
        AI();
    }
})

function AI(){
    for(let i = 0; i < 9; i++){
        $(`#${i}`).addClass("disabled");
    }
    let random = Math.floor(Math.random() * 9);
    if(arr[random] == ''){
        setTimeout(function(){
            $(`#${random}`).addClass("o");
            $(`#${random}`).text("O");
            arr[random] = 'o';
            $(`#${random}`).addClass("disabled");
            if(check()){
                endGame();
                return;
            }
            turn = 'x';
            $("#status").text("Your Turn");
        }, 1000);

        setTimeout(function(){
            for(let i = 0; i < 9; i++){
                $(`#${i}`).removeClass("disabled");
            }
        }, 1000);
        
    }
    else{
        AI();
    }
}


function check(){
    for(let i = 0; i < 9; i += 3){
        if(arr[i] == 'x' && arr[i + 1] == 'x' && arr[i + 2] == 'x'){
            $("#status").text("You Win");
            for(let j = i; j < i + 3; j++){
                $(`#${j}`).addClass("cell-win");
            }
            return true;
        }
        if(arr[i] == 'o' && arr[i + 1] == 'o' && arr[i + 2] == 'o'){
            $("#status").text("You Lose");
            for(let j = i; j < i + 3; j++){
                $(`#${j}`).addClass("cell-win");
            }
            return true;
        }
    }
    for(let i = 0; i < 3; i++){
        if(arr[i] == 'x' && arr[i + 3] == 'x' && arr[i + 6] == 'x'){
            $("#status").text("You Win");
            for(let j = i; j < i + 9; j += 3){
                $(`#${j}`).addClass("cell-win");
            }
            return true;
        }
        if(arr[i] == 'o' && arr[i + 3] == 'o' && arr[i + 6] == 'o'){
            $("#status").text("You Lose");
            for(let j = i; j < i + 9; j += 3){
                $(`#${j}`).addClass("cell-win");
            }
            return true;
        }
    }
    if(arr[0] == 'x' && arr[4] == 'x' && arr[8] == 'x'){
        $("#status").text("You Win");
        for(let i = 0; i < 9; i += 4){
            $(`#${i}`).addClass("cell-win");
        }
        return true;
    }
    if(arr[0] == 'o' && arr[4] == 'o' && arr[8] == 'o'){
        $("#status").text("You Lose");
        for(let i = 0; i < 9; i += 4){
            $(`#${i}`).addClass("cell-win");
        }
        return true;
    }
    if(arr[2] == 'x' && arr[4] == 'x' && arr[6] == 'x'){
        $("#status").text("You Win");
        for(let i = 2; i < 7; i += 2){
            $(`#${i}`).addClass("cell-win");
        }
        return true;
    }
    if(arr[2] == 'o' && arr[4] == 'o' && arr[6] == 'o'){
        $("#status").text("You Lose");
        for(let i = 2; i < 7; i += 2){
            $(`#${i}`).addClass("cell-win");
        }
        return true;
    }

    for(let i = 0; i < 9; i++){
        if(arr[i] == ''){
            return false;
        }
    }
    $("#status").text("It's a Draw");
    return true;
}

function endGame(){
    $("#restart").text("Press the reset button to play again");
    $("#reset").show();
    for(let i = 0; i < 9; i++){
        $(`#${i}`).addClass("disabled");
    }
}

$("#reset").click(function(){
    for(let i = 0; i < 9; i++){
        arr[i] = '';
        $(`#${i}`).removeClass("x");
        $(`#${i}`).removeClass("o");
        $(`#${i}`).removeClass("disabled");
    }
    turn = 'x';
    $("#status").text("Press Any Cell To Start");
    $("#restart").text("");
    $("#reset").hide();
    for(let i = 0; i < 9; i++){
        $(`#${i}`).text("");
    }
    for(let i = 0; i < 9; i++){
        $(`#${i}`).removeClass("cell-win");
    }
})

