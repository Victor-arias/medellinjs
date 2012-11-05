

/**
* @author Sebastian Romero
**/
window.addEventListener("load", function(){


	function createMessage(message){
		var li = document.createElement("li");
		li.innerHTML = message;
		document.querySelector("#chat").appendChild(li);
	}

	var ws = new bipsa.WebSockets("ws://localhost:9300", {
		onMessage : function(message){
			createMessage(message);
		}, onClose : function(){
			createMessage("No hay conexión.");
		}, onOpen : function(){
			createMessage("Conectado.");
		}
	});
	
	document.querySelector("#send").addEventListener("click", function(event){
		createMessage(document.querySelector("#message").value);
		ws.send(document.querySelector("#message").value);
		document.querySelector("#message").value = "";
		Avgrund.hide();
	});

	document.querySelector("#open").addEventListener("click", function(event){
		Avgrund.show( "#default-popup" );
	});


});