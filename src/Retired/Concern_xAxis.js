export const XAxis = ({ x_scale, innerHeight, tickFormat }) =>
  x_scale.ticks().map(tickValue => (
    <g 
        className="tick" 
        key={tickValue} 
        transform={`translate(${x_scale(tickValue)},0)`}
    >
      <line y2={innerHeight} />
      <text 
        style={{ textAnchor: 'middle' }} 
        dy=".71em" 
        y={innerHeight + 3}
        >
        {tickFormat(tickValue)}
      </text>
    </g>
  ));