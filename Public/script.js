    

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
    .when("/New_Sale", {
        templateUrl : "Page/New_Sale.html"
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
function loadMyItems(){
    console.log("Loading my  items");
    $("#myItemHolder").html("hello") ;



    $.ajax({
        url: "loadMyItems", type: 'POST', cache: false,  data:{email:getCookieValue("email") }, success: function(result){
            console.log(result);
            var q = JSON.parse(result);
            var s = "";
            for(var i = 0 ; i < q.length; i++){
                s+= $("#itemWrapperTemplate").html();
            }
            $("#myFixedItemHolder").html(s);
            for(var i = 0 ; i < q.length; i++){

               $(".itemwrapper:eq("+i+") .id").html(q[i].itemID);
               $(".itemwrapper:eq("+i+")  .title").html(q[i].title);
               $(".description:eq("+i+")").html(q[i].description);
               $(".price:eq("+i+")").html(q[i].price+" CA$ ");
               var d = q[i].date.split("T")[0];
              
               $(".itemwrapper:eq("+i+")  .date").html(d+" ("+getDaysTo(d)+" days left)");
               $(".itemwrapper:eq("+i+")  .buyer").html(q[i].buyer);

               if(q[i].type =="fixed"){
                $(".auction:eq("+i+")").html("");
               }
             
           }

       }
   });


}

function checkType(){
    if ($("#auctionRadio").is(':checked')){
        $("#newSaleForm .date").fadeIn();
    }else{
        $("#newSaleForm .date").fadeOut();
    }
}

function getDaysTo(date){
        var end = new Date(date);
               var today=new Date();
                var one_day=1000*60*60*24;
                var daysLeft = Math.ceil((end.getTime()-today.getTime())/(one_day));
                return daysLeft;
}



function uploadSale(){
    var email  = ""+ getCookieValue("email");
    var title  = ""+$("#newSaleForm .title").val();
    var price  = ""+$("#newSaleForm .price").val();
    var description  = ""+$("#newSaleForm .description").val();
    var type  = ""+$("input[name='type']:checked").val();
    var date = ""+$("input[name='date']").val();
    console.log("---->"+date);
    var packet = {email:email, title:title,price:price,description:description,type:type,date:date};
    var stringPacket = JSON.stringify(packet);
    console.log("sending packet:"+ stringPacket);
    $.ajax({url: "addItem", type: 'POST', cache: false,  data: packet, success: function(result){
        console.log(result);
        window.location.hash = '';
    }});
    
}


function signUp(){
    var email  =$("#newSaleForm .email").val();
    var password  = $("#signUpForm .password").val();
    if(password!=$("#signUpForm .confirmPassword").val()){
        console.log("password confirmation error not handled");
    }else{
        $.ajax({
            url: "signup", type: 'POST', cache: false,  data: {email:email,password:password}, success: function(result){
                console.log(result);
                if(result == "success"){
                    document.cookie = "email="+email+";";
                    signedIn();
                    window.location.hash = '';

                }else{
                    console.log("==>"+result);
                }
            }

        });
    }
}

function signIn(){
    var email  = "" + $("#signInForm .email").val();
    var password  = "" + $("#signInForm .password").val();
    $.ajax({
        url: "signin", type: 'POST', cache: false,  data: {email:email,password:password}, success: function(result){
            console.log(result);
            if(result == "success"){
                document.cookie = "email="+email+";";
                signedIn();
                window.location.hash = '';

            }else{
                $("#Invalid_Credential_Input").fadeIn(500);

            }
        }
    });
    
}

function signedIn(){
    $(".postLogin").fadeIn(100);
    $(".preLogin").fadeOut(100);
    console.log("signed in as :"+getCookieValue("email"));
}


function getCookieValue(k){
    var v=document.cookie.match('(^|;) ?'+k+'=([^;]*)(;|$)');
    return v?v[2]:null;
}

