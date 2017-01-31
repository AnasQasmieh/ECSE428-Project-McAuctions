

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

function signUp(){
    var email  = $("#signUpForm .email").val();
    var password  = $("#signUpForm .password").val();
    if(password!=$("#signUpForm .confirmPassword").val()){
        console.log("password confirmation error not handled");
    }else{
      
        $.ajax({url: "signup", type: 'POST', cache: false,  data: {email:email+".ca",password:password}, success: function(result){console.log(result)}});

    }
    

}


function getCookieValue(k){
    var v=document.cookie.match('(^|;) ?'+k+'=([^;]*)(;|$)');
    return v?v[2]:null;
}

function createCookie(){
    document.cookie = "email="+email+";isLoggedIn=true";
}