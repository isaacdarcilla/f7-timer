<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar>
      <f7-nav-title v-for="race in races" :title="race.event"></f7-nav-title>
      <f7-nav-right>
        <f7-link icon-ios="f7:add" icon-aurora="f7:add" sheet-open=".demo-sheet-swipe-to-close" icon-md="material:add" v-on:click="tokens" panel-open="right"></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-sheet
      class="demo-sheet-swipe-to-close"
      style="height:auto"
      swipe-to-close
      backdrop
    >
      <div class="swipe-handler"></div>

      <form v-on:submit.prevent="AddEvent" action="" method="GET">
        <f7-page-content>
            <f7-block-title large>Event</f7-block-title>
        <f7-block>
          <p>Add event details including time and event name. Note that organizers can only add this event. If you are a facilator, you can ignore this.</p>
          <p>Copy and distribute the token to your facilator. This token is auto-generated and serves as the identifier of the event.</p>
          
        </f7-block>
            <f7-list no-hairlines-md>
              <f7-list-input
                label="Event"
                type="text"
                :value="eventname"
                @input="eventname = $event.target.value"
                placeholder="Type the event name"
                required
                validate
                clear-button
              >
              </f7-list-input>
              <f7-list-input
                label="Hours"
                type="number"
                :value="hour"
                @input="hour = $event.target.value"
                placeholder="Type number of hours"
                required
                validate
                clear-button
              >
              </f7-list-input>
              <f7-list-input
                label="Minutes"
                type="number"
                :value="minute"
                @input="minute = $event.target.value"
                placeholder="Type number of minutes"
                required
                validate
                clear-button
              >
              </f7-list-input>
              <f7-list-input
                label="Seconds"
                type="number"
                :value="second"
                @input="second = $event.target.value"
                placeholder="Type number of seconds"
                required
                validate
                clear-button
              >
              </f7-list-input>
              <f7-list-input
                label="Token"
                type="text"
                disabled
                :value="token"
                @input="token = $event.target.value"
                placeholder="Copy this token"
                required
                validate
              >
              </f7-list-input>

                               
            </f7-list>
            <f7-block>
              <f7-button type="submit" sheet-close=".demo-sheet-swipe-to-close" fill>Create</f7-button>
            </f7-block>
          </f7-page-content>
        </form>
    </f7-sheet>


    <!-- Page content-->
    <p class="styled" id="countdown">00:00:00</p>


    <f7-block>
      <f7-segmented raised round tag="p">
        <f7-button v-for="time in times" v-on:click="timeDisplay(time.date_expire)" round>View</f7-button>
        <f7-button v-on:click="getEvent" round>Token</f7-button>
      </f7-segmented>
    </f7-block>

    <f7-block>
      <f7-block-title>
        <p class="details">Details</p>
      </f7-block-title>
      <f7-list media-list>
        <f7-list-item v-for="race in races" 
        :title="race.event"
        :after="race.token"
        :text="race.switch"
        > 
        </f7-list-item>
      </f7-list>
    </f7-block>

    <!-- <f7-block>
      <f7-list media-list>
        <f7-list-item v-for="time in times" 
        :title="time.time"
        > 
        </f7-list-item>
      </f7-list>
    </f7-block> -->

  </f7-page>
</template>

<style type="text/css">
  .styled {
    font-size: 50px;
    text-align: center;
  }
  .details {
    margin-left: 15px;
  }
</style>

