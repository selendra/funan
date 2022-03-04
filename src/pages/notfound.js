import { Button } from 'antd';
import { Link } from 'react-router-dom';
import notfound from '../assets/404.svg';

export default function NotFound() {
  return (
    <center>
      <div style={{marginBottom: '24px'}}>
        <img src={notfound} alt='404' width='320' />
      </div>
      <Button 
        style={{
          maxWidth: '200px',
          width: '100%',
          height: '40px',
          borderRadius: '8px',
          background: '#03A9F4',
          color: '#FFF',
          fontWeight: '500'
        }}
      >
        <Link to='/profile'>Back Home</Link>
      </Button>
    </center>
  )
}
