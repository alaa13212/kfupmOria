/**
 * @author Ali
 */


var $addLine     = $('#add-line'),
    $inputTable  = $('#input'),
    $time        = $('#time'),
    $courses     = $('#courses'),
    $tmpInput    = $($('#input tr:last-child').clone()),
    $tmpCourse   = $($('#courses tr:last-child').clone()),
    $timeTrs     = $time.find('tr'),
    allCourses   = [],
    allDays      = {U:1, M:2, T:3, W:4, R:5};


$(document).ready(function(){
	$addLine.click(function(evt){
		$inputTable.append($tmpInput.clone());
	});
	
	$courses.find('tr:last-child').remove();
	
	$inputTable.on('blur', 'input', function(){
		allCourses = [];
		$courses.find('tr').eq(2).nextAll('tr').remove();
		$('td.clear').show().attr('colspan', 1).text('');
		
		
		$inputTable.find('tr').each(function(i, e){
			if ( i === 0 )
				return;
			
			
			var $this   = $(e),
				$inputs = $this.find('input'),
				course  = $inputs.eq(0).val(),
				days    = $inputs.eq(1).val().replace(/[^UMTWR]/gi, '').toUpperCase(),
				time    = $inputs.eq(2).val().split('-'),
				section = course.replace(/^[A-Z0-9]+\-/i, ''),
				d, $cell;
			
			course  = course.replace(/\-[A-Z\-0-9]+$/gi, '');
			
			if ( course == '' 
			  || days   == ''
			  || time.length !== 2 ) return;
			
			
			if (allCourses.indexOf(course+section) === -1){
				allCourses.push(course+section);
				var $course   = $tmpCourse.clone();
				    $courseTd = $course.find('td');
				
				$courses.append($course);
				
				$courseTd.eq(0).text(course);
				$courseTd.eq(5).text(section);
			}
			
			days = days.split('');
			
			time[0] = Math.floor(time[0]/100)-5;
			time[1] = Math.floor(time[1]/100)-5;
			time[1] = time[1] > 6? time[1] -1 : time[1];
			time[2] = time[1] - time[0];
			
			if( time[0] < 1 || time[0] > 10)
				return;
			
			for (var i = 0, l = days.length; i < l; i++){
				d     = allDays[days[i]];
				$cell = $timeTrs.eq(d)
						.find('td:nth-child('+time[0]+')')
						.text(course)
						.attr('colspan', time[2] + 1);
				
				
				for(var j = 0, t = time[2]; j < t; j++){
					$cell = $cell.next().hide();
				}
				
			}
			
			
			
						
		});
	});
	
});
