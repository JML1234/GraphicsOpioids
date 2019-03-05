
// states_datal is data needed for chloropeth map




// colors for the maps
// map3

// THIS DATA REQUEST achieves the following:
//     1) produces first three maps:
//          - presRate
//          - significant
//          - deathRate
// for loop to shorten names of important keys in data
d3.json("../USStates_WithData.geojson").then(function(data){
    features = data.features;
    states_datal = features;



  // 1) creation map with presRates
    map2.selectAll('path')
        .data(states_datal)
        .enter()
        .append("path")
        .attr("class", "identifier_map1l")
        .attr("d", path)
        .style("fill", function(d) {
          // choose fill based off percentiles
          // purple is color of choice
          let color_map2l = d.properties.significant;
          if (color_map2l == "Yes") {
            return map2_colory
          } else {
            return map2_colorn
          }
        })
        // end of style fill


    // states_datal.forEach(function(d){
    //     coord_label = path.centroid(d)
    //    if (d.properties.deathRate>29 && path.area(d) > 92){
    //        map1.append("text")
    //            .attr("x", coord_label[0] - 5)
    //            .attr("y", coord_label[1] + 3)
    //            .text(d.properties.STUSPS)
    //            .attr("font-size", "7")
    //       }
    // })



  /// LEGEND
  ///
  ///

    map2.append("text")
        .attr("x", map3_legend.x + 1)
        .attr("y", map3_legend.y)
        .attr("class", "legendl")
        .attr('font-size',12)
        .attr("fill", "black")
        .text('Legend')

    map2.append("rect")
        .attr("x", map3_legend.x +1 )
        .attr("y", map3_legend.y + spacingl)
        .attr("width", rect_legendl.w)
        .attr("height", rect_legendl.h)
        .attr("fill", map2_colory)

    map2.append("rect")
        .attr("x", map3_legend.x + 1)
        .attr("y", map3_legend.y + 2 *spacingl + rect_legendl.h)
        .attr("width", rect_legendl.w)
        .attr("height", rect_legendl.h)
        .attr("fill", map2_colorn)

    map2.append("text")
        .attr("x", map3_legend.x + rect_legendl.w + 4)
        .attr("y", map3_legend.y + spacingl + rect_legendl.h/2)
        .text("Yes")
        .attr("alignment-baseline", "middle")
        .attr('font-size',10)

    map2.append("text")
        .attr("x", map3_legend.x + rect_legendl.w + 3)
        .attr("y", map3_legend.y + 2*spacingl + 3*rect_legendl.h/2)
        .text("No")
        .attr("alignment-baseline", "middle")
        .attr('font-size',10)

    map2.append("text")
        .attr("x", map3_legend.x + 1)
        .attr("y", map3_legend.y + 3 *spacingl + 5* rect_legendl.h/2)
        .text("*From 2016 to 2017 ")
        .attr("alignment-baseline", "middle")
        .attr('font-size',8)

    // END LEGEND
    //

    // START TITLE AND LEGEND
    //



    map2.append("text")
        .attr("x", 35)
        .attr("y", 33)
        .text("Part 2: Statistically Significant Increase in Opioid Death Rate (CDC)")
        .attr('font-size',12)
        .attr("class", "title_mapl")

    map2.append("text")
        .attr("x", 35)
        .attr("y", 285)
        .text("From parts 1 and 2, the northeast has been the hardest hit region from the opioid crisis.")
        .attr('font-size', note_font_sizel)


    // END TITLE AND LEGEND
    //
  })
