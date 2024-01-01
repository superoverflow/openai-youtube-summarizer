import { AreaStack } from '@visx/shape';
import { SeriesPoint } from '@visx/shape/lib/types';
import { scaleTime, scaleLinear } from '@visx/scale';
import { timeParse } from '@visx/vendor/d3-time-format';
import { AxisRight, AxisBottom } from '@visx/axis';
import data from './data'


type SentimentTimeSeriesRecord = {
  date: string;
  bullish: number;
  neutral: number;
  bearish: number;
}

const normalize = (arr: SentimentTimeSeriesRecord[]) => {
  return arr.map((d) => {
    const sum = d.bullish + d.neutral + d.bearish;
    const bullish = d.bullish / sum;
    const neutral = d.neutral / sum;
    const bearish = d.bearish / sum;
    return {
      date: d.date,
      bullish,
      neutral,
      bearish,
    }
  })
}

const height = 800;
const width = 1200;
const margin = { top: 60, bottom: 60, left: 80, right: 80 };

const getColors = (sentiment: 'bullish' | 'neutral' | 'bearish' ) => {
  switch (sentiment) {
    case 'bullish': 
      return '#95B8D1'
    case 'neutral':
      return '#E8DDB5'
    case 'bearish':
      return '#EDAFB8'
  }
}

const keys = Object.keys(data[0]).filter((k) => k !== 'date');
const parseDate = timeParse('%Y-%m-%d');

const getDate = (d: SentimentTimeSeriesRecord) => (parseDate(d.date) as Date).valueOf();
const getY0 = (d: SeriesPoint<SentimentTimeSeriesRecord>) => d[0];
const getY1 = (d: SeriesPoint<SentimentTimeSeriesRecord>) => d[1];
const normalizeData = normalize(data);
export default function Graph() {
  // bounds
  const yMax = height - margin.top - margin.bottom;
  const xMax = width - margin.left - margin.right;

  // scales
  const xScale = scaleTime<number>({
    range: [margin.left, xMax],
    domain: [Math.min(...data.map(getDate)), Math.max(...data.map(getDate))],
  });
  const yScale = scaleLinear<number>({
    range: [yMax, margin.top],
    domain: [0, 1],
  });

  return (
    <div className="container flex min-h-screen justify-center items-center">
      <svg width={width} height={height}>
        <AreaStack
          top={margin.top}
          left={margin.left}
          keys={keys}
          data={normalizeData}
          x={(d) => xScale(getDate(d.data)) ?? 0}
          y0={(d) => yScale(getY0(d)) ?? 0}
          y1={(d) => yScale(getY1(d)) ?? 0}
        >
          {({ stacks, path }) =>
            stacks.map((stack) => (
              <path
                key={`stack-${stack.key}`}
                d={path(stack) || ''}
                stroke="transparent"
                fill={getColors(stack.key as 'bullish' | 'neutral' | 'bearish')}
              />
            ))
          }
        </AreaStack>
        <AxisBottom top={yMax} scale={xScale} numTicks={width > 520 ? 10 : 5} />
        <AxisRight scale={yScale} left={xMax} />
      </svg>
    </div>
  )
}