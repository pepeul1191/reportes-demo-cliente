const REPORTES = 'http://localhost:3035/';

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		// AMD. Register as an anonymous module.
		define( [ "../widgets/datepicker" ], factory );
	} else {
		// Browser globals
		factory( jQuery.datepicker );
	}
}( function( datepicker ) {

datepicker.regional.es = {
	closeText: "Cerrar",
	prevText: "&#x3C;Ant",
	nextText: "Sig&#x3E;",
	currentText: "Hoy",
	monthNames: [ "Enero","Febrero","Marzo","Abril","Mayo","Junio",
	"Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre" ],
	monthNamesShort: [ "ene","feb","mar","abr","may","jun",
	"jul","ago","sep","oct","nov","dic" ],
	dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
	dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
	dayNamesMin: [ "D","L","M","X","J","V","S" ],
	weekHeader: "Sm",
	dateFormat: "dd/mm/yy",
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: false,
	yearSuffix: "" };
datepicker.setDefaults( datepicker.regional.es );
return datepicker.regional.es;
} ) );


$("#repo1_dia").datepicker({
  showOtherMonths: true,
  selectOtherMonths: true
});

$("#repo1_btn_tabla").click(function() {
	var sensor_id = $("#repo1_sensor_id").val();
	var dia_array = $("#repo1_dia").val().split('/');
	var dia = dia_array[2] + '.' + dia_array[1] + '.' + dia_array[0];
	//http://localhost:3035/reporte/datos_dia?sensor_id=7&dia=2017.12.26
	$.ajax({
		//url: REPORTES + 'reporte/datos_dia', 
		url: REPORTES + 'reporte/datos_dia?sensor_id=' + sensor_id + '&dia=' + dia, 
		type: "GET", 
		async: false, 
		success: function(data) {
			console.log(data);
		}
	});
});

$("#repo1_btn_chart").click(function() {
	var sensor_id = $("#repo1_sensor_id").val();
	var dia_array = $("#repo1_dia").val().split('/');
	var dia = dia_array[2] + '.' + dia_array[1] + '.' + dia_array[0];
	//http://localhost:3035/reporte/datos_dia?sensor_id=7&dia=2017.12.26
	$.ajax({
		//url: REPORTES + 'reporte/datos_dia', 
		url: REPORTES + 'reporte/datos_dia?sensor_id=' + sensor_id + '&dia=' + dia, 
		type: "GET", 
		async: false, 
		success: function(data) {
			var data_chart = [];
			var axis_x = [];
			//console.log(data);
			for(var i = 0; i < data.length; i++){
				data_chart.push(data[i]['dato']);
				var temp_date = new Date(data[i]['momento']);
				axis_x.push(temp_date.getHours() + ':' + temp_date.getMinutes() + ':' + temp_date.getSeconds());
			}
			var data = {
        labels: axis_x,
        datasets: [
          {
            label: "Datos de un día",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: data_chart
          },
        ]
    	};
			var ctx = document.getElementById("char_repo_1").getContext('2d');
			var myLineChart = new Chart(ctx, {
			  type: 'line',
			  data: data,
			  options: {
	        scales: {
		      }
		    }
			});
		}
	});
});

	/*
	var myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
	        datasets: [{
	            label: '# of Votes',
	            data: [12, 19, 3, 5, 2, 3],
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 206, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)',
	                'rgba(153, 102, 255, 0.2)',
	                'rgba(255, 159, 64, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255,99,132,1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero:true
	                }
	            }]
	        }
	    }
	});
});
*/