import { Alert } from 'antd';

export default function ErrorHandling(props) {
  const { warning, error, bondError } = props;

  return (
    <div>
      { error &&
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          style={{borderRadius: '8px'}}
        />
      }
      { warning &&
        <Alert 
          message="Warning"
          description={warning}
          type="warning"
          showIcon
          style={{borderRadius: '8px'}}
        />
      }
    </div>
  )
}