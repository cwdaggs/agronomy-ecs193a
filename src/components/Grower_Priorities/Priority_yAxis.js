

export const YAxis = ({ y_scale }) =>
  y_scale.domain().map(tickValue => (
    <g className="tick">
      <text
        key={tickValue}
        style={{ textAnchor: 'end' }}
        x={-3}
        dy=".32em"
        y={y_scale(tickValue) + y_scale.bandwidth() / 2}
      >
        {tickValue}
      </text>
    </g>
  ));