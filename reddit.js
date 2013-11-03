var rdtay;
$(document).ready(function() {
	// get unique reddit ID for thread
	rid = $("#shortlink-text").val().substr(-6, 6);
	// init localstorage data if needed
	if (typeof localStorage['reddit_ay'] === 'undefined') {
		localStorage['reddit_ay'] = JSON.stringify('');
	}
	if (typeof localStorage['rdtlastcleanup_ay'] === 'undefined') {
		localStorage['rdtlastcleanup_ay'] = new Date().getTime();
	}
	// check if localstorage data is empty, if so, initialize object
	if (localStorage['reddit_ay'] == '""') {
		rdtay = {};
	} else {
		rdtay = JSON.parse(localStorage['reddit_ay']);
	}
	if (typeof rdtay[rid] === 'undefined') {
		// visiting thread for the first time...
		// do nothing...
	} else {
		// loop through each comment and compare the timestamp with the cached timestamp
		count = 0;
		$("div.entry div.noncollapsed time:not(.edited-timestamp)").each(function() {
			if (new Date($(this).attr("datetime")) > new Date(rdtay[rid])) {
				$(this).parent().parent().parent().css({'borderLeft': '3px solid red', 'paddingLeft': '10px', 'borderRight': '3px solid red', 'paddingRight': '10px'});
				count++;
			}
		});
		// update page title with number of new comments
		if (count != 0) document.title = '['+count+'] '+document.title;
		// update last visited timestamp for this thread
	}
	rdtay[rid] = new Date();
	// save updated dataset to localstorage
	localStorage['reddit_ay'] = JSON.stringify(rdtay);
	// do a periodic check to see if we need to clean up the storage data (delete if last clean up was more than 1 day ago)
	if (Math.abs((new Date().getTime() - localStorage['rdtlastcleanup_ay'])/(24*60*60*100)) > 1) {
		localStorage['reddit_ay'] = JSON.stringify('');
		localStorage['rdtlastcleanup_ay'] = new Date().getTime();
	}
});