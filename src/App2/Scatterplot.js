import { useTooltip, tooltipContext } from "./useTooltip";
import React, { useContext } from "react";
import * as d3 from 'd3';

const Tooltip = ({ x, y, info }) => (
    // <foreignobject x="{x" +="" 10}="" y = "{y" width = { 100} height = { 50} >

    < foreignObject x={x + 10} y={y} width={100} height={50} >
        <div>
            <strong>{info.name}</strong>
            {info.state} {info.zipCode}
            <p style={{ color: info.color }}>
                {info.number1.toFixed(2)}, {info.number2.toFixed(2)}
            </p>
        </div>
    </foreignObject >
);



export default ({
    x,
    y,
    width,
    height,
    data,
    xDimension,
    yDimension,
    padding = 10
}) => {
    //const { tooltip, setTooltip } = useContext(tooltipContext);
    const { tooltip, setTooltip } = useTooltip();

    if (data === undefined)
        return <h1>loading</h1>

    console.log(xDimension)

    const xScale = d3
        .scaleLinear()
        .domain(d3.extent(data, xDimension))
        .range([padding, width - padding]);
    const yScale = d3
        .scaleLinear()
        .domain(d3.extent(data, yDimension))
        .range([padding, height - padding]);
    return (
        <g transform={`translate(${x}," ${y})`}>

            {data.map(d => (
                <circle key={d.id} cx={xScale(xDimension(d))} cy={yScale(yDimension(d))} r={3}
                    onMouseOver={() =>
                        setTooltip(d)
                    }
                    onMouseOut={() =>
                        setTooltip(false)
                    } />
            ))}

            {tooltip && (
                <Tooltip x={xScale(xDimension(tooltip))} y={yScale(yDimension(tooltip))} info={tooltip}>
                    {
                        console.log(xScale(xDimension(tooltip)), yScale(yDimension(tooltip)))
                    }
                </Tooltip>
            )}


        </g>
    );
};
