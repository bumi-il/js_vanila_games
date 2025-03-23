let mines = []
let safeZone = []
let board = []
let middleZone = []
let flags = 10
let seconds = 0
let play = false

// prevent right click menu
$(document).contextmenu(function(e){
    e.preventDefault()
})

// creating cells:  0-0, ..., 7-9
for(let i = 0; i < 8; i++){
    for(let j = 0; j < 10; j++){

        $(".board").append(`<div type="button" class="cell" id="${i}-${j}"></div>`)

        // board background pattern
        if((i + j) % 2 == 0){
            $(`#${i}-${j}`).addClass("back1")
        }
        else{
            $(`#${i}-${j}`).addClass("back2")
        }
    }
}

// left and right click events
$(".cell").mousedown(function(e){

    // left click
    if(e.which == 1){
        // first click
        if(!mines.length){
            startGame($(this))
        }
        // after first click
        else{
            checkCell(this)
        }
    }
    // right click
    else if(e.which == 3){
        toggleFlag(this)
    }
})

// restart icon
$(".restart").click(function(){
    setTimeout(() => {
        $(".status").text("Press any cell to start").fadeIn(500)
    }, 500)
    resetAll()
})

function startGame(element){

    resetAll()

    play = true
    let idI = Number($(element).attr("id").split("-")[0]);
    let idJ = Number($(element).attr("id").split("-")[1]);
    
    openCells(idI, idJ)

    placeMines()

    mapBoard()

    expendZone(idI, idJ)

    numOfMinesAround()

    timer()
}

function resetAll(){
    seconds = 0
    play = false
    mines = []
    safeZone = []
    board = []
    middleZone = []
    flags = 10
    $(".status").fadeOut(500)
    $(".flag").text(flags+"🚩")
    $(".timer").text('0⏱️')
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 10; j++){
            $(`#${i}-${j}`).removeClass("back3")
            $(`#${i}-${j}`).removeClass("back4")
            $(`#${i}-${j}`).removeClass("openCell")
            $(`#${i}-${j}`).removeClass("disabled")
            $(`#${i}-${j}`).removeClass("mine")
            $(`#${i}-${j}`).removeClass("openMine")
            $(`#${i}-${j}`).removeClass("openMine2")
            $(`#${i}-${j}`).text("")
        }
    }
}

function openCells(idI, idJ){

    middleZone.push([idI, idJ])
    
    for(let i = idI - 1; i < idI + 2; i++){
        for(let j = idJ - 1; j <idJ + 2; j++){

            // let isMiddle = middleZone.some(zone => zone[0] == i && zone[1] == j)
            let isMine = mines.some(zone => zone[0] == i && zone[1] == j)
            if(isMine){
                continue
            }

            safeZone.push([i, j])
            $(`#${i}-${j}`).addClass("openCell")
            $(`#${i}-${j}`).addClass("disabled")

            if ((i + j) % 2 == 0) {
                $(`#${i}-${j}`).addClass("back3")
            } else {
                $(`#${i}-${j}`).addClass("back4")
            }
        }
    }
}

function placeMines() {
    for(let i = 0; i < 10; i++){
        randomMine()
    }
}

function randomMine(){
    
    let randomRow = Math.floor(Math.random() * 8)
    let randomCol = Math.floor(Math.random() * 10)
    
    let isInSafeZone =  safeZone.some(zone => zone[0] == randomRow && zone[1] == randomCol);
    let isInMines = mines.some(zone => zone[0] == randomRow && zone[1] == randomCol)
    
    if (!isInMines && !isInSafeZone){
        mines.push([randomRow, randomCol])
        $(`#${randomRow}-${randomCol}`).addClass("mine")
    }else{
        randomMine()
    }
}

function mapBoard(){

    let mineCount = 0;

    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 10; j++){

            if($(`#${i}-${j}`).hasClass("mine")){
                board.push("mine")
                continue
            }

            for(let k = i - 1; k < i + 2; k++){
                for(let l = j - 1; l < j + 2; l++){
                    if($(`#${k}-${l}`).hasClass("mine")){
                        mineCount++;
                    }
                }
            }
            board.push(mineCount);
            mineCount = 0;
        }
    }        
}

function expendZone(idI, idJ){

    if(idI < 0 || idI > 7 || idJ < 0 || idJ > 9){
        return
    }
    for(let i = idI - 1; i < idI + 2; i++){
        for(let j = idJ - 1; j <idJ + 2; j++){

            let isMiddle = middleZone.some(zone => zone[0] == i && zone[1] == j)
            let isMine = mines.some(zone => zone[0] == i && zone[1] == j)
            if(isMiddle || isMine){
                continue
            }
            else if (board[i * 10 + j] == 0) {
                openCells(i, j)
                expendZone(i, j)
            }
        }
    }

    
}

