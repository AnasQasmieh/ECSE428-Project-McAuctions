   var displayedItems; 

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

    console.log(document.location.hash);
    if(document.location.hash=="#/"){
        displayCategory("any");
    }
    var cookie = "";
    cookie +=document.cookie
    console.log( "cookie["+cookie+"]" );
    if(cookie.length>1){
        signedIn();
    }


});
function omniSearch(){
    document.location.hash = "#/";
    var category = "any";
    var search = $(".omniBar").val();
    var splitSearch = search.split(" ");
    console.log(splitSearch);
    $.ajax({
        url: "getItems", type: 'POST', cache: false,  data: {category:category}, success: function(result){
        list  = JSON.parse(result);
        displayedItems = [];
         while(list.length>0){
            var keep = false;
            var i = list.pop()
            for ( var j =0; j<splitSearch.length ; j++ ){
                if( i.title.includes(splitSearch[j])  ){
                    displayedItems.unshift(i);
                }else if(  i.description.includes(splitSearch[j]) ){
                    displayedItems.push(i);
                }
            }
         }
         $(".itemHolder").html("");
         displayItems(15);
     }

});
}



function bid(b){
 parent = b.parentNode.parentNode;
 currentPrice = $(parent).find(".price").html();
 newPrice = $(parent).find(".newPrice").val();
 minPrice = Math.ceil(currentPrice *105/100);
 itemID = $(b).attr('name');
 buyer = getCookieValue("email");
 if(minPrice > newPrice){
    alert("The minimum bid is: \n"+minPrice+"\nYour offer has been refused");
}else{
     console.log("c="+currentPrice+"--n="+newPrice+"--id="+itemID+"--buyer="+buyer);
    $.ajax({url: "bid", type: 'POST', cache: false,  data: {itemID:itemID, price:newPrice, buyer:buyer}, success: function(result){
       location.reload();
    }});
}

}

function displayCategory(category){

 getItems(category);


}



function  displayItems(count){
    while(count>0 && displayedItems.length!=0){
        var item = displayedItems.pop();
        var s = $(".itemHolder").html() + $("#itemWrapperTemplate").html();
        $(".itemHolder").html(s);
        $(".itemWrapper:last  .title").html(item.title);
        $(".itemWrapper:last  .price").html(item.price);
        $(".itemWrapper:last  .owner").html(item.email);
        $(".itemWrapper:last  .description").html(item.description);
        $(".itemWrapper:last  .date").html(getItemDateString(item));
        $(".itemWrapper:last  .bid").attr('name', item.itemID);
        if(item.type =="fixed"){
            $(".itemWrapper:last  .auction").html("");
        }

        count--;
    }
}
















function getItems(category){
    $.ajax({
        url: "getItems", type: 'POST', cache: false,  data: {category:category}, success: function(result){
         console.log(result);
         displayedItems =JSON.parse(result);
         $(".itemHolder").html("");
         displayItems(15);
     }

 });
}


function loadMyItems(){
    console.log("Loading my  items");
    $("#myItemHolder").html("hello") ;



    $.ajax({
        url: "loadMyItems", type: 'POST', cache: false,  data:{email:getCookieValue("email") }, success: function(result){
            var q = JSON.parse(result);
            var s = "";
            for(var i = 0 ; i < q.length; i++){
                s+= $("#itemWrapperTemplate").html();
            }
            $("#myFixedItemHolder").html(s);
            for(var i = 0 ; i < q.length; i++){

             $(".itemwrapper:eq("+i+") .id").html(q[i].itemID);
             $(".itemwrapper:eq("+i+") .bid").attr('name', q[i].itemID);
             $(".itemwrapper:eq("+i+") .id").html(q[i].itemID);
             $(".itemwrapper:eq("+i+") .category").html(q[i].category);
             $(".itemwrapper:eq("+i+")  .title").html(q[i].title);
             $(".description:eq("+i+")").html(q[i].description);
             $(".price:eq("+i+")").html(q[i].price+" CA$ ");


             $(".itemwrapper:eq("+i+")  .date").html(getItemDateString(q[i]));
             $(".itemwrapper:eq("+i+")  .buyer").html(q[i].buyer);

             if(q[i].type =="fixed"){
                $(".auction:eq("+i+")").html("");
            }
        }
    }
});
}

function getItemDateString( item ){
    var d = item.date.split("T")[0];
    return  d+" ("+getDaysTo(d)+" days left)";
}

function updateMySale(b){
    console.log(""+$(b).attr('name'));
    
}
function removeMySale(b){
    console.log(""+$(b).attr('name'));
    var itemID = $(b).attr('name');
    $.ajax({url: "removeItem", type: 'POST', cache: false,  data: {itemID:itemID}, success: function(result){
        if(result == "success"){
            loadMyItems();
        }else{
            console.log("==>"+result);
        }
    }});

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
    var category = ""+$("select[name='category']").find(":selected").text();
    console.log("---->"+category);
    var packet = {email:email, title:title,price:price,description:description,category:category,type:type,date:date};
    var stringPacket = JSON.stringify(packet);
    console.log("sending packet:"+ stringPacket);
    $.ajax({url: "addItem", type: 'POST', cache: false,  data: packet, success: function(result){
        console.log(result);
        // window.location.hash = '';
    }});
    
}


function signUp(){
    var email  =$("#signUpForm .email").val();
    var password  = $("#signUpForm .password").val();
    var firstName = $("#signUpForm .firstName").val();
    var lastName = $("#signUpForm .lastName").val();
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(email)){
        alert("email")
    }
    if(password!=$("#signUpForm .confirmPassword").val()){
        console.log("password confirmation error not handled");
        alert("Passwords do not match");
    }else if(!firstName){
        alert("Please enter your first name");
    }else if(!lastName){
        alert("Please enter your last name");
    }
    else{
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

