import { Alert } from 'antd';
import Spin from './Spin';

export default function Loading({error}) {
  return (
    <div className="connecting-node">
      <center>
        { error ?
          <Alert message="Connecting failed!" type="error" />
          :
          <>
            <Spin />
            <h3>Connecting...</h3>
          </>
        }
      </center>
    </div>
  )
}
