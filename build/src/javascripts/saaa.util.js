var saaa_util={file:{write:function(C,B){if(!air){return }var A=new air.FileStream();A.open(new air.File("app-storage:/"+C),air.FileMode.WRITE);A.writeObject(B);A.close()},read:function(C){if(!air){return""}var A=new air.FileStream();A.open(new air.File("app-storage:/"+C),air.FileMode.READ);var B=A.readObject();A.close();return B}},inherits:function(B,D){for(var A in B){try{D[A]=B[A]}catch(C){air.trace(C)}}}};function array_list(){this.list=[]}array_list.prototype.count=function(){return this.list.length};array_list.prototype.add=function(A){return this.list.push(A)};array_list.prototype.get_at=function(A){if(A>-1&&A<this.list.length){return this.list[A]}else{return undefined}};array_list.prototype.clear=function(){this.list=[]};array_list.prototype.remove_at=function(C){var A=this.list.length;if(A>0&&C>-1&&C<this.list.length){switch(C){case 0:this.list.shift();break;case A-1:this.list.pop();break;default:var D=this.list.slice(0,C);var B=this.list.slice(C+1);this.list=D.concat(B);break}}};array_list.prototype.insert=function(E,D){var A=this.list.length;var C=-1;if(D>-1&&D<=A){switch(D){case 0:this.list.unshift(E);C=0;break;case A:this.list.push(E);C=A;break;default:var F=this.list.slice(0,D-1);var B=this.list.slice(D);this.list=this.list.concat(B.unshift(E));C=D;break}}return C};array_list.prototype.index_of=function(D,B){var A=this.list.length;var C=-1;if(B>-1&&B<A){var E=B;while(E<A){if(this.list[E]==D){C=E;break}E++}}return C};array_list.prototype.Last_index_of=function(D,B){var A=this.list.length;var C=-1;if(B>-1&&B<A){var E=A-1;while(E>=B){if(this.list[E]==D){C=E;break}E--}}return C};function nuevaVentana(F,C,H,J,A,B,E,G){var I=new air.NativeWindowInitOptions();I.systemChrome=air.NativeWindowSystemChrome.STANDARD;if(J==true){I.systemChrome=air.NativeWindowSystemChrome.NONE}I.transparent=J;I.resizable=A;I.maximizable=B;if(E==undefined){E=0}if(G==undefined){G=0}var D=new air.Rectangle(E,G);D.width=C;D.height=H;newHTMLLoader=air.HTMLLoader.createRootWindow(true,I,true,D);newHTMLLoader.load(new air.URLRequest(F));return newHTMLLoader};