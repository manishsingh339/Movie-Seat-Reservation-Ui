var BookTicket = {
	userNameInput : $("#userName"),
	nobOfSeatInput : $("#nobOfTickets"),
	startSelect: $('#start-select-btn'),
 	confirmBtn : $("#confirm-btn"),
 	confirmView : $("#confirm-view"),
 	inputSeats : 0,
 	selectedSeats : {count:0,list:[]},
 	bookedTickets : [],

 	showSeatMap: function(nubOfTickets) {
		var rowData = [ 'A', 'B', 'C' , 'D', 'E', 'F',  'G' ],
			nobOfColoumn = 16;
			$('#table-container').empty();
			BookTicket.selectedSeats.list = [];
			BookTicket.inputSeats = 0;
			BookTicket.selectedSeats.count = 0; 		
			html = '<table cellspacing="10"><thead><tr></tr></thead><tbody>';
			BookTicket.inputSeats = nubOfTickets;
			val = null;			
		for (var i = 0; i < rowData.length; ++i) {
		    html += '<tr>';
		    for (var j = 1; j <= nobOfColoumn; ++j ) {		    	
		    	val = rowData[i]+j;
		    	var bookingStatus = BookTicket.isThisSeatBooked(val);
		    	if(bookingStatus)
		    		html += '<td class="pointer booked" id='+val+'>' + val + '</td>';
		    	else
		    		html += '<td class="pointer" id='+val+'>' + val + '</td>';
		    }
		    html += "</tr>";
		}
		$(html).appendTo('#table-container'); 		
 	},

 	showBookingconfirmation: function(){
 		var userName = BookTicket.userNameInput.val().trim(),
 			nobOfTickets = BookTicket.nobOfSeatInput.val().trim();
 		BookTicket.confirmView.append('<tr><td>'+userName+'</td>'+'<td>'+nobOfTickets+'</td><td>'+BookTicket.selectedSeats.list.join()+'</td></tr>');		
		BookTicket.bookedTickets = BookTicket.bookedTickets.concat(BookTicket.selectedSeats.list);		
		BookTicket.nobOfSeatInput.val('');
		BookTicket.userNameInput.val('')
		BookTicket.showSeatMap();
 	},

 	isThisSeatBooked: function(seatId){
 		var index = BookTicket.bookedTickets.indexOf(seatId);
 		if (index == -1) {
 			return false;
 		}else{
 			return true;
 		}
 	}
}

BookTicket.startSelect.click(function(){
	$(".confirm-container, .steatMap-container").show();
	var nubOfTickets = BookTicket.nobOfSeatInput.val().trim();
	if(nubOfTickets !== '' && !isNaN(nubOfTickets)){
		BookTicket.showSeatMap(nubOfTickets);
	}else if(nubOfTickets !== ''){
		alert("please valid nob of seats");
	}
});

BookTicket.confirmBtn.click(function(){
	var userName = BookTicket.userNameInput.val().trim();
	if(!BookTicket.inputSeats){
		return false
	}else if(BookTicket.selectedSeats.count != BookTicket.inputSeats){
		alert("Please select "+BookTicket.inputSeats+" seats.");
	}else if(userName === ""){
		alert('Please provide name');
	}else if(!isNaN(userName)){
		alert('Please enter valid name')
	}else{
		BookTicket.showBookingconfirmation();
	}
});

$('#table-container').on('click', '.pointer', function () { 	 	
 	var id = this.getAttribute('id'),
 		isSelected = $('#'+id).hasClass("selected"),
 		isBooked = $('#'+id).hasClass("booked"),
 		allowToSelectSeat = BookTicket.inputSeats
 	if(isBooked){
 		return false
 	}else if(isSelected){
		$('#'+id).removeClass('selected'); 		
		BookTicket.selectedSeats.count--;
		var index = BookTicket.selectedSeats.list.indexOf(id);
		BookTicket.selectedSeats.list.splice(index, 1);
 	}else if(BookTicket.selectedSeats.count >= allowToSelectSeat){
 		return false;
 	}else{ 	
 		$('#'+id).addClass('selected'); 		
 		BookTicket.selectedSeats.count++;
 		BookTicket.selectedSeats.list.push(id);
 	}	
 	
});

$(function(){
	$(".confirm-container, .steatMap-container").hide();
});
