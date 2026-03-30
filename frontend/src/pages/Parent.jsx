import Sidebar from "../components/Sidebar";
export default function Parent() {
  
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div >
        <h1 className="home-title">parents page hello to you</h1>
      </div>
     </div>
  );
}