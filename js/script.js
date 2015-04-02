var svgNS = "http://www.w3.org/2000/svg";
var timeVar;

function createLine(x1, y1, x2, y2) {
    var myLine = document.createElementNS(svgNS, "line");
    myLine.setAttributeNS(null, "id", "line");
    myLine.setAttributeNS(null, "x1", x1);
    myLine.setAttributeNS(null, "y1", y1);
    myLine.setAttributeNS(null, "x2", x2);
    myLine.setAttributeNS(null, "y2", y2);
    myLine.setAttributeNS(null, "style", "stroke:black;stroke-width:3");
    document.getElementById("mySVG").appendChild(myLine);
}

function createPoliline() {
    var ax = aX();
    var ay = aY();
    createLine(0, 120, getWidth("cardioGrafic") + getWidth("instruction"), 120);
    calmPolyline(0, ax, ay);
    nervousPolyline(14, ax, ay);
    calmPolyline(17, ax, ay);
    nervousPolyline(31, ax, ay);
    calmPolyline(34, ax, ay);
    nervousPolyline(48, ax, ay);
    calmPolyline(51, ax, ay);
    nervousPolyline(65, ax, ay);
    calmPolyline(68, ax, ay);
    nervousPolyline(82, ax, ay);
    calmPolyline(85, ax, ay);
    nervousPolyline(99, ax, ay);
    calmPolyline(102, ax, ay);
    nervousPolyline(116, ax, ay);
    calmPolyline(119, ax, ay);
    nervousPolyline(133, ax, ay);
    calmPolyline(136, ax, ay);
}

function calmPolyline(point, ax, ay) {
    for (var k = point; k < (point + 14); k++) {
        createLine(ax[k], ay[k], ax[k + 1], ay[k + 1]);
    }
}

function nervousPolyline(point, ax, ay) {
    var ayBig = aY2(5);
    for (var k = point; k < (point + 1); k++) {
        createLine(ax[k], ay[k], ax[k + 1], ayBig[k + 1]);
        createLine(ax[k + 1], ayBig[k + 1], ax[k + 2], ayBig[k + 2]);
        createLine(ax[k + 2], ayBig[k + 2], ax[k + 3], ay[k + 3]);
    }
}

function aX() {
    var a = [];
    a[0] = getWidth("cardioGrafic") + getWidth("instruction");
    for (var i = 1; i < 160; i++) {
        a[i] = a[i - 1] + Math.random() * 20 + 15;
    }
    return a;
}

function aY() {
    var b = [];
    b[0] = 120;
    for (var j = 1; j < 160; j = j + 2) {
        var dRandom = Math.random() * 20;
        b[j] = 120 + dRandom;
    }
    for (j = 2; j < 160; j = j + 2) {
        dRandom = Math.random() * 15;
        b[j] = 120 - dRandom;
    }
    return b;
}

function aY2() {
    var c = [];
    c[0] = 120;
    for (var j = 1; j < 160; j = j + 2) {
        var dRandom = Math.random() * 20 + 60;
        c[j] = 120 + dRandom;
    }
    for (j = 2; j < 160; j = j + 2) {
        dRandom = Math.random() * 20 + 60;
        c[j] = 120 - dRandom;
    }
    return c;
}

function position() {
    var widthDiv1 = getWidth("instruction");
    $("#cardioGrafic").css("left", widthDiv1);
    var widthDiv2 = getWidth("cardioGrafic");
    var sum = widthDiv1 + widthDiv2;
    $("#buttons").css("left", sum);
}

function getWidth(section) {
    var width = document.getElementById(section).offsetWidth;
    return width;
}

function start() {
    $("#reset1").click(function() {
        location.reload();
    });
    $("#reset2").click(function() {
        location.reload();
    });
    startByKeyPress();
    $("#start").click(function() {
        setTime("timerOf3S", 03);
        setTimeout(function() {
            positionChange();
            stopAnimation();
        }, 3000);
        $("#start").off("click");
    });
}

function moveSectionLeft() {
    $("#instruction").animate({
        left: '-22%'
    });
    $("#cardioGrafic").animate({
        "left": 0,
        "width": '50%'
    });
}

function positionChange() {
    setTime("timer", 19, true);
    moveSectionLeft();
    startAnimation();
    $("#mySVG").css("width", 4500);
    createPoliline();
    setPuls();
    changeColorOfButton();
}

