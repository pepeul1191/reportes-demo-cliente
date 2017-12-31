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

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

$("#repo2_inicio").datepicker({
  showOtherMonths: true,
  selectOtherMonths: true
});

$("#repo2_fin").datepicker({
  showOtherMonths: true,
  selectOtherMonths: true
});

$("#repo2_btn_chart").click(function() {
	var sensor_id = $("#repo2_sensor_id").val();
	var inicio_array = $("#repo2_inicio").val().split('/');
	var fin_array = $("#repo2_fin").val().split('/');
	var inicio = inicio_array[2] + '.' + inicio_array[1] + '.' + inicio_array[0];
	var fin = fin_array[2] + '.' + fin_array[1] + '.' + fin_array[0];
	//http://localhost:3035/reporte/max_min_avg_dias?sensor_id=7&inicio=2017.12.26&fin=2017.12.28
	$.ajax({
		url: REPORTES + 'reporte/max_min_avg_dias?sensor_id=' + sensor_id + '&inicio=' + inicio + '&fin=' + fin, 
		type: "GET", 
		async: false, 
		success: function(data) {
			var data_chart = [];
			var axis_x = [];
			var data_max = [];
			var data_min = [];
			var data_avg = [];
			$.each(data, function(k, v) {
		    data_chart.push(data[k]['dato']);
				axis_x.push(k);
				data_max.push(data[k]['max']);
				data_min.push(data[k]['min']);
				data_avg.push(data[k]['avg']);
		  });
			var ctx = document.getElementById("char_repo_2");
			var data_chart = {
        labels: axis_x,
        datasets: [
            {
              label: "Máximo",
              data: data_max,
              backgroundColor: [
                  "rgba(10,20,30,0.3)",
                  "rgba(10,20,30,0.3)",
                  "rgba(10,20,30,0.3)",
                  "rgba(10,20,30,0.3)",
                  "rgba(10,20,30,0.3)"
              ],
              borderColor: [
                  "rgba(10,20,30,1)",
                  "rgba(10,20,30,1)",
                  "rgba(10,20,30,1)",
                  "rgba(10,20,30,1)",
                  "rgba(10,20,30,1)"
              ],
              borderWidth: 1
            },
            {
              label: "Mínimo",
              data: data_min,
              backgroundColor: [
                  "rgba(50,150,200,0.3)",
                  "rgba(50,150,200,0.3)",
                  "rgba(50,150,200,0.3)",
                  "rgba(50,150,200,0.3)",
                  "rgba(50,150,200,0.3)"
              ],
              borderColor: [
                  "rgba(50,150,200,1)",
                  "rgba(50,150,200,1)",
                  "rgba(50,150,200,1)",
                  "rgba(50,150,200,1)",
                  "rgba(50,150,200,1)"
              ],
              borderWidth: 1
            },
            {
              label: "Promedio",
              data: data_avg,
              backgroundColor: [
                  "rgba(50,150,100,0.3)",
                  "rgba(50,150,100,0.3)",
                  "rgba(50,150,100,0.3)",
                  "rgba(50,150,100,0.3)",
                  "rgba(50,150,100,0.3)"
              ],
              borderColor: [
                  "rgba(50,150,100,1)",
                  "rgba(50,150,100,1)",
                  "rgba(50,150,100,1)",
                  "rgba(50,150,100,1)",
                  "rgba(50,150,100,1)"
              ],
              borderWidth: 1
            }
        ]
    	}; 
    	var options = {
        responsive: true,
        title: {
            display: true,
            position: "top",
            text: "Rerporte 2",
            fontSize: 18,
            fontColor: "#111"
        },
        legend: {
            display: true,
            position: "bottom",
            labels: {
                fontColor: "#333",
                fontSize: 16
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    min: 0
                }
            }]
        }
    	};
    	var chart = new Chart(ctx, {
        type: "bar",
        data: data_chart,
        options: options
    	});
		}
	});
});