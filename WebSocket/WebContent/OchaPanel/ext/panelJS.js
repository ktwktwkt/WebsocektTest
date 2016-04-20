		var DSR_SEQ = "";		
		var DSR_INFO;
		var dsr;
		var carmove;
		var ctlproc;
		var x;
		var ws;
		function init(){
			ws = new WSocket(location.hostname, "8080", "WebSocket/chat?id=a&name=");//?id="+"TEST"+Math.round(Math.random()+100));
			ws.connect();
						
			document.getElementById("reconnect").addEventListener("click",ws.connect());
			//document.getElementById("send").addEventListener("click",ws.send(new Date().getTime() + " 테스트"));
		}
		
		
		// 재난 컨트롤러
		var DSRController = (function() {
			function DSRController(){
				this.list = new Array();				
			}
			DSRController.prototype.addDSR = function(d){
				for(var i = 0 ; i < this.list.length ; i++){
					if(this.list[i].TABLEINFO.KEYS.DSR_SEQ == d.TABLEINFO.KEYS.DSR_SEQ ){
						return;
					}
				}
				this.list.push(d);
				return;
			};
			DSRController.prototype.replaceDSR = function(d){
				for(var i = 0 ; i < this.list.length ; i++){
					if(this.list[i].TABLEINFO.KEYS.DSR_SEQ == d.TABLEINFO.KEYS.DSR_SEQ ){
						this.list.splice(i,1,d);
						return;
					}
				}
				return;
			};
			DSRController.prototype.deleteDSR = function(d){
				for(var i = 0 ; i < this.list.length ; i++){
					if(this.list[i].TABLEINFO.KEYS.DSR_SEQ == d.TABLEINFO.KEYS.DSR_SEQ ){
						this.list.slice(0,i).concat(this.list.slice(i+1,this.list.length));
						return;
					}
				}
				return;
			};
			DSRController.prototype.findDSR = function(d){
				for(var i = 0 ; i < this.list.length ; i++){
					if(this.list[i].TABLEINFO.KEYS.DSR_SEQ == d.TABLEINFO.KEYS.DSR_SEQ){
						return i;
					}
				}
				return -1;
			};
			DSRController.prototype.listDSR = function(d){
				this.gridList = new Array();
				for(var i = 0 ; i < this.list.length ; i++){
					this.gridList.push(this.list[i].RECORDINFO);
				}	
				return this.gridList;
			};
			return DSRController;
		})();
		// 차량 컨트롤러
		var CarMoveController = (function() {
			function CarMoveController(){
				this.list = new Array();			
				this.gridList = new Array();
			}
			CarMoveController.prototype.setXXX = function(){
				
			};
			CarMoveController.prototype.addCarMove = function(d){
				for(var i = 0 ;  i < this.list.length ; i++){
					console.log("$$$$")
					console.log(d);
					if(this.list[i].TABLEINFO.KEYS.DSR_SEQ == d.TABLEINFO.KEYS.DSR_SEQ && this.list[i].TABLEINFO.KEYS.CAR_ID == d.TABLEINFO.KEYS.CAR_ID && this.list[i].TABLEINFO.KEYS.DSP_ORD == d.TABLEINFO.KEYS.DSP_ORD){
						return;
					}
				}
				this.list.push(d);
				return;
			};
			CarMoveController.prototype.replaceCarMove = function(d){
				for(var i = 0 ;  i < this.list.length ; i++){
					if(this.list[i].TABLEINFO.KEYS.DSR_SEQ == d.TABLEINFO.KEYS.DSR_SEQ && this.list[i].TABLEINFO.KEYS.CAR_ID == d.TABLEINFO.KEYS.CAR_ID && this.list[i].TABLEINFO.KEYS.DSP_ORD == d.TABLEINFO.KEYS.DSP_ORD){
						this.list.splice(i,1,d);
						return;
					}
				}				
				return;
			};
			CarMoveController.prototype.deleteCarMove = function(d){
				for(var i = 0 ;  i < this.list.length ; i++){
					if(this.list[i].TABLEINFO.KEYS.DSR_SEQ == d.TABLEINFO.KEYS.DSR_SEQ && this.list[i].TABLEINFO.KEYS.CAR_ID == d.TABLEINFO.KEYS.CAR_ID && this.list[i].TABLEINFO.KEYS.DSP_ORD == d.TABLEINFO.KEYS.DSP_ORD){
						this.list.slice(0,i).concat(this.list.slice(i+1,this.list.length));
						return;
					}
				}
				return;
			};
			CarMoveController.prototype.deleteAllCarMove = function(d){
				for(var i = 0 ;  i < this.list.length ; i++){
					if(this.list[i].TABLEINFO.KEYS.DSR_SEQ == d.TABLEINFO.KEYS.DSR_SEQ){
						this.list.slice(0,i).concat(this.list.slice(i+1,this.list.length));
					}
				}
				return;
			};
			CarMoveController.prototype.findCarMove = function(d){
				for(var i = 0 ;  i < this.list.length ; i++){
					if(this.list[i].TABLEINFO.KEYS.DSR_SEQ == d.TABLEINFO.KEYS.DSR_SEQ && this.list[i].TABLEINFO.KEYS.CAR_ID == d.TABLEINFO.KEYS.CAR_ID && this.list[i].TABLEINFO.KEYS.DSP_ORD == d.TABLEINFO.KEYS.DSP_ORD){
						return i;
					}
				}
				return -1;
			};
			CarMoveController.prototype.listCarMove = function(d){
				this.gridList = new Array();
				for(var i = 0 ;  i < this.list.length ; i++){
					if(this.list[i].TABLEINFO.KEYS.DSR_SEQ == d.TABLEINFO.KEYS.DSR_SEQ ){
						this.gridList.push(this.list[i].RECORDINFO);
					}
				}	
				return this.gridList;			
			};
			return CarMoveController;
		})();
		// 관제 컨트롤러
		var CTLProcController = (function() {
			function CTLProcController(){
				this.list = new Array();	
				this.gridList = new Array();
			}
			CTLProcController.prototype.setXXX = function(){
				
			};
			CTLProcController.prototype.addCTLProc = function(d){
				for(var i = 0 ;  i < this.list.length ; i++){
					if(this.list[i].TABLEINFO.KEYS.DSR_SEQ == d.TABLEINFO.KEYS.DSR_SEQ && this.list[i].TABLEINFO.KEYS.CTL_SEQ == d.TABLEINFO.KEYS.CTL_SEQ){
						return;
					}
				}
					console.log(d);
				this.list.push(d);
				return;
			};
			CTLProcController.prototype.replaceCTLProc = function(d){
				for(var i = 0 ;  i < this.list.length ; i++){
					if(this.list[i].TABLEINFO.KEYS.DSR_SEQ == d.TABLEINFO.KEYS.DSR_SEQ && this.list[i].TABLEINFO.KEYS.CTL_SEQ == d.TABLEINFO.KEYS.CTL_SEQ){
						this.list.splice(i,1,d);
						return;
					}
				}
				return;
			};
			CTLProcController.prototype.deleteCTLProc = function(d){
				for(var i = 0 ;  i < this.list.length ; i++){
					if(this.list[i].TABLEINFO.KEYS.DSR_SEQ == d.TABLEINFO.KEYS.DSR_SEQ && this.list[i].TABLEINFO.KEYS.CTL_SEQ == d.TABLEINFO.KEYS.CTL_SEQ){
						this.list.slice(0,i).concat(this.list.slice(i+1,this.list.length));
						return;
					}
				}
				return;
			};
			CTLProcController.prototype.deleteAllCTLProc = function(d){
				for(var i = 0 ;  i < this.list.length ; i++){
					if(this.list[i].TABLEINFO.KEYS.DSR_SEQ == d.TABLEINFO.KEYS.DSR_SEQ){
						this.list.slice(0,i).concat(this.list.slice(i+1,this.list.length));
					}
				}
				return;
			};
			CTLProcController.prototype.findCTLProc = function(d){
				for(var i = 0 ;  i < this.list.length ; i++){
					if(this.list[i].TABLEINFO.KEYS.DSR_SEQ == d.TABLEINFO.KEYS.DSR_SEQ && this.list[i].TABLEINFO.KEYS.CTL_SEQ == d.TABLEINFO.KEYS.CTL_SEQ){
						return i;
					}
				}
				return -1;
			};
			CTLProcController.prototype.listCTLProc = function(d){
				this.gridList = new Array();
				for(var i = 0 ;  i < this.list.length ; i++){
					if(this.list[i].TABLEINFO.KEYS.DSR_SEQ == d.TABLEINFO.KEYS.DSR_SEQ ){
						this.gridList.push(this.list[i].RECORDINFO);
					}
				}		
				return this.gridList;		
			};
			return CTLProcController;
		})();
		
		// 웹소켓 객체(RECV)
		var WSocket = (function() {
			function WSocket(ip, port, param) {
				var ws = this;
				this.ip = ip;
				this.port = port;
				this.param = param;
				this.status = "DISCONNECTED";
			};
			
			WSocket.prototype.connect = function() {
				var ws = this;
				this.wSocket = new WebSocket("ws://"+this.getIP()+":"+this.getPort()+"/"+this.param);	
				this.wSocket.onopen = function (e){
					console.log("Connected.");
					this.status = "CONNECTED";
				};
				
				this.wSocket.onmessage = function (e) {
					//socketReceived
					//var d = JSON.parse(e.data);
					//console.log(d);
					document.getElementById("MainPanel").innerHTML += new Date().getTime() + "\t" + e.data+"<br>";				
				};
				
				this.wSocket.onclose = function (e) {
					console.log("Socket closed.");
					ws.status = "DISCONNECTED";
					document.getElementById("MainPanel").innerHTML += new Date().getTime() + "\t DISCONNECTED. " + e.data+"<br>";		
					//setTimeout(3000,ws.connect());
				};
			}
			
			WSocket.prototype.getIP = function() {
				return this.ip;
			};
			
			WSocket.prototype.getPort = function() {
				return this.port;
			};
			
			WSocket.prototype.send = function(str) {
				this.wSocket.send(str);
				return str;
			};
			
			return WSocket;
		})();
		