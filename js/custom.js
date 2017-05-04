

window.onload = function(){

    $.get("https://appquiz-api.herokuapp.com/category", function (data) {
        for(var i=0; i<data.length; i++){
            $(".ui.grid:nth-child(1)").append(
                `<div class="game category button column" id-value="${data[i].id}">
                <p class="category name"> ${data[i].name} </p>
             </div>`
            );
            console.log(i)
            console.log(data[i].name)
        }

        $(".ui.grid:nth-child(1)").append(
            "<div class='game category button column' id-value='0'>" +
            "<p class='all category name'>Todas</p>" +
            "</div>"
        );

        var c = 0;
        var t = data.length;
        setInterval(function () {
            $(".all").html(data[c].name);
            c++;
            if(c == t) c = 0;

            if(Math.random() <= 0.3){
                $(".all").html("Todas");
            }else if(Math.random() <= 0.1){
                $(".all").html("Você conhece sobre tudo?");
            }
        },200);

        $("div.category.button").click(function () {
            // console.log($(this).attr("id-value"));

            if($(this).attr("id-value") != 0)
                var catId = $(this).attr("id-value");
            else
                var catId = "";

            $(".ui.grid:nth-child(1)").addClass("hide");
            $(".ui.grid:nth-child(2)").removeClass("hide");

            // console.log("https://appquiz-api.herokuapp.com/api/quiz/start" + catId);

            $.get("https://appquiz-api.herokuapp.com/api/quiz/start/" + catId, function (data) {

                // console.log("https://appquiz-api.herokuapp.com/api/quiz/" + $(this).attr("id-value"));
                console.log(data);

                var q = 0;
                var alt = 0;
                var score = 0;

                // console.log(data);

                function list() {
                    $(".question").html(data.questions[q].question);

                    $(".alternative").each(function () {
                        $(this).html(data.questions[q].alternatives[alt]);
                        alt++;
                    });
                }

                list();


                $(".game.button").click(function () {
                    $(".selected").removeClass("selected");
                    $(this).addClass("selected");
                    $(".answer").removeAttr("disabled");
                });


                $(".answer").click(function () {

                    $(this).attr("disabled","disabled");

                    if($(".selected").attr("value") == data.questions[q].correct){
                        score++;
                        console.log(score);
                    }

                    $(".selected").removeClass("selected");

                    alt = 0;
                    q++;

                    if(data.questions[q] == null){

                        $(".ui.grid:nth-child(2)").addClass("hide");
                        $(".ui.grid:nth-child(3)").removeClass("hide");
                        $(".score").html("Você acertou " + score + " perguntas");

                    }else if (q == score && score == 5){


                        if( Math.random() <= 0.5 ){
                            $(".brushes").removeClass("hide");
                            var tl = new TimelineLite();
                            tl.add(TweenMax.to(".animation", 0.2, {backgroundColor: "#142129"}));
                            tl.add(TweenMax.staggerFrom(".brush", 0.4, {opacity: 0, scale: 0.9}, 0.2));
                            tl.add(TweenMax.from(".message", 0.6, {opacity: 0, scale: 0.8, ease:  Power4.easeOut}));
                        }else{
                            $(".palms").removeClass("hide");
                            var tl = new TimelineLite();

                            tl.add(TweenMax.staggerFrom(".palm", 0.2, {opacity: 0}, 0.3));
                            tl.add(TweenMax.staggerFrom(".leaf", 0.2, {opacity: 0}, 0.3));
                            tl.add(TweenMax.to((".animation"), 0.4, {backgroundColor: "#032123"}));
                            tl.add(TweenMax.to("#message", 0.6, {opacity: 1}));
                            tl.add(TweenMax.to("#particles", 10, {x: "+200", repeat: -1, yoyo:true, ease: Power2.easeInOut}));
                        }

                    }else{
                        list();
                    }
                })
            });
        });
    });
}







//https://appquiz-api.herokuapp.com/api/quiz/start/oId




