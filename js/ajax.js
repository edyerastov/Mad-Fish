$(document).ready(function() {
	$("#review-form").submit(function(){
		var form = $(this);
		var error = false;
		var emptyContact = 0;

		$('.error-text').removeClass('d-inline-block');

		if ($("input:radio:checked").length !== 0 && $('#name').val() !== '') {

			if ($('#teleg').val() == '') { 
				emptyContact++;
			} 
			if ($('#email').val() == '') { 
				emptyContact++;
			} else if (isValidEmail($('#email').val()) == false){
				return false;
			}
			if ($('#tel').val() == '') {
				emptyContact++; 
			} else if (isValidPhone($('#tel').val()) == false){
				return false;
			}

			if (emptyContact == 3) {
				error = true;
				$('.error-text.contacts').addClass('d-inline-block');
			}
		} else if ($("input:radio:checked").length == 0) {
			$('.error-text.radio').addClass('d-inline-block');
			error = true;
			return false;
		} else {
			error = true;
			return false;
		}
		
		if (!error) { 
			$.ajax({ 
			   	type: 'POST', 
			   	url: 'handler.php', 
			   	dataType: 'json', 
			   	data: form.serializeArray(), 
		       	beforeSend: function(data) {
		            form.find('input[type="submit"]').attr('disabled', 'disabled');
		        },
		       	success: function(data){ 
		       		if (data['error']) { 
		       			alert(data['error']); 
		       		} else { 
		       			alert('Спасибо, что оценили нас!');
		       		}
		        },
		       	error: function (xhr, ajaxOptions, thrownError) { 
		            alert(xhr.status); 
		            alert(thrownError);
		        },
		       	complete: function(data) { 
		        	form.find('input[type="submit"]').prop('disabled', false); 
		        }
		                  
			});
		}		

		return false;
	});

	function isValidEmail(emailAddress) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(emailAddress);
    }
    function isValidPhone(phoneNumber) {
    	var pattern = new RegExp(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
        return pattern.test(phoneNumber);
    }

});