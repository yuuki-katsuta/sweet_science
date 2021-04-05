import { useContext } from 'react';
import { AuthContext } from '../auth/AuthProvider';

const Page404 = () => {
  const { isLoading } = useContext(AuthContext);
  return isLoading ? null : (
    <div style={{ marginTop: '200px', textAlign: 'center' }}>
      <h1>ページが見つかりません</h1>
    </div>
  );
};
export default Page404;
