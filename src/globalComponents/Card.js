import { Card as AntCard } from 'antd';

export default function Card({children, ...restProps}) {
  return (
    <AntCard
      {...restProps}
      className='funan-card'
    >{children}</AntCard>
  )
}
