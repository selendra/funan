import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTheme } from 'next-themes';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BondGraph(props) {
  const { active, unlocking, unlocked, inactive } = props;
  let { free } = props;
  const { theme } = useTheme();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        padding: {
          right: 20,
        },
        display: true,
        position: 'left',
        align: 'center',
        labels: {
          padding: 20,
          color: theme === 'light' ? '#03A9F4' : '#03A9F4',
          font: {
            size: 15,
            weight: '500',
          },
        },
      },
      tooltip: {
        displayColors: false,
        backgroundColor: '#FFF',
        bodyColor: '#03A9F4',
        callbacks: {
          label: (context) => {
            if (inactive) {
              return 'Inactive';
            }
            return `${context.label}: ${
              context.parsed === -1 ? 0 : context.parsed
            } CDM`;
          },
        },
      },
    },
    cutout: '75%',
  };

  const data = {
    labels: ['Active', 'Unlocking', 'Free'],
    datasets: [
      {
        label: 18,
        data: [active, Number(unlocking + unlocked), free],
        backgroundColor: [
          '#03A9F4',
          '#ED1576',
          'rgba(0,0,0,0.3)',
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div>
      <Doughnut options={options} data={data} />
    </div>
  )
}
