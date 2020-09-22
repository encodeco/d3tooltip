import React, { useState, useMemo, useEffect } from "react";
import Faker from 'faker'
import * as d3 from 'd3';
import { useTooltip, tooltipContext } from "./useTooltip";
import Scatterplot from "./Scatterplot"

function App() {
    // Generate random data on first load
    const data = useMemo(
        () =>
            d3.range(100).map(i => ({
                id: i,
                number1: Math.random(),
                number2: Math.random(),
                name: Faker.name.findName(),
                zipCode: Faker.address.zipCode(),
                state: Faker.address.state(),
                color: Faker.internet.color()
            })),
        []
    );

    // bucketize states into 50 buckets
    const stateToNumber = d3.scaleOrdinal()
        .domain(data.map(d => d.state))
        .range(d3.range(50));
    // alphabetize letters into 25 buckets
    const alphabet = d3.scaleOrdinal()
        .domain("abcdefghijklmnoprstuvwxyz".split(""))
        .range(d3.range(25));
    const state = useTooltip();
    return (
        <div class="App">
            <h1>React & D3 dashboard with synced tooltips</h1>
            <h2>For simplicity, it's scatterplots ✌️</h2>
            <tooltipContext class="provider" value={state}>
                <svg width="800" height="600">
                    <Scatterplot x={0} y={0} width={200} height={200} data={data}
                        xDimension={d => d.number1}
                        yDimension={d => d.number2}
                    />
                    <Scatterplot x={250} y={0} width={200} height={200} data={data}
                        xDimension={d => d.number1}
                        yDimension={d => stateToNumber(d.state)}
                    />
                    <Scatterplot x={0} y={250} width={200} height={200} data={data}
                        xDimension={d => stateToNumber(d.state)}
                        yDimension={d => alphabet(d.name[0])}
                    />
                    <Scatterplot></Scatterplot>
                </svg >
            </tooltipContext >
        </div >
    );
}


export default App