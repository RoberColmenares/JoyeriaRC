import { Outlet } from 'react-router-dom';
import Banner from './Banner';

export default function LayoutConBanner() {
  return (
    <>
      <Banner />
      <Outlet />
    </>
  );
}