const REPORTES = 'http://localhost:3035/';

$.ajax({
	//url: REPORTES + 'reporte/datos_dia', 
	url: 'http://localhost:3035/reporte/max_min_avg_dias?sensor_id=7&inicio=2017.12.1&fin=2017.12.28', 
	type: "GET", 
	async: false, 
	success: function(data) {
		console.log(data);
	}
});