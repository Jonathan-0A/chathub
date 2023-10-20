var uwindow = document.getElementById('UserWindow');
var list = document.getElementById('list');

list.addEventListener('click', ()=> {
	 if(uwindow.style.display == "block") {
		uwindow.style.display = "none";
		console.log('closed')
	}
	else {
		uwindow.style.display = "block";
		console.log('opened')
	}
});



const emojiButton = document.querySelector('#emoji-btn');
const messageInput = document.querySelector('#user-msg');
const emojiPicker = document.querySelector('emoji-picker');

emojiButton.addEventListener('click', ()=> {
	// alert('Emoji feature is not working properly');
	 if(emojiPicker.style.display == "block") {
		emojiPicker.style.display = "none";
	}
	else {
		emojiPicker.style.display = "block";

		emojiPicker.addEventListener('emoji-click', (event)=> {
			const emoji = event.detail.emoji.unicode;
			messageInput.value += emoji;
		})
	}	
})



function addZero(t) {
    return(t<10) ? "0" + t : t;
}

function clock() {
	const Time = document.getElementById('time');
	const date = new Date();
	const hour = date.getHours() > 12 ? `${date.getHours() - 12}` : date.getHours();
	const session = date.getHours() > 12 ? `p.m.` : `a.m.`;
	const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
	const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const dayOfWeek = date.getDay();
	const dayName = daysOfWeek[dayOfWeek];

	Time.textContent = `${dayName} : ${hour} : ${minutes} : ${session}`;
}
setInterval(clock, 1000);





