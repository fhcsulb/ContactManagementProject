$(document).ready( function () {

    // when user first loads site, only display the contact list
    $('#contact-list').show();
    $('#new-contact').hide();
    $('#details').hide();
    $('#edit-contact').hide();
    
    // when index is clicked, display the view of the contact list and hide other views
    $('#index').click( function () {
        $('#contact-list').show();
        $('#new-contact').hide();
        $('#details').hide();
        $('#edit-contact').hide();

        // retrieve contacts from the JSON file through HTTP GET
        $.get('api', function (data, status){
            
            // clears the existing HTML table
            $('tbody').children().remove();
            var json = JSON.parse(data);
            
            var tr;

            // specify table headers
            tr = $('<tr/>');
            tr.append("<th>"+"Contact Name"+"</th>");
            tr.append("<th>"+"Email"+"</th>");
            tr.append("<th>"+"Phone Number"+"</th>");
            tr.append("<th>"+"Actions"+"</th>");
            $('table').append(tr);

            // retrieve data from the JSON file and append it to the table
            for(var i = 0; i < json.table.length; i++) {
                tr = $('<tr/>');
                tr.append("<td>"+json.table[i].name+"</td");
                tr.append("<td>"+json.table[i].email+"</td");
                tr.append("<td>"+json.table[i].phonenum+"</td");
                tr.append("<td>"+"<button class=editbtn onclick = editRow(this)>"+"Edit"+"</button>"+"<button class=delbtn onclick = deleteRow(this)>"+"Delete"+"</button>"+ "</td>");
                $('table').append(tr);
            }


         } );
    })

    // when new is clicked, display the view allowing the user to enter in details for a new contact
    $('#new').click( function () {
        $('#new-contact').show();
        $('#contact-list').hide();
        $('#details').hide();
        $('#edit-contact').hide();
    })

    // the user submits the new contact form
    $('#myForm').submit( function(event) {

        // create an object from the form data that was submitted.
        const formData = {
            fullname: $('#fullname').val(),
            phonenum: $('#phonenum').val(),
            email: $('#email').val(),
        };

        const requestData = JSON.stringify(formData)
        
        // if a valid phone number, email, and phone are valid, perform HTTP POST to save to JSON. 
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

        // after the POST, show the details page
        showDetails();
        $('#details').show();
        $('#new-contact').hide();
        $('#edit-contact').hide();

        // clear old input on the form 
        document.getElementById('myForm').reset();
    })

});



function successHandler(data) {
    const serverData = JSON.stringify(data)
    $('#output').text(`Server response: ${serverData}`)
}

function errorHandler(jqXHR, textStatus, error) {
    $('#output').val("textStatus: " + textStatus + ". server error: " + error)
}

// variables to ensure phone, name, and email are valid. 
var isPhoneValid;
var isNameValid;
var isEmailValid;

// function to validate the name validity
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
            isNameValid =false;
            return false;
        }

        isNameValid=true;
        return true;
    })
    
}

// function to validate email validity
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
                   
                    isEmailValid= false;
                    return false;
                }
        
                
                isEmailValid=true;
                return true;
        
            })

        }
    
        // function to validate the phone number
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
                    
                    isPhoneValid=false;
                    return false;
                }
               
                isPhoneValid=true;
                return true;
            })
            
        }

        function submitValidate() {
            if( isEmailValid && isNameValid && isPhoneValid )  {

             

                showDetails();
                $('#details').show();
                $('#new-contact').hide();
                
            }

            else {
                console.log("Failure");
            }

        }


        // function that retrieves the information that will display on the details page
        function showDetails () {

            // retrieve the contents of the user input from the input fields
            let name = $("#fullname").val();
            let email = $("#email").val();
            let phonenumber =  $("#phonenum").val();

            $("#input-name").text(name);
            $("#input-email").text(email);
            $("#input-phone").text(phonenumber);
            $('#edit-contact').hide();
           
            

        }

        
        // function for deleting a row in the table
        function deleteRow(btn) {
        
        // determine which row to delete based off the button
         var row = btn.parentNode.parentNode.rowIndex;

            // store the row to delete in an object
           const remove = {index: row};
           var removeJSON = JSON.stringify(remove);
           
           // perform an HTTP DELETE request
           $.ajax({
                    type: 'DELETE',
                    url: 'api',
                    data: removeJSON,
                    dataType: 'json',
                    contentType: 'application/json',
                })
                .done(successHandler)
                .fail(errorHandler)

                // once the delete show has performed, simulate click on index button which 
                // will show the contacts page
                $('#index').click();

        }

        // function to simulate a click on the index button which will show the contacts page
        function showContacts() {
            $('#index').click();
        }


        // function for changing the data on a row in the table
        function editRow(btn) {
            $('#edit-contact').show();
            $('#contact-list').hide();
            $('#new-contact').hide();
            $('#details').hide();
          
            // determine the row to be changed based off the button
            var row = btn.parentNode.parentNode.rowIndex;
            let json;

            // perform an HTTP GET to retrieve all the data in the JSON file
            $.get('api', function (data, status){
                 json = JSON.parse(data);
                
                 // write the data to be edited to the Edit Contact view
                $ ('#edit-fullname').val(json.table[row-1].name);
                $ ('#edit-email').val(json.table[row-1].email);
                $ ('#edit-phonenum').val(json.table[row-1].phonenum);


                // after the user has updated information and they click to save, run this function
                $('#edit-submit').click(function(){

                    // create an object from the newly updated information. 
                    const formData = {
                        fullname: $('#edit-fullname').val(),
                        email: $('#edit-email').val(),
                        phonenum: $('#edit-phonenum').val(),
                        index: row
                    };

                    const requestData = JSON.stringify(formData);
                    
                    // perform an HTTP PUT request to update the JSON file.
                    $.ajax({
                        type: 'PUT', 
                        url: 'api', 
                        data: requestData,
                        dataType: 'json',
                        contentType: 'application/json',
                    })
                    .done(successHandler())
                    .fail(errorHandler())

                    // after the JSON file has been updated, display the contacts page. 
                    showContacts();

                })
            }
        

        )
            

        }


        

        

        