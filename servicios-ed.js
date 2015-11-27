(function ($) {
  Drupal.behaviors.servicios = {
      attach: function(context, settings) {

	  // test width auto select

	  $('#edit-tid').change(function(){
	      $("#width_tmp").html($('#edit-tid option:selected').text());
	      $('#select-events').width($("#width_tmp").width()+40); // 30 : the size of the down arrow of the select box
	      $('#edit-tid').width($("#width_tmp").width()+55); // 30 : the size of the down arrow of the select box
	      
	  });


	  if($('#edit-tid').length){
	      $("#width_tmp").html($('#edit-tid option:selected').text());
	      $('#select-events').width($("#width_tmp").width()+40); // 30 : the size of the down arrow of the select box
	      $('#edit-tid').width($("#width_tmp").width()+55); // 30 : the size of the down arrow of the select box

	  }

	  /*
	   *Filter Feriados Page
	   */

	  // alert(window.location.href.substring(window.location.href.lastIndexOf('/') + 1));
	  if(window.location.href.substring(window.location.href.lastIndexOf('/') + 1)=='calendario-de-feriados'){
	      $('.year-current-date').addClass('active');
	  }
	  if(window.location.href.substring(window.location.href.lastIndexOf('/') + 1)=='2016#year-list'){
	      $('.year-more-one-date').addClass('active');
	  }
	  if(window.location.href.substring(window.location.href.lastIndexOf('/') + 1)=='2017#year-list'){
	      $('.year-more-two-date').addClass('active');
	  }
	  


	  /** Filter clima page */
	    $('#depto-select').change(function() {
	      var depto = $(this).attr('value');
	      var base = Drupal.settings.servicios.base_path;
	      window.location = base+'clima-en-bolivia/'+depto;
	    });

	    if($('#depto-select').length){
	      var my_depto = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
	      if(my_depto != 'clima-en-bolivia'){
	    		$('#depto-select').val(my_depto);
	    		$('.footer .'+my_depto).addClass('active');
	      }else{
	      	$('.footer .santa-cruz').addClass('active');
	      }

	      var angle = 0;
	      setInterval(function(){
	        angle+=3;
	        $("#aspas").rotate({
	          angle: angle,
	          /*center: [300,300]*/
	        });
	      },Drupal.settings.servicios.viento);
	    }

			$("#tabmenu ul li:first").addClass("actual");

			/**Event for option select to horarios de vuelo*/

			// $('#aeropuerto').change(function() {
			//     var airport = $(this).attr('value');
			//     var base = window.location.href;
			//     //alert(base);
			//     window.location.href = base+'/'+airport;


			// });

			$('#aeropuerto').change(function() {
			    //alert('funciona select');
			    var airport = $(this).attr('value');
			    var base = Drupal.settings.servicios.base_path;
			    //alert(base);
			    window.location = base+'horarios-de-vuelo/'+airport;
			    $('#aeropuerto').val(airport);
			});

			if($('#aeropuerto').length){
			    var my_depto = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
			    if(my_depto != 'horarios-de-vuelo'){
				$('#aeropuerto').val(my_depto);
			    }
			}


			/** Mapas filter empresa type */
			$('#tipo-mapa').change(function() {
			    //alert('funciona select');
			    var empresa = $(this).attr('value');
			    var base = Drupal.settings.basePath;
			    //alert(base);
			    window.location = base+'mapas/'+empresa;
			    $('#tipo-mapa').val(airport);
			});

			if($('#tipo-mapa').length){
			    var empresa = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
			    if(empresa != 'mapas'){
						$('#tipo-mapa').val(empresa);
						$('.view-sucursales.view-display-id-attachment_1 .'+empresa).addClass('active');
			    }
			}

	//Star Sun Widget

	if($("#planetarium").length){
	    var sunset = Drupal.settings.servicios.sunset;
	    var sunrise = Drupal.settings.servicios.sunrise;
	    var base_path = Drupal.settings.servicios.base_path;

	    //alert(sunset);
	//}
	
	var w = 320, h = 101;
	var planets = [
	    { R: 151, r: 40, speed: 2, phi0: 180}
	];

	var svg = d3.select("#planetarium").insert("svg")
	    .attr("width", w).attr("height", h);

	svg.append("text")
	    .attr("class", "ini")
	    .attr("dx",25)
	    .attr("dy",100)
	    .attr("font-family", "sans-serif")
            .attr("font-size", "12px")
            .attr("fill", "#fff")
	    .text(sunrise);//sunrise

	svg.append("text")
	    .attr("class", "ini")
	    .attr("dx",190)
	    .attr("dy",100)
	    .attr("font-family", "sans-serif")
            .attr("font-size", "12px")
            .attr("fill", "#fff")
	    .text(sunset);//sunset

	var container = svg.append("g")
	    .attr("transform", "translate(132,180)");


	container.selectAll("g.planet")
	    .data(planets).enter().append("g")
	    .attr("class", "planet")
	    .each(function(d, i) {

		d3.select(this).append("circle")
		    .attr("class", "orbit")
		    .attr("r", d.R)
		    .style("stroke-dasharray", ("10,3"));
	    });

	container.append("circle")
	    .attr("r", 6)
	    .attr("cx",-126)
	    .attr("cy",-84.5)
	    .attr("class", "sun-ini");

	container.append("circle")
	    .attr("r", 6)
	    .attr("cx",127)
	    .attr("cy",-84.10)
	    .attr("class", "sun-fin");
   

	container.append("image")
	    .attr("class","imagen")
	    .attr("xlink:href", base_path+"sites/all/themes/ed_theme/images/sun.png")
	    .attr("x", "-163")
	    .attr("y", "-10")
	    .attr("width", "25px")
	    .attr("height", "25px");





	//Value hour sun ini
	var sunHourIni = sunrise.split(" ")[0].split(":")[0];

	//Value hour sun end
	//var sunHourEnd = sunrise.split(" ")[0].split(":")[0];
	//alert(sunHourEnd);

	//Value hour now
	var t0 = new Date();
	var valueTime = t0.getHours();

	var valueTimeGrade=0;
	var gradeValue = [0,0,0,0,0,41,42,50,55,60,75,80,90,105,110,115,120,125,140];


	    for(i = sunHourIni ; i < 19 ; i++){
		if(valueTime == i){
		    valueTimeGrade = gradeValue[i];
		    break;
		}
	    }

	    d3.select(".imagen")
		.transition()
		.attr("transform","rotate("+ valueTimeGrade +")")
		.duration(4000);
	}
	// End Sun Widget


    }
  }
})(jQuery);
