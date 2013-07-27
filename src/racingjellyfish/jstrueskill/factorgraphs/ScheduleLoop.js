var util = require('util');
var MAX_ITERATIONS = 100;

var ScheduleLoop = function(scheduleName, scheduleToLoop, maxDelta) {
	Schedule.call(this, scheduleName);

	this.scheduleToLoop = scheduleToLoop;
	this.maxDelta = maxDelta;
};

ScheduleLoop.prototype = new Schedule();

ScheduleLoop.prototype.visit = function(depth, maxDepth) {
	var delta = this.scheduleToLoop.visit(depth + 1, maxDepth);
	for (var totalIterations = 1; delta > maxDelta; totalIterations++) {
		delta = this.scheduleToLoop.visit(depth + 1, maxDepth);
		if (totalIterations > MAX_ITERATIONS)
			throw new Error(util.format(
					"Maximum iterations %s reached.", MAX_ITERATIONS));
	}

	return delta;
};

module.exports = ScheduleLoop;