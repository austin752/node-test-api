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
    
    