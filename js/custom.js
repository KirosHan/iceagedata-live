jQuery(document).ready(function($) {

	$('#send_message').click(function(e){
		e.preventDefault();

		var error = false;
		var name = $('#name').val();
		var email = $('#email').val();
		var subject = $('#subject').val();
		var message = $('#message').val();
		var re = new RegExp(/^[a-z0-9_\-]+(\.[_a-z0-9\-]+)*@([_a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)$/);

		if(name.length == 0){
			var error = true;
			$('#name_error').fadeIn(500);
		}else{
			$('#name_error').fadeOut(500);
		}
		if(email.length == 0 || !email.match(re)) {
			var error = true;
			$('#email_error').fadeIn(500);
		}else{
			$('#email_error').fadeOut(500);
		}
		if(message.length == 0){
			var error = true;
			$('#message_error').fadeIn(500);
		}else{
			$('#message_error').fadeOut(500);
			}

		if(error == false){
			$('#send_message').attr({'disabled' : 'true', 'value' : 'Sending...' });
			/* using the jquery's post(ajax) function and a lifesaver
			function serialize() which gets all the data from the form
			we submit it to send_email.php */
			$.post("js/send_email.php", $("#contact_form").serialize(),function(result){
				if(result == 'sent'){
					$('#cf_submit_p').remove();
					$('#mail_success').fadeIn(500);
				}else{
					$('#mail_fail').fadeIn(500);
					$('#send_message').removeAttr('disabled').attr('value', 'Send The Message');
				}
			});
		}
	});
	
	//Accordion Scripts
	$.fn.extend({  
         accordion: function() {       
            return this.each(function() {
				if($(this).data('accordiated'))
					return false;									
				$.each($(this).find('ul, li>div'), function(){
					$(this).data('accordiated', true);
					$(this).hide();
				});
				$.each($(this).find('a:not(.foo)'), function(){
					$(this).click(function(e){
						activate(e.target);
						return void(0);
					});
				});
				
				var active = false;
				if(location.hash)
					active = $(this).find('a[href=' + location.hash + ']')[0];
				else if($(this).find('li.current'))
					active = $(this).find('li.current a')[0]; 
				
				if(active){
					activate(active, 'toggle','parents');
					$(active).parents().show();
				}
				
				function activate(el,effect,parents){
					$(el)[(parents || 'parent')]('li').toggleClass('active').siblings().removeClass('active').children('ul, div').slideUp('slow');
					$(el).siblings('ul, div')[(effect || 'slideToggle')]((!effect)?'slow':null);
				}
				
            });
        } 
    }); 
	
	//Accordion End
	
	$('#carousel').elastislide({
				imageW 	: 280,
				minItems	: 1,
				margin	: 40
	});
			
	$('.content_slides').slides({
		generateNextPrev: false,
		slideSpeed: 350
	});
	
	$("a[rel^='prettyPhoto']").prettyPhoto({
		theme:'facebook',
		social_tools:false
	});
	
	var move = -15;
	var zoom = 1.1;
	$('.zitem').hover(function() {
		width = $('.zitem').width() * zoom;
		height = $('.zitem').height() * zoom;
		$(this).find('img').stop(false,true).animate({'width':width, 'height':height, 'top':move, 'left':move}, {duration:200});
		$(this).find('div.zoom_icon').stop(false,true).fadeIn(400);
	},
	function() {
		$(this).find('img').stop(false,true).animate({'width':$('.zitem').width(), 'height':$('.zitem').height(), 'top':'0', 'left':'0'}, {duration:100});  
		$(this).find('div.zoom_icon').stop(false,true).fadeOut(200);
	});
	
	$('#top_nav').tinyNav({
		active: 'selected'
	});
	
	$('#filter_nav').tinyNav({
		active: 'selected'
	});
	
	
	// Skin Switcher
	$('#skin_switcher a.skin_switcher_toggle').toggle(function(){
		$('#skin_switcher').stop().animate({left:'0'},200);
		$(this).css('background','url(images/skin_switcher_close.png) no-repeat');
		$(this).css('background-position','6px 6px');
	},function(){
		$('#skin_switcher').stop().animate({left:'-240px'});
		$(this).css('background','url(images/skin_switcher_open.png) no-repeat');
		$(this).css('background-position','6px 6px');
	});
	
	var $c;
	$('#skin_select').change(function() {
		if($(this).val()=='default'){
			$("LINK[href*='" + $c + "']").remove();
		}
		else {
		$("LINK[href*='" + $c + "']").remove();
		$c=$(this).val();
		$('head').append('<link rel="stylesheet" href="' + $c + '" type="text/css" />');
		return false;
		}
	});
	
	var offset = $("#skin_switcher").offset();
	var topPadding = 250;
	$(window).scroll(function() {
		if ($(window).scrollTop() > offset.top) {
			$("#skin_switcher").stop().animate({
				marginTop: $(window).scrollTop() - offset.top + topPadding
			});
		} else {
			$("#skin_switcher").stop().animate({
				marginTop: 0
			});
		};
	});
});
