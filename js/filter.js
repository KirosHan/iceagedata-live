jQuery(document).ready(function($) {

  // get the action filter option item on page load
  var $filterType = $('.filterOptions li.active a').attr('class');
	
  // get and assign the ourHolder element to the
	// $holder varible for use later
  var $holder = $('ul.ourHolder');

  // clone all items within the pre-assigned $holder element
  var $data = $holder.clone();

  // attempt to call Quicksand when a filter option
	// item is clicked
	$('.filterOptions li a').live("click", function(e) {
		// reset the active class on all the buttons
		$('.filterOptions li').removeClass('active');
		
		// assign the class of the clicked filter option
		// element to our $filterType variable
		var $filterType = $(this).attr('class');
		$(this).parent().addClass('active');
		
		if ($filterType == 'all') {
			// assign all li items to the $filteredData var when
			// the 'All' filter option is clicked
			var $filteredData = $data.find('li');
		} 
		else {
			// find all li elements that have our required $filterType
			// values for the data-type element
			var $filteredData = $data.find('li[data-type=' + $filterType + ']');
		}
		
		// call quicksand and assign transition parameters
		$holder.quicksand($filteredData, {
			duration: 800,
			easing: 'easeInOutQuad',
			adjustHeight:'auto'
		},
		
		// this is callback function
		function() {
		
		
			var move = -15;
			 
			//zoom percentage, 1.2 =120%
			var zoom = 1.1;
		 
			//On mouse over those thumbnail
			$('.zitem').hover(function() {
				 
				//Set the width and height according to the zoom percentage
				width = $('.zitem').width() * zoom;
				height = $('.zitem').height() * zoom;
				 
				//Move and zoom the image
				$(this).find('img').stop(false,true).animate({'width':width, 'height':height, 'top':move, 'left':move}, {duration:200});
				 
				//Display the caption
				$(this).find('div.zoom_icon').stop(false,true).fadeIn(400);
			},
			function() {
				//Reset the image
				$(this).find('img').stop(false,true).animate({'width':$('.zitem').width(), 'height':$('.zitem').height(), 'top':'0', 'left':'0'}, {duration:100});  
		 
				//Hide the caption
				$(this).find('div.zoom_icon').stop(false,true).fadeOut(200);
			});
			
			$("a[rel^='prettyPhoto']").prettyPhoto({
				theme:'facebook',
				social_tools:false
			});
			
		});
		return false;
	});
});