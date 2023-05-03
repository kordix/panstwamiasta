function losuj(alphabet,litera,socket ) {
    console.log(alphabet);
    let losowe = Math.ceil(Math.random() * alphabet.length);
    litera.value = alphabet.slice(losowe, losowe + 1)[0];
    socket.emit('litera', litera.value);
}

export default losuj;