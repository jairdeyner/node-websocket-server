const socket = io();

const $lblOnline = document.getElementById('lblOnline');
const $lblOffline = document.getElementById('lblOffline');
const $txtMessage = document.getElementById('txtMessage');
const $btnEnviar = document.getElementById('btnEnviar');

socket.on('connect', () => {
  // console.log('conectado');
  $lblOnline.style.display = 'inline';
  $lblOffline.style.display = 'none';
});

socket.on('disconnect', () => {
  // console.log('desconectado del servidor');
  $lblOnline.style.display = 'none';
  $lblOffline.style.display = 'inline';
});

socket.on('send-message', (payload) => {
  console.log(payload);
});

$btnEnviar.addEventListener('click', () => {
  const message = $txtMessage.value;

  const payload = {
    message,
    id: '13123AD',
    date: new Date().getTime(),
  };

  socket.emit('send-message', payload, (id) => {
    console.log('Desde el server', id);
  });
});
