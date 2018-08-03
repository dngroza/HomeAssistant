(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{298:function(t,e,a){"use strict";a.d(e,"a",function(){return s});var i=a(256),r=a.n(i);function s(t){const e=r.a.map(t),a=document.createElement("link");return a.setAttribute("href","/static/images/leaflet/leaflet.css"),a.setAttribute("rel","stylesheet"),t.parentNode.appendChild(a),e.setView([51.505,-.09],13),r.a.tileLayer(`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}${r.a.Browser.retina?"@2x.png":".png"}`,{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',subdomains:"abcd",minZoom:0,maxZoom:20}).addTo(e),e}},299:function(t,e,a){"use strict";a(161);var i=a(0),r=a(2),s=a(12);customElements.define("ha-entity-marker",class extends(Object(s.a)(r.a)){static get template(){return i["a"]`
    <style include="iron-positioning"></style>
    <style>
    .marker {
      vertical-align: top;
      position: relative;
      display: block;
      margin: 0 auto;
      width: 2.5em;
      text-align: center;
      height: 2.5em;
      line-height: 2.5em;
      font-size: 1.5em;
      border-radius: 50%;
      border: 0.1em solid var(--ha-marker-color, var(--default-primary-color));
      color: rgb(76, 76, 76);
      background-color: white;
    }
    iron-image {
      border-radius: 50%;
    }
    </style>

    <div class="marker">
      <template is="dom-if" if="[[entityName]]">[[entityName]]</template>
      <template is="dom-if" if="[[entityPicture]]">
        <iron-image sizing="cover" class="fit" src="[[entityPicture]]"></iron-image>
      </template>
    </div>
`}static get properties(){return{hass:{type:Object},entityId:{type:String,value:""},entityName:{type:String,value:null},entityPicture:{type:String,value:null}}}ready(){super.ready(),this.addEventListener("click",t=>this.badgeTap(t))}badgeTap(t){t.stopPropagation(),this.entityId&&this.fire("hass-more-info",{entityId:this.entityId})}})},605:function(t,e,a){"use strict";a.r(e),a(104);var i=a(0),r=a(2),s=a(256),n=a.n(s),o=(a(117),a(76),a(299),a(15)),c=a(16),l=a(11),u=a(298);n.a.Icon.Default.imagePath="/static/images/leaflet",customElements.define("ha-panel-map",class extends(Object(l.a)(r.a)){static get template(){return i["a"]`
    <style include="ha-style">
      #map {
        height: calc(100% - 64px);
        width: 100%;
        z-index: 0;
      }
    </style>

    <app-toolbar>
      <ha-menu-button narrow='[[narrow]]' show-menu='[[showMenu]]'></ha-menu-button>
      <div main-title>[[localize('panel.map')]]</div>
    </app-toolbar>

    <div id='map'></div>
    `}static get properties(){return{hass:{type:Object,observer:"drawEntities"},narrow:{type:Boolean},showMenu:{type:Boolean,value:!1}}}connectedCallback(){super.connectedCallback();var t=this._map=Object(u.a)(this.$.map);this.drawEntities(this.hass),setTimeout(()=>{t.invalidateSize(),this.fitMap()},1)}disconnectedCallback(){this._map&&this._map.remove()}fitMap(){var t;0===this._mapItems.length?this._map.setView(new n.a.LatLng(this.hass.config.core.latitude,this.hass.config.core.longitude),14):(t=new n.a.latLngBounds(this._mapItems.map(t=>t.getLatLng())),this._map.fitBounds(t.pad(.5)))}drawEntities(t){var e=this._map;if(e){this._mapItems&&this._mapItems.forEach(function(t){t.remove()});var a=this._mapItems=[];Object.keys(t.states).forEach(function(i){var r=t.states[i],s=Object(c.a)(r);if(!(r.attributes.hidden&&"zone"!==Object(o.a)(r)||"home"===r.state)&&"latitude"in r.attributes&&"longitude"in r.attributes){var l;if("zone"===Object(o.a)(r)){if(r.attributes.passive)return;var u="";if(r.attributes.icon){const t=document.createElement("ha-icon");t.setAttribute("icon",r.attributes.icon),u=t.outerHTML}else u=s;return l=n.a.divIcon({html:u,iconSize:[24,24],className:""}),a.push(n.a.marker([r.attributes.latitude,r.attributes.longitude],{icon:l,interactive:!1,title:s}).addTo(e)),void a.push(n.a.circle([r.attributes.latitude,r.attributes.longitude],{interactive:!1,color:"#FF9800",radius:r.attributes.radius}).addTo(e))}var d=r.attributes.entity_picture||"",p=s.split(" ").map(function(t){return t.substr(0,1)}).join("");l=n.a.divIcon({html:"<ha-entity-marker entity-id='"+r.entity_id+"' entity-name='"+p+"' entity-picture='"+d+"'></ha-entity-marker>",iconSize:[45,45],className:""}),a.push(n.a.marker([r.attributes.latitude,r.attributes.longitude],{icon:l,title:Object(c.a)(r)}).addTo(e)),r.attributes.gps_accuracy&&a.push(n.a.circle([r.attributes.latitude,r.attributes.longitude],{interactive:!1,color:"#0288D1",radius:r.attributes.gps_accuracy}).addTo(e))}})}}})}}]);
//# sourceMappingURL=a8bafd5d9f208aa5f9a7.chunk.js.map