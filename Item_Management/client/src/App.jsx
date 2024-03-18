import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Item_main from './pages/Item_main';
import Item_add from './pages/Item_add';
import Item_Update from './pages/Item_Update';

export default function App() {
  return<BrowserRouter>
  <Routes>
    <Route path='/' element={<Item_main/>} />
    <Route path='/Item_add' element={<Item_add/>} />
    <Route path='/Item_Update' element={<Item_Update/>} />
  </Routes>
  </BrowserRouter>;
  
}
