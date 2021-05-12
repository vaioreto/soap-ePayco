import React from "react";
import { useRouter } from "next/router";

const Auth = (props) => {

  const router = useRouter();

  React.useEffect(() => {

    const auth = JSON.parse(localStorage.getItem('auth'));
    
    if( auth != null ) {
      router.push('/admin/consultar-saldo');
    }

  }, []);

  return (
    <>
      <div className="main-content">
        
        {/* Page content */}
        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          {props.children}
        </div>

      </div>
    </>
  );
}

export default Auth;