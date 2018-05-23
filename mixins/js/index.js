(function() {
	var $left = $('#left'),
		$rightTitle = $('#right-title'),
		$rightIframe = $('#right-iframe');
	$left.on('click', 'a', function() {
		var $this = $(this),
			href = $this.data('href'),
			title = $this.text();
		$rightIframe.attr('src', href);

		$rightTitle.text(title);
		$rightTitle.append('<a href="'+ href +'">'+ href +'</a>');
	});
	
})(jQuery)