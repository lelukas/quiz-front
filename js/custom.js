$.get("https://appquiz-api.herokuapp.com/api/quiz/start", function (data) {
    var q = 0;
    var alt = 0;
    var score = 0;
    var colors = ["#FB6900", "#F63700", "#004853", "#007E80", "#059999", "#F07848", "#D83018", "#98A8A7", "#F05D6F", "#AB1A2B", "#514642", "#FFCA22", "#A6163A", "#75615E"];

    // console.log(data);

    function list() {
        $(".question").html(data.questions[q].question);

        $(".alternative").each(function () {
            $(this).html(data.questions[q].alternatives[alt]);
            alt++;
        })

        $("div.background").each(function () {
            var i = Math.floor(Math.random() * 14);
            // console.log(i);
            $(this).css("background",  colors[i])
        })
    }

    list();


    $(".item").click(function () {
        $(".selected").addClass("deselected").removeClass("selected");
        $(this).addClass("selected").removeClass("deselected");
    });


    $(".answer").click(function () {
        if($(".selected").attr("value") == data.questions[q].correct){
            score++;
            console.log(score);
        }

        alt = 0;
        q++;

        if(q == 5){
            $(".ui.grid:nth-child(1)").addClass("hide");
            $(".ui.grid:nth-child(2)").removeClass("hide");
            $(".score").html("Você acertou" + score + "perguntas");


            $.post("https://appquiz-api.herokuapp.com/api/answer", {
                name: "Leo",
                score: score
            })

        }else{
            list();
        }
    })
});


