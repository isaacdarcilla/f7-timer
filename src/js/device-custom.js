var deviceApp = {
	f7: null,
	handleDeviceID: function() {
		var f7 = deviceApp.f7;
		document.addEventListener('deviceready', onDeviceReady, false);
		function onDeviceReady(){
			console.log(device.uuid + ' - Device UUID (device-custom.js)');
		}
	},
	init: function(f7) {
		deviceApp.f7 = f7;
		deviceApp.handleDeviceID();
	}
};

export default deviceApp;