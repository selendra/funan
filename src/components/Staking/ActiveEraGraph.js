import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { useTheme } from 'next-themes';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);

export default function ActiveEraGraph({value, value2}) {
  const { theme } = useTheme();
  const borderColor = theme === 'light' ? '#000' : '#FFF';
  
  const options = {
    backgroundColor: 'transparent',
    responsive: true,
    maintainAspectRatio: false,
    spacing: 0,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const data = {
    datasets: [
      {
        data: [value, value2],
        backgroundColor: 'transparent',
        borderWidth: 1.25,
        borderColor: [
          borderColor,
          'transparent'
        ]
      },
    ],
  };

  return (
    <div style={{ width: 36, height: 36 }}>
      <Pie options={options} data={data} />
    </div>
  )
}