function numOfMinesAround(){
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 10; j++){
            if($(`#${i}-${j}`).hasClass("openCell")){
                if (board[i * 10 + j] > 0) {
                    $(`#${i}-${j}`).text(board[i * 10 + j])
                }
            }
        }
    }
}

function timer(){
    setTimeout(function(){
        if(play == false)return
        seconds++;
        $(".timer").text(`${seconds}⏱️`)
        timer()
    }, 1000)
}

function toggleFlag(element){
    
    if($(element).text() == "🚩"){
        $(element).text("")
        flags++;
        $(".flag").text(flags+"🚩")
    }
    else{
        if(flags == 0){
            return
        }
        $(element).text("🚩")
        flags--;
        $(".flag").text(flags+"🚩")
    }
}

function checkCell(element){
    if($(element).hasClass("mine")){
        $(element).addClass("openMine")
        gameOver()
    }else{
        let idI = Number($(element).attr("id").split("-")[0]);
        let idJ = Number($(element).attr("id").split("-")[1]);
        if((idI + idJ) % 2 == 0){
            $(element).addClass("back3")
        }
        else{
            $(element).addClass("back4")
        }
        safeZone.push([idI, idJ])
        $(element).addClass("openCell")
        $(element).addClass("disabled")
        expendZone(idI, idJ)
        numOfMinesAround()
    }

    let count = 0
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 10; j++){
            if($(`#${i}-${j}`).hasClass("openCell")){
                count++;
            }
        }
    }

    if (count == 70) {
        winner()
    }

}

function gameOver(){
    const sound = new Audio("./assets/sounds/failure-1-89170.mp3")
    sound.play()
    play = false
    $(".status").text("you lost").fadeIn(500)
    $(".status").addClass("shake");
    setTimeout(() => $(".status").removeClass("shake"), 500);

    for(let i = 0; i < 10; i++){
        setTimeout(() => {
            $(`#${mines[i][0]}-${mines[i][1]}`).addClass("openMine")
        }, 500 * i + 500)
    }
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 10; j++){
            $(`#${i}-${j}`).addClass("disabled")
        }
    }
    // resetAll()
}

function winner(){
    play = false
    $(".status").text("you won").fadeIn(500)
    for(let i = 0; i < 10; i++){
        $(`#${mines[i][0]}-${mines[i][1]}`).addClass("openMine2")
    }
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 10; j++){
            $(`#${i}-${j}`).addClass("disabled")
        }
    }
    // resetAll()
}

















// $(".restart").click(function(){
//     startGame()
// })

// function startGame(){
//     mines = []
//     for(let i = 0; i < 10; i++){
//         for(let j = 0; j < 8; j++){
//             $(`#${j}-${i}`).removeClass("mine")
//         }
//     }
//     for(let i = 0; i < 10; i++){
//         randomMine()
//     }
//     console.log(mines);
    
// }

// function randomMine(){
//     let randX = Math.floor(Math.random() * 8)
//     let randY = Math.floor(Math.random() * 10)
//     if(!mines.includes(`${randX}-${randY}`)){
//         mines.push(`${randX}-${randY}`)
//         $(`#${randX}-${randY}`).addClass("mine")
//     }
//     else{
//         randomMine()
//     }
// }



































// $(".cell").click(function(){
    
//     // if (!mines.length){
//     //     $(".status").fadeOut(1000)
//     //     let id =$(this).attr("id")
//     //     let x = id.split("-")[0]
//     //     let y = id.split("-")[1]
//     //     // if((x + y) % 2 == 0){
//     //     //     $(this).addClass("back3")
//     //     // }
//     //     // else{
//     //     //     $(this).addClass("back4")
//     //     // }
//     //     // let randonNber = Math.floor(Math.random() * 30) + 20
//     //     // for(let i = 0; i < randonNber; i++){

//     //     // }
//     //     // let randomX = Math.floor(Math.random() * 10) + 1
//     //     // for(let i = 0; i < randomX; i++){

//     //     // }

//     // }




    




//     // $(this).removeClass("back1")
//     // $(this).addClass("back3")
//     // $(this).addClass("clicked")
//     // if($(this).hasClass("mine")){
//     //     $(this).removeClass("back3")
//     //     $(this).addClass("back4")
//     //     $(this).text("💣")
//     //     $(".status").text("You Lose")
//     //     $(".cell").off("click")
//     // 
// })