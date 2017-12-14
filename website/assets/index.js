$(document).ready( function () {
    $('#contact-list').show();
    $('#new-contact').hide();
    $('#details').hide();
    
    $('#index').click( function () {
        $('#contact-list').show();
        $('#new-contact').hide();
        $('#details').hide();

        console.log("here 1");
        $.get('api', function (data, status){
            
            $('tbody').children().remove();
            var json = JSON.parse(data);
            
            var tr;

            tr = $('<tr/>');
            tr.append("<th>"+"Contact Name"+"</th>");
            tr.append("<th>"+"Email"+"</th>");
            tr.append("<th>"+"Phone Number"+"</th>");
            tr.append("<th>"+"Actions"+"</th>");
            $('table').append(tr);

            for(var i = 0; i < json.table.length; i++) {
                tr = $('<tr/>');
                tr.append("<td>"+json.table[i].name+"</td");
                tr.append("<td>"+json.table[i].email+"</td");
                tr.append("<td>"+json.table[i].phonenum+"</td");
                tr.append("<td>"+"<button class=editbtn>"+"Edit"+"</button>"+"<button class=delbtn onclick = deleteRow(this)>"+"Delete"+"</button>"+ "</td>");
                $('table').append(tr);
            }
// https://stackoverflow.com/questions/14400609/remove-json-entry-by-value   for the delete button, check out the 2nd thread in here. 

         } );
    })

    $('#new').click( function () {
        $('#new-contact').show();
        $('#contact-list').hide();
        $('#details').hide();
    })


    $('#myForm').submit( function(event) {


        const formData = {
            fullname: $('#fullname').val(),
            phonenum: $('#phonenum').val(),
            email: $('#email').val(),
        };

        const requestData = JSON.stringify(formData)
        console.log(requestData);
        
        if(isPhoneValid && isNameValid && isEmailValid){
        $.ajax({
            type: 'POST', 
            url: 'api', 
            data: requestData,
            dataType: 'json',
            contentType: 'application/json',
        })
        .done(successHandler())
        .fail(errorHandler())
    }
        event.preventDefault();

        showDetails();
        $('#details').show();
        $('#new-contact').hide();
    })

});



function successHandler(data) {
    const serverData = JSON.stringify(data)
    $('#output').text(`Server response: ${serverData}`)
}

function errorHandler(jqXHR, textStatus, error) {
    $('#output').val("textStatus: " + textStatus + ". server error: " + error)
}

var isPhoneValid;
var isNameValid;
var isEmailValid;
function nameValidate() {

    document.getElementById("fullname").addEventListener("blur" , e=> {
        
        let validityMessage = ""; 

        
        if(e.target.value.length < 1) {
           validityMessage = "Invalid name";
        }

        document.getElementById("name-validate").textContent = validityMessage;

        // if the length of validity message is greater than 1, return false
        // otherwise, return true

        if(validityMessage.length > 1) {
            console.log("Name false");
            isNameValid =false;
            return false;
        }
        console.log("Name true");
        isNameValid=true;
        return true;
    })
    
}


function emailValidate() {

            document.getElementById("email").addEventListener("blur" , e=> {
                // Match a string of the form xxx@yyy.zzz 
                const emailRegex = /.+@.+\..+/; 
                let validityMessage = ""; 
        
                if(!emailRegex.test(e.target.value)) {
                   validityMessage = "Invalid e-mail";
                }
        
                document.getElementById("email-validate").textContent = validityMessage;

                if(validityMessage.length > 1) {
                    console.log("Email false");
                    isEmailValid= false;
                    return false;
                }
        
                console.log("Email: true");
                isEmailValid=true;
                return true;
        
            })

        }
    
        function phoneValidate() {
            document.getElementById("phonenum").addEventListener("blur" , e=> {
                // Match a string of the form xxx@yyy.zzz 
                const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im 
                let validityMessage = ""; 
        
                if(!phoneRegex.test(e.target.value)) {
                   validityMessage = "Invalid phone number";
                }
        
                document.getElementById("phone-validate").textContent = validityMessage;

                if(validityMessage.length > 1) {
                    console.log("Email: false");
                    isPhoneValid=false;
                    return false;
                }
                console.log("Phone: true");
                isPhoneValid=true;
                return true;
            })
            
        }

        function submitValidate() {
            if( isEmailValid && isNameValid && isPhoneValid )  {

                console.log("Successful");

                showDetails();
                $('#details').show();
                $('#new-contact').hide();
                
            }

            else {
                console.log("Failure");
            }

        }

        function showDetails () {

            // retrieve the contents of the user input from the input fields
            let name = $("#fullname").val();
            let email = $("#email").val();
            let phonenumber =  $("#phonenum").val();

            $("#input-name").text(name);
            $("#input-email").text(email);
            $("#input-phone").text(phonenumber);
           
            

        }

        

        function deleteRow(btn) {
         var row = btn.parentNode.parentNode.rowIndex;
        // console.log(row);
           // row.parentNode.removeChild(row);

           const remove = {index: row};
           var removeJSON = JSON.stringify(remove);
           
           $.ajax({
                    type: 'DELETE',
                    url: 'api',
                    data: removeJSON,
                    dataType: 'json',
                    contentType: 'application/json',
                })
                .done(successHandler)
                .fail(errorHandler)


                $('#index').click();

        }

        function showContacts() {
            $('#index').click();
        }

        

        