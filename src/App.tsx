import { RouterProvider } from 'react-router-dom'
import { router } from "./pages/routes"
function App() {

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
