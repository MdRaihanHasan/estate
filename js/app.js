(function($){

  	'use strict';

  	jQuery.fn.exists = function(){return this.length>0;}

    /* Login/Register & Agent Contact Modal Form */
    /*-----------------------------------------------------------------------------------*/

    jQuery(document).on('click', '.open-login-popup', function(e){
        e.preventDefault();
        jQuery("#overlay").addClass('open');
        jQuery('html, body').animate({scrollTop : 0},800);
        return false;
    });

    jQuery(document).on('click', '.add-to-favorites', function(e){
        e.preventDefault();
        if (jQuery(this).hasClass('remove')) {
            jQuery(this).removeClass('remove');
        } else {
            jQuery(this).addClass('remove');
        }
    });

    var casaroyal_timeout;

    jQuery(document).on('click', '.add-to-compare', function(e){
        e.preventDefault();
        if (jQuery(this).hasClass('remove')) {
            jQuery(this).removeClass('remove');
            clearTimeout(casaroyal_timeout);
            jQuery('.single-add-to-compare').addClass('single-add-to-favorites-visible');
            jQuery('.single-add-to-compare .casaroyal-title').text('Property removed from compare');
            casaroyal_timeout = setTimeout(function(){
                $('.single-add-to-compare').removeClass('single-add-to-favorites-visible');
            }, 5000);
        } else {
            jQuery(this).addClass('remove');
            clearTimeout(casaroyal_timeout);
            jQuery('.single-add-to-compare').addClass('single-add-to-favorites-visible');
            jQuery('.single-add-to-compare .casaroyal-title').text('Property added to compare');
            casaroyal_timeout = setTimeout(function(){
                $('.single-add-to-compare').removeClass('single-add-to-favorites-visible');
            }, 5000);
        }
    });

    jQuery(document).on('click', '.menu-login-register-button a.login-button', function(e){
        e.preventDefault();
        jQuery("#overlay").addClass('open');
        jQuery('html, body').animate({scrollTop : 0},800);
        return false;
    });

    jQuery(document).on('click', '.close', function(e){
        e.preventDefault();
        jQuery("#overlay").removeClass('open');
    });

    jQuery(document).on('click', '.casaroyal-registration', function(e){
        e.preventDefault();
        jQuery("#login").slideUp("fast", function() {
            jQuery("#register").slideDown("fast");
        });
    });

    jQuery(document).on('click', '.casaroyal-back-login', function(e){
        e.preventDefault();
        jQuery("#lost-password").slideUp("fast", function() {
            jQuery("#login").slideDown("fast");
        });
    });

    jQuery(document).on('click', '.casaroyal-lost-password', function(e){
        e.preventDefault();
        jQuery("#login").slideUp("fast", function() {
            jQuery("#lost-password").slideDown("fast");
        });
    });

    jQuery(document).on('click', '.casaroyal-login', function(e){
        e.preventDefault();
        jQuery("#register").slideUp("fast", function() {
            jQuery("#login").slideDown("fast");
        });
    });
    // End

    jQuery('.casaroyal-entry-title h3').each(function(){
        var me = $(this);
        me.html(me.html().replace(/^(\w+)/, '<span>$1</span>'));
    });

    function Temp(el, options) {
        this.el = $(el);
        this.init(options);
    }

    Temp.DEFAULTS = {
        sticky: true
    }

    var mapDiv,
        map,
        infobox;
    jQuery(document).on('ready', function() {

        mapDiv = $("#main-map-contact-us");
        mapDiv.height(670).gmap3({
            map: {
                options: {
                    "center": [47.02552795015715,28.830285722137432]
                    ,"zoom": 17
                    ,"mapTypeControl": true
                    ,"mapTypeId": google.maps.MapTypeId.ROADMAP
                    ,"scrollwheel": false
                    ,"panControl": true
                    ,"rotateControl": false
                    ,"scaleControl": true
                    ,"streetViewControl": true
                    ,"zoomControl": true
                    ,"draggable": true
                }
            }
            ,marker: {
                values: [

                {

                    latLng: [47.02552795015715,28.830285722137432],
                    options: {
                        icon: "assets/images/svg/house.svg",
                        shadow: "assets/images/shadow.png",
                    }
                }   
                        
                ],
                options:{
                    draggable: false
                }
            }
        });

        map = mapDiv.gmap3("get");
        infobox = new InfoBox({
            pixelOffset: new google.maps.Size(-50, -65),
            closeBoxURL: '',
            enableEventPropagation: true
        });
        mapDiv.delegate('.infoBox .close','click',function () {
            infobox.close();
        });

        Temp.prototype = {
            init: function (options) {
                var base = this;
                    base.window = $(window);
                    base.options = $.extend({}, Temp.DEFAULTS, options);
                    base.stickyWrap = $('.sticky-header');
                    base.goTop = $('<a id="go-to-top" href="#" class="cd-top cd-fade-out go-to-top">Top</a>').appendTo(base.el);

                // Sticky
                if (base.options.sticky) {
                    base.sticky.stickySet.call(base, base.window);
                    base.stickyWrap.before($(".sticky-header").clone().addClass("clone-fixed"));
                    
                    $(window).on('load resize', function() {

                        //$(".sticky-header.clone-fixed").css('top', '-' + ($('#header').outerHeight()+100) + 'px');
                         
                    });
                    
                }
                
                // Scroll Event
                base.window.on('scroll', function (e) {
                    if (base.options.sticky) {
                        base.sticky.stickyInit.call(base, e.currentTarget);
                    }
                    base.gotoTop.scrollHandler.call(base, e.currentTarget);
                });

                // Click Handler Button GotoTop
                base.gotoTop.clickHandler(base);
            },

            sticky: {

                stickySet: function () {
                    var stickyWrap = this.stickyWrap, offset;
                    if (stickyWrap.length) {
                        offset = stickyWrap.outerHeight();
                        $.data(stickyWrap, 'data', {
                            offset: offset,
                            height: stickyWrap.outerHeight(true)
                        });
                         
                    }
                },
                stickyInit: function (win) {
                    var base = this, data;
                    if (base.stickyWrap.length) {
                        data = $.data(base.stickyWrap, 'data');
                        base.sticky.stickyAction(data, win, base);
                    }
                },
                stickyAction: function (data, win, base) {
                    var scrollTop = $(win).scrollTop();
                    if (scrollTop > data.offset)  {
                        if (!base.stickyWrap.hasClass('sticky')) {
                            base.stickyWrap.addClass('sticky');
                            $('.sticky-header.clone-fixed').addClass('slideDown');
                        }
                    } else {
                        if (base.stickyWrap.hasClass('sticky')) {
                            base.stickyWrap.removeClass('sticky');
                            $('.sticky-header.clone-fixed').removeClass('slideDown');
                        }
                    }
                }
            },
            gotoTop: {
                scrollHandler: function (win) {
                    $(win).scrollTop() > 200 ?
                        this.goTop.addClass('go-top-visible'):
                        this.goTop.removeClass('go-top-visible');
                        $('.fb-link').addClass('fb-visible');
                },
                clickHandler: function (self) {
                    self.goTop.on('click', function (e) {
                        e.preventDefault();
                        $('html, body').animate({ scrollTop: 0 }, 800);
                    });
                }
            }
        }

        /* Temp Plugin
         * ================================== */

        $.fn.Temp = function (option) {
            return this.each(function () {
                var $this = $(this), data = $this.data('Temp'),
                    options = typeof option == 'object' && option;
                if (!data) {
                    $this.data('Temp', new Temp(this, options));
                }
            });
        }

        /* ---------------------------------------------------- */
        /*  Sticky menu                                         */
        /* ---------------------------------------------------- */

        if ( $('#header').hasClass('sticky-header') ) {
            
            $('body').Temp({
                sticky: true
            });
        
        }

        AOS.init();

        casaroyal_show_message();
        casaroyal_geo_code_location();
        casaroyal_ajax_submit_property();
        casaroyal_ajax_submit_property_front();

        if( jQuery("#property_map").exists() ) {

            var mapDiv,
                map,
                infobox;

            var property_map_lat = jQuery("#property_map_lat").val();
            var property_map_lang = jQuery("#property_map_lang").val();
            var map_pin = jQuery("#map_pin").val();
            var template_directory_url = jQuery("#template_directory_url").val();

            mapDiv = $("#property_map");
            mapDiv.height(560).gmap3({
                map: {
                    options: {
                        "center": [property_map_lat,property_map_lang]
                        ,"zoom": 16
                        ,"draggable": true
                        ,"mapTypeControl": true
                        ,"mapTypeId": google.maps.MapTypeId.ROADMAP
                        ,"scrollwheel": false
                        ,"panControl": true
                        ,"rotateControl": false
                        ,"scaleControl": true
                        ,"streetViewControl": true
                        ,"zoomControl": true
                    }
                }
                ,marker: {
                    values: [

                    {

                        latLng: [property_map_lat,property_map_lang],
                        options: {
                            icon: map_pin,
                            shadow: template_directory_url + "/images/shadow.png",
                        }
                    }   
                            
                    ],
                    options:{
                        draggable: false
                    }
                }
            });

            map = mapDiv.gmap3("get");

            function casaroyal_initialize_poi(map_for_poi){

                var poi_marker_array=[];
            
                var poi_service = new google.maps.places.PlacesService(map_for_poi);
                var already_serviced = '';
                var show_poi = '';
                var poi_type = '';
                var marker = '';
                var map_bounds = map_for_poi.getBounds();
                var selector = '.google_poi';

                jQuery(document).on('click', selector, function(event){

                    event.stopPropagation();
                    var poi_type = jQuery(this).attr('id');
                    var position = map_for_poi.getCenter();
                    var show_poi = casaroyal_return_poi_values(poi_type);

                    if( jQuery(this).hasClass('poi_active') ){
                        casaroyal_show_hide_poi(poi_type,'hide');
                    } else {
                        already_serviced = casaroyal_show_hide_poi(poi_type,'show');
                        if( already_serviced === 1 ){
                            var request = {
                                location: position,
                                types: show_poi,
                                bounds: map_bounds,
                                radius: 2500,
                            };
                            poi_service.nearbySearch(request,function(results,status){
                                casaroyal_googlemap_display_poi(results,status,map_for_poi,poi_type)
                            });
                        }
                    }

                    jQuery(this).toggleClass('poi_active');

                });

                function casaroyal_return_poi_values(poi_type){
                    console.log();
                    var show_poi;switch(poi_type){
                        case'transport': show_poi=['bus_station','airport','train_station','subway_station'];
                        break;
                        case'supermarkets': show_poi=['grocery_or_supermarket','shopping_mall'];
                        break;
                        case'schools': show_poi=['school','university'];
                        break;
                        case'restaurant': show_poi=['restaurant'];
                        break
                        case'pharma': show_poi=['pharmacy'];
                        break;
                        case'hospitals': show_poi=['hospital'];
                        break;
                    }
                    return show_poi;
                }

                function casaroyal_googlemap_display_poi(results,status,map_for_poi,poi_type){
                    var place, poi_marker;
                    if( google.maps.places.PlacesServiceStatus.OK==status ){
                        for( var i=0; i<results.length; i++ ){
                            poi_marker = casaroyal_create_poi_marker(results[i],map_for_poi,poi_type);
                            poi_marker_array.push(poi_marker);
                        }
                    }
                }

                function casaroyal_create_poi_marker(place,map_for_poi,poi_type){
                    marker = new google.maps.Marker({
                        map: map_for_poi,
                        position: place.geometry.location,
                        show_poi: poi_type,
                        //icon: casaroyalSettings.url_theme+'/images/map-pin.svg'
                        icon: 'assets/images/poi/'+poi_type+'.svg'
                    });
                    var boxText = document.createElement("div");
                    var infobox_poi = new InfoBox({
                        content: boxText,
                        boxClass: "casaroyal_poi_box",
                        pixelOffset: new google.maps.Size(-40,-120),
                        zIndex: null,
                        maxWidth: 275,
                        closeBoxMargin: "-13px 0px 0px 0px",
                        closeBoxURL: "",
                        infoBoxClearance: new google.maps.Size(1,1),
                        pane: "floatPane",
                        enableEventPropagation: false
                    });
                    google.maps.event.addListener(marker,'mouseover',function(event){
                        infobox_poi.setContent(place.name);
                        infobox_poi.open(map,this);
                    });
                    google.maps.event.addListener(marker,'mouseout',function(event){
                        if( infobox_poi !== null ){
                            infobox_poi.close();
                        }
                    });
                    return marker;
                }

                function casaroyal_show_hide_poi(poi_type,showhide){
                    var is_hiding = 1;
                    for( var i=0; i<poi_marker_array.length; i++ ){
                        if( poi_marker_array[i].show_poi === poi_type ){
                            if( showhide === 'hide' ){
                                poi_marker_array[i].setVisible(false);
                            } else {
                                poi_marker_array[i].setVisible(true);
                                is_hiding = 0;
                            }
                        }
                    }

                    return is_hiding;

                }
            }

            casaroyal_initialize_poi(map);

        }

        if( jQuery("#contact-agent-button").exists() ) {

            document.getElementById('contact-agent-button').addEventListener('click', function(e) {

                if(jQuery("#property-contact-agent-form").valid()) {

                    jQuery('#contact-agent-button').html('<i class="fa fa-refresh fa-spin"></i>');
                    jQuery("#property-contact-agent-form").submit();

                } 

                e.preventDefault();
            });

            jQuery('#property-contact-agent-form').validate({
                rules: {
                    name: {
                        required: true
                    },
                    phone: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    message: {
                        required: true
                    }
                },
                submitHandler: function(form) {
                    jQuery(form).ajaxSubmit({
                        type: "POST",
                        data: jQuery(form).serialize(),
                        url: casaroyalSettings.casaroyal_ajaxurl,
                        success: function(data) {
                            jQuery('#contact-agent-button').html('Send Message');
                            jQuery('.message-container').css('display', 'inline-block');
                        },
                        error: function(data) {
                            jQuery('.error-container').css('display', 'inline-block');
                        }
                    });
                }
            });

        }

    });

    jQuery('.casaroyal-property-nav').on('click', 'ul li a:not(.fancybox)', function(e) {

        e.preventDefault();

        var data_id = jQuery(this).data('id');

        jQuery('.casaroyal-property-nav ul li a').removeClass('active');
        jQuery(this).addClass('active');

        jQuery('#property-location, #property-description, #property-photos, #property-amenities, #property-floor-plans, #property-child').css('display', 'none');
        jQuery('#'+data_id).css('display', 'block');

        jQuery('.carousel-slider').resize();

    });

    // Print Property Page
    $(document).on('click', '#print_page', function(e){

        var myWindow, html;
        e.preventDefault();

        html = '<html><head><title>title here</title><link href="https://fonts.googleapis.com/css?family=Dosis" rel="stylesheet"><script src="' + casaroyalSettings.protocol + '://code.jquery.com/jquery-1.10.1.min.js"></script><script>$(window).on("load", function() { print(); });</script></head><body class="print_body" >' + jQuery("#print_page_content").html() + '</body></html>';

        myWindow = window.open('','Print Me','width=700 ,height=842');
        myWindow.document.write( html );
        myWindow.document.close();
        myWindow.focus();
        
    });

    // Update account settings
    var image_custom_uploader, image_featured_custom_uploader, this_image_holder, attachment, this_image_val, image_custom_uploader_floor;
    var divId = 0;

    // Delete uploaded image
    jQuery('#my-account-form').on('click', '.deleteUploadedImages', function(e) {
        jQuery(this).parent().remove();
        jQuery('.tooltip').remove();
        jQuery('#my-account-form .uploadedImages').css("display", "inline-block");
    });

    // Load Cover Image
    function readURLAccountImage(input) {
        if (input.files && input.files[0]) {

            var reader = new FileReader();
            reader.onload = function (e) {

                var image = new Image();
                image.src = e.target.result;

                image.onload = function() {

                    $('#up_images').html(
                        '<li class="col-md-4 myplugin-image-preview image-holder ajax_loaded""><span class="deleteUploadedImages" data-toggle="tooltip" data-placement="top" data-original-title="Delete Image"><i class="fa fa-times" aria-hidden="true"></i></span><span class="image-holder" style="background-image: url('+image.src+');></span><input type="hidden" id="profile_image_id" name="profile_image_id" value=""></li>'
                    );

                }

            }
            reader.readAsDataURL(input.files[0]);

        }
    }
    $("#account_image").change(function(){
        readURLAccountImage(this);
    });

    //
    // Delete uploaded floor image
    jQuery('#casaroyal_floors_wrapper').on('click', '.deleteUploadedImages', function(e) {
        jQuery(this).parent().parent().parent().find(".ft_floor_plan_image").val("");
        jQuery(this).parent().remove();
        jQuery('.tooltip').remove();
    });

    // Load Floor Image
    function readURLFloorImage(input, this_image_holder) {
        if (input.files && input.files[0]) {

            var reader = new FileReader();
            reader.onload = function (e) {

                var image = new Image();
                image.src = e.target.result;

                image.onload = function() {

                    this_image_holder.find('.floor_image').html(
                        '<li class="col-md-12 myplugin-image-preview image-holder ajax_loaded"><i class="fa fa-spinner fa-spin"></i><span class="deleteUploadedImages" data-toggle="tooltip" data-placement="top" data-original-title="Delete Image"><i class="fa fa-times" aria-hidden="true"></i></span><span class="image-holder"><img src="'+image.src+'" alt="Floor image"></span><input type="hidden" id="profile_image_id" name="profile_image_id" value=""></li>'
                    );

                }

            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    jQuery('#casaroyal_floors_wrapper').on('change', '.upload_floor_image', function(e) {
        //console.log("change 3");
        this_image_holder = $(this).parent().parent().parent();
        readURLFloorImage(this, this_image_holder);
    });

    // Delete uploaded image
    jQuery('#my-account-form').on('click', '.deleteUploadedCoverImage', function(e) {
        jQuery(this).parent().remove();
        jQuery('.tooltip').remove();
        jQuery('#my-account-form .uploadedCoverImage').css("display", "inline-block");
    });

    jQuery('#my-account-form').on('click', '.uploadedCoverImage', function(e) {
        e.preventDefault();

        this_image_holder = jQuery("#up_cover_image");

        // If the uploader object has already been created, reopen the dialog
        if (image_custom_uploader) {
            image_custom_uploader.open();
            return;
        }

        // Extend the wp.media object
        image_custom_uploader = wp.media.frames.file_frame = wp.media({
            title: 'Choose Image',
            button: {
                text: 'Choose Image'
            },
            multiple: false
        });

        // When a file is selected, grab the URL and set it as the text field's value
        image_custom_uploader.on( 'select', function(){

            var attachments = image_custom_uploader.state().get('selection').map( 

                function( attachment ) {

                    attachment.toJSON();
                    return attachment;

            });

            //loop through the array and do things with each attachment

           var i;

           for (i = 0; i < attachments.length; ++i) {

                //sample function 1: add image preview
                $('#up_cover_image').append(
                    '<li class="col-md-4 myplugin-image-preview image-holder grabbable"><span class="deleteUploadedCoverImage" data-toggle="tooltip" data-placement="top"  data-original-title="' + casaroyalSettings.delete_image_text + '"><i class="fa fa-times" aria-hidden="true"></i></span><img class="image-holder" src="' + attachments[i].attributes.url + '" /><input type="hidden" name="profile_cover_image_id" value="' + attachments[i].id + '"></li>'
                );

            }

            jQuery('#my-account-form .uploadedImages').css("display", "none");

        });

        //Open the uploader dialog
        image_custom_uploader.open();
    });

    // Upload attachments
    // Load Floor Image
    function readURLFile(input, this_image_holder) {
        if (input.files && input.files[0]) {

            function get_icon_for_extension($ext){
                switch($ext){
                    /* PDF */
                    case 'pdf':
                        return '<i class="fa fa-file-pdf-o"></i>';

                    /* Images */
                    case 'jpg':
                    case 'png':
                    case 'gif':
                    case 'bmp':
                    case 'jpeg':
                    case 'tiff':
                    case 'tif':
                        return '<i class="fa fa-file-image-o"></i>';

                    /* Text */
                    case 'txt':
                    case 'log':
                    case 'tex':
                        return '<i class="fa fa-file-text-o"></i>';

                    /* Documents */
                    case 'doc':
                    case 'odt':
                    case 'msg':
                    case 'docx':
                    case 'rtf':
                    case 'wps':
                    case 'wpd':
                    case 'pages':
                        return '<i class="fa fa-file-word-o"></i>';

                    /* Spread Sheets */
                    case 'csv':
                    case 'xlsx':
                    case 'xls':
                    case 'xml':
                    case 'xlr':
                        return '<i class="fa fa-file-excel-o"></i>';

                    /* Zip */
                    case 'zip':
                    case 'rar':
                    case '7z':
                    case 'zipx':
                    case 'tar.gz':
                    case 'gz':
                    case 'pkg':
                        return '<i class="fa fa-file-zip-o"></i>';

                    /* Audio */
                    case 'mp3':
                    case 'wav':
                    case 'm4a':
                    case 'aif':
                    case 'wma':
                    case 'ra':
                    case 'mpa':
                    case 'iff':
                    case 'm3u':
                        return '<i class="fa fa-file-audio-o"></i>';

                    /* Video */
                    case 'avi':
                    case 'flv':
                    case 'm4v':
                    case 'mov':
                    case 'mp4':
                    case 'mpg':
                    case 'rm':
                    case 'swf':
                    case 'wmv':
                        return '<i class="fa fa-file-video-o"></i>';

                    /* Others */
                    default:
                        return '<i class="fa fa-file-o"></i>';
                }
            }

            jQuery(input.files).each(function () {

                var file = $(this);

                //console.log(file[0]);

                var extension = file[0].name.replace(/^.*\./, '');

                var idGen = generate_ID();

                //sample function 1: add image preview
                $('ul.attachments-list').append(
                    '<li id="attachment-'+idGen+'" class="' + extension +'"><a target="_blank" href="#"><i class="fa fa-spinner fa-spin fa-fw"></i>' + get_icon_for_extension( extension ) + '' + file[0].name + '</a><a class="delete_attached_file" href="#"><i class="fa fa-times-circle" aria-hidden="true"></i></a><input class="attachment-id" type="hidden" name="ft_attachments[]" value="" /></li>'
                );

            });
        }
    }

    jQuery('#casaroyal-property-attachments').on('change', '.uploadedFilesAjax', function(e) {
        readURLFile(this);
    });

    // Delete uploaded property attached files
    jQuery('#casaroyal-property-attachments').on('click', '.delete_attached_file', function(e) {
        e.preventDefault();
        jQuery(this).parent().remove();
        jQuery('.tooltip').remove();
        jQuery('#casaroyal-property-attachments .uploadedFilesAjax').css("display", "inline-block");
    });

    jQuery('#casaroyal-property-attachments').on('click', '.uploadedFiles', function(e) {
        e.preventDefault();

        this_image_holder = jQuery("#casaroyal-property-attachments .attachments-list");

        // If the uploader object has already been created, reopen the dialog
        if (image_custom_uploader) {
            image_custom_uploader.open();
            return;
        }

        // Extend the wp.media object
        image_custom_uploader = wp.media.frames.file_frame = wp.media({
            title: 'Choose File',
            button: {
                text: 'Choose File'
            },
            multiple: true
        });

        // When a file is selected, grab the URL and set it as the text field's value
        image_custom_uploader.on( 'select', function(){

            var attachments = image_custom_uploader.state().get('selection').map( 

                function( attachment ) {

                    attachment.toJSON();
                    return attachment;

            });

            console.log(attachments);

            function get_icon_for_extension($ext){
                switch($ext){
                    /* PDF */
                    case 'pdf':
                        return '<i class="fa fa-file-pdf-o"></i>';

                    /* Images */
                    case 'jpg':
                    case 'png':
                    case 'gif':
                    case 'bmp':
                    case 'jpeg':
                    case 'tiff':
                    case 'tif':
                        return '<i class="fa fa-file-image-o"></i>';

                    /* Text */
                    case 'txt':
                    case 'log':
                    case 'tex':
                        return '<i class="fa fa-file-text-o"></i>';

                    /* Documents */
                    case 'doc':
                    case 'odt':
                    case 'msg':
                    case 'docx':
                    case 'rtf':
                    case 'wps':
                    case 'wpd':
                    case 'pages':
                        return '<i class="fa fa-file-word-o"></i>';

                    /* Spread Sheets */
                    case 'csv':
                    case 'xlsx':
                    case 'xls':
                    case 'xml':
                    case 'xlr':
                        return '<i class="fa fa-file-excel-o"></i>';

                    /* Zip */
                    case 'zip':
                    case 'rar':
                    case '7z':
                    case 'zipx':
                    case 'tar.gz':
                    case 'gz':
                    case 'pkg':
                        return '<i class="fa fa-file-zip-o"></i>';

                    /* Audio */
                    case 'mp3':
                    case 'wav':
                    case 'm4a':
                    case 'aif':
                    case 'wma':
                    case 'ra':
                    case 'mpa':
                    case 'iff':
                    case 'm3u':
                        return '<i class="fa fa-file-audio-o"></i>';

                    /* Video */
                    case 'avi':
                    case 'flv':
                    case 'm4v':
                    case 'mov':
                    case 'mp4':
                    case 'mpg':
                    case 'rm':
                    case 'swf':
                    case 'wmv':
                        return '<i class="fa fa-file-video-o"></i>';

                    /* Others */
                    default:
                        return '<i class="fa fa-file-o"></i>';
                }
            }

            //loop through the array and do things with each attachment
            var i;

            for (i = 0; i < attachments.length; ++i) {

                //sample function 1: add image preview
                $('ul.attachments-list').append(
                    '<li class="' + attachments[i].attributes.subtype + '"><a target="_blank" href="' + attachments[i].attributes.url + '">' + get_icon_for_extension( attachments[i].attributes.subtype ) + '' + attachments[i].attributes.title + '</a><a class="delete_attached_file" href="#"><i class="fa fa-times-circle" aria-hidden="true"></i></a><input type="hidden" name="ft_attachments[]" value="' + attachments[i].id + '" /></li>'
                );

            }

        });

        //Open the uploader dialog
        image_custom_uploader.open();
    });
    // End

    jQuery('#casaroyal_update_account').on('click', function (e) {
        e.preventDefault();
        var errors = 0;
        var casaroyal_timeout;
        var update_my_account = {
            type: "POST",
            dataType: 'json',
            beforeSubmit:  function(){
                jQuery('#casaroyal_update_account .fa-spinner').css('display', 'inline-block');
                jQuery('#confirm_new_password_error').css("display", "none");
            },
            success: function(data){
                jQuery('#casaroyal_update_account .fa-spinner').css('display', 'none');
                clearTimeout(casaroyal_timeout);
                jQuery('.single-add-to-compare').addClass('single-add-to-favorites-visible');
                jQuery('.single-add-to-compare .casaroyal-title').text(data.response);
                casaroyal_timeout = setTimeout(function(){
                    $('.single-add-to-compare').removeClass('single-add-to-favorites-visible');
                }, 5000);
            },
            error: function(data){
                //
                jQuery('#casaroyal_update_account .fa-spinner').css('display', 'none');
            }
        };

        var password = $("#new_password").val();
        var confirmPassword = $("#confirm_new_password").val();

        if ( password != confirmPassword ) { // Validate repeat password
            errors = 1;
            $('#confirm_new_password_error').css("display", "inline-block");
            $('html, body').animate({
                scrollTop: $("#confirm_new_password_error").offset().top - 180
            }, 500);
            return;
        }

        if( errors == 0 ) {
            jQuery('#my-account-form').ajaxSubmit( update_my_account );
        } else {
            return false;
        }

    });
    // End

    // Ajax Load More
    jQuery(document).on('click', '#casaroyal_ajax_load_more a:not(.loading, .end_of_properties)', function(e) {
        e.preventDefault();
        var ajax_type = "load";
        casaroyal_ajax_load_properties(ajax_type);
    });
    // End

    // Ajax Filter
    jQuery('#location, #select-status, #select-property-type, #keyword-txt, #select-bedrooms, #select-bathrooms, #select-min-price, #select-max-price, #min-area, #max-area, .amenities-wrapper input').change(function(e){
        e.preventDefault();
        var ajax_type = "filter";
        $('.properties-holder').addClass('loading_properties');
        jQuery(".properties-holder").slideUp("slow");
        casaroyal_ajax_load_properties(ajax_type);
    });
    // End

    function casaroyal_ajax_load_properties(ajax_type) {

        var $load_more_btn = jQuery('#casaroyal_ajax_load_more a');
        if( ajax_type == "load") {
            var offset = $('.properties-holder .property-item-data').length;
        } else {
            var offset = 0;
        }

        // filter
        var keyword = $('#keyword-txt').val();
        var location = $('#location').val();
        var status = $('#select-status').val();
        var type = $('#select-property-type').val();
        var bedrooms = $('#select-bedrooms').val();
        var bathrooms = $('#select-bathrooms').val();
        var min_price = $('#min-price').val();
        var max_price = $('#max-price').val();
        var min_area = $('#min-area').val();
        var max_area = $('#max-area').val();
        var listings_type = $('.properties-holder').attr('data-listings-type');
        var sortby = $('#sort-properties').val();
        var features = $(".amenities-wrapper input:checkbox:checked").map(function(){
            return $(this).val();
        }).get(); // <----

    }
    // End

    // Add New notification set
    jQuery('#casaroyal-add-notification').on('click', function (e) {
        e.preventDefault();
        var casaroyal_timeout;
        var add_new_notification = {
            type: "POST",
            dataType: 'json',
            beforeSubmit:  function(){
                jQuery('#casaroyal-add-notification .fa-spinner').css('display', 'inline-block');
            },
            success: function(data){
                jQuery('#casaroyal-add-notification .fa-spinner').css('display', 'none');
                jQuery('#casaroyal-add-notification .fa-check').css('display', 'inline-block');
                clearTimeout(casaroyal_timeout);
                jQuery('.single-add-to-compare').addClass('single-add-to-favorites-visible');
                jQuery('.single-add-to-compare .casaroyal-title').text(data.response);
                casaroyal_timeout = setTimeout(function(){
                    jQuery('.single-add-to-compare').removeClass('single-add-to-favorites-visible');
                    jQuery('#casaroyal-add-notification .fa-check').css('display', 'none');
                }, 5000);
            },
            error: function(data){
                //
                jQuery('#casaroyal-add-notification .fa-spinner').css('display', 'none');
                jQuery('#casaroyal-add-notification .fa-exclamation-triangle').css('display', 'inline-block');
            }
        };

        jQuery('#casaroyal-add-notification-form').ajaxSubmit( add_new_notification );

    });
    // End

    // Update property agent
    jQuery('.select_property_agent').change(function(e){
        var casaroyal_timeout;
        var value_id = jQuery( this ).parent().find(".property-id").val();
        var update_agent = {
            type: "POST",
            dataType: 'json',
            beforeSubmit:  function(){
                jQuery('#update_property_agent_'+value_id+' .fa-exclamation-triangle').css('display', 'none');
                jQuery('#update_property_agent_'+value_id+' .fa-spinner').css('display', 'inline-block');
            },
            success: function(data){
                jQuery('#update_property_agent_'+value_id+' .fa-spinner').css('display', 'none');
                jQuery('#update_property_agent_'+value_id+' .fa-check').css('display', 'inline-block');
                clearTimeout(casaroyal_timeout);
                casaroyal_timeout = setTimeout(function(){
                    jQuery('#update_property_agent_'+value_id+' .fa-check').css('display', 'none');
                }, 5000);
            },
            error: function(data){
                jQuery('#update_property_agent_'+value_id+' .fa-spinner').css('display', 'none');
                jQuery('#update_property_agent_'+value_id+' .fa-exclamation-triangle').css('display', 'inline-block');
            }
        };

        $('#update_property_agent_'+value_id).ajaxSubmit( update_agent );

    });
    // End

    jQuery(".numericonly").keypress(function(event) {
        // Backspace, tab, enter, end, home, left, right
        // We don't support the del key in Opera because del == . == 46.
        var controlKeys = [8, 9, 13, 35, 36, 37, 39];
        // IE doesn't support indexOf
        var isControlKey = controlKeys.join(",").match(new RegExp(event.which));
        // Some browsers just don't raise events for control keys. Easy.
        // e.g. Safari backspace.
        if (!event.which || // Control keys in most browsers. e.g. Firefox tab is 0
            (49 <= event.which && event.which <= 57) || // Always 1 through 9
            (48 == event.which && $(this).attr("value")) || // No 0 first digit
            isControlKey) { // Opera assigns values for control keys.
            return;
        } else {
            event.preventDefault();
        }
    });

    // Submit property function
    function casaroyal_ajax_submit_property() {

        $('#casaroyal_property_title').keypress(function() {
            jQuery("#casaroyal_submit_errors .error-title").remove();
            jQuery('#casaroyal_submit_errors:empty').css('display', 'none');
            jQuery(this).focus();
        });

        $(document).on('click', '#casaroyal_submit_property:not(.pressed)', function(e){
            e.preventDefault();
            jQuery('#casaroyal_submit_property .fa-spinner').css('display', 'inline-block');
            jQuery("#property_save_status").val("save");
            jQuery("#casaroyal_submit_property").addClass("pressed");
            casaroyal_fire_submit_property("save");
        });

        $(document).on('click', '#casaroyal_publish_property:not(.pressed)', function(e){
            e.preventDefault();
            jQuery('#casaroyal_publish_property .fa-spinner').css('display', 'inline-block');
            jQuery("#property_save_status").val("publish");
            jQuery("#casaroyal_publish_property").addClass("pressed");
            casaroyal_fire_submit_property("publish");
        });

        $(document).on('click', '#casaroyal_update_property:not(.pressed)', function(e){
            e.preventDefault();
            jQuery('#casaroyal_update_property .fa-spinner').css('display', 'inline-block');
            jQuery("#property_save_status").val("update");
            jQuery("#casaroyal_update_property").addClass("pressed");
            casaroyal_fire_submit_property("update");
        });

        $(document).on('click', '#casaroyal_publish_property_inactive', function(e){
            e.preventDefault();
        });

        function casaroyal_fire_submit_property( fn_status ) {

            var errors = 0;

            var title = $("#casaroyal_property_title").val();

            if ( title.length === 0 ) {
                errors = 1;
                jQuery("#casaroyal_submit_errors .error-title").remove();
                jQuery("#casaroyal_submit_errors").append( '<div class="error-title"><span class="error-title">Error:</span> Title required.</div>' );
                jQuery('#casaroyal_submit_errors').css('display', 'inline-block');
                $('html, body').animate({
                    scrollTop: $("#casaroyal_submit_errors").offset().top - 100
                }, 200);
                jQuery('#casaroyal_submit_property .fa-spinner').css('display', 'none');
                jQuery('#casaroyal_publish_property .fa-spinner').css('display', 'none');
                jQuery('#casaroyal_update_property .fa-spinner').css('display', 'none');
                return;
            }

            if( errors == 0 ) {
                $('#submit-listing-form').ajaxSubmit( submit_property );
            } else {
                return false;
            }

        };
    }
    // End

    // Submit property function
    function casaroyal_ajax_submit_property_front() {

        $('#casaroyal_property_title').keypress(function() {
            jQuery("#casaroyal_submit_errors .error-title").remove();
            jQuery('#casaroyal_submit_errors:empty').css('display', 'none');
            jQuery(this).focus();
        });

        $(document).on('click', '#casaroyal_submit_property_loggedout:not(.disabled)', function(e){
            e.preventDefault();
            casaroyal_fire_submit_property_front();
        });

        $(document).on('click', '#casaroyal_submit_property_loggedout.disabled', function(e){
            e.preventDefault();
        });

        $(document).on('click', '#casaroyal_publish_property_inactive', function(e){
            e.preventDefault();
        });

        function casaroyal_fire_submit_property_front() {
            
            

        };
    }
    // End

    jQuery('#casaroyal_upload_images').on('click', '.deleteUploadedImages', function(e) {
        jQuery(this).parent().remove();
        jQuery('.tooltip').remove();
        jQuery('#my-account-form .uploadedImages').css("display", "inline-block");
    });

    function generate_ID() {

        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return Math.random().toString(36).substr(2, 9);

    };

    // Load Cover Image
    function readURLGallery(input) {
        if (input.files && input.files[0]) {

            jQuery(input.files).each(function () {

                var file = $(this);

                var reader = new FileReader();
                reader.onload = function (e) {

                    var image = new Image();
                    image.src = e.target.result;

                    image.onload = function() {

                        var idGen = generate_ID();

                        $('#up_images').append(
                            '<li id="casaroyal-gallery-image-' + idGen + '" class="col-md-4 myplugin-image-preview image-holder grabbable"><span class="makeItFeatured" data-id="" ><i class="fa fa-star-o" aria-hidden="true" data-toggle="tooltip" data-placement="top"  data-original-title="Make Featured"></i><i class="fa fa-star" aria-hidden="true" data-toggle="tooltip" data-placement="top"  data-original-title="Remove Featured"></i></span><span class="deleteUploadedImages" data-toggle="tooltip" data-placement="top"  data-original-title="Delete Image"><i class="fa fa-times" aria-hidden="true"></i></span><span class="image-holder" style="background-image: url('+image.src+');""></span><input class="ft_property_images" type="hidden" name="ft_property_images[]" value=""></li>'
                        );

                    }

                }
                reader.readAsDataURL(file[0]);

            });

        }
    }
    $("#post_gallery").change(function(){
        readURLGallery(this);
    });

    if( jQuery("#up_images").exists() ) {

        jQuery('#up_images').sortable({
            placeholder: "col-md-4 image-drag-placeholder"
        });
        jQuery('#up_images').disableSelection();

    };

    // make it featured image
    jQuery('#casaroyal_upload_images').on('click', '.makeItFeatured', function(e) {
        if( jQuery(this).hasClass("featured")) {

            jQuery('#casaroyal_upload_images .makeItFeatured').removeClass("featured");
            jQuery('#casaroyal_property_featured_image').val('');

        } else {

            jQuery('#casaroyal_upload_images .makeItFeatured').removeClass("featured");
            jQuery(this).addClass("featured");
            var dataId = '';
            dataId = $(this).attr('data-id');
            jQuery('#casaroyal_property_featured_image').val(dataId);

        }
    });

    // Additional Details
    jQuery('.casaroyal_additional_details_wrapper').on('click', '.fa-plus-circle', function(e) {
        jQuery(this).parent().parent().remove();
    });

    jQuery('.casaroyal_new_additional_detail').on('click', '.fa-plus-circle', function(e) {
        jQuery('.casaroyal_additional_details_wrapper').append(
            '<div class="casaroyal_additional_details row"><div class="col-md-6"><label>Title</label><input type="text" name="detail-titles[]" value="" ></div><div class="col-md-6 close-holder"><label>Value</label><input type="text" name="detail-values[]" value="" ><i class="fa fa-plus-circle" aria-hidden="true"></i></div></div>'
        );
    });

    // Nearby Transport
    jQuery('.nearby-transport-holder').on('click', '.fa-plus-circle', function(e) {
        jQuery(this).parent().parent().remove();
    });

    jQuery('.casaroyal_new_nearby_transport').on('click', '.fa-plus-circle', function(e) {
        var length = jQuery(".nearby-transport-holder .nearby-transport-item").length;
        length++;
        jQuery('.nearby-transport-holder').append(
            '<div class="nearby-transport-item"><div class="col-md-6"><label>Name</label><input type="text" name="nearby-transport[' + length + '][name]" value="" ></div><div class="col-md-6 close-holder"><label>Distance</label><input type="text" name="nearby-transport[' + length + '][distance]" value="" ><i class="fa fa-plus-circle" aria-hidden="true"></i></div></div>'
        );
    });

    // Nearby Health
    jQuery('.nearby-health-holder').on('click', '.fa-plus-circle', function(e) {
        jQuery(this).parent().parent().remove();
    });

    jQuery('.casaroyal_new_nearby_health').on('click', '.fa-plus-circle', function(e) {
        var length = jQuery(".nearby-health-holder .nearby-health-item").length;
        length++;
        jQuery('.nearby-health-holder').append(
            '<div class="nearby-health-item"><div class="col-md-6"><label>Name</label><input type="text" name="nearby-health[' + length + '][name]" value="" ></div><div class="col-md-6 close-holder"><label>Distance</label><input type="text" name="nearby-health[' + length + '][distance]" value="" ><i class="fa fa-plus-circle" aria-hidden="true"></i></div></div>'
        );
    });

    // Nearby Education
    jQuery('.nearby-edu-holder').on('click', '.fa-plus-circle', function(e) {
        jQuery(this).parent().parent().remove();
    });

    jQuery('.casaroyal_new_nearby_edu').on('click', '.fa-plus-circle', function(e) {
        var length = jQuery(".nearby-edu-holder .nearby-edu-item").length;
        length++;
        jQuery('.nearby-edu-holder').append(
            '<div class="nearby-edu-item"><div class="col-md-6"><label>Name</label><input type="text" name="nearby-edu[' + length + '][name]" value="" ></div><div class="col-md-6 close-holder"><label>Distance</label><input type="text" name="nearby-edu[' + length + '][distance]" value="" ><i class="fa fa-plus-circle" aria-hidden="true"></i></div></div>'
        );
    });

    // New Floor Plan
    jQuery('.casaroyal_floors_wrapper').on('click', '.fa-plus-circle', function(e) {
        jQuery(this).parent().parent().remove();
    });

    jQuery('.casaroyal_new_floor').on('click', '.fa-plus-circle', function(e) {
        var length = jQuery(".casaroyal_floors_wrapper .casaroyal_property_floor").length;
        length++;
        jQuery('.casaroyal_floors_wrapper').append(
            '<div class="casaroyal_additional_details row casaroyal_property_floor"><div class="col-md-12"><label>Floor Name</label><input type="text" name="floor[' + length + '][ft_floor_plan_name]" value="" ><p class="description">Example: Ground Floor</p></div><div class="col-md-6"><label>Floor Price ( Only digits )</label><input type="text" name="floor[' + length + '][ft_floor_plan_price]" value="" ><p class="description">Example: 4000</p></div><div class="col-md-6"><label>Price Postfix</label><input type="text" name="floor[' + length + '][ft_floor_plan_price_postfix]" value="" ><p class="description">Example: Per Month</p></div><div class="col-md-6"><label>Floor Size ( Only digits )</label><input type="text" name="floor[' + length + '][ft_floor_plan_size]" value="" ><p class="description">Example: 2500</p></div><div class="col-md-6"><label>Size Postfix</label><input type="text" name="floor[' + length + '][ft_floor_plan_size_postfix]" value="" ><p class="description">Example: Sq Ft</p></div><div class="col-md-6"><label>Bedrooms</label><input type="text" name="floor[' + length + '][ft_floor_plan_bedrooms]" value="" ></div><div class="col-md-6"><label>Bathrooms</label><input type="text" name="floor[' + length + '][ft_floor_plan_bathrooms]" value="" ></div><div class="col-md-12"><label>Description</label><textarea cols="60" rows="3" name="floor[' + length + '][ft_floor_plan_descr]"></textarea></div><div class="col-md-6"><label>Floor Plan Image</label><div class="ft_floor_plan_image_holder"><img class="ft_floor_plan_image_src" src="" ></div><input type="hidden" class="ft_floor_plan_image" name="floor[' + length + '][ft_floor_plan_image]" value=""><ul class="floor_image row" id="up_images"></ul><p>The recommended minimum width is 810px and height is flexible.</p><button class="btn uploadedImages" type="button"><i class="fa fa-picture-o"></i> Upload Image<input type="file" class="input-text casaroyal-file-upload upload_floor_image" data-file_types="jpg|jpeg|gif|png" name="account_image" ></button></div><div class="col-md-12"><button class="btn deleteFloor" type="button"><i class="fa fa-trash"></i>Delete</button><div class="casaroyal_property_floor_devider"></div></div></div>'
        );
    });

    // Delete floor
    jQuery('.casaroyal_floors_wrapper').on('click', '.deleteFloor', function(e) {
        $(this).parent().parent().remove();
    });

    // Floor plan image
    // Delete uploaded image
    jQuery('#casaroyal_floors_wrapper').on('click', '.deleteFloorImage', function(e) {
        $(this).parent().find(".ft_floor_plan_image").val('');
        $(this).parent().find(".ft_floor_plan_image_src").remove();
        $(this).parent().find(".uploadFloorImage").css("display", "inline-block");
        $(this).css("display", "none");
    });

    jQuery('#casaroyal_floors_wrapper').on('click', '.uploadFloorImage', function(e) {
        e.preventDefault();

        this_image_holder = $(this).parent().find(".ft_floor_plan_image_holder");
        this_image_val = $(this).parent().find(".ft_floor_plan_image");

        // If the uploader object has already been created, reopen the dialog
        if (image_custom_uploader_floor) {
            image_custom_uploader_floor.open();
            return;
        }

        // Extend the wp.media object
        image_custom_uploader_floor = wp.media.frames.file_frame = wp.media({
            title: 'Choose Image',
            button: {
                text: 'Choose Image'
            },
            multiple: false
        });

        // When a file is selected, grab the URL and set it as the text field's value
        image_custom_uploader_floor.on( 'select', function(){

            var attachments = image_custom_uploader_floor.state().get('selection').map( 

                function( attachment ) {

                    attachment.toJSON();
                    return attachment;

            });

            this_image_holder.html('<img class="ft_floor_plan_image_src" src="' + attachments[0].attributes.url + '" >');
            this_image_val.val(attachments[0].id);

        });

        $(this).parent().find(".deleteFloorImage").css("display", "inline-block");
        $(this).css("display", "none");

        //Open the uploader dialog
        image_custom_uploader_floor.open();
    });

    // Toggle submit property sections
    jQuery('#submit-listing-form').on('click', '.casaroyal-accordion-header', function(e) {
        e.preventDefault();
        jQuery(this).parent().toggleClass("active");
    });

    // Toggle submit property sections Expand All
    jQuery('#submit-listing-form').on('click', '#casaroyal-submit-form-expand', function(e) {
        e.preventDefault();
        jQuery('#submit-listing-form .casaroyal-accordion-section').addClass("active");
    });

    jQuery('#submit-listing-form').on('click', '#casaroyal-submit-form-collapse', function(e) {
        e.preventDefault();
        jQuery('#submit-listing-form .casaroyal-accordion-section').removeClass("active");
    });

    //
    function casaroyal_geo_code_location() {

        // Location map
        if( jQuery("#casaroyal_property_map").exists() ) {

            var geocoder;
            var map;
            var marker;

            var geocoder = new google.maps.Geocoder();

            function geocodePosition(pos) {
                geocoder.geocode({
                    latLng: pos
                }, function(responses) {
                    if (responses && responses.length > 0) {
                        updateMarkerAddress(responses[0].formatted_address);
                    } else {
                        updateMarkerAddress('Cannot determine address at this location.');
                    }
                });
            }

            function updateMarkerPosition(latLng) {
                jQuery('#casaroyal_property_latitude').val(latLng.lat());
                jQuery('#casaroyal_property_longitude').val(latLng.lng());
            }

            function updateMarkerAddress(str) {
                jQuery('#ft_property_address').val(str);
            }

            function initialize() {

                var latlng = new google.maps.LatLng(jQuery("#casaroyal_property_latitude").val(), jQuery("#casaroyal_property_longitude").val());
                var mapOptions = {
                    zoom: 16,
                    center: latlng
                }

                map = new google.maps.Map(document.getElementById('casaroyal_property_map'), mapOptions);

                geocoder = new google.maps.Geocoder();

                marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    draggable: true
                });

                // Add dragging event listeners.
                google.maps.event.addListener(marker, 'dragstart', function() {
                    updateMarkerAddress('Dragging...');
                });
              
                google.maps.event.addListener(marker, 'drag', function() {
                    updateMarkerPosition(marker.getPosition());
                });
              
                google.maps.event.addListener(marker, 'dragend', function() {
                    geocodePosition(marker.getPosition());
                });

            }

            google.maps.event.addDomListener(window, 'load', initialize);
                     
            initialize();
                      
            jQuery(function() {
                
                jQuery("#ft_property_address").autocomplete({
                    //This bit uses the geocoder to fetch address values
                    source: function(request, response) {
                        geocoder.geocode( {'address': request.term }, function(results, status) {
                            response(jQuery.map(results, function(item) {
                                return {
                                    label:  item.formatted_address,
                                    value: item.formatted_address,
                                    latitude: item.geometry.location.lat(),
                                    longitude: item.geometry.location.lng()
                                }
                            }));
                        })
                    },
                    //This bit is executed upon selection of an address
                    select: function(event, ui) {
                        jQuery("#casaroyal_property_latitude").val(ui.item.latitude);
                        jQuery("#casaroyal_property_longitude").val(ui.item.longitude);

                        var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);

                        marker.setPosition(location);
                        map.setZoom(16);
                        map.setCenter(location);

                    }
                });
            });
              
            //Add listener to marker for reverse geocoding
            google.maps.event.addListener(marker, 'drag', function() {
                geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            jQuery('#ft_property_address').val(results[0].formatted_address);
                            jQuery('#casaroyal_property_latitude').val(marker.getPosition().lat());
                            jQuery('#casaroyal_property_longitude').val(marker.getPosition().lng());
                        }
                    }
                });
            });
            
        };
        // End location map

    }

    function casaroyal_show_message() { 

        var casaroyal_timeout;

        if( jQuery("#casaroyal-my-listings-message").exists() ) {
            jQuery(".single-add-to-compare .casaroyal-title").html( jQuery("#casaroyal-my-listings-message").html() );
            clearTimeout(casaroyal_timeout);
            $('.single-add-to-compare').addClass('single-add-to-favorites-visible');
            casaroyal_timeout = setTimeout(function(){
                $('.single-add-to-compare').removeClass('single-add-to-favorites-visible');
            }, 5000);
        }

    }

    function validateEmail(email) { 
        // http://stackoverflow.com/a/46181/11236         
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    // color tooltips
  	jQuery(function () {
    	jQuery('[data-toggle="tooltip"]').tooltip({container: 'body'});
  	});


  	if( jQuery("#casaroyal-page-no-footer").exists() ) {

  		jQuery(".main-wrapper").addClass("page-no-footer");
  		
  	}

  	if( jQuery(".main-menu").exists()) {

  		jQuery('.main-menu .children').each(function(i, ojb) {
	        jQuery(this).removeClass("children").addClass("sub-menu");
	    });
  		
  	}

  	if( jQuery("#casaroyal-fullscreen-menu").exists() ) {

  		// Toggle mobile-menu
		jQuery("#fullscreen-menu").on("click", function(){
			if (jQuery("#casaroyal-fullscreen-menu").hasClass("modal-active")) {
				jQuery("#casaroyal-fullscreen-menu").removeClass("modal-active");
			} else {
				jQuery("#casaroyal-fullscreen-menu").addClass("modal-active");
			}
			return false;
		});

		jQuery("#fullscreen-menu-close").on("click", function(){
			if (jQuery("#casaroyal-fullscreen-menu").hasClass("modal-active")) {
				jQuery("#casaroyal-fullscreen-menu").removeClass("modal-active");
			} else {
				jQuery("#casaroyal-fullscreen-menu").addClass("modal-active");
			}
			return false;
		});

	  	jQuery('#casaroyal-fullscreen-menu li.menu-item-has-children > a').each(function(i, ojb) {
	        jQuery(this).addClass('main-has-submenu');
	    });

	    jQuery('#casaroyal-fullscreen-menu ul.sub-menu li.menu-item-has-children > a').each(function(i, ojb) {
	        if ( jQuery(this).hasClass('main-has-submenu') ) {
	            jQuery(this).removeClass('main-has-submenu').addClass('child-has-submenu');
	        } else {
	            jQuery(this).addClass('child-has-submenu');
	        }
	    });

	    jQuery('#casaroyal-fullscreen-menu li.page_item_has_children > a').each(function(i, ojb) {
	        jQuery(this).addClass('main-has-submenu');
	    });

	    jQuery('#casaroyal-fullscreen-menu ul.children li.page_item_has_children > a').each(function(i, ojb) {
	        if ( jQuery(this).hasClass('main-has-submenu') ) {
	            jQuery(this).removeClass('main-has-submenu').addClass('child-has-submenu');
	        } else {
	            jQuery(this).addClass('child-has-submenu');
	        }
	    });

	    jQuery("#casaroyal-fullscreen-menu li a.main-has-submenu").append("<i class='fa fa-angle-down'></i>");
	    jQuery("#casaroyal-fullscreen-menu li a.child-has-submenu").append("<i class='fa fa-angle-down'></i>");

	    jQuery("#casaroyal-fullscreen-menu li a.main-has-submenu").parent().parent().find('ul.sub-menu').prepend("<li><a class='back-sub-menu' href='#'><i class='fa fa-angle-double-up' aria-hidden='true'></i></a></li>");
	    jQuery("#casaroyal-fullscreen-menu li a.main-has-submenu").parent().parent().find('ul.children').prepend("<li><a class='back-sub-menu' href='#'><i class='fa fa-angle-double-up' aria-hidden='true'></i></a></li>");

	}

	if( jQuery(".casaroyal-search-card-list").exists() ) {
		$(".casaroyal-search-card-list").each(function() {
		    $(this).find(".casaroyal-magazine-image-card").css( "padding-bottom", $(this).find(".casaroyal-search-card-body").height() + 60 );
		});
	}


  	if( jQuery(".casaroyal-gallery-hide-footer").exists() ) {
  		jQuery(".casaroyal-page-footer").css("display", "none");
  	}

  	// Tabs
  	if( jQuery(".casaroyal-tabs").exists() ) {

  		var tabs = $('.casaroyal-tabs');
	
		tabs.each(function(){

			var tab = $(this);
			var tabContentWrapper = tab.find('.content-wrapper');

			$(this).find("ul.cd-tabs-navigation li a").on("click", function(){
				var selectedTab = $(this).data('content');
				tab.find("ul.cd-tabs-navigation li a").removeClass("selected");
				$(this).addClass("selected");
				tabContentWrapper.find(".section-topline").removeClass("selected");
				tabContentWrapper.find('#'+selectedTab).addClass("selected");

			});

		});

  	}

  	// Only for demo
  	// Remove language links
  	if( jQuery(".menu-item-language").exists() ) {
  		$(".menu-item-language a").each(function() {
		    $(this).attr("href", "#");
		});
  	}
  	// End 

  	$(".video-play-icon").on("click", function(){
		$(this).closest(".video-cover").addClass("reveal-video");
	});

  	if( jQuery("#change-color").exists() ) {
  		//
  	} else {
  		$("#main-color-container").remove();
  	}

  	if( jQuery(".casaroyal-accordion").exists() ) {
  		$("ul.casaroyal-accordion li h4").on("click", function(){
  			if($(this).parent().hasClass("active")) {
  				var thisHasClass = 1;
  			} else {
  				var thisHasClass = 0;
  			}
  			$(this).parent().parent().find("li").removeClass("active");
  			if(thisHasClass == 0) {
				$(this).parent().addClass("active");
				var thisHasClass = 1;
			}
		});
  	}

  	if( jQuery(".product-card-wishlist-container .yith-wcwl-wishlistaddedbrowse").exists() ) {
  		jQuery(".product-card-wishlist-container .yith-wcwl-wishlistaddedbrowse a").html('<i class="fa fa-heart" aria-hidden="true"></i>');
  	}

  	if( jQuery(".product-card-wishlist-container .yith-wcwl-wishlistexistsbrowse").exists() ) {
  		jQuery(".product-card-wishlist-container .yith-wcwl-wishlistexistsbrowse a").html('<i class="fa fa-heart" aria-hidden="true"></i>');
  	}

  	if( jQuery(".yith-wcwl-add-to-wishlist").exists() ) {

		function casaroyal_refresh_dynamic_contents() {
			
		}
		
		casaroyal_refresh_dynamic_contents();
		
		jQuery(".casaroyal-add-to-wishlist a").on("click", function() {
			setTimeout(function() {	
				casaroyal_refresh_dynamic_contents();
			}, 2000);
		});

		jQuery("body").live('added_to_wishlist',function(e){ //trigger defined in jquery.yith-wcwl.js
			casaroyal_refresh_dynamic_contents();
		});

	}

  	if( jQuery(".position-Floating").exists() ) {
  		$('.casaroyal-content-wrapper').addClass('menu-position-Floating');
  	}

  	// Toggle big search modal window
  	$(".casaroyal-product-quick-view-block").on("click", function(e){
  		e.preventDefault();
  	});

	$("#menu-search-button a").on("click", function(){	
		$("#big-search-holder").toggleClass("modal-active");
		return false;
	});

	$(".close-big-search-holder").on("click", function(){	
		$("#big-search-holder").toggleClass("modal-active");
		return false;
	});

	$("#quick-view-big-holder .close-big-search-holder").on("click", function(){	
		$("#quick-view-big-holder").removeClass("modal-active");
		$("#big-search-holder").removeClass("modal-active");
		return false;
	});

	$(document).on("click", '.close-casaroyal-product-quick-view-block .fa', function(event) { 
		$("#quick-view-big-holder").removeClass("modal-active");
		$("#big-search-holder").removeClass("modal-active");
		return false;
	});

  	jQuery(".progress").fadeIn();

  	if (jQuery("#menu").attr('data-bg-color') !== "undefined") {
  		var value = jQuery("#menu").attr('data-bg-color');
	  	jQuery(".background-cover-holder").css("background-color", value);
	  	jQuery(".background-cover-holder-fixed").css("background-color", value);
	}

	if (jQuery("#menu").attr('data-bg-opacity') !== "undefined") {
  		var value = jQuery("#menu").attr('data-bg-opacity');
	  	jQuery(".background-cover-holder").css("opacity", value);
	}

	if (jQuery("#menu").attr('data-fixed-bg-color') !== "undefined") {
  		var value = jQuery("#menu").attr('data-fixed-bg-color');
	  	jQuery(".background-cover-holder-fixed").css("background-color", value);
	}

	if (jQuery("#menu").attr('data-fixed-bg-opacity') !== "undefined") {
  		var value = jQuery("#menu").attr('data-fixed-bg-opacity');
	  	jQuery(".background-cover-holder-fixed").css("opacity", value);
	}

	jQuery("#menu").css("opacity", 1);

  	function initNav() {

	    $(window).scroll(function() {
	      
	      	if ($(window).scrollTop() >= 300 ) {
	          	$('#menu').addClass('navbar-fixed');
	        } else{
	          	$('#menu').removeClass('navbar-fixed');
	        }

	    }).trigger('scroll');

	}

	function initChangeColors() {

		/*********************************************** 
			Change Colors Function
		***********************************************/
		if( jQuery("#main-color-container").exists() ) {

			var last;
			var next;
			var colors = ['colorset-one','colorset-two','colorset-three','colorset-four','colorset-five','colorset-six','colorset-seven'];

			do {
			    var next = Math.floor(Math.random()*colors.length);
			} while( next === last ) // if it's the same as the last one, try again!
			// tell it this is the last one now
			var last = next;

			var selectedcolor = colors[next];

			$("#main-color-container").append("<div class='colorsblock "+selectedcolor+"'></div>").children(':last').hide().fadeIn(200, function() {
				$("#main-color-container").find('.colorsblock:not(:last)').remove();
			});

			$("#color-palette").append("<div class='palette-colorset palette-"+selectedcolor+"'></div>").children(':last').hide().fadeIn(200, function() {
				$("#color-palette").find('.palette-colorset:not(:last)').remove();
			});

			$("#change-color").on("click", function(){

				do {
				    next = Math.floor(Math.random()*colors.length);
				} while( next === last ) // if it's the same as the last one, try again!
				// tell it this is the last one now
				last = next;

				var selectedcolor = colors[next];

				$("#main-color-container").append("<div class='colorsblock "+selectedcolor+"'></div>").children(':last').hide().fadeIn(200, function() {
					$("#main-color-container").find('.colorsblock:not(:last)').remove();
				});

				$("#color-palette").append("<div class='palette-colorset palette-"+selectedcolor+"'></div>").children(':last').hide().fadeIn(200, function() {
					$("#color-palette").find('.palette-colorset:not(:last)').remove();
				});
			});

		}

	}
	
	function initMobileMenu() {

		// Toggle mobile-menu
		$(".nav-toggle").on("click", function(){	
			$(this).toggleClass("active");
			$(".mobile-menu").slideToggle();
			if ($(".search-toggle").hasClass("active")) {
				$(".search-toggle").removeClass("active");
				$(".mobile-search").slideToggle();
			}
			return false;
		});
		
		
		// Toggle mobile-search
		$(".search-toggle").on("click", function(){	
			$(this).toggleClass("active");
			$(".mobile-search").slideToggle();
			if ($(".nav-toggle").hasClass("active")) {
				$(".nav-toggle").removeClass("active");
				$(".mobile-menu").slideToggle();
			}
			return false;
		});

	}

	function initResizeWindow() {

		// resize videos after container
		var vidSelector = ".post iframe, .post object, .post video, .widget-content iframe, .widget-content object, .widget-content iframe";	
		var resizeVideo = function(sSel) {
			$( sSel ).each(function() {
				var $video = $(this),
					$container = $video.parent(),
					iTargetWidth = $container.width();

				if ( !$video.attr("data-origwidth") ) {
					$video.attr("data-origwidth", $video.attr("width"));
					$video.attr("data-origheight", $video.attr("height"));
				}

				var ratio = iTargetWidth / $video.attr("data-origwidth");

				$video.css("width", iTargetWidth + "px");
				$video.css("height", ( $video.attr("data-origheight") * ratio ) + "px");
			});
		};

		resizeVideo(vidSelector);

		$(window).on('resize', function(event) {

	        jQuery.fn.exists = function(){return this.length>0;}

			if ($(window).width() > 1000) {
				$(".toggle").removeClass("active");
				$(".mobile-menu").hide();
				$(".mobile-search").hide();
			}

			resizeVideo(vidSelector);

	  	}).trigger('resize');

	}

	function initGeneral() {

		jQuery.fn.exists = function(){return this.length>0;}

		// count animation
	    if( jQuery(".count").exists() ) {
	    	jQuery(".count").one("inview", function(event, isInView) {
			  	if (isInView) {
			  		var duration = 1000;
			  		if(jQuery(this).text() >= 10) {
			  			var duration = 1500;
			  		}
			  		if(jQuery(this).text() >= 100) {
			  			var duration = 2500;
			  		}
			  		if(jQuery(this).text() >= 500) {
			  			var duration = 3500;
			  		}
			  		if(jQuery(this).text() >= 1000) {
			  			var duration = 4000;
			  		}
				    jQuery(this).prop('Counter',0).animate({
				        Counter: jQuery(this).text()
				    }, {
				        duration: duration,
				        easing: 'swing',
				        step: function (now) {
				            jQuery(this).text(Math.ceil(now));
				        }
				    });
			  	}
			});
   		};

		if( jQuery("#menu").exists() ) {
			$("#menu a").each(function() {
			    if($(this).is('a:not([href^="#"])')) {
			      	$(this).addClass("external");
			    }
			    if(jQuery(this).attr("href") == "#") {
			    	$(this).addClass("external");
			    }
			});
		};

        if( jQuery("#casaroyal-side-menu").exists() ) {
			$("#casaroyal-side-menu a").each(function() {
			    if($(this).is('a:not([href^="#"])')) {
			      	$(this).addClass("external");
			    }
			    if(jQuery(this).attr("href") == "#") {
			    	$(this).addClass("external");
			    }
			});
		};

        if( jQuery("#casaroyal-admin-side-menu").exists() ) {
            $("#casaroyal-admin-side-menu a").each(function() {
                if($(this).is('a:not([href^="#"])')) {
                    $(this).addClass("external");
                }
                if(jQuery(this).attr("href") == "#") {
                    $(this).addClass("external");
                }
            });
        };
	
		// Dropdown menus on touch devices
		//$( '.main-menu li:has(ul)' ).doubleTapToGo();

		// browser window scroll (in pixels) after which the "back to top" link is shown
		var offset = 300,
			//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
			offset_opacity = 1200,
			//duration of the top scrolling animation (in ms)
			scroll_top_duration = 700,
			//grab the "back to top" link
			$back_to_top = jQuery('.cd-top');

		//hide or show the "back to top" link
		$(window).scroll(function(){
			( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
			if( $(this).scrollTop() > offset_opacity ) { 
				$back_to_top.addClass('cd-fade-out');
			}
		});

		//smooth scroll to top
		$back_to_top.on('click', function(event){
			event.preventDefault();
			jQuery('body,html').animate({
				scrollTop: 0 ,
			 	}, scroll_top_duration
			);
		});

		// show sidebar menu
		jQuery('.mobile-menu').on('click', function(e){
			e.preventDefault();
			$( 'body' ).toggleClass( "casaroyal-side-opened" );
			jQuery('#casaroyal-side-menu').css("display", "block");
			jQuery('#casaroyal-side-menu').animate({
				left: '0',
			 	}, 200
			);
		});

        // show admin sidebar menu
        jQuery('.mobile-admin-menu').on('click', function(e){
            console.log("admin-menu");
            e.preventDefault();
            $( 'body' ).toggleClass( "casaroyal-side-opened" );
            jQuery('#casaroyal-admin-side-menu').css("display", "block");
            jQuery('#casaroyal-admin-side-menu').animate({
                right: '0',
                }, 200
            );
        });

		// hide sidebar menu
		jQuery('.casaroyal-side-close').on('click', function(e){
			e.preventDefault();
			$( 'body' ).toggleClass( "casaroyal-side-opened" );
			jQuery('#casaroyal-side-menu').animate({
				left: '-280px',
		 	}, 120, function() {
			    jQuery('#casaroyal-side-menu').css("display", "none");
			});

            jQuery('#casaroyal-admin-side-menu').animate({
                right: '-280px',
            }, 120, function() {
                jQuery('#casaroyal-admin-side-menu').css("display", "none");
            });
		});

		$(".casaroyal-side-inner .menu-item-has-children").each(function() {
			$(this).children("a").append('<i class="fa fa-angle-down open-sub-menu" aria-hidden="true"></i>');
		});

		// open sidebar sub menu 
		jQuery(".casaroyal-side-inner .menu-item-has-children > a").on('click', function(e){
			e.preventDefault();
			$(this).closest("li").children(".sub-menu").slideUp("fast");
                
            if ($(this).closest("li").children(".sub-menu").is(":hidden") == true ) {
                $(this).closest("li").children(".sub-menu").slideDown("normal");
            }
			//$(this).closest("li").toggleClass("opened-subm-menu");
		});

		function hideMenu() {
			jQuery('#casaroyal-side-menu').css("display", "none");
		};	

		if( jQuery(".property-gallery").exists() ) {
			$('.carousel-slider').slick({
	            slidesToShow: 1,
	            slidesToScroll: 1,
	            arrows: true,
	            infinite: true,
	            asNavFor: '.carousel-thumbnail'
	        });
	        $('.carousel-thumbnail').slick({
	            slidesToShow: 5,
	            slidesToScroll: 1,
	            asNavFor: '.carousel-slider',
	            dots: false,
	            infinite: true,
	            focusOnSelect: true,
	            arrows: true,
	            swipe: false,
	            responsive: [
	                {
	                    breakpoint: 600,
	                    settings: {
	                        slidesToShow: 3
	                    }
	                }
	            ]
	        });
       	}

        $.fn.digits = function() {  
            return this.each(function(){ 
                $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
            })
        }

        $("a.fancybox").fancybox({
            maxWidth    : 800,
            maxHeight   : 600,
            fitToView   : true,
            width       : '70%',
            height      : 'auto',
            afterLoad: function() {
                this.title = (this.index + 1) + ' of ' + this.group.length;
            },
            helpers: { 
                title: { type : 'inside' }
            }
        });
        jQuery(document).on('click', 'a.open-album', function(e){
            var el, id = $(this).data('open-id');
            if(id){
                el = $('.fancybox[data-fancybox-group=' + id + ']:eq(0)');
                e.preventDefault();
                el.click();
            }
        });

        $(".bph-play-video").fancybox({
            maxWidth    : 800,
            maxHeight   : 600,
            fitToView   : true,
            width       : 800,
            height      : 600,
            autoSize    : true,
            closeClick  : false,
            openEffect  : 'none',
            closeEffect : 'none'
        });

        $(".btn-virtual-tour").fancybox({
            maxWidth    : 800,
            maxHeight   : 600,
            fitToView   : true,
            width       : 800,
            height      : 600,
            autoSize    : true,
            closeClick  : false,
            openEffect  : 'none',
            closeEffect : 'none'
        });

        // price range
        if( jQuery("#priceRange").exists() ) {

            var carPriceMin = parseFloat(jQuery( "#priceMin" ).val());
            var carPriceMax = parseFloat(jQuery( "#priceMax" ).val());

            var carPriceMinNew = carPriceMin;
            var carPriceMaxNew = carPriceMax;

            if( jQuery("#priceMinNew").exists() ) {
                carPriceMinNew = parseFloat(jQuery( "#priceMinNew" ).val());
            }

            if( jQuery("#priceMaxNew").exists() ) {
                carPriceMaxNew = parseFloat(jQuery( "#priceMaxNew" ).val());
            }

            // price range
            jQuery( "#priceRange" ).slider({
                range: true,
                step: 10,
                min: carPriceMin,
                max: carPriceMax,
                values: [ carPriceMinNew, carPriceMaxNew ],
                slide: function( event, ui ) {

                    $( "#min-price" ).val( ui.values[ 0 ] );
                    $( "#max-price" ).val( ui.values[ 1 ] );

                    $( "span.min-price-text span" ).text( ui.values[ 0 ] );
                    $( "span.max-price-text span" ).text( ui.values[ 1 ] );

                    $( "span.min-price-text span" ).digits();
                    $( "span.max-price-text span" ).digits();

                },
                stop: function( event, ui ) {
                    
                    var ajax_type = "filter";
                    $('.properties-holder').addClass('loading_properties');
                    jQuery(".properties-holder").slideUp("slow");
                    casaroyal_ajax_load_properties(ajax_type);

                }
            });

            jQuery( "#min-price" ).val( $( "#priceRange" ).slider( "values", 0 ) );
            jQuery( "#max-price" ).val( $( "#priceRange" ).slider( "values", 1 ) );

            $( "span.min-price-text span" ).digits();
            $( "span.max-price-text span" ).digits();

        }
        //

   		$(document).on("click", '.casaroyal-gallery-fullscreen-slider-cover-open-gallery', function(event) { 
   			jQuery(".casaroyal-gallery-fullscreen-slider-cover").fadeOut( "fast", function() {

   			});
   		});

  		if( jQuery(".casaroyal-side-menu").exists() ) {
  			jQuery(".casaroyal-side-menu").css("padding-top", jQuery(".top-br").height());
  			jQuery(".casaroyal-side-menu").css("padding-left", jQuery(".top-br").height());
  			jQuery(".casaroyal-side-menu").css("padding-bottom", jQuery(".top-br").height());
  		}

  		if( jQuery(".left-br").exists() ) {
  			var windowMarginTop = jQuery(".left-br").width();
  		} else {
  			var windowMarginTop = 0;
  		} 

  		jQuery(".casaroyal-content-wrapper").css("margin-top", windowMarginTop);

   		if( jQuery(".casaroyal-gallery-fullscreen-slider").exists() ) {

   			jQuery('.casaroyal-gallery-fullscreen-slider-flexslider').flexslider( {
            	animation: "fade",
            	slideshow: false,
                slideshowSpeed: 4200,   
                animationSpeed: 500, 
                startAt: 0,
		        animationLoop: true,
		        pauseOnHover: true,
            });

	  		if( jQuery(".left-br").exists() ) {
	  			var windowPadding = jQuery(".left-br").width() * 2;
	  			var windowMarginTop = jQuery(".left-br").width();
	  		} else {
	  			var windowPadding = 0;
	  			var windowMarginTop = 0;
	  		}

	  		if( jQuery("#wpadminbar").exists() ) {
	  			var windowAdminBar = jQuery("#wpadminbar").height();
	  		} else {
	  			var windowAdminBar = 0;
	  		}

	  		var windowHeight = jQuery(window).height() - windowPadding - windowAdminBar;

	  		jQuery(".casaroyal-gallery-fullscreen-slider").css("height", windowHeight);
	  		jQuery(".casaroyal-gallery-fullscreen-slider-flexslider").css("height", windowHeight);
	  		jQuery(".casaroyal-gallery-fullscreen-slider-flexslider ul.slides li").css("height", windowHeight);

	  		// Add image counter
	  		var totalImages = jQuery(".casaroyal-gallery-fullscreen-slider-flexslider .slides").attr('data-images');
	  		if(totalImages < 10) {
	  			var totalImagesFinal = "0" + totalImages;
	  		} else {
	  			var totalImagesFinal = totalImages;
	  		}

	  		jQuery( '<li class="count_holder"><span class="count_current">01</span><span class="count_total">'+totalImagesFinal+'</span></li>' ).insertAfter( ".casaroyal-gallery-fullscreen-slider .flex-direction-nav li.flex-nav-prev" );

	  		$(document).on("click", '.casaroyal-gallery-fullscreen-slider .flex-direction-nav li a', function(event) { 

	  			var mainParent = jQuery(this).parent().parent().parent();
	  			var mainParentCurrentSlide = mainParent.find(".slides li.flex-active-slide").attr('data-current');
	  			if( mainParentCurrentSlide < 10 ) {
	  				var mainParentCurrentSlideFinal = "0" + mainParentCurrentSlide;
	  			} else {
	  				var mainParentCurrentSlideFinal = mainParentCurrentSlide;
	  			}
	  			mainParent.find(".flex-direction-nav li.count_holder .count_current").text(mainParentCurrentSlideFinal);
	  		});

	  	}

	  	if( jQuery("#magazine-post-slider").exists() ) {

   			jQuery('#magazine-post-slider').flexslider( {
            	animation: "fade",
            	slideshow: false,
                slideshowSpeed: 4200,   
                animationSpeed: 500, 
                startAt: 0,
		        animationLoop: true,
		        pauseOnHover: true,
            });

   		}

	  	$(window).on('resize', function(event) {

	  		if( jQuery("#wpadminbar").exists() ) {
	  			jQuery(".casaroyal-side-menu").css("margin-top", jQuery("#wpadminbar").height());
	  		} 

	  		if( jQuery(".left-br").exists() ) {
	  			var windowMarginTop = jQuery(".left-br").width();
	  		} else {
	  			var windowMarginTop = 0;
	  		} 

	  		jQuery(".casaroyal-content-wrapper").css("margin-top", windowMarginTop);

	  		if( jQuery(".casaroyal-gallery-fullscreen-slider").exists() ) {

		  		if( jQuery(".left-br").exists() ) {
		  			var windowPadding = jQuery(".left-br").width() * 2;
		  			var windowMarginTop = jQuery(".left-br").width();
		  		} else {
		  			var windowPadding = 0;
		  			var windowMarginTop = 0;
		  		}

		  		if( jQuery("#wpadminbar").exists() ) {
		  			var windowAdminBar = jQuery("#wpadminbar").height();
		  		} else {
		  			var windowAdminBar = 0;
		  		}

		  		var windowHeight = jQuery(window).height() - windowPadding - windowAdminBar;

		  		jQuery(".casaroyal-gallery-fullscreen-slider").css("height", windowHeight);
		  		jQuery(".casaroyal-gallery-fullscreen-slider-flexslider").css("height", windowHeight);
		  		jQuery(".casaroyal-gallery-fullscreen-slider-flexslider ul.slides li").css("height", windowHeight);

		  	}

	  	});

   		$("a[rel^='prettyPhoto']").prettyPhoto({
   			theme: 'light_square', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
   		});


   		// animate progress circles
	    if( jQuery(".casaroyal-progress-circle").exists() ) {
	    	jQuery(".casaroyal-progress-circle").on("inview", function(event, isInView) {
			  	if (isInView) {
			    	jQuery(this).addClass("animated");
			  	}
			});
   		};

   		// animate progress bars
	    if( jQuery(".casaroyal-progress-bar-progress").exists() ) {
	    	jQuery(".casaroyal-progress-bar-progress").on("inview", function(event, isInView) {
			  	if (isInView) {
			    	$(this).animate({
			            width: $(this).data("percent")
			        }, 700 );
			  	}
			});
   		};

   		jQuery(".owl-partners").owlCarousel({

	      	loop:   true,
		    margin: 10,
		    nav:    true,
		    responsive:{
		        0:{
		            items:1
		        },
		        600:{
		            items:3
		        },
		        1000:{
		            items:6
		        }
		    }
	 
	  	});

        jQuery(".owl-properties").owlCarousel({

            loop:   true,
            margin: 30,
            nav:    false,
            autoplay: false,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                1000:{
                    items:3
                }
            }
     
        });

	  	jQuery(".owl-categories").owlCarousel({

	      	loop:   true,
		    margin: 20,
		    nav:    true,
		    responsive:{
		        0:{
		            items:1
		        },
		        600:{
		            items:2
		        },
		        1000:{
		            items:4
		        }
		    }
	 
	  	});

	  	jQuery(".owl-testimonials").owlCarousel({

	      	loop:   true,
		    margin: 10,
		    nav:    true,
		    responsive:{
		        0:{
		            items:1
		        },
		        600:{
		            items:2
		        },
		        1000:{
		            items:3
		        }
		    }
	 
	  	});

        jQuery(".owl-testimonials-v3").owlCarousel({

            loop:   true,
            margin: 30,
            nav:    true,
            autoplay: true,
            autoplaySpeed: 300,
            navSpeed: 300,
            autoHeight: true,
            autoplayTimeout: 9000,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                1000:{
                    items:1
                }
            }
     
        });

        jQuery(".owl-agents").owlCarousel({

            loop:   true,
            margin: 30,
            nav:    true,
            responsive:{
                0:{
                    items:1
                },
                1000:{
                    items:2
                },
                1400:{
                    items:3
                }
            }
     
        });

	  	if( jQuery(".owl-carousel").exists() ) {
	  		var dots = jQuery(".owl-carousel owl-dots > div").length;
	  		if(dots >= 2 ) {
		  		var marginDots = (dots / 2 * 44) + 30; 
		  	} else {
		  		var marginDots = 54; 
	  		}
	  		jQuery(this).find(".owl-nav .owl-prev").html("");
	  		jQuery(this).find(".owl-nav .owl-next").html("");
	  	}

   		if( jQuery(".has-image-bg").exists() ) {
   			jQuery("#main-color-container").css("opacity", 0);
   		};

   		/*-----------------------------------------------------------------------------------*/
        /* Properties Sorting
        /*-----------------------------------------------------------------------------------*/
        function insertParam(key, value) {
            key = encodeURI(key);
            value = encodeURI(value);

            var new_param = document.location.search.substr(1).split('&');

            var i = new_param.length;
            var x;
            while (i--) {
                x = new_param[i].split('=');

                if (x[0] == key) {
                    x[1] = value;
                    new_param[i] = x.join('=');
                    break;
                }
            }

            if (i < 0) {
                new_param[new_param.length] = [key, value].join('=');
            }

            //this will reload the page, it's likely better to store this until finished
            document.location.search = new_param.join('&');
        }

        if( jQuery("#sort-properties").exists() ) {
       		[].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {	
				new SelectFx(el, {
                    // when opening the select element, the default placeholder (if any) is shown
                    stickyPlaceholder : true,
                    // callback when changing the value
                    onChange : function( val ) { 
                        var key = 'sortby';
			            insertParam( key, val );
                    }
                });
			} );
       	}

   		if( jQuery("#woocommerce-ordering-form").exists() ) {
			[].slice.call( document.querySelectorAll( '#woocommerce-ordering-form select.cs-select' ) ).forEach( function(el) {	
				new SelectFx(el, {
                    // when opening the select element, the default placeholder (if any) is shown
                    stickyPlaceholder : true,
                    // callback when changing the value
                    onChange : function( val ) { 
                        var key = 'orderby';
			            insertParam( key, val );
                    }
                });
			} );
		}

       	// Your base, I'm in it!
	    var originalAddClassMethod = jQuery.fn.addClass;

	    jQuery.fn.addClass = function(){
	        // Execute the original method.
	        var result = originalAddClassMethod.apply( this, arguments );

	        // trigger a custom event
	        jQuery(this).trigger('cssClassChanged');

	        // return the original result
	        return result;
	    }

       	$(".carousel-thumbnail .slick-track .slick-slide").bind('cssClassChanged', function(){
	        var current = $('.carousel-thumbnail .slick-slide.slick-current').attr("data-slick-index");
	        current++;
	        $(".property-gallery-count .property-gallery-count-current").text("");
	        $(".property-gallery-count .property-gallery-count-current").text(current);
	    });

	    // init sortable accordions masonry
	  	if( jQuery(".casaroyal-sortable-accordion").exists() ) {
			$(".casaroyal-sortable-accordion #filters li").on("click", function(){

				$(this).parent().find("li").removeClass("active");
				$(this).addClass("active");

			  	var filterValue = $(this).attr('data-filter');
			  	$(this).parent().parent().find(".casaroyal-accordion li").addClass("hide-sortbale-block");
			  	$(this).parent().parent().find(".casaroyal-accordion li"+filterValue).removeClass("hide-sortbale-block");

			});
		}

		if( jQuery(".rrssb-buttons").exists() ) {

		  	$('.rrssb-buttons').rrssb({
			    // required:
			    title: jQuery(".rrssb-buttons").attr('data-title'),
			    url: jQuery(".rrssb-buttons").attr('data-link'),

			    // optional:
			    description: jQuery(".rrssb-buttons").attr('data-title'),
			    emailBody: jQuery(".rrssb-buttons").attr('data-title') + ' - ' + jQuery(".rrssb-buttons").attr('data-link')
		  	});

		};

	  	// init Isotope
        var $grid = $('.masonry');

        $grid.isotope({
            itemSelector: '.masonry-item',
            percentPosition: true,
            masonry: {
                // use element for option
                columnWidth: '.col-md-4'
            }
        });

		$grid.imagesLoaded().progress( function( instance, image ) {
		  	$grid.isotope('layout');
		});

		$grid.imagesLoaded().done( function() {
		  	$grid.isotope('layout');
		});

		// init Isotope Gallery
		var $grid = $('.image-gallery-masonry').isotope({
		  	itemSelector: '.gallery-item-masonry',
		  	percentPosition: true,
		  	masonry: {
		    	// use element for option
		    	columnWidth: '.gallery-item-masonry'
		  	}
		});

		$grid.imagesLoaded().progress( function() {
		  	$grid.isotope('layout');
		});
		$grid.imagesLoaded().done( function() {
		  	$grid.isotope('layout');
		});

		// init projects Isotope
		var $grid_project_2 = $('.masonry-projects').isotope({
		  	itemSelector: '.masonry-item',
		  	percentPosition: true,
		  	masonry: {
		    	// use element for option
		    	columnWidth: '.col-md-6'
		  	}
		});

		$grid_project_2.imagesLoaded().progress( function() {
		  	$grid_project_2.isotope('layout');
		});
		$grid_project_2.imagesLoaded().done( function() {
		  	$grid_project_2.isotope('layout');
		});

		$("#filters li").on("click", function(){
			$(".masonry-projects").addClass("masonry-projects-nodelay");
			$("#filters li").removeClass("active");
			$(this).addClass("active");
		  	var filterValue = $(this).attr('data-filter');
		  	$grid_project_2.isotope({ filter: filterValue });
		});

		// init projects Isotope
		var $grid_project_3 = $('.masonry-projects-3col').isotope({
		  	itemSelector: '.masonry-item',
		  	percentPosition: true,
		  	masonry: {
		    	// use element for option
		    	columnWidth: '.col-md-4'
		  	}
		});

		$grid_project_3.imagesLoaded().progress( function() {
		  	$grid_project_3.isotope('layout');
		});
		$grid_project_3.imagesLoaded().done( function() {
		  	$grid_project_3.isotope('layout');
		});

		$("#filters li").on("click", function(){
			$(".masonry-projects").addClass("masonry-projects-nodelay");
			$("#filters li").removeClass("active");
			$(this).addClass("active");
		  	var filterValue = $(this).attr('data-filter');
		  	$grid_project_3.isotope({ filter: filterValue });
		});

		// init projects Isotope
		var $grid_shop = $('.vc_col-sm-12 .wpb_wrapper .row .masonry-shop').isotope({
		  	itemSelector: '.masonry-item',
		  	percentPosition: true,
		  	masonry: {
		    	// use element for option
		    	columnWidth: '.col-md-4'
		  	}
		});

		$grid_shop.imagesLoaded().progress( function() {
		  	$grid_shop.isotope('layout');
		});
		$grid_shop.imagesLoaded().done( function() {
		  	$grid_shop.isotope('layout');
		});

		// init projects Isotope
		var $grid_shop_sidebar = $('.col-md-8 .masonry-shop').isotope({
		  	itemSelector: '.masonry-item',
		  	percentPosition: true,
		  	masonry: {
		    	// use element for option
		    	columnWidth: '.col-md-6'
		  	}
		});

		$grid_shop_sidebar.imagesLoaded().progress( function() {
		  	$grid_shop_sidebar.isotope('layout');
		});
		$grid_shop_sidebar.imagesLoaded().done( function() {
		  	$grid_shop_sidebar.isotope('layout');
		});

		// init projects Isotope
		var $grid_blog_sidebar_r = $('#blog-right-sidebar .masonry').isotope({
		  	itemSelector: '.masonry-item',
		  	percentPosition: true,
		  	masonry: {
		    	// use element for option
		    	columnWidth: '.col-md-6'
		  	}
		});

		$grid_blog_sidebar_r.imagesLoaded().progress( function() {
		  	$grid_blog_sidebar_r.isotope('layout');
		});
		$grid_blog_sidebar_r.imagesLoaded().done( function() {
		  	$grid_blog_sidebar_r.isotope('layout');
		});


		// init projects Isotope
		var $grid_blog_sidebar_l = $('#blog-left-sidebar .masonry').isotope({
		  	itemSelector: '.masonry-item',
		  	percentPosition: true,
		  	masonry: {
		    	// use element for option
		    	columnWidth: '.col-md-6'
		  	}
		});

		$grid_blog_sidebar_l.imagesLoaded().progress( function() {
		  	$grid_blog_sidebar_l.isotope('layout');
		});
		$grid_blog_sidebar_l.imagesLoaded().done( function() {
		  	$grid_blog_sidebar_l.isotope('layout');
		});


		// init projects Isotope
		var $grid_blog_sidebar_r_big = $('#blog-right-sidebar.big-cards-magazine .masonry').isotope({
		  	itemSelector: '.masonry-item',
		  	percentPosition: true,
		  	masonry: {
		    	// use element for option
		    	columnWidth: '.col-md-12'
		  	}
		});

		$grid_blog_sidebar_r_big.imagesLoaded().progress( function() {
		  	$grid_blog_sidebar_r_big.isotope('layout');
		});
		$grid_blog_sidebar_r_big.imagesLoaded().done( function() {
		  	$grid_blog_sidebar_r_big.isotope('layout');
		});


		// Magazine fixed sidebar function
        /*
		if ( jQuery('.casaroyal-magazine-sidebar-fixed').exists()  && ( casaroyalSettings.fixed_sidebar  == "on") ) { // make sure "#sidebar" element exists

		    $.fn.stickyTopBottom = function(options) {

			  	var $el, container_top, current_translate, element_top, last_viewport_top, viewport_height, oldSidebarState, sidebarState;
			  	if (options == null) {
			    	options = {};
			  	}

			  	options = $.extend({
			    	container: $('body'),
			    	top_offset: 0,
			    	bottom_offset: 0
			  	}, options);

			  	$el = $(this);
			  	container_top = options.container.offset().top;
			  	element_top = $el.offset().top;
			  	viewport_height = $(window).height();

			  	$(window).on('resize', function() {
			    	return viewport_height = $(window).height();
			  	});

			  	current_translate = 0;
			  	last_viewport_top = document.documentElement.scrollTop || document.body.scrollTop;

			  	sidebarState = 0;

			  	if( $el.find(".sidebar").height() < options.container.height() ) {

				  	return $(window).on('scroll', function(event) {

					    var container_bottom, 
					    	effective_viewport_bottom, 
					    	effective_viewport_top, 
					    	element_fits_in_viewport, 
					    	element_height, 
					    	is_scrolling_up, 
					    	new_translation, 
					    	viewport_bottom, 
					    	viewport_top;

					    viewport_top = document.documentElement.scrollTop || document.body.scrollTop;

					    viewport_bottom = viewport_top + viewport_height;
					    effective_viewport_top = viewport_top + options.top_offset;
					    effective_viewport_bottom = viewport_bottom - options.bottom_offset;
					    element_height = $el.height();
					    is_scrolling_up = false;

					    if(viewport_top < last_viewport_top) {
					    	is_scrolling_up = true;
					    } else {
					    	is_scrolling_up = false;
					    }

					    element_fits_in_viewport = $el.find(".sidebar").height() < viewport_height;

					    new_translation = null;

					    if (is_scrolling_up) {

					    	sidebarState = "start slide top";

					    	var element_top_position = $el.find(".sidebar").offset().top;

					    	if (effective_viewport_top < container_top) {

					        	new_translation = 0;

					        	sidebarState = "top limit stop";

					      	} else if( effective_viewport_top < element_top_position ) {

					    		sidebarState = "top limit fixed";

					    	} 

					    } else if (element_fits_in_viewport) {

					    	container_top = options.container.offset().top;
					      	container_bottom = container_top + options.container.height();

					      	if (effective_viewport_top > element_top + current_translate) {

					        	new_translation = effective_viewport_top - element_top;

					        	sidebarState = "top limit fixed";

					      	} 

					      	if (effective_viewport_bottom > container_bottom) {

					        	new_translation = container_bottom - (element_top + element_height);

					        	sidebarState = "bottom limit stop";

					      	}

					    } else {

					    	sidebarState = "start slide down";

					    	container_top = options.container.offset().top;
					      	container_bottom = container_top + options.container.height();
					      	var element_bottom_position = $el.find(".sidebar").offset().top + $el.find(".sidebar").height();

					      	if (effective_viewport_bottom > container_bottom) {

					        	new_translation = container_bottom - (element_top + element_height);

					        	sidebarState = "bottom limit stop";

					      	} else if (effective_viewport_bottom > element_bottom_position) {

					        	new_translation = effective_viewport_bottom - (element_top + element_height);

					        	sidebarState = "bottom limit fixed";

					      	}

					    }

					    if (new_translation !== null) {

					      	current_translate = new_translation;
					      	//$el.css('transform', "translate(0, " + current_translate + "px)");

					    }

					    if( sidebarState != oldSidebarState ) {

					      	if( sidebarState == "bottom limit fixed" ) {

					      		$el.find(".sidebar").css( 'width', $el.width() );
					      		$el.find(".sidebar").css( 'position', 'fixed' )
					      		$el.find(".sidebar").css( 'top', 'auto' );
					      		$el.find(".sidebar").css( 'bottom', '0px' );
					      		$el.find(".sidebar").css( 'z-index', '1' );

					      	} else if( sidebarState == "top limit fixed" ) {

					      		$el.find(".sidebar").css( 'width', $el.width() );
					      		$el.find(".sidebar").css( 'position', 'fixed' )
					      		$el.find(".sidebar").css( 'top', '10px' );
					      		$el.find(".sidebar").css( 'bottom', 'auto' );
					      		$el.find(".sidebar").css( 'z-index', '1' );

					      	} else if( sidebarState == "start slide top") {

					      		var offset_element = $el.find(".sidebar").offset().top;
				      			var offset_container = options.container.offset().top;

					      		$el.find(".sidebar").css( 'width', $el.width() );
					      		$el.find(".sidebar").css( 'top', offset_element - offset_container + 'px' );
					      		$el.find(".sidebar").css( 'position', 'absolute' );
					      		$el.find(".sidebar").css( 'bottom', 'auto' );
					      		$el.find(".sidebar").css( 'z-index', '1' );

					      	} else if( sidebarState == "start slide down") {

					      		if( oldSidebarState == "top limit fixed" || container_top < element_top_position ) {

					      			var offset_element = $el.find(".sidebar").offset().top;
					      			var offset_container = options.container.offset().top;

						      		$el.find(".sidebar").css( 'width', $el.width() );
						      		$el.find(".sidebar").css( 'top', offset_element - offset_container + 'px' );
						      		$el.find(".sidebar").css( 'position', 'absolute' );
						      		$el.find(".sidebar").css( 'bottom', 'auto' );
						      		$el.find(".sidebar").css( 'z-index', '1' );

						      	}

					      	} else if( sidebarState == "bottom limit stop") {

					      		container_top = options.container.offset().top;
					      		var container_height = options.container.height();

					      		$el.find(".sidebar").css( 'width', $el.width() );
					      		$el.find(".sidebar").css( 'top', container_height - $el.find(".sidebar").height() + 'px' );
					      		$el.find(".sidebar").css( 'position', 'absolute' );
					      		$el.find(".sidebar").css( 'bottom', 'auto' );
					      		$el.find(".sidebar").css( 'z-index', '1' );

					      	} else if( current_translate == 0 ){
					      		$el.find(".sidebar").css( 'width', $el.width() );
					      		$el.find(".sidebar").css( 'position', 'static' )
					      		$el.find(".sidebar").css( 'top', 'auto' );
					      		$el.find(".sidebar").css( 'bottom', 'auto' );
					      		$el.find(".sidebar").css( 'z-index', '1' );
					      	}

					      	oldSidebarState = sidebarState;

				      	}

					    return last_viewport_top = viewport_top;

				  	});
				
				}

			};

			$('.casaroyal-magazine-sidebar-fixed').stickyTopBottom({
			  	container: $('.masonry-magazine')
			});

	  	}
        */

		if( jQuery(".widget-content select").exists() ) {
			jQuery( '.widget-content select' ).chosen();
		};

        if( jQuery(".search-select").exists() ) {
            jQuery( '.search-select' ).chosen();
        };

        if( jQuery("#billing_country").exists() ) {
            jQuery( '#billing_country' ).chosen();
        };

        if( jQuery("#billing_state").exists() ) {
            jQuery( '#billing_state' ).chosen();
        };

        if( jQuery("#shipping_country").exists() ) {
            jQuery( '#shipping_country' ).chosen();
        };

        if( jQuery("#shipping_state").exists() ) {
            jQuery( '#shipping_state' ).chosen();
        };

        // Chosen touch support.
        if ($('.chosen-container').length > 0) {
            $('.chosen-container').on('touchstart', function(e){
                e.stopPropagation(); e.preventDefault();
                // Trigger the mousedown event.
                $(this).trigger('mousedown');
            });
        }

        if( jQuery(".minimal-search-form-casaroyal-style").exists() ) {
            jQuery('.minimal-search-form-casaroyal-style .af-estate-search-field .selectwrap').each(function() {
                var label = jQuery(this).attr('data-label');
                jQuery(this).find("a.chosen-single").attr('data-label', label );
            });
        };

        jQuery('.casaroyal-search-keyword').focus(function() {
            jQuery('.casaroyal-search-locations-list').fadeIn(50);
        });

        jQuery('.casaroyal-search-keyword').focusout(function() {
            jQuery('.casaroyal-search-locations-list').fadeOut(50);
        });

		if( jQuery(".woocommerce div.product form.cart .variations select").exists() ) {
			jQuery( '.woocommerce div.product form.cart .variations select' ).chosen();
		};

		if( jQuery(".casaroyal-chosen-select").exists() ) {
			jQuery( '.casaroyal-chosen-select' ).chosen();
		};

		$(document).on("click", '.reset_variations', function(event) { 
			jQuery('.woocommerce div.product form.cart .variations select').val('').trigger("chosen:updated");
			event.preventDefault();
			return false;
		});
		

		/*-------------------------------------------------------*/
        /*	More Options in Search Form
        /* -----------------------------------------------------*/
        jQuery(document).on('click', '.amenities-trigger > a', function(e){
            e.preventDefault();
            var triggerIcon = $( this).find( 'i' );
            var moreOptionsWrapper = $( '.amenities-wrapper' );
            if( triggerIcon.hasClass( 'fa-plus-square' ) ) {
                triggerIcon.removeClass( 'fa-plus-square' ).addClass( 'fa-minus-square' );
                //moreOptionsWrapper.removeClass( 'collapsed' );
                jQuery(".amenities-wrapper").slideDown();
            } else if ( triggerIcon.hasClass( 'fa-minus-square' ) ){
                triggerIcon.removeClass( 'fa-minus-square' ).addClass( 'fa-plus-square' );
                //moreOptionsWrapper.addClass( 'collapsed' );
                jQuery(".amenities-wrapper").slideUp();
            }
        });

	}

	function initLoad() {

        $(window).on('load', function() {

	      	jQuery.fn.exists = function(){return this.length>0;}

            if( jQuery("#total-properties-found").exists() ) {
                jQuery(".total-properties-found span").text(jQuery("#total-properties-found").val());
                console.log(jQuery("#total-properties-found").val());
            }

	      	jQuery(".progress").fadeOut( "fast", function() {
			    jQuery('#pageloader').fadeOut(600, function() {

			    	// masonry animation
				    if( jQuery(".masonry-animate").exists() ) {
				    	jQuery(".masonry-animate").on("inview", function(event, isInView) {
						  	if (isInView) {
						    	jQuery(this).find(".masonry-container").addClass("masonry-active");
						  	}
						});
		       		};

		       		// property categories
				    if( jQuery(".properties-cat-wrapper").exists() ) {
				    	jQuery(".properties-cat-wrapper").on("inview", function(event, isInView) {
						  	if (isInView) {
						    	jQuery(this).addClass("property-animate");
						  	}
						});
		       		};

		       		// masonry animation
				    if( jQuery(".testimonials-wrapper").exists() ) {
				    	jQuery(".testimonials-wrapper").on("inview", function(event, isInView) {
						  	if (isInView) {
						    	jQuery(this).addClass("testimonial-active"); // element is now visible in the viewport
						  	}
						});
		       		};

				});
			});

	      	jQuery(".main-wrapper").fitVids();

			if( jQuery(".gallery-item").exists() ) {
				jQuery(".gallery-item").css("height", jQuery(".gallery-item a").width()+30+"px");
			};

			if( jQuery(".gallery-item-thumnails").exists() ) {
				jQuery(".gallery-item-thumnails").css("height", jQuery(".gallery-item-thumnails a").width()+"px");
			};

			if( jQuery(".property-flexslider").exists() ) {
	            jQuery('.property-flexslider').flexslider( {
	            	animation: "fade",
	                slideshowSpeed: 4200,   
	                animationSpeed: 500, 
	                startAt: 0,
			        animationLoop: true,
			        pauseOnHover: true,
	            });
                AOS.refresh(true);
			}

			if( jQuery(".flexslider").exists() ) {
	            jQuery('.flexslider').flexslider( {
	            	animation: "slide",
	                slideshowSpeed: 4200,   
	                animationSpeed: 500, 
	            });
			}

            if( jQuery("#casaroyal-product-gallery-images").exists() ) {
                jQuery('#casaroyal-product-gallery-images').flexslider( {
                    animation: "slide",
                    slideshowSpeed: 4200,   
                    animationSpeed: 500, 
                    autplay: false
                });
            }

			if( jQuery(".shop-product-flexslider").exists() ) {
	            jQuery('.flexslider').flexslider( {
	            	animation: "fade",
	                slideshowSpeed: 1200,   
	                animationSpeed: 500, 
	                startAt: 0,
			        animationLoop: true,
			        controlNav: false,
			        smoothHeight: false,
			        slideshow: true 
	            });
			}

			jQuery(".flexslider .slides > li").css("height", jQuery(".flexslider .slides > li").closest(".casaroyal-post-miniblock").children(".casaroyal-gallery-post").height());

			jQuery(".woocommerce .products li.product .button").on('click', function(event){
				event.preventDefault();
				jQuery('#mini-cart-content').fadeIn(50);
				jQuery('#mini-cart-content .cart-dropdown').html('<i class="fa fa-refresh fa-spin"></i>');
			});

			jQuery( ".mini-cart-button" ).mouseenter(function() {
				jQuery( "#mini-cart-content" ).fadeIn(50);
			});

			jQuery( ".mini-cart-button" ).mouseleave(function() {
				jQuery( "#mini-cart-content" ).fadeOut(50);
			});

			if( jQuery(".casaroyal-image-slider").exists() ) {

				jQuery('.casaroyal-image-slider').each(function() {

					var sliderHeightType = jQuery(this).attr('data-height-style');

					if(sliderHeightType == "custom") {
						var sliderHeight = jQuery(this).attr('data-height');
						jQuery(this).find(".slides li").css("height", sliderHeight);
					}

					if(sliderHeightType == "full_height") {
						var sliderFullHeight = jQuery(window).height() - jQuery(".top-br").height() * 2;
						jQuery(this).find(".slides li").css("height", sliderFullHeight);
					}

					var count = 0;
					var countFinal = 0;

					jQuery(this).find('.flex-control-paging li a').each(function() {
					    count++;
					    if(count <= 9) {
					    	countFinal = "0"+count;
					    } else {
					    	countFinal = count;
					    }
					    jQuery(this).append("<span class='casaroyal-image-slider-count'>"+countFinal+"</span>");
					}); 

				});
			}

	    });
  	}
	
	function init () {

		if( jQuery(".position-Floating").exists() ) {
			// Do nothing
		} else {
		    initNav();
		}
	    initChangeColors();
	    initMobileMenu();
	    initResizeWindow();
	    initGeneral();
	    initLoad();
  	}

  	init();
	
})(jQuery)