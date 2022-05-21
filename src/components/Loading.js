import { Alert, Spin } from 'antd'

export default function Loading({error}) {
  return (
    <div className="connecting-node">
      <center>
        { error ?
          <Alert message="Connecting to node failed!" type="error" />
          :
          <>
            <Spin />
            <h3>Connecting to our node...</h3>
          </>
        }
      </center>
    </div>
  )
}