<script>
  import cordovaApp from '../js/cordova-app.js';
  import routes from '../js/routes.js';
  import $ from "jquery";

  export default {
    data() {
      return {
        apis: "http://localhost/event/",
        races: [],
        race: "",
        times: [],
        time: "",
        timed: "",
        token: "",
        stored: "",
        eventname: "",
        hour: "",
        minute: "",
        second: "",
      }
    },
    methods: {
      tokens: function() {
        var tokenized = Math.floor(100000 + Math.random() * 900000)
        this.token = tokenized
        console.log(this.token)
      },
      AddEvent: function(){
        var self = this
        var api = this.apis + "event.php?eventname=" + this.eventname + "&token=" + this.token + "&hour=" + this.hour + "&minute=" + this.minute + "&second=" + this.second
        console.log(api)
        $.ajax({
          url: api,
          type: "get",
          dataType: "json",
          async: true,
          success: function(json){
          }
        })
        this.openPreloader();
      },
      openPreloader() {
        const app = this.$f7;
        app.dialog.preloader("Loading data...");
        setTimeout(() => {
          app.dialog.close();
        }, 700);
      }, 
      openConfirm() {
        const app = this.$f7;
        app.dialog.confirm('Countdown has finished. Tap view button to view new timer.', 'Finish', () => {
          
        });
      },
      recount() {
      	var self = this
      	var api = this.apis + "recount.php?token=" + self.stored;
        console.log(api)

        $.ajax({
          url: api,
          type: "get",
          dataType: "json",
          async: true,
          success: function(json){
            self.times = json
            console.table(self.times)
          }
        });
      },
      getTime: function(){
        var self = this
        var api = this.apis + "time.php?token=" + self.stored;
        console.log(api)

        $.ajax({
          url: api,
          type: "get",
          dataType: "json",
          async: true,
          success: function(json){
            self.times = json
            console.table(self.times)
          }
        });
      },
      timeDisplay: function(id){
        var self = this
        self.timed = id
        console.log(self.timed)

        var countdownDate = new Date(self.timed).getTime();
        var interval = setInterval(function() {
        	var now = new Date().getTime();
        	var distance = countdownDate - now;

        	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        	var seconds = Math.floor((distance % (1000 * 60))/ 1000);

        	//document.getElementById("countdown").innerHtml = days + ":" + hours + ":" + minutes + ":" + seconds;

        	if(hours < 10) {
        		hours = "0" + hours
        	}
        	if(minutes < 10) {
        		minutes = "0" + minutes
        	}
        	if(seconds < 10) {
        		seconds = "0" + seconds
        	}

        	$('#countdown').replaceWith('<p class="styled" id="countdown">' + hours + ':' + minutes + ':' + seconds +'</p>');

        	//console.log(days + ":" + hours + ":" + minutes + ":" + seconds);
        	if(distance < 0) {
        		clearInterval(interval);
        		$('#countdown').replaceWith('<p class="styled" id="countdown">00:00:00</p>');

        		self.recount()
        		console.log("Recount " + self.timed)
        		self.openConfirm()
        		self.getUpdatedEvent()
        	}
        }, 1000);
      },
      refresh: function(){
        var self = this
        var api = this.apis + "fetch.php?token=" + self.stored;
        console.log(api)
        this.getTime()
        $.ajax({
          url: api,
          type: "get",
          dataType: "json",
          async: true,
          success: function(json){
            self.races = json
            console.table(this.races)
          }
        });
      },
      getUpdatedEvent: function() {
				var api = this.apis + "fetch.php?token=" + self.stored;
        var tk = self.stored;
        console.log("ID.getUpdatedEvent - " + tk)
        console.log(api)
            
        $.ajax({
        	url: api,
          type: "get",
          dataType: "json",
          async: true,
            success: function(json){
  	          this.races = json
              console.table(this.races)
            }
          }
        )       	
      },
      getEvent: function(){
        var self = this
        const router = self.$f7router
        const app = self.$f7;
          app.dialog.prompt('Type the token in the textbox below', 'Token', (name) =>{
            var api = this.apis + "fetch.php?token=" + `${name}`;
            var tk = `${name}`;
            console.log("ID - " + tk)
            console.log(api)
            self.stored = tk
            
            $.ajax({
              url: api,
              type: "get",
              dataType: "json",
              async: true,
              success: function(json){
                this.races = json
                console.table(this.races)
              }
            })          
            this.refresh()
            this.openPreloader()
          }
        );
      }, 
    },
    mounted() {
      this.getEvent()
    }
  }
</script>