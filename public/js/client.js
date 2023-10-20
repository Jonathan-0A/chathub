const socket = io();
// var users = {};
var username;
var chats = document.querySelector('.chats');
var users_count = document.querySelector('.users-count');
var users_list = document.querySelector('.users-list');
var msg_send = document.querySelector('#user-send');
var user_msg = document.querySelector('#user-msg');
var user_title = document.querySelector('#user-title');
const activeTypers = document.querySelector(".active-typers");
const typingIndicator = document.getElementById('typing-indicator');

// const colorOptions = ["#FFD000", "#00FFBC", "#FF77CB", "cyan"];
// const color = colorOptions[Math.floor(Math.random() * 3)];

do {
	username = prompt("Enter your name: ");	
}while(!username);

if(username.trim()=='') {
	do {
		username = prompt("Enter your name: ");
	}while(!username);
}

// It will be called when user will join
socket.emit("join-room", ROOMID, USERID);
socket.emit('new-user-joined', username);

socket.on('new-user-joined', ()=> {
	user_title.innerHTML = username;
})
// Notifying that user has joined
socket.on('user-connected', (socket_name)=> {
	userJoinLeft(socket_name, 'joined');
});
// Notifying that user has left
socket.on('user-disconnected', (user)=> {
	userJoinLeft(user, 'Left');
});

// For updating users list and users count
socket.on('user-list', (users)=> {
	users_list.innerHTML = "";
	users_arr = Object.values(users);
	for(i=0;i<users_arr.length;i++) {
		let div = document.createElement('div');
		div.innerHTML = `<img src="person.png"></img>` + `<span>` + users_arr[i] + `</span>`;
		users_list.appendChild(div);
	}
	users_count.innerHTML = users_arr.length;
});

socket.on('message', (data)=> {
	appendMessage(data, 'incoming');
})

msg_send.addEventListener('click', (e)=> {
	e.preventDefault();
	let data = {
		user: username,
		msg: user_msg.value
	};
	if(user_msg.value != '') {
		appendMessage(data, 'outgoing');
		socket.emit('message', data);
		user_msg.value = '';
	}
})
 user_msg.addEventListener('input', () => {
    if (user_msg.value.trim() != '') {
      socket.emit('typing');
    } else {
      socket.emit('stopTyping');
    }
  });
socket.on("user-typing", (USERID, username) => {
	typingIndicator.textContent = `Someone is typing...`;
});
socket.on('userStoppedTyping', (USERID, username) => {
    typingIndicator.textContent = '';
});

function userJoinLeft(name, status) {
	let div = document.createElement('div');
	let content = `<p><b>${name}</b> ${status} the chat</p>`;

	div.classList.add('user-join');
	div.innerHTML = content;
	chats.appendChild(div);

	chats.scrollTop = chats.scrollHeight;
}
function appendMessage(data, status, color) {
	const date = new Date();
  const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const time = `${hour}:${minutes}`

	let div = document.createElement('div');
	div.classList.add('message', status);
	let content = `
		<h5>${data.user}</h5>
		<span>
			<p>${data.msg}</p>
		</span>
		<div>${time}</div>
	`;
	div.innerHTML = content;
	chats.appendChild(div);
	typingIndicator.textContent = '';

	chats.scrollTop = chats.scrollHeight;
}








