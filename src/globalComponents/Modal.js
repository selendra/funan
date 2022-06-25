import { Modal as AntModal } from 'antd';

export default function Modal({children, ...restProps}) {
  return (
    <AntModal
      {...restProps}
      footer=''
      className='funan-modal'
    >{children}</AntModal>
  )
}