// map3.append('circle')
//     .attr("cx", 15)
//     .attr("cy", 340)
//     .attr("r", 3)
let marginl = {top:10, bottom:10 , right:10, left:10}
let widthl = 400; let heightl = 400;
d3.selectAll('svg')
  .attr("width", widthl)
  .attr("height", heightl)

// states_datal is data needed for chloropeth map
let states_datal;


let svg_map1l = d3.select("#map1l");
let svg_map2l = d3.select("#map2l");
let svg_map3l = d3.select("#map3l");

// append g to make map

const map1 = svg_map1l.append("g")
          .attr("transform", "translate("+marginl.left+","+marginl.top+")")
          .attr("class", "map1l")

const map2 = svg_map2l.append("g")
          .attr("transform", "translate("+marginl.left+","+marginl.top+")")
          .attr("class", "map1l")

const map3 = svg_map3l.append("g")
          .attr("transform", "translate("+marginl.left+","+marginl.top+")")
          .attr("class", "map1l")

let note_font_sizel = 9;

// projection, path enable map to be shown on the page
let projection = d3.geoAlbersUsa()
                  .scale(430)
                  .translate([160,154])
let path = d3.geoPath(projection)

// colors for the maps
// map3
let map3_color1 = "#fae6ff"; let map3_color2 = "#e580ff";
let map3_color3 = "#520066";

let map2_colorn = "#ffece6"; let map2_colory = "#ff531a";

let map1_color1 = "#ffe6e6"; let map1_color2 = "#ff8080";
let map1_color3 = "#ff1a1a"; let map1_color4 = "#990000";

// THIS DATA REQUEST achieves the following:
//     1) produces first three maps:
//          - presRate
//          - significant
//          - deathRate
// for loop to shorten names of important keys in data

let map3_legend = {x:328, y:79};
let rect_legendl = {w:17, h:17};
let spacingl = 10;
let coord_label;

d3.json("../USStates_WithData.geojson").then(function(data){
    features = data.features;
    states_datal = features;



  // 1) creation map with presRates
    map3.selectAll('path')
        .data(states_datal)
        .enter()
        .append("path")
        .attr("class", "identifier_map1l")
        .attr("d", path)
        .style("fill", function(d) {
          // choose fill based off percentiles
          // purple is color of choice
          let color_map3l = d.properties.presRate;
          if (color_map3l <= 48) {
            return map3_color1
          } else if (color_map3l < 82) {
            return map3_color2
          } else {
            return map3_color3
          }
        })
        // end of style fill



    states_datal.forEach(function(d){
        coord_label = path.centroid(d)
       if (d.properties.presRate>82){
        map3.append("text")
            .attr("x", coord_label[0] - 5)
            .attr("y", coord_label[1] + 3)
            .text(d.properties.STUSPS)
            .attr("font-size", "7")}

    })



  /// LEGEND
  ///
  ///

    map3.append("text")
        .attr("x", map3_legend.x + 1)
        .attr("y", map3_legend.y)
        .attr("class", "legendl")
        .attr('font-size',12)
        .attr("fill", "black")
        .text('Legend')

    map3.append("rect")
        .attr("x", map3_legend.x +1 )
        .attr("y", map3_legend.y + spacingl)
        .attr("width", rect_legendl.w)
        .attr("height", rect_legendl.h)
        .attr("fill", map3_color1)

    map3.append("rect")
        .attr("x", map3_legend.x + 1)
        .attr("y", map3_legend.y + 2 *spacingl + rect_legendl.h)
        .attr("width", rect_legendl.w)
        .attr("height", rect_legendl.h)
        .attr("fill", map3_color2)

    map3.append("rect")
        .attr("x", map3_legend.x + 1)
        .attr("y", map3_legend.y + 3 *spacingl + 2* rect_legendl.h)
        .attr("width", rect_legendl.w)
        .attr("height", rect_legendl.h)
        .attr("fill", map3_color3)

    map3.append("text")
        .attr("x", map3_legend.x + rect_legendl.w + 4)
        .attr("y", map3_legend.y + spacingl + rect_legendl.h/2)
        .text("37 to 48")
        .attr("alignment-baseline", "middle")
        .attr('font-size',10)

    map3.append("text")
        .attr("x", map3_legend.x + rect_legendl.w + 3)
        .attr("y", map3_legend.y + 2*spacingl + 3*rect_legendl.h/2)
        .text("49 to 82")
        .attr("alignment-baseline", "middle")
        .attr('font-size',10)

    map3.append("text")
        .attr("x", map3_legend.x + rect_legendl.w + 3)
        .attr("y", map3_legend.y + 3*spacingl + 5*rect_legendl.h/2)
        .text("   > 82")
        .attr("alignment-baseline", "middle")
        .attr('font-size',10)

    map3.append("text")
        .attr("x", map3_legend.x + 1)
        .attr("y", map3_legend.y + 4 *spacingl + 3* rect_legendl.h)
        .text("*Per 100 people ")
        .attr("alignment-baseline", "middle")
        .attr('font-size',8)

    // END LEGEND
    //

    // START TITLE AND LEGEND
    //

    map3.append("text")
        .attr("x", 35)
        .attr("y", 33)
        .text("Part 3: Prescription Rates (2017)")
        .attr('font-size',17)
        .attr("class", "title_mapl")

    map3.append("text")
        .attr("x", 35)
        .attr("y", 285)
        .text("Worst three states: AL - 107.2, AR - 105.4, TN - 94.4")
        .attr('font-size',note_font_sizel)

    map3.append("text")
        .attr("x", 35)
        .attr("y", 305)
        .text("Best three states: HI - 37, NY - 37.8, CA - 39.5")
        .attr('font-size',note_font_sizel)


    // END TITLE AND LEGEND
    //
  })
