import Peak from './Peak';
import Line from './Line';
import Median from './Median';
import Area from './Area';
import Bar from './Bar';
import Skyline from './Skyline';
import Pyramid from './Pyramid';
import Cube from './Cube';
import SkyScraper from './SkyScraper';
import Series from './Series';
import Stack from './Stack';
import Rect from './Rect';
import Pie from './Pie';
import Dots from './Dots';
import Caption from './Caption';
import Tooltip from './Tooltip';

const Charts: Record<string, any> = {};

Charts.Peak = Peak;
Charts.Line = Line;
Charts.Median = Median;
Charts.Area = Area;
Charts.Bar = Bar;
Charts.Skyline = Skyline;
Charts.Pyramid = Pyramid;
Charts.Cube = Cube;
Charts.SkyScraper = SkyScraper;
Charts.Stack = Stack;
Charts.Series = Series;
Charts.Dots = Dots;
Charts.Rect = Rect;
Charts.Pie = Pie;
Charts.Tooltip = Tooltip;
Charts.Caption = Caption;

export default Charts;
