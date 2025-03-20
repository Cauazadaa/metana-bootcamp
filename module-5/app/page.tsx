"use client";
import { fetchLatestBlocksData, fetchBlockData } from './fetchBlocks'
import React, {useEffect, useState} from 'react';
import graphs from '../app/graphs';
import Graph from '../app/graphs';
interface ChartData {
  labels: string[];
  values: number[];
}


export default function Home() {
  const [chartData, setChartData] = useState<ChartData>({labels: [], values: []});
  const [baseFeeData, setBaseFeeData] = useState<ChartData>({ labels: [], values: [] });
  useEffect(() => {
    const getData = async () => {
     try{
      const { blocksData, transferVolume }: { blocksData: any[]; transferVolume: number[] } = await fetchLatestBlocksData()

      const labels = blocksData.map((_, index) => `Block ${index +1}`);
      const values = transferVolume;
      setChartData( { labels , values });
      
      const blockData = await fetchBlockData();
      const baseFeeLabels = [`Block ${blockData.number}`];
      const baseFeeValues = [blockData.baseFee];
      setBaseFeeData ({labels: baseFeeLabels , values: baseFeeValues});
  
    } catch(error){
      console.error(error);
     }
    
    }

  getData();
  },[]
);
 
console.log("Chart Data:", chartData);
console.log("Base Fee Data:", baseFeeData);
 
  return (

    <div>
          <h1>Graph-1</h1>
          <Graph data={chartData} title="Transfers Volume" />
          <h2>Graph-2</h2>
          <Graph data={baseFeeData} title = "BaseFee per block" />
        </div>
  );
}
