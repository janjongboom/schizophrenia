define(function () {
    return {
        sum: function (numbers) {
            var total = 0;
            for (var ix = 0; ix < numbers.length; ix++) {
                total += parseInt(numbers[ix], 10);
            }
            console.log(total);
            return total;
        }
    };
});