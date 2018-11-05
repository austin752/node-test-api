$(function(){
    // registration
    var regForm = $(".register-form")
    regForm.submit(function(event){
        event.preventDefault()
        var username   = $("#username").val();
        var email      = $("#email").val();
        var password   = $("#password").val();
        var passwordConf  = $("#passwordConf").val();
        
        if(!username || !email || !password || !passwordConf){ 
            $("#msgDiv").show().html("All fields are required.");
        } else if(passwordConf != password){
            $("#msgDiv").show().html("Passwords should match.");
        } 
        else{ 
            $.ajax({
                url: "/register",
                method: "POST",
                data: { username: username, email: email, password: password, passwordConf: passwordConf }
            }).done(function( data ) {
                if ( data ) {
                    if(data.status == 'error'){
                        var errors = '<ul>';
                        $.each( data.message, function( key, value ) {
                            errors = errors +'<li>'+value.msg+'</li>';
                        });
                        errors = errors+ '</ul>';
                        $("#msgDiv").html(errors).show();
                    }else{
                        $("#msgDiv").removeClass('alert-danger').addClass('alert-success').html(data.message).show(); 
                        window.location.href = '/login';
                    }
                }
            });
        }
    });

    // registration
    var loginForm = $(".login-form")
    loginForm.submit(function(event){
        event.preventDefault()
        var username   = $("#username").val();
        var password   = $("#password").val();
        
        if(!username || !password){ 
            $("#msgDiv").show().html("All fields are required.");
        } 
        else{ 
            $.ajax({
                url: "/login",
                method: "POST",
                data: { username: username, password: password }
            }).done(function( data ) {
                if ( data ) {
                    if(data.status == 'error'){
                        var errors = '<ul>';
                        $.each( data.message, function( key, value ) {
                            errors = errors +'<li>'+value.msg+'</li>';
                        });
                        errors = errors+ '</ul>';
                        $("#msgDiv").html(errors).show();
                    }else{
                        $("#msgDiv").removeClass('alert-danger').addClass('alert-success').html(data.message).show(); 
                        window.location.href = '/dashboard';
                    }
                }
            });
        }
    });

    // insert and update 
    var ajaxForm = $(".ajax-form")

    ajaxForm.submit(function(event){
        event.preventDefault();
        console.log("form not sending")
        var thisForm = $(this)
        var actionEndPoint = thisForm.attr("action");
        var httpMethod = thisForm.attr("method");
        var data = thisForm.serialize();

        $.ajax({
            url: actionEndPoint,
            method: httpMethod,
            data: data,
            success: function(data){
                $.alert({
                    title: "Item Added!",
                    content: "Your entry has been added",
                    theme:"modern"
                })
            },
            error: function(error){
                $.alert({
                    title: "Oops!",
                    content: "an error occurred",
                    theme:"modern"
                })
            }
        })

    });

    // delete item
    var deleteAjaxForm = $(".delete-ajax-form")

    deleteAjaxForm.submit(function(event){
        event.preventDefault();
        console.log("form not sending")
        var thisForm = $(this)
        var actionEndPoint = thisForm.attr("action");
        var httpMethod = thisForm.attr("method");
        var data = thisForm.serialize();

        $.ajax({
            url: actionEndPoint,
            method: httpMethod,
            data: data,
            success: function(data){
                alert({
                    title: "Item deleted!",
                    content: "Your entry has been deleted",
                    theme:"modern"
                });
            },
            error: function(error){
                alert({
                    title: "Oops!",
                    content: "an error occurred",
                    theme:"modern"
                })
            }
        })

    });

// add above here
});



// var regForm = $(".register-form")
// var regFormMethod = regForm.attr("method")
// var regFormEndPoint = regForm.attr("action")
// regForm.submit(function(event){
//     event.preventDefault()
//     var regFormData = regForm.serialize()
//     var thisForm = $(this)
//     $.ajax({
//         method: regFormMethod,
//         url: regFormEndPoint,
//         data: regFormData,
//         success: function(data){
//             if (data.regFormData['password'] === data.regFormData['passwordConf']){
//                 regForm[0].reset()
//                 alert({
//                     title: "Success",
//                     content: 'Logging in...',
//                     theme:"modern",
//                 });
//             }else{
//                 regForm[0].reset()
//                 alert({
//                     title: "Something went wrong!",
//                     content: 'Passwords need to match, please try again.',
//                     theme:"modern",
//                 });
//             }
//         },
//         error: function(error){
//             console.log('error')
//             console.log(error.data)
//             $.alert({
//                 title: "Oops!",
//                 content: msg,
//                 theme:"modern",
//             })
//         }
//     })
// });


    
    