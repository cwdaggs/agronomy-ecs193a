export const Marks = ({
    data,
    x_scale,
    y_scale,
    xValue,
    yValue,
    tooltipFormat,
    colorValue,
    color_scale,
    order
  }) =>
    data.map(d => (
      <rect
        className="mark"
        key={yValue(d)}
        x={0}
        y={y_scale(yValue(d)) + (order-1) * (y_scale.bandwidth()/(order+2))}
        width={x_scale(xValue(d))}
        height={y_scale.bandwidth()/3}
        fill={color_scale(colorValue(d))}
      >
        <title>{tooltipFormat(xValue(d))}</title>
      </rect>
    ));