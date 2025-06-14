"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, LabelList, CartesianGrid } from "recharts";

type ProbabilityChartProps = {
  data: Array<{
    category: string;
    probability: number;
  }>;
  className?: string;
};

export const ProbabilityChart = ({
  data,
  className = "min-h-[200px] w-full",
}: ProbabilityChartProps) => {
  const chartConfig = {
    probability: {
      label: "الاحتمال",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className={className}>
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{
          left: 30,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="probability" hide reversed domain={[0, 100]} />
        <YAxis
          dataKey="category"
          type="category"
          orientation="right"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          width={60}
          tick={{ fontSize: 12, textAnchor: "end" }}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="probability" fill="var(--color-probability)" radius={5}>
          <LabelList
            dataKey="probability"
            position="right"
            offset={40}
            className="fill-foreground"
            fontSize={12}
            formatter={(value: number) => `${value.toFixed(1)}%`}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};
