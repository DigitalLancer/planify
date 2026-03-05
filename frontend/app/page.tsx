"use client"
import Image from "next/image";
import {
  AxisModel, MarkerSettingsModel, Category, ChartComponent, ColumnSeries, DataLabel, Inject,
  Legend, LegendSeriesModel, LineSeries, SeriesCollectionDirective, SeriesDirective, Tooltip, TooltipSettingsModel, BarSeries
} from '@syncfusion/ej2-react-charts';
import DashboradWeeklyOverview from "@/components/dashboard/DashboardWeeklyOverview";

export default function Home() {
  const data: Object[] = [
    { x: 2005, y: 28 },
    { x: 2006, y: 25 },
    { x: 2007, y: 26 },
    { x: 2008, y: 27 },
    { x: 2009, y: 32 },
    { x: 2010, y: 35 },
    { x: 2011, y: 30 }
  ];
  const tooltip: TooltipSettingsModel = { enable: true, shared: false };
  const primaryYAxis: AxisModel = {
    title: 'Percentage',
    labelFormat: '{value}%'
  };
  const primaryXAxis: AxisModel = { minimum: 2005, maximum: 2012, interval: 1, title: 'Year' };
  const legendSettings: LegendSeriesModel = { visible: true };
  const marker: MarkerSettingsModel = { dataLabel: { visible: true } };

  return (
    <>
      <h2>Syncfusion React Chart Component</h2>
      <DashboradWeeklyOverview></DashboradWeeklyOverview>
    </>
  )
}
