import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card } from "react-bootstrap";
import "./StudentDistributionChart.css";

interface DistributionData {
  program: string;
  students: number;
  color: string;
}

interface StudentDistributionChartProps {
  data: DistributionData[];
  Loading:boolean;
}

const StudentDistributionChart: React.FC<StudentDistributionChartProps> = ({
  data,
  Loading=false
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 350 });

  // Handle responsive sizing
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const isMobile = window.innerWidth < 768;
        
        const width = Math.min(containerWidth - 40, isMobile ? 350 : 500);
        const height = isMobile ? 320 : 350;
        
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const { width, height } = dimensions;
    const isMobile = width <= 400;
    
    // Adjust layout based on device
    const pieRadius = Math.min(width, height) / 2 - (isMobile ? 40 : 50);
    const pieCenterX = isMobile ? width / 2 : width * 0.4;
    const pieCenterY = isMobile ? height * 0.4 : height / 2;

    const chart = svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
      .attr("transform", `translate(${pieCenterX},${pieCenterY})`);

    // Create pie layout
    const pie = d3
      .pie<DistributionData>()
      .value((d) => d.students)
      .sort(null);

    const innerRadius = pieRadius * 0.5;
    const outerRadius = pieRadius;
    const middleRadius = (innerRadius + outerRadius) / 2; // Define here so it's accessible
    
    const arc = d3
      .arc<d3.PieArcDatum<DistributionData>>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    // Draw arcs
    const arcs = chart
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    const paths = arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => d.data.color)
      .attr("stroke", "#fff")
      .attr("stroke-width", isMobile ? 1 : 2)
      .attr("opacity", 0.8);

    // Add percentage labels - perfectly centered in the colored segment
    // arcs
    //   .append("text")
    //   .attr("transform", (d) => {
    //     // Calculate the exact center point of the arc segment
    //     const midAngle = (d.startAngle + d.endAngle) / 2;
        
    //     const x = Math.cos(midAngle) * middleRadius;
    //     const y = Math.sin(midAngle) * middleRadius;
    //     return `translate(${x},${y})`;
    //   })
    //   .attr("text-anchor", "middle")
    //   .attr("dominant-baseline", "middle")
    //   .attr("fill", "#ffffff") // Pure white for maximum contrast
    //   .attr("font-size", isMobile ? "11px" : "13px")
    //   .attr("font-weight", "600") // Semi-bold for better readability
    //   .attr("pointer-events", "none")
    //   .style("text-shadow", 
    //     "0px 1px 2px rgba(0,0,0,0.7), " +
    //     "1px 0px 2px rgba(0,0,0,0.7), " +
    //     "0px -1px 2px rgba(0,0,0,0.7), " +
    //     "-1px 0px 2px rgba(0,0,0,0.7)") // Shadow on all sides for contrast
    //   .style("user-select", "none")
    //   .style("filter", "drop-shadow(0px 1px 1px rgba(0,0,0,0.8))")
    //   .style("paint-order", "stroke")
    //   .text((d) => {
    //     const total = d3.sum(data, (d) => d.students);
    //     const percentage = Math.round((d.data.students / total) * 100);
    //     return `${percentage}%`;
    //   });

    // For very small segments, we need to adjust font size or hide labels
    arcs.each(function(d: any) {
      const total = d3.sum(data, (d) => d.students);
      const percentage = Math.round((d.data.students / total) * 100);
      const arcLength = (d.endAngle - d.startAngle) * middleRadius; // Now middleRadius is accessible
      
      // If segment is too small, make font smaller or hide
      const textElement = d3.select(this).select("text");
      if (percentage < 5 || arcLength < 20) {
        textElement.attr("font-size", isMobile ? "9px" : "10px");
      }
      
      // For very very small segments (<2%), hide the label completely
      if (percentage < 2 || arcLength < 10) {
        textElement.style("display", "none");
      }
    });

    // Add legend - positioned differently for mobile
    if (isMobile) {
      // Mobile: Horizontal legend below pie
      const legendStartY = pieCenterY + pieRadius + 30;
      const legendItemWidth = 80;
      const itemsPerRow = Math.floor(width / legendItemWidth);
      
      const legend = svg
        .append("g")
        .attr("transform", `translate(${width * 0.1}, ${legendStartY})`);

      data.forEach((item, i) => {
        const row = Math.floor(i / itemsPerRow);
        const col = i % itemsPerRow;
        
        const legendRow = legend
          .append("g")
          .attr("transform", `translate(${col * legendItemWidth}, ${row * 40})`);

        legendRow
          .append("rect")
          .attr("width", 12)
          .attr("height", 12)
          .attr("fill", item.color)
          .attr("rx", 3)
          .attr("y", 4);

        const maxChars = 8;
        const displayText = item.program.length > maxChars 
          ? `${item.program.substring(0, maxChars)}...` 
          : item.program;

        legendRow
          .append("text")
          .attr("x", 16)
          .attr("y", 12)
          .attr("font-size", "10px")
          .attr("fill", "#333")
          .attr("dominant-baseline", "middle")
          .text(`${displayText}: ${item.students}`);
      });
    } else {
      // Desktop: Vertical legend on the right
      const legendStartX = width * 0.75;
      const legendStartY = 50;
      const legendSpacing = 25;
      const legendTextSize = "12px";

      const legend = svg
        .append("g")
        .attr("transform", `translate(${legendStartX}, ${legendStartY})`);

      data.forEach((item, i) => {
        const legendRow = legend
          .append("g")
          .attr("transform", `translate(0, ${i * legendSpacing})`);

        legendRow
          .append("rect")
          .attr("width", 15)
          .attr("height", 15)
          .attr("fill", item.color)
          .attr("rx", 3);

        const maxChars = 20;
        const displayText = item.program.length > maxChars 
          ? `${item.program.substring(0, maxChars)}...` 
          : item.program;

        legendRow
          .append("text")
          .attr("x", 20)
          .attr("y", 12)
          .attr("font-size", legendTextSize)
          .attr("fill", "#333")
          .attr("dominant-baseline", "middle")
          .text(`${displayText}: ${item.students}`);
      });
    }

    // Tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "chart-tooltip")
      .style("position", "absolute")
      .style("background", "#fff")
      .style("padding", "8px")
      .style("border", "1px solid #ddd")
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)")
      .style("z-index", "1000")
      .style("font-size", "14px");

    paths
      .on("mouseover", function (event, d: any) {
        const total = d3.sum(data, (d) => d.students);
        const percentage = Math.round((d.data.students / total) * 100);

        tooltip
          .style("opacity", 1)
          .html(
            `<div style="font-weight: bold; color: ${d.data.color}; margin-bottom: 4px;">${d.data.program}</div>
             <div>Students: ${d.data.students}</div>
             <div>Percentage: ${percentage}%</div>`
          );
      })
      .on("mousemove", function (event) {
        const tooltipWidth = 150;
        const tooltipHeight = 80;
        const x = event.pageX + 10;
        const y = event.pageY - 10;

        const adjustedX = x + tooltipWidth > window.innerWidth 
          ? event.pageX - tooltipWidth - 10 
          : x;
        const adjustedY = y + tooltipHeight > window.innerHeight
          ? event.pageY - tooltipHeight - 10
          : y;

        tooltip
          .style("left", adjustedX + "px")
          .style("top", adjustedY + "px");
      })
      .on("mouseout", function () {
        tooltip.style("opacity", 0);
      });

    return () => {
      tooltip.remove();
    };
  }, [data, dimensions]);

  return (
    <Card className="border-0 shadow-sm chart-card">
      {Loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 120 }}>
          <span className="spinner-border text-primary" role="status" aria-hidden="true"></span>
        </div>
      ):(
        <Card.Body className="chart-card-body">
          <div className="chart-header">
            <h5 className="chart-title">Student Distribution by Program</h5>
          </div>
          <div 
            ref={containerRef} 
            className="chart-container-responsive"
          >
            <svg ref={svgRef} className="chart-svg"></svg>
          </div>
        </Card.Body>
      )} 
    </Card>
  );
};

export default StudentDistributionChart;