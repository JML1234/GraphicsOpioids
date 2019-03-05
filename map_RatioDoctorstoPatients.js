
// create code that shows chloropeth map according to
// with places have high or low intensity number of
// doctors

//INTRO STEPS BEFORE GRAB DATA

//create svg window
let windowl = {w: 600, h: 500};
d3.select('#mapbigl')
  .attr("width", windowl.w)
  .attr("height", windowl.h)

const mapratiol = d3.select("#mapbigl").append("g")
        .attr("class", "mapbigl")

// projection, path enable map to be shown on the page
let projectionl = d3.geoAlbersUsa()
                   .scale(675)
                   .translate([255,229])
let pathl = d3.geoPath(projectionl)

// colors
let mapratiol_color1 = "#ffe6ff"; let mapratiol_color2 = "#ff66ff";
let mapratiol_color3 = "#990099";

// size of elements
let mapbig_legend = {x:520, y:94};
let rect_legendbigl = {w:17, h:17};
let spacingbigl = 10;

// GRAB DATA

// get data
let jsonl = d3.json("../USStates_WithData.geojson")
let csvl = d3.csv("../ratioDoctorsToAddicted.csv")

Promise.all([jsonl, csvl]).then(function(values) {
  let map_valuesl = values[0].features;
  let ratio_valuesl = {};
  values[1].forEach(function(d) {
     ratio_valuesl[d.State] = Number(Number(d.Ratio).toPrecision(3));
   });
   console.log("map_valuesl", map_valuesl)
   console.log("ratio_valuesl", ratio_valuesl)
   console.log(ratio_valuesl[map_valuesl[47].properties.STUSPS])
     // 1) creation map with presRates
       mapratiol.selectAll('path')
           .data(map_valuesl)
           .enter()
           .append("path")
           .attr("class", "identifier_map1l")
           .attr("d", pathl)
           .style("fill", function(d) {
             // choose fill based off percentiles
             // purple is color of choice
             let color_mapratiol = ratio_valuesl[d.properties.STUSPS];
             if (color_mapratiol <= 1.88) {
               return mapratiol_color1
             } else if (color_mapratiol <= 2.8) {
               return mapratiol_color2
             } else {
               return mapratiol_color3
             }
           })
           // end of style fill




     /// LEGEND
     ///
     ///

       mapratiol.append("text")
           .attr("x", mapbig_legend.x + 1)
           .attr("y", mapbig_legend.y)
           .attr("class", "legendl")
           .attr('font-size',12)
           .attr("fill", "black")
           .text('Legend')

       mapratiol.append("rect")
           .attr("x", mapbig_legend.x +1 )
           .attr("y", mapbig_legend.y + spacingbigl)
           .attr("width", rect_legendbigl.w)
           .attr("height", rect_legendbigl.h)
           .attr("fill", mapratiol_color1)

       mapratiol.append("rect")
           .attr("x", mapbig_legend.x + 1)
           .attr("y", mapbig_legend.y + 2 *spacingbigl + rect_legendbigl.h)
           .attr("width", rect_legendbigl.w)
           .attr("height", rect_legendbigl.h)
           .attr("fill", mapratiol_color2)

       mapratiol.append("rect")
           .attr("x", mapbig_legend.x + 1)
           .attr("y", mapbig_legend.y + 3 *spacingbigl + 2* rect_legendbigl.h)
           .attr("width", rect_legendbigl.w)
           .attr("height", rect_legendbigl.h)
           .attr("fill", mapratiol_color3)

      let legendbig_text = 7;
       mapratiol.append("text")
           .attr("x", mapbig_legend.x + rect_legendbigl.w + 4)
           .attr("y", mapbig_legend.y + spacingbigl + rect_legendbigl.h/2)
           .text("1.09 to 1.88")
           .attr("alignment-baseline", "middle")
           .attr('font-size',legendbig_text)

       mapratiol.append("text")
           .attr("x", mapbig_legend.x + rect_legendbigl.w + 3)
           .attr("y", mapbig_legend.y + 2*spacingbigl + 3*rect_legendbigl.h/2)
           .text("2.05 to 2.8")
           .attr("alignment-baseline", "middle")
           .attr('font-size',legendbig_text)

       mapratiol.append("text")
           .attr("x", mapbig_legend.x + rect_legendbigl.w + 3)
           .attr("y", mapbig_legend.y + 3*spacingbigl + 5*rect_legendbigl.h/2)
           .text("2.81 to 4.67")
           .attr("alignment-baseline", "middle")
           .attr('font-size',legendbig_text)

       mapratiol.append("text")
           .attr("x", mapbig_legend.x + 1)
           .attr("y", mapbig_legend.y + 4 *spacingbigl + 3* rect_legendbigl.h)
           .text("*Appendix ")
           .attr("alignment-baseline", "middle")
           .attr('font-size',8)

       // END LEGEND
       //

       // START TITLE AND LEGEND
       //



       mapratiol.append("text")
           .attr("x", 25)
           .attr("y", 33)
           .text("Number of people addicted to opioids to number of people that doctors can")
           .attr('font-size',17)
           .attr("class", "title_mapl")

           mapratiol.append("text")
               .attr("x", 205)
               .attr("y", 52)
               .text("prescribe Buprenorphine")
               .attr('font-size',17)
               .attr("class", "title_mapl")

       mapratiol.append("text")
           .attr("x", 35)
           .attr("y", 420)
           .text("In our analysis, every single state does not have enough certified doctors to give Buprenorphine to everyone who needs it.")
           .attr('font-size',11.4)

           mapratiol.append("text")
               .attr("x", 35)
               .attr("y", 435)
               .text("That is like our country not giving firefighters enough water to put out every fire. The 25/100/275 rule must be appealed.")
               .attr('font-size',11.4)

               mapratiol.append("text")
                   .attr("x", 35)
                   .attr("y", 450)
                   .text("This map shows that the places with the highest opioid death rates are the places lacking Buprenorphine the most.")
                   .attr('font-size',11.4)

                   mapratiol.append("text")
                       .attr("x", 35)
                       .attr("y", 465)
                       .text("For example, West Virginia is at 2.81 and the opioid crisis has gotten worse while Vermont is at an impressive 1.15.")
                       .attr('font-size',11.4)

                       mapratiol.append("text")
                           .attr("x", 35)
                           .attr("y", 480)
                           .text("Vermont is known as one of the most successful states to combat the opioid crisis.")
                           .attr('font-size',11.4)


       // END TITLE AND LEGEND
       //

})
