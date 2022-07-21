import React, { useState, useEffect } from 'react';

import { Column } from '@ant-design/plots';


export default function Bigbar(props) {
    const data = props.data;
      const config = {
        data,
        xField: 'type',
        yField: 'sales',
        label: {
 
          position: 'middle',
     
          style: {
            fill: '#FFFFFF',
            opacity: 0.6,
          },
        },
        xAxis: {
          label: {
            autoHide: false,
            autoRotate: false,
          },
        },
        meta: {
          type: {
            alias: 'Package Name:',
          },
          sales: {
            alias: 'Sales',
          },
        },
        title:"awdawd"
      };
  return (
    <Column height={250} {...config} />
  )
}
