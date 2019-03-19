$(document).ready(function() {
	$("#review-form").submit(function(){
		var form = $(this);
		var error = false;
		var emptyContact = 0;
		var req = {};

		$('.error-text').removeClass('d-inline-block');

		if ($('#range').val() !== '' && $('#name').val() !== '') {
			req.rating = $('#range').val();
			req.userName = $('#name').val();

			if ($('#teleg').val() !== '') { 
				req.telegram = $('#teleg').val();
			} else emptyContact++;
			if ($('#email').val() !== '') { 
				req.email = $('#email').val();
			}else emptyContact++;
			if ($('#tel').val() !== '') { 
				req.tel = $('#tel').val();
			}else emptyContact++;

			if (emptyContact == 3) {
				error = true;
				$('.error-text').addClass('d-inline-block');
			}
		} else{
			error = true;
			return false;
		}
		
		if (!error) { 
			$.ajax({ 
			   	type: 'POST', 
			   	url: 'handler.php', 
			   	dataType: 'json', 
			   	data: req, 
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

		console.log(req);
		console.log(emptyContact);
		console.log(error);

		return false;
	});
});