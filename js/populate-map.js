(function($) {

	$(document).ready( function() {

		jQuery("#casaroyal-page-half-map #listings-map").height( jQuery(window).height() - jQuery("#header").height() );
		jQuery("#casaroyal-page-half-map #listings-map").css( "top", jQuery("#header").height() );

		$(window).on('resize', function(event) {

			jQuery("#casaroyal-page-half-map #listings-map").height( jQuery(window).height() - jQuery("#header").height() );
			jQuery("#casaroyal-page-half-map #listings-map").css( "top", jQuery("#header").height() );

		});

		var map;
		var marker;
		var markers = [];

		function initializeMap() {

			var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			var isDraggable = w > 480 ? true : false;

			var latlng = new google.maps.LatLng( 40.7127837, -74.00594130000002 );
				var mapOptions = {
					zoom: 16,
					height: 500,
					mapTypeControl: false,
					scrollwheel: false,
					needsFit: true,
					isPanned: false,
					formIndex: 0,
					center: latlng,
					draggable: isDraggable,
			}

			map = new google.maps.Map(document.getElementById('listings-map'), mapOptions);

			/* marker loop */
			createMarkers();
		}; 

	    function createMarkers() {

	    	tdClearMap();

	    	var oms = new OverlappingMarkerSpiderfier(map, {
		      	markersWontMove: true,
		      	markersWontHide: true,
	          	keepSpiderfied: true
	        });
		    oms.addListener('unspiderfy', function(spidered, unspidered) {
		      	for (var i = 0; i < spidered.length; i++) {
			        spidered[i].setLabel("" + (i + 1));
			        spidered[i].setOptions({
			          	zIndex: i
			        });
		      	}
		    });

		    // Clusterer
		    var styles = [[{
			    url: 'assets/images/cluster-1.png',
			    width: 62, height: 62,
			    opt_anchor: [15, 15],
			    textColor: '#ffffff',
			    textSize: 12
			}, {
			    url: 'assets/images/cluster-2.png',
			    width: 82, height: 82,
			    opt_anchor: [20, 20],
			    textColor: '#ffffff',
			    textSize: 14
			}	, {
			    url: 'assets/images/cluster-3.png',
			    width: 102, height: 102,
			    opt_anchor: [25, 25],
			    textColor: '#ffffff',
			    textSize: 16
			}, {
			    url: 'assets/images/cluster-3.png',
			    width: 102, height: 102,
			    opt_anchor: [30, 30],
			    textColor: '#ffffff',
			    textSize: 16
			}]];

		    var markerCluster = new MarkerClusterer(map, markers, {styles: styles[0]});
	        minClusterZoom = 14;
			markerCluster.setMaxZoom(minClusterZoom);
			markerCluster.setMap(map);

	    	var infobox = new InfoBox({
		        disableAutoPan: false,
		        maxWidth: 202,
	        	pixelOffset: new google.maps.Size(-113, -320),
		        zIndex: null,
		        boxStyle: {
		        	background: "url('assets/images/infobox-bg.svg') no-repeat",
		            opacity: 1,
		            width: "225px",
	            	height: "250px"
		        },
		        closeBoxMargin: "28px 26px 0px 0px",
		        closeBoxURL: "",
		        infoBoxClearance: new google.maps.Size(1, 1),
		        pane: "floatPane",
		        enableEventPropagation: false
		    });

	    	var self = this;
			var section = jQuery( '#properties-grid-view' ).eq( map.formIndex );

			this.results = {};
			this.items = section.find( '.property-item-data' );

			//var marker, i;
		    var bounds = new google.maps.LatLngBounds();

		    var totalListings = 0;

			jQuery.each( this.items, function(i, el) {

				totalListings++;

				var $el = jQuery(el);

				if ( ! ( $el.data( 'lat' ) && $el.data( 'long' ) ) ) {
					return;
				}

				var data = {
					lat:      $el.data( 'lat' ),
					lng:      $el.data( 'long' ),
					thumb:    $el.data( 'thumb' ),
					pin:      $el.data( 'pin' ),
					price:    $el.data( 'price' ),
					title:    $el.data( 'title' ),
					desc:     $el.data( 'desc' ),
					link:     $el.data( 'link' )
				}

				var siteLatLng = new google.maps.LatLng( data.lat, data.lng );
		        var marker = new MarkerWithLabel({
		            position: siteLatLng,
		            map: map,
		            draggable: false,
		            title: data.title,
		            icon: data.pin,
		            html:  '<div class="marker-holder"><div class="marker-content"><div class="marker-listing-image" style="background-image: url('+data.thumb+');"></div><span class="marker-listing-title"><a href="'+data.link+'">'+data.title+'</a></span><span class="marker-listing-price">'+data.price+'</span></div></div>'
		        });

		        google.maps.event.addListener(marker, "click", function () {
		        	infobox.close();
				  	infobox.setContent(this.html);
		            infobox.open(map, this);
				});		
		        google.maps.event.addListener(map, 'click', function() {
				    infobox.close();
				});

		        bounds.extend(siteLatLng);
		        markers.push(marker);
		        oms.addMarker(marker);
		        markerCluster.addMarker(marker);

			});

	        /* end marker loop */

	        map.fitBounds(bounds);

	        jQuery.fn.exists = function(){return this.length>0;}

	        if( jQuery("#properties-grid-view.casaroyal-map-hover").exists() ) {

		        jQuery('.property-grid-item').each(function(i) {
		        	jQuery(this).on('mouseenter', function() {
						google.maps.event.trigger(markers[i], 'click');
		                infobox.open(map,markers[i]);
					});
		            jQuery(this).on('mouseleave', function() {
						infobox.open(null,null);
					});
				});

		    }

			jQuery(window).resize(function() {
			    // (the 'map' here is the result of the created 'var map = ...' above)
			    google.maps.event.trigger(map, "resize");
			});

	    }

		function tdClearMap() {
	        //Loop through all the markers and remove
	        for (var i = 0; i < markers.length; i++) {
	            markers[i].setMap(null);
	        }
	        markers = [];
	    };

	    var $target = jQuery( '#properties-grid-view' );

		if ( $target.length > 0 ) {

			initializeMap();

			$target.on( 'updated_results', function(event, result) {

				initializeMap();

			});

		}

   	});

})(jQuery);
