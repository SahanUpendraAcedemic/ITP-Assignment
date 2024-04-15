import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRouter() {
    const { currentSupplier } = useSelector ((state) => state.supplier)
  return currentSupplier ? <Outlet/> : <Navigate to = '/login'/>;
}

