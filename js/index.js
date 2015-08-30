$(function () {
    var Views = {};
    function accordion() {
        $( "#accordion" ).accordion({
          collapsible: true
        });
    };
    var Main = Backbone.View.extend({
        el: $("#main"),
        template: function(pagename){
            return _.template($("#"+pagename).html());
        },
        render: function (pagename) {
            $(this.el).html(this.template(pagename));
        }
    });
    var MapBox = Backbone.View.extend({
        google: function(){
            var haightAshbury = new google.maps.LatLng(55.05662407, 82.88906931);
            var mapOptions = {
                zoom: 17,//масштаб
                center: haightAshbury,//позиционируем карту на заданые координаты
                mapTypeId: google.maps.MapTypeId.TERRAIN//задаем тип карты
            };
            map = new google.maps.Map(document.getElementById("mapbox"), mapOptions);
        },
        yandex: function(){
            ymaps.ready(init);
            function init(){
                var map = new ymaps.Map("mapbox", {
                    center: [55.05662407, 82.88906931], 
                    zoom: 17
                });
            }
        }
    });
    
    Views = {
        main: new Main(),
        mapbox: new MapBox()
    };
    
    
    var Controller = Backbone.Router.extend({
        routes : {
            "" : "home",
            "!/": "home",
            "!/projects": "projects",
            "!/about": "about",
            "!/gallery": "gallery",
            "!/contacts": "contacts",
            "!/contacts/google": "mapgoogle",
            "!/contacts/yandex": "mapyandex"
        },
        
        home: function () {
            Views.main.render("home");
        },
        projects: function () {
            Views.main.render("projects");
            accordion();
        },
        about: function () {
            Views.main.render("about");
            accordion();
        },
        gallery: function(){
            Views.main.render("gallery");
            $('.carousel').carousel();
        },
        contacts: function () {
            Views.main.render("contacts");
        },
        mapgoogle: function(){
            Views.main.render("contacts");
            Views.mapbox.google();
        },
        mapyandex: function(){
            Views.main.render("contacts");
            Views.mapbox.yandex();
        }
    });
    var controller = new Controller();
    Backbone.history.start();
});
