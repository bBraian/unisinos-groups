import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface MetricsCardProps {
  name: string;
  value: string;
}

export function MetricsCard({ name, value } : MetricsCardProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">{value}</span>
      </CardContent>
    </Card>
  )
}