function setPuls() {
    var preassureUp = Math.round(30 * Math.random() + 100);
    var preassureDown = Math.round(30 * Math.random() + 60);
    var puls = Math.round(30 * Math.random() + 70);
    setTimeout(function() {
        var newTime = document.getElementById("timer").innerHTML;
        if (+newTime === 0) {
            document.getElementById("pressure").innerHTML = preassureUp + "/" + preassureDown;
            document.getElementById("puls").innerHTML = puls;
            document.getElementById("resetProgram").style.display = "inline";
            stopAnimationOfButton();
            return;
        } else {
            setPuls();
        }
    }, 1000);

}

function setTime(id, time, withzero) {
    document.getElementById(id).innerHTML = time;
    time--;
    if (time >= 0 && time <= 9 && withzero) {
        time = "0" + time;
    }
    if (time >= 0) {
        timeVar = setTimeout(function() {
            setTime(id, time, withzero);
        }, 1000);
    }
}

function startAnimation() {
    document.getElementById("mySVG").style.WebkitAnimation = "myFirst 19s 1 linear";
    document.getElementById("mySVG").style.animation = "myFirst 19s 1 linear";
    document.getElementById("mySVG").style.WebkitAnimationName = "myFirst";
    document.getElementById("mySVG").style.animationName = "myFirst";
}

function stopAnimation() {
    var i = 0;
    $("body").mousemove(function() {
        i++;
        if (i > 10) {
            changeColorOfButtonReset();
            document.getElementById("mySVG").style.WebkitAnimationPlayState = "paused";
            document.getElementById("mySVG").style.animationPlayState = "paused";
            stopTimer(timeVar);
            document.getElementById("errorTimerOf3S").innerHTML = "3";
            document.getElementById("error").style.display = "inline";
        }
        var newTime = document.getElementById("timer").innerHTML;
        if ((i > 50) || (+newTime === 0)) {
            $("body").off("mousemove");
        }
    });
}

function continueAnimationAndTimer() {
    $("#continue").click(function() {
        setTimeout(function() {
            changeColorOfButton();
            document.getElementById("mySVG").style.WebkitAnimationPlayState = "running";
            document.getElementById("mySVG").style.animationPlayState = "running";
            setTimeout(function() {
                stopAnimation();
            }, 1000);
            var newTime = document.getElementById("timer").innerHTML;
            setTime("timer", newTime, true);
            document.getElementById("error").style.display = "none";
        }, 3000);
        setTime("errorTimerOf3S", 3);
    });
}

function changeColorOfButton() {
    document.getElementById("button1").classList.add("butNew");
    document.getElementById("button2").classList.add("butNew");
    document.getElementById("button3").classList.add("butNew");
    document.getElementById("button4").classList.add("butNew");
    document.getElementById("button5").classList.add("butNew");
}

function changeColorOfButtonReset() {
    document.getElementById("button1").classList.remove("butNew");
    document.getElementById("button2").classList.remove("butNew");
    document.getElementById("button3").classList.remove("butNew");
    document.getElementById("button4").classList.remove("butNew");
    document.getElementById("button5").classList.remove("butNew");
}

function stopTimer(id) {
    clearTimeout(id);
}

function stopAnimationOfButton() {
    document.getElementById("button1").style.WebkitAnimationPlayState = "paused";
    document.getElementById("button1").style.animationPlayState = "paused";
    document.getElementById("button2").style.WebkitAnimationPlayState = "paused";
    document.getElementById("button2").style.animationPlayState = "paused";
    document.getElementById("button3").style.WebkitAnimationPlayState = "paused";
    document.getElementById("button3").style.animationPlayState = "paused";
    document.getElementById("button4").style.WebkitAnimationPlayState = "paused";
    document.getElementById("button4").style.animationPlayState = "paused";
    document.getElementById("button5").style.WebkitAnimationPlayState = "paused";
    document.getElementById("button5").style.animationPlayState = "paused";
}

function startByKeyPress() {
    $(document).keydown(function(event) {
        var keycode;
        if (!event) var event = window.event;
        if (event.keyCode) keycode = event.keyCode; 
        else if (event.which) keycode = event.which; 
        if (keycode === 32 || keycode === 0) {
            setTime("timerOf3S", 03);
            setTimeout(function() {
                positionChange();
                stopAnimation();
            }, 3000);
            $(document).off("keydown");
        }
    });
}

$(document).ready(function() {
    createLine(0, 120, getWidth("cardioGrafic"), 120);
    position();
    start();
    continueAnimationAndTimer();
});

$(window).resize(function() {
    createLine(0, 120, getWidth("cardioGrafic"), 120);
    position();
});