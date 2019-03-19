$(document).ready(function() {
	$("#review-form").submit(function(){
		var form = $(this);
		var error;
		var req = {};

		if ($('#range').val() !== '' && $('#name').val() !== '') {

			error = 0;
			$('.error-text').removeClass('d-inline-block');

			req.review = $('#range').val();
			req.userName = $('#name').val();

			if ($('#teleg').val() !== '') { 
				req.telegram = $('#teleg').val();
			} else error++;
			if ($('#email').val() !== '') { 
				req.email = $('#email').val();
			}else error++;
			if ($('#tel').val() !== '') { 
				req.tel = $('#tel').val();
			}else error++;

			if (error = 3) {
				$('.error-text').addClass('d-inline-block');
			}
		} else{
			return false;
		}
		
		

		console.log(req);

		return false;
	});
});