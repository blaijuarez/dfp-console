(function() {
    "use strict";
    window.onload = function () {

        var marginLeft = 0;
        
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

            for (var i=0,l=data.slotsSort.length;i<l;i++) {
                var k = data.slotsSort[i];

                var starTime = data.slots[k]["gpt-slot_fetch"],
                    endTime = data.slots[k]["gpt-slot_rendered_load"] ?
                        data.slots[k]["gpt-slot_rendered_load"] : data.slots[k]["gpt-slot_rendered"],
                    id = data.slots[k].id,
                    pos = data.slots[k].pos;

                if(starTime==undefined || endTime==undefined) continue;

                var slot = {label:"["+id+"]", priority:"others", times: [{"label": pos,"starting_time": starTime, "ending_time": endTime}]};

                if(/^(f|m|r|si|sd)$/.test(pos)) {
                    slot.priority = "aboutDefault";
                }

                if(marginLeft<id.length) {

                    marginLeft = id.length;
                }

                output.push(slot);
            }
            return output;
        }

        function renderTimeline() {

            var width = 950;
            var obj = parserData(data);
            var left = Math.round(marginLeft/0.7 * 5);

            console.log(left,marginLeft);

            var chart = d3.timeline()
                    .beginning(1)
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
                .margin({left: left, right: 0, top: 0, bottom: 0});
            var svg = d3.select("#timeline")
                .append("svg")
                .attr("width", width)
                .datum(obj).call(chart);


            //console.log(data);

        }
        renderTimeline();
    };
})();