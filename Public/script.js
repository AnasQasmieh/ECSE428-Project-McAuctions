

/*
=========================
handles different pages depending on the #
=========================
*/
var app = angular.module("myApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "Page/Home.html"
    })
    .when("/Advanced_Search", {
        templateUrl : "Page/Advanced_Search.html"
    })
     .when("/About", {
        templateUrl : "Page/About.html"
    })
    .when("/My_Sales", {
        templateUrl : "Page/My_Sales.html"
    })
    .when("/Sign_In", {
        templateUrl : "Page/Sign_In.html"
    })
    .when("/Sign_Up", {
        templateUrl : "Page/Sign_Up.html"
    })
     .when("/Search_Results", {
        templateUrl : "Page/Search_Results.html"
    })
 
   
});

$( document ).ready(function() {
    var cookie = "";
    cookie +=document.cookie
    console.log( "cookie["+cookie+"]" );
    if(cookie.length>1){
        signedIn();
    }
});

function signUp(){
    var email  = $("#signUpForm .email").val();
    var password  = $("#signUpForm .password").val();
    if(password!=$("#signUpForm .confirmPassword").val()){
        console.log("password confirmation error not handled");
    }else{
        $.ajax({url: "signup", type: 'POST', cache: false,  data: {email:email,password:password}, success: function(result){console.log(result)}});
    }
}

function signIn(){
    var email  = "" + $("#signInForm .email").val();
    var password  = "" + $("#signInForm .password").val();
    $.ajax({url: "signin", type: 'POST', cache: false,  data: {email:email,password:password}, success: function(result){
        console.log(result);
        if(result == "success"){
            document.cookie = "email="+email+";";
            signedIn();

        }else{
            $("#Invalid_Credential_Input").fadeIn(500);
        }
    }});
    
}

function signedIn(){
    $(".postLogin").fadeIn(100);
    $(".preLogin").fadeOut(100);
    window.location.hash = '';

    console.log("signed in as :"+getCookieValue("email"));
}


function getCookieValue(k){
    var v=document.cookie.match('(^|;) ?'+k+'=([^;]*)(;|$)');
    return v?v[2]:null;
}

