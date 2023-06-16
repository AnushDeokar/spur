import Navbar from './Navbar'

const Layout = ({ children }) => {
  console.log("hello", process.env.REACT_APP_BACKEND_URL)
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  )
}

export default Layout