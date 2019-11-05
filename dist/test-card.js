class TestCardHelpers{
	
	static get LitElement(){
		//return Object.getPrototypeOf(customElements.get("home-assistant-main"));
		return Object.getPrototypeOf(customElements.get("hui-view"));
	}
	static get html(){
		return HomeFeedCardHelpers.LitElement.prototype.html;
	}
}

class TestCard extends TestCardHelpers.LitElement {
    constructor() {
		super();
		
		this.loadModules();
  	}

	loadModules(){
		try{
			import("./moment.js").then((module) => {
			this.moment = module.default;
			this.buildIfReady();
				});
			}
			catch(e){
				console.log("Error Loading Moment module", e.message);
				throw new Error("Error Loading Moment module" + e.message);
			}
		
		try{
			import("./custom-card-helpers.js").then((module) => {
			this.helpers = module;
			this.buildIfReady();
				});
			}
			catch(e){
				console.log("Error Loading custom-card-helpers module", e.message);
				throw new Error("Error Loading custom-card-helpers module" + e.message);
		}		
	}
	
	createRenderRoot() {
		return this;
	}
	
	static get stylesheet() {
		return TestCardHelpers.html`
			<style>
				ha-card {
			  		padding: 0 16px 16px 16px;
				}
	</style>
	`;
	}

	render() {
		if(!this._hass || !this.moment || !this.helpers){
			return TestCardHelpers.html``;
		} 
		else{
			let nowDate = this.moment().format('MMMM Do YYYY, h:mm:ss a');
			console.log(nowDate);
			return TestCardHelpers.html`This is a test ${nowDate}`;
		}
	}
    
    setConfig(config) {
	  if(!config)
      	throw new Error("Invalid configuration");
	  this._config = config;
	}
    
    buildIfReady(){
    	if(!this._hass || !this.moment || !this.helpers) return;
		this.requestUpdate();
    }
    
  	set hass(hass) {
		this._hass = hass;
		this.buildIfReady();
  	}
  	
  	getCardSize() {
    	return 2;
  	}
}

customElements.define("test-card", TestCard);