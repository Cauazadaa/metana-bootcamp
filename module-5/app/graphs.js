import { Line, line } from 'react-chartjs-2';

const Graph = ({data  , title}) => {
    const chartData = {
        labels : data.labels,
        datasets: [
            {
                label : title,
                data : data.values,
              borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
            },
        ],

    };
    return (
        <div>
            <h2>{title}</h2>
            <Line data = {chartData} />
        </div>
    );
};

export default Graph;
