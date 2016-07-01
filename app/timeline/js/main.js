(function() {
    "use_strict";
    window.onload = function () {
        
        document.getElementById("portal").innerHTML = getUrlVars("p");

        var data = JSON.parse(getUrlVars("DFPObject"));

        function getUrlVars(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        var colorScale = d3.scale.ordinal().range(['#3F51B5','#ef9b0f'])
            .domain(['aboutDefault','others']);

        function parserData(data) {

            var output = [];

            for(var k in data.slots) {
                var endTime = data.slots[k].rendered ? data.slots[k].rendered : data.slots[k].renderEnded;
                var starTime = data.slots[k].fetchStarted;

                if(starTime==undefined || endTime==undefined) continue;

                var slot = {label:"["+k+"]", priority:"others", times: [{"label": k,"starting_time": starTime, "ending_time": endTime}]};

                if(/^(f|m|r|si|sd)$/.test(k)) {
                    slot.priority = "aboutDefault";
                }

                output.push(slot);
            }
            return output;
        }

        function renderTimeline() {

            var width = 950;
            var chart = d3.timeline()
                    .beginning(data.startTime)
                    .ending(data.endTime)
                    .tickFormat({
                        format: d3.time.format("%S,%Ls"),
                        tickTime: d3.time.milliseconds,
                        tickInterval: 1,
                        tickSize: 6
                    })
                .showBorderLine()
                .colors( colorScale )
                .colorProperty('priority')
                
                .stack()
                .background("#eaeaea")
                .margin({left: 150, right: 0, top: 0, bottom: 0});
            var svg = d3.select("#timeline")
                .append("svg")
                .attr("width", width)
                .datum(parserData(data) ).call(chart);


            console.log(data);

        }
        renderTimeline();
    };
})();