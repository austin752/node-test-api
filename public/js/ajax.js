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
            $("#msgDiv").addClass('alert-danger').show().html("All fields are required.");
        } else if(passwordConf != password){
            $("#msgDiv").addClass('alert-danger').show().html("Passwords should match.");
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
                        $("#msgDiv").addClass('alert-danger').html(errors).show();
                    }else{
                        $("#msgDiv").addClass('alert-success').html(data.message).show(); 
                        window.location.href = '/login';
                    }
                }
            });
        }
    });

    // login
    // var logForm = $(".login-form")
    // logForm.submit(function(event){
    //     event.preventDefault()
    //     var username   = $("#username").val();
    //     var password   = $("#password").val();
        
    //     if(!username || !password){ 
    //         $("#msgDiv").addClass('alert-danger').show().html("All fields are required.");
    //     } else if(!password){
    //         $("#msgDiv").addClass('alert-danger').show().html("Passwords required.");
    //     } 
    //     else{ 
    //         $.ajax({
    //             url: '/login',
    //             method: 'POST',
    //             data: { username: username, password: password },
    //             success: function(data)
    //             {
    //                 window.location.href = '/dashboard';
    //             },
    //             error: function(error){
    //                 alert('an error occurred')
    //             }
    //         })
    //     }
    // });

    // insert
    var ajaxForm = $(".ajax-form")
    var ajaxFormUpdate = $(".ajax-form-update")
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
            success: function(data)
            {
                ajaxForm[0].reset()
                alert('Item has been added.')
            },
            error: function(error){
                alert('an error occurred')
            }
        })
    });

    // update 
    var ajaxFormUpdate = $(".ajax-form-update")
    ajaxFormUpdate.submit(function(event){
        event.preventDefault();
        console.log("form not sending")
        var thisForm = $(this)
        var actionEndPoint = thisForm.attr("action");
        var httpMethod = thisForm.attr("method");
        var data = thisForm.serialize();
        console.log(data)
        $.ajax({
            url: actionEndPoint,
            method: httpMethod,
            data: data,
            success: function(data){
                ajaxFormUpdate[0].reset()
                alert('Item has been updated.')
            },
            error: function(error){
                alert('an error occurred')
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
                alert('Item has been deleted.')
                window.location.href = '/get-data';
            },
            error: function(error){
                if(data.status == 'error'){
                    var errors = '<ul>';
                    $.each( data.message, function( key, value ) {
                        errors = errors +'<li>'+value.msg+'</li>';
                    });
                    errors = errors+ '</ul>';
                    $("#msgDiv").html(errors).show();
                }
            }
        })

    });

// end function
});


