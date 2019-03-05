





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
    map1.selectAll('path')
        .data(states_datal)
        .enter()
        .append("path")
        .attr("class", "identifier_map1l")
        .attr("d", path)
        .style("fill", function(d) {
          // choose fill based off percentiles
          // purple is color of choice
          let color_map3l = d.properties.deathRate;
          if (color_map3l <= 15) {
            return map1_color1
          } else if (color_map3l < 22) {
            return map1_color2
          } else if (color_map3l < 28) {
            return map1_color3
          } else {
            return map1_color4
          }
        })
        // end of style fill


    states_datal.forEach(function(d){
        coord_label = path.centroid(d)
       if (d.properties.deathRate>29 && path.area(d) > 92){
           map1.append("text")
               .attr("x", coord_label[0] - 5)
               .attr("y", coord_label[1] + 3)
               .text(d.properties.STUSPS)
               .attr("font-size", "7")
          }
    })



  /// LEGEND
  ///
  ///

    map1.append("text")
        .attr("x", map3_legend.x + 1)
        .attr("y", map3_legend.y)
        .attr("class", "legendl")
        .attr('font-size',12)
        .attr("fill", "black")
        .text('Legend')

    map1.append("rect")
        .attr("x", map3_legend.x +1 )
        .attr("y", map3_legend.y + spacingl)
        .attr("width", rect_legendl.w)
        .attr("height", rect_legendl.h)
        .attr("fill", map1_color1)

    map1.append("rect")
        .attr("x", map3_legend.x + 1)
        .attr("y", map3_legend.y + 2 *spacingl + rect_legendl.h)
        .attr("width", rect_legendl.w)
        .attr("height", rect_legendl.h)
        .attr("fill", map1_color2)

    map1.append("rect")
        .attr("x", map3_legend.x + 1)
        .attr("y", map3_legend.y + 3 *spacingl + 2* rect_legendl.h)
        .attr("width", rect_legendl.w)
        .attr("height", rect_legendl.h)
        .attr("fill", map1_color3)


    map1.append("rect")
        .attr("x", map3_legend.x + 1)
        .attr("y", map3_legend.y + 4 *spacingl + 3* rect_legendl.h)
        .attr("width", rect_legendl.w)
        .attr("height", rect_legendl.h)
        .attr("fill", map1_color4)

    map1.append("text")
        .attr("x", map3_legend.x + rect_legendl.w + 4)
        .attr("y", map3_legend.y + spacingl + rect_legendl.h/2)
        .text("8 to 15")
        .attr("alignment-baseline", "middle")
        .attr('font-size',10)

    map1.append("text")
        .attr("x", map3_legend.x + rect_legendl.w + 3)
        .attr("y", map3_legend.y + 2*spacingl + 3*rect_legendl.h/2)
        .text("16 to 22")
        .attr("alignment-baseline", "middle")
        .attr('font-size',10)

    map1.append("text")
        .attr("x", map3_legend.x + rect_legendl.w + 3)
        .attr("y", map3_legend.y + 3*spacingl + 5*rect_legendl.h/2)
        .text("23 to 28")
        .attr("alignment-baseline", "middle")
        .attr('font-size',10)


    map1.append("text")
        .attr("x", map3_legend.x + rect_legendl.w + 3)
        .attr("y", map3_legend.y + 4*spacingl + 7*rect_legendl.h/2)
        .text(">29")
        .attr("alignment-baseline", "middle")
        .attr('font-size',10)

    map1.append("text")
        .attr("x", map3_legend.x + 1)
        .attr("y", map3_legend.y + 5 *spacingl + 4* rect_legendl.h)
        .text("*Per 100K people ")
        .attr("alignment-baseline", "middle")
        .attr('font-size',8)

    // END LEGEND
    //

    // START TITLE AND LEGEND
    //



    map1.append("text")
        .attr("x", 35)
        .attr("y", 33)
        .text("Part 1: Death Rates from Opioids (2017)")
        .attr('font-size',17)
        .attr("class", "title_mapl")

    map1.append("text")
        .attr("x", 35)
        .attr("y", 285)
        .text("Worst three states: WV - 58.3, OH - 46.3, PA - 44.3")
        .attr('font-size',note_font_sizel)

    map1.append("text")
        .attr("x", 35)
        .attr("y", 305)
        .text("Best three states: NE - 8.1, SD - 8.5, ND - 9.2")
        .attr('font-size',note_font_sizel)


    // END TITLE AND LEGEND
    //
  })
