import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './routes';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
              {
                routes.map((route, index) => {
                  return (route.component) ?
                    (
                      <Route
                        key={index}
                        path={route.path}
                        element={
                          <route.component/> 
                        }
                      />
                    ) : (null);
                })
              }
            </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
