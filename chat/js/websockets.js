var bipsa = bipsa?bipsa:{};
/**
* @author Sebastian Romero Zemoga Inc.
* @class This class abstracts the HTML5 WebSockets functionality 
* @version 1.0
* @param {String} server requiered parameter with server uri
* @param {Object} handlers object with the handlers, responds to the following properties
* 		{"onMessage": Function,
		 "onClose" : Function,
		 "onOpen" : Function }
**/
bipsa.WebSockets = (function( ){

	var connection = {},
		server,
		handlers;

	/**
	* @constructor
	**/
	function WS(_server, _handlers){
		server = _server;
		handlers = _handlers;
		connection = ( typeof(MozWebSocket) === "function" )?new MozWebSocket( server ):new WebSocket( server );
		connection.onmessage = onMessage;
        connection.onclose = onClose;
        connection.onopen = onOpen;
	}

	/**
	* @private Handles the onMessage event
	* @param event WebSocket Event
	**/
	function onMessage(event){
		if( typeof(handlers.onMessage) === "function" )
			handlers.onMessage(event.data);
	}

	/**
	* @private Handles the event, when the connection is closed
	**/
	function onClose(){
		if( typeof(handlers.onClose) === "function" )
			handlers.onClose();
	}

	/**
	* @private Handles the event when the connection is established
	**/
	function onOpen(){
		if( typeof(handlers.onOpen) === "function" )
			handlers.onOpen();
	}


	/*
	* @public Sends message.
	**/
	WS.prototype.send = function(message){
		if(connection)
			connection.send(message);
	};

	return WS;

})();
