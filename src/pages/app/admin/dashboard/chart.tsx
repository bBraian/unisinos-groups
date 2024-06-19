import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const data = [
  { date: '10/12', revenue: 15 },
  { date: '11/12', revenue: 32 },
  { date: '12/12', revenue: 134 },
  { date: '13/12', revenue: 154 },
  { date: '14/12', revenue: 52 },
  { date: '15/12', revenue: 96 },
  { date: '16/12', revenue: 38 },
]

export function Chart() {
  return (
    <Card className="col-span-6 h-full">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Usuários online
          </CardTitle>
          <CardDescription>Usuários Online na última semana</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />

            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              width={80}
            />

            <Line
              type="linear"
              strokeWidth={2}
              dataKey="revenue"
              stroke={colors.green['500']}
            ></Line>
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